import { spawn } from 'child_process'
import os from 'os'
import path from 'path'
import { ProjectModel } from '../models/projectModel'
import { SettingModel } from '../models/settingModel'
import { ProjectType } from '../types/projectType'
import { FailType } from '../types/failType'
import { FailModel } from '../models/failModel'

export async function runProjectCommand(projectId: number, type: 'start' | 'stop' | 'restart') {

    const project: ProjectType = await ProjectModel.find(projectId)

    if(!project) throw new Error('Project not found.')

    const userHome = os.homedir()
    const defaultBasePath = path.join(userHome, 'apps')

    // const basePathSetting = await SettingModel.find('BASE_PATH')
    const basePathSetting = null // For testing purposes, replace with await SettingModel.find('BASE_PATH') in production

    const BASE_PATH = basePathSetting && basePathSetting?.value ? basePathSetting.value : defaultBasePath

    const projectPath = path.join(BASE_PATH, project.name)

    const envs = project.envs || {}

    // const commands = (project.commands && project.commands[type]) || []
    const command = 'docker-compose up -d --build'

    await ProjectModel.upsert({...project, status: `${type}ing`})

    return new Promise<void>((resolve, reject) => {

        const isWindows = process.platform === 'win32'
        const shell = isWindows ? 'cmd.exe' : 'bash'
        const shellArgs = isWindows ? ['/c', command] : ['-c', command]

        // const child = spawn('bash', ['-c', commands.join(' && ')], {
        const child = spawn(shell , shellArgs, {

            cwd: projectPath,
            env: { ...process.env, ...envs }

        })

        child.stdout.on('data', (data) => console.log(`[stdout ${project.name}]: ${data}`))
        child.stderr.on('data', (data) => console.error(`[stderr ${project.name}]: ${data}`))

        child.on('close', async (code) => {

            const success = code === 0
            const newStatus = success ? (type === 'stop' ? 'stopped' : 'running') : 'error'

            await ProjectModel.upsert({...project, status: newStatus})

            if(success)  return resolve()

            // const item: FailType = {
            //     name: `${type.toUpperCase()}_FAIL`,
            //     type: 'runtime',
            //     message: `Command failed with code: ${code}`,
            //     data: project,
            //     error: {},
            //     status: 'new',
            // }

            // await FailModel.upsert(item);

            await ProjectModel.upsert({ ...project, status: 'error' })

            return reject(new Error(`Command failed with code ${code}`))

        })

        child.on('error', async (error) => {

            console.error(`[spawn error ${project.name}]:`, error)

            // const item: FailType = {
            //     name: `${type.toUpperCase()}_FAIL`,
            //     type: 'runtime',
            //     message: `Spawn error: ${error.message}`,
            //     data: project,
            //     error: error,
            //     status: 'new',
            // }

            // await FailModel.upsert(item)
            await ProjectModel.upsert({ ...project, status: 'error' })

            return reject(error)
            
        })

    })


}

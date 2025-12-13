import { spawn } from 'child_process'
import os from 'os'
import path, { join } from 'path'

import fs from 'fs/promises'
import { existsSync } from 'fs'


import { ProjectModel } from '../models/projectModel'
import { SettingModel } from '../models/settingModel'
import { ProjectType } from '../types/projectType'
import { FailType } from '../types/failType'
import { FailModel } from '../models/failModel'



function factory() {

    async function saveError(error: any, project: ProjectType) {

        console.error(error)

        const formatedError = {
            name: error.name || 'UnknownError',
            message: error.message || 'An unknown error occurred.',
            stack: error.stack || 'No stack trace available.',
        }

        const item: FailType = {
            name: error.name,
            type: 'runtime',
            message: `Spawn error: ${error.message}`,
            data: project,
            error: formatedError,
            status: 'new',
        }

        await FailModel.upsert(item)

        if(!project || !project.id) return

        const found = await ProjectModel.find(project.id)

        if(found) await ProjectModel.upsert({ ...found, status: 'error' })

        return
        
    }

    function preparePath(project: ProjectType) {

        if(!project) throw new Error('Project not found.')

        const userHome = os.homedir()
        const defaultBasePath = path.join(userHome, 'apps')

        // const basePathSetting = await SettingModel.find('BASE_PATH')
        const basePathSetting = null as any // For testing purposes, replace with await SettingModel.find('BASE_PATH') in production

        const BASE_PATH = basePathSetting && basePathSetting?.value ? basePathSetting.value : defaultBasePath

        const projectPath = path.join(BASE_PATH, project.name)

        return projectPath;

    }

    function prepareEnv(project: ProjectType) {

        if(!project) throw new Error('Project not found.')

        const envs = project.envs || {}

        // You can add more environment variables here if needed
        // envs['EXAMPLE_VAR'] = 'example_value';

        return envs;

    }

    async function cloneProject(project: ProjectType) {

        if(!project) throw new Error('Project not found.')

        const PROJECT_PATH: string = preparePath(project);

        const ENVS: any = prepareEnv(project);

        const BRANCH = project.branch || 'main';

        let COMMAND = ['clone', project.url, PROJECT_PATH]
        let OPTIONS: any = { env: ENVS };

        const folderExists  = existsSync(PROJECT_PATH)
        const isGitRepo  = existsSync(join(PROJECT_PATH, '.git'))

        if(folderExists  && isGitRepo) {

            COMMAND = ['pull', 'origin', BRANCH];
            OPTIONS = { env: ENVS, cwd: PROJECT_PATH };

        } 

        return new Promise<void>((resolve, reject) => {

            const child = spawn('git', COMMAND, OPTIONS)

            child.stdout.on('data', (data) => console.log(`[clone stdout]: ${data}`))
            child.stderr.on('data', (data) => console.error(`[clone stderr]: ${data}`))

            child.on('close', (code) => {

                if(code === 0) return resolve()

                return reject(new Error(`Clone failed with code: ${code}`))

            })

            child.on('error', (err) => reject(err))

        })

    }

    function clearDocker() {
        
        return new Promise<void>((resolve, reject) => {
            
            // const COMMAND = 'docker container prune -f && docker image prune -a -f && docker volume prune -f && docker builder prune -a -f';

            const COMMAND = (`
                docker container prune -f &&
                docker image prune -a -f &&
                docker volume prune -f &&
                docker builder prune --all --force
            `)

            const isWindows = process.platform === 'win32'
            const shell = isWindows ? 'cmd.exe' : 'bash'
            const shellArgs = isWindows ? ['/c', COMMAND] : ['-c', COMMAND]

            const child = spawn(shell , shellArgs)

            child.stdout.on('data', (data) => console.log(`[docker stdout]: ${data}`))
            child.stderr.on('data', (data) => console.error(`[docker stderr]: ${data}`))

            child.on('close', (code) => {

                if(code === 0) return resolve()

                return reject(new Error(`Docker prune failed with code: ${code}`))

            })

            child.on('error', (err) => reject(err))

        })

    }

    async function runProject(project: ProjectType) {

        if(!project) throw new Error('Project not found.')

        // const COMMAND = 'docker compose down --remove-orphans'

        // const COMMAND = 'docker compose up -d --build --force-recreate'

        const COMMAND = 'docker compose down --remove-orphans && docker compose up -d --build --force-recreate'

        const PROJECT_PATH: string = preparePath(project);

        const ENVS: any = prepareEnv(project);

        return new Promise<void>((resolve, reject) => {

            const isWindows = process.platform === 'win32'
            const shell = isWindows ? 'cmd.exe' : 'bash'
            const shellArgs = isWindows ? ['/c', COMMAND] : ['-c', COMMAND]

            // const child = spawn('bash', ['-c', commands.join(' && ')], {
            const child = spawn(shell , shellArgs, {

                cwd: PROJECT_PATH,
                // env: { ...process.env, ...envs }

            })

            child.stdout.on('data', (data) => console.log(`[stdout ${project.name}]: ${data}`))
            child.stderr.on('data', (data) => console.error(`[stderr ${project.name}]: ${data}`))

            child.on('close', (code) => {

                if(code === 0) return resolve()

                return reject(new Error(`Run failed with code: ${code}`))

            })

            child.on('error', (err) => reject(err))

        })

    }

    async function stopProject(project: ProjectType) {

        if(!project) throw new Error('Project not found.')
        
        const COMMAND = 'docker compose down'
        const PROJECT_PATH: string = preparePath(project)

        return new Promise<void>((resolve, reject) => {

            const isWindows = process.platform === 'win32'
            const shell = isWindows ? 'cmd.exe' : 'bash'
            const shellArgs = isWindows ? ['/c', COMMAND] : ['-c', COMMAND]

            const child = spawn(shell, shellArgs, { cwd: PROJECT_PATH })

            child.stdout.on('data', (data) => console.log(`[stop stdout ${project.name}]: ${data}`))
            child.stderr.on('data', (data) => console.error(`[stop stderr ${project.name}]: ${data}`))

            child.on('close', (code) => {

                if (code === 0) return resolve()

                return reject(new Error(`Stop failed with code: ${code}`))

            })

            child.on('error', (err) => reject(err))

        })

    }

    async function deleteProject(project: ProjectType) {

        const PROJECT_PATH: string = preparePath(project)

        await stopProject(project)

        if(!existsSync(PROJECT_PATH)) return

        return new Promise<void>((resolve, reject) => {

            // const child = spawn('docker', ['system', 'prune', '-a', '-f', '--volumes'], { shell: true })

            const child = spawn('docker', ['compose', 'down', '--volumes', '--rmi', 'all'], { cwd: PROJECT_PATH, shell: true })

            child.stdout.on('data', (data) => console.log(`[docker stdout]: ${data}`))
            child.stderr.on('data', (data) => console.error(`[docker stderr]: ${data}`))

            child.on('close', async(code) => {

                if(code !== 0) reject(new Error(`Docker compose down failed with code: ${code}`))
                    
                await fs.rm(PROJECT_PATH, { recursive: true, force: true })

                return resolve()

            })

            child.on('error', (err) => reject(err))

        })

    }

    return {

        run: async(project: ProjectType) => {

            try {
                
                if(!project) throw new Error('Project not found.')
    
                await ProjectModel.upsert({...project, status: `cloning`})
                
                await cloneProject(project)
    
                await ProjectModel.upsert({...project, status: `building`})
                
                await runProject(project)
                
                await ProjectModel.upsert({...project, status: `running`})

                await clearDocker()

                return

            } catch (error) {

                saveError(error, project)

                return
                
            }

        },

        stop: async(project: ProjectType) => {

            try {
                
                if(!project) throw new Error('Project not found.')
    
                await ProjectModel.upsert({...project, status: `stopping`})
                
                await stopProject(project);
                
                await ProjectModel.upsert({...project, status: `stopped`})

                return

            } catch (error) {

                saveError(error, project)

                return
                
            }

        },

        delete: async(project: ProjectType) => {

            try {
                
                if(!project) throw new Error('Project not found.')
    
                await deleteProject(project);
                
                return

            } catch (error) {

                saveError(error, project)

                return
                
            }

        },

    }

}


const ProjectCommand = factory();
export default ProjectCommand;






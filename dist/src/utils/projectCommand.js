"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
const path_1 = __importStar(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = require("fs");
const projectModel_1 = require("../models/projectModel");
const failModel_1 = require("../models/failModel");
function factory() {
    async function saveError(error, project) {
        console.error(error);
        const formatedError = {
            name: error.name || 'UnknownError',
            message: error.message || 'An unknown error occurred.',
            stack: error.stack || 'No stack trace available.',
        };
        const item = {
            name: error.name,
            type: 'runtime',
            message: `Spawn error: ${error.message}`,
            data: project,
            error: formatedError,
            status: 'new',
        };
        await failModel_1.FailModel.upsert(item);
        const found = await projectModel_1.ProjectModel.find(project.id);
        if (found)
            await projectModel_1.ProjectModel.upsert({ ...found, status: 'error' });
        return;
    }
    function preparePath(project) {
        const userHome = os_1.default.homedir();
        const defaultBasePath = path_1.default.join(userHome, 'apps');
        // const basePathSetting = await SettingModel.find('BASE_PATH')
        const basePathSetting = null; // For testing purposes, replace with await SettingModel.find('BASE_PATH') in production
        const BASE_PATH = basePathSetting && basePathSetting?.value ? basePathSetting.value : defaultBasePath;
        const projectPath = path_1.default.join(BASE_PATH, project.name);
        return projectPath;
    }
    function prepareEnv(project) {
        const envs = project.envs || {};
        // You can add more environment variables here if needed
        // envs['EXAMPLE_VAR'] = 'example_value';
        return envs;
    }
    async function cloneProject(project) {
        const PROJECT_PATH = preparePath(project);
        const ENVS = prepareEnv(project);
        const BRANCH = project.branch || 'main';
        let COMMAND = ['clone', project.url, PROJECT_PATH];
        let OPTIONS = { env: ENVS };
        const folderExists = (0, fs_1.existsSync)(PROJECT_PATH);
        const isGitRepo = (0, fs_1.existsSync)((0, path_1.join)(PROJECT_PATH, '.git'));
        if (folderExists && isGitRepo) {
            COMMAND = ['pull', 'origin', BRANCH];
            OPTIONS = { env: ENVS, cwd: PROJECT_PATH };
        }
        return new Promise((resolve, reject) => {
            const child = (0, child_process_1.spawn)('git', COMMAND, OPTIONS);
            child.stdout.on('data', (data) => console.log(`[clone stdout]: ${data}`));
            child.stderr.on('data', (data) => console.error(`[clone stderr]: ${data}`));
            child.on('close', (code) => {
                if (code === 0)
                    return resolve();
                return reject(new Error(`Clone failed with code: ${code}`));
            });
            child.on('error', (err) => reject(err));
        });
    }
    function clearDocker() {
        return new Promise((resolve, reject) => {
            // const COMMAND = 'docker container prune -f && docker image prune -a -f && docker volume prune -f && docker builder prune -a -f';
            const COMMAND = (`
                docker container prune -f &&
                docker image prune -a -f &&
                docker volume prune -f &&
                docker builder prune --all --force
            `);
            const isWindows = process.platform === 'win32';
            const shell = isWindows ? 'cmd.exe' : 'bash';
            const shellArgs = isWindows ? ['/c', COMMAND] : ['-c', COMMAND];
            const child = (0, child_process_1.spawn)(shell, shellArgs);
            child.stdout.on('data', (data) => console.log(`[docker stdout]: ${data}`));
            child.stderr.on('data', (data) => console.error(`[docker stderr]: ${data}`));
            child.on('close', (code) => {
                if (code === 0)
                    return resolve();
                return reject(new Error(`Docker prune failed with code: ${code}`));
            });
            child.on('error', (err) => reject(err));
        });
    }
    async function runProject(project) {
        const COMMAND = 'docker-compose up -d --build';
        const PROJECT_PATH = preparePath(project);
        const ENVS = prepareEnv(project);
        return new Promise((resolve, reject) => {
            const isWindows = process.platform === 'win32';
            const shell = isWindows ? 'cmd.exe' : 'bash';
            const shellArgs = isWindows ? ['/c', COMMAND] : ['-c', COMMAND];
            // const child = spawn('bash', ['-c', commands.join(' && ')], {
            const child = (0, child_process_1.spawn)(shell, shellArgs, {
                cwd: PROJECT_PATH,
                // env: { ...process.env, ...envs }
            });
            child.stdout.on('data', (data) => console.log(`[stdout ${project.name}]: ${data}`));
            child.stderr.on('data', (data) => console.error(`[stderr ${project.name}]: ${data}`));
            child.on('close', (code) => {
                if (code === 0)
                    return resolve();
                return reject(new Error(`Run failed with code: ${code}`));
            });
            child.on('error', (err) => reject(err));
        });
    }
    async function stopProject(project) {
        const COMMAND = 'docker-compose down';
        const PROJECT_PATH = preparePath(project);
        return new Promise((resolve, reject) => {
            const isWindows = process.platform === 'win32';
            const shell = isWindows ? 'cmd.exe' : 'bash';
            const shellArgs = isWindows ? ['/c', COMMAND] : ['-c', COMMAND];
            const child = (0, child_process_1.spawn)(shell, shellArgs, { cwd: PROJECT_PATH });
            child.stdout.on('data', (data) => console.log(`[stop stdout ${project.name}]: ${data}`));
            child.stderr.on('data', (data) => console.error(`[stop stderr ${project.name}]: ${data}`));
            child.on('close', (code) => {
                if (code === 0)
                    return resolve();
                return reject(new Error(`Stop failed with code: ${code}`));
            });
            child.on('error', (err) => reject(err));
        });
    }
    async function deleteProject(project) {
        const PROJECT_PATH = preparePath(project);
        await stopProject(project);
        if (!(0, fs_1.existsSync)(PROJECT_PATH))
            return;
        return new Promise((resolve, reject) => {
            // const child = spawn('docker', ['system', 'prune', '-a', '-f', '--volumes'], { shell: true })
            const child = (0, child_process_1.spawn)('docker-compose', ['down', '--volumes', '--rmi', 'all'], { cwd: PROJECT_PATH, shell: true });
            child.stdout.on('data', (data) => console.log(`[docker stdout]: ${data}`));
            child.stderr.on('data', (data) => console.error(`[docker stderr]: ${data}`));
            child.on('close', async (code) => {
                if (code !== 0)
                    reject(new Error(`Docker prune failed with code: ${code}`));
                await promises_1.default.rm(PROJECT_PATH, { recursive: true, force: true });
                return resolve();
            });
            child.on('error', (err) => reject(err));
        });
    }
    return {
        run: async (project) => {
            try {
                if (!project)
                    throw new Error('Project not found.');
                await projectModel_1.ProjectModel.upsert({ ...project, status: `cloning` });
                await cloneProject(project);
                await projectModel_1.ProjectModel.upsert({ ...project, status: `building` });
                await runProject(project);
                await projectModel_1.ProjectModel.upsert({ ...project, status: `running` });
                await clearDocker();
                return;
            }
            catch (error) {
                saveError(error, project);
                return;
            }
        },
        stop: async (project) => {
            try {
                if (!project)
                    throw new Error('Project not found.');
                await projectModel_1.ProjectModel.upsert({ ...project, status: `stopping` });
                await stopProject(project);
                await projectModel_1.ProjectModel.upsert({ ...project, status: `stopped` });
                return;
            }
            catch (error) {
                saveError(error, project);
                return;
            }
        },
        delete: async (project) => {
            try {
                if (!project)
                    throw new Error('Project not found.');
                await deleteProject(project);
                return;
            }
            catch (error) {
                saveError(error, project);
                return;
            }
        },
    };
}
const ProjectCommand = factory();
exports.default = ProjectCommand;


export interface ProjectType {

    id?: number,

    name: string,
    url: string,

    branch?: string,
    envs?: any,
    commands?: any,

    status?: string,

    updatedAt?: any,
    createdAt?: any,
}

export const EMPTY_PROJECT = {

    id: undefined,

    name: '',
    url: '',

    branch: '',
    envs: {},
    commands: {},

    status: '',

    updatedAt: undefined,
    createdAt: undefined,

}


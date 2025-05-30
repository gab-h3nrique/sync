
export interface FailType {

    id?: number,

    type: string,
    name?: string,
    message?: string,
    status?: string,

    updatedAt?: string,
    createdAt?: string,
}

export const EMPTY_FAIL = {

    id: undefined,

    type: '',
    
    name: '',
    message: '',
    erro: '',
    status: '',

    updatedAt: undefined,
    createdAt: undefined,

}
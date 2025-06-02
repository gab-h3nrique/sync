
export interface FailType {

    id?: number,

    type: string,

    name?: string,
    message?: string,
    data?: any,
    error?: any,
    status?: string,

    updatedAt?: string,
    createdAt?: string,
}

export const EMPTY_FAIL = {

    id: undefined,

    type: '',
    
    name: '',
    message: '',
    data: {},
    error: {},
    status: '',

    updatedAt: undefined,
    createdAt: undefined,

}

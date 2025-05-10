export interface UserType {

    id?: string,
    name: string,
    email: string,
    password: string,
    role: number,

    updatedAt?: string,
    createdAt?: string,
    
}

export const USER = {

    id: undefined,
    name: '',
    email: '',
    password: '',
    role: '',

    updatedAt: undefined,
    createdAt: undefined,

}

export interface SettingType {

    id?: number,

    name: string,
    value?: string,
    jsonValue?: any,

}

export const EMPTY_SETTING = {

    id: undefined,

    name: '',
    message: '',
    jsonvalue: {},

}
import prisma from "../database/prisma";
import { SettingType } from "../types/settingType";

function model() {

    const query = prisma.settings;

    return {

        query: query,

        find: async(input: any) => {

            const data = await query.findFirst({

                where: {
                    OR: [
                        { id: Number(input) }, 
                        { name:{ contains: String(input) } }, 
                        { value:{ contains: String(input) } }, 
                    ],
                },

            })

            return data

        },

        get: async(input?: string) => {

            const data = await query.findMany({

                where: {
                    OR: [
                        { name:{ contains: String(input) } }, 
                        { value:{ contains: String(input) } }, 
                    ],
                },
                orderBy: { id: 'desc'}

            }) || []

            return data

        },

        upsert: async(item: SettingType) => {

            const data = await query.upsert({
                where: {
                    id: item.id || -1
                },
                update: item,
                create: item,
            })

            return data
            
        },

        delete: async(id: number) => {

            const data = await query.delete({

                where: {
                    id: id
                },

            })

            return data

        },

        paginated: async(index: number, limit: number, input: any = null, startDate: any = '', endDate: any = '') => {

            const data = await query.findMany({

                where: {
                    OR: [
                        { name:{ contains: String(input) } }, 
                        { value:{ contains: String(input) } }, 
                    ],
                },
                skip: index,
                take: limit,
                orderBy: { id: 'desc'}

            }) || []

            const total = await query.count({
                where: {
                    OR: [
                        { name:{ contains: String(input) } }, 
                        { value:{ contains: String(input) } }, 
                    ],
                },
            }) || 0

            return { data, total }

        }

    }

}

export const SettingModel = model();
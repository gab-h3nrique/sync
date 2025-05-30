import prisma from "../database/prisma";
import { FailType } from "../types/failType";

function model() {

    const query = prisma.fails;

    return {

        query: query,

        find: async(input: any) => {

            const data = await query.findFirst({

                where: {
                    OR: [
                        { id: input }, 
                        { type:{ contains: String(input) } }, 
                        { name:{ contains: String(input) } }, 
                        { message:{ contains: String(input) } }, 
                    ],
                },

            })

            return data

        },

        get: async(input?: string) => {

            const data = await query.findMany({

                where: {
                    OR: [
                        { type:{ contains: input } }, 
                        { name:{ contains: input } }, 
                        { message:{ contains: input } }, 
                    ],
                },
                orderBy: { id: 'desc'}

            }) || []

            return data

        },

        upsert: async(item: FailType) => {

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
                        { type:{ contains: String(input) } }, 
                        { name:{ contains: input } }, 
                        { message:{ contains: input } }, 
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate)  : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
                skip: index,
                take: limit,
                orderBy: { id: 'desc'}

            }) || []

            const total = await query.count({
                where: {
                    OR: [
                        { type:{ contains: String(input) } }, 
                        { name:{ contains: input } }, 
                        { message:{ contains: input } }, 
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate)  : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
            }) || 0

            return { data, total }

        }

    }

}

export const FailModel = model();
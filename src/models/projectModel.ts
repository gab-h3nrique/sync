import { ProjectType } from "../types/projectType";
import prisma from "../utils/prismaClient";

function model() {

    const query = prisma.projects;

    return {

        query: query,

        find: async(input: number | string) => {

            const data = await query.findFirst({

                where: {
                    OR: [
                        { id: !isNaN(Number(input)) ? Number(input) : -1 }, 
                        { name:{ contains: String(input) } }, 
                        { url:{ contains: String(input) } }, 
                        { branch:{ contains: String(input) } }, 
                    ],
                },

            })

            return data as ProjectType

        },

        get: async(input?: string) => {

            const data = await query.findMany({

                where: {
                    OR: [
                        { name:{ contains: input } }, 
                        { url:{ contains: input } }, 
                        { status:{ contains: input } }, 
                        { branch:{ contains: input } }, 
                    ],
                },
                orderBy: { id: 'desc'}

            }) || []

            return data as ProjectType[]

        },

        upsert: async(item: ProjectType) => {

            if(!item) return null

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

            const found = await query.findFirst({ where: { id: id } })

            if(!found) return null

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
                        { name:{ contains: input } }, 
                        { url:{ contains: input } }, 
                        { status:{ contains: input } }, 
                        { branch:{ contains: input } }, 
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate)  : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
                skip: index,
                take: limit,
                orderBy: [
                    { updatedAt: 'desc' },
                    { id: 'desc'}
                ],

            }) || [] as ProjectType[]

            const total = await query.count({
                where: {
                    OR: [
                        { name:{ contains: input } }, 
                        { url:{ contains: input } },
                        { status:{ contains: input } }, 
                        { branch:{ contains: input } }, 
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

export const ProjectModel = model();
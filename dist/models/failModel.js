"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailModel = void 0;
const prisma_1 = __importDefault(require("../database/prisma"));
function model() {
    const query = prisma_1.default.fails;
    return {
        query: query,
        find: async (input) => {
            const data = await query.findFirst({
                where: {
                    OR: [
                        { id: input },
                        { type: { contains: String(input) } },
                        { name: { contains: String(input) } },
                        { message: { contains: String(input) } },
                    ],
                },
            });
            return data;
        },
        get: async (input) => {
            const data = await query.findMany({
                where: {
                    OR: [
                        { type: { contains: input } },
                        { name: { contains: input } },
                        { message: { contains: input } },
                    ],
                },
                orderBy: { id: 'desc' }
            }) || [];
            return data;
        },
        upsert: async (item) => {
            const data = await query.upsert({
                where: {
                    id: item.id || -1
                },
                update: item,
                create: item,
            });
            return data;
        },
        delete: async (id) => {
            const data = await query.delete({
                where: {
                    id: id
                },
            });
            return data;
        },
        paginated: async (index, limit, input = null, startDate = '', endDate = '') => {
            const data = await query.findMany({
                where: {
                    OR: [
                        { type: { contains: String(input) } },
                        { name: { contains: input } },
                        { message: { contains: input } },
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate) : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
                skip: index,
                take: limit,
                orderBy: { id: 'desc' }
            }) || [];
            const total = await query.count({
                where: {
                    OR: [
                        { type: { contains: String(input) } },
                        { name: { contains: input } },
                        { message: { contains: input } },
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate) : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
            }) || 0;
            return { data, total };
        }
    };
}
exports.FailModel = model();

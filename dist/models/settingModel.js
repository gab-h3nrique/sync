"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingModel = void 0;
const prisma_1 = __importDefault(require("../database/prisma"));
function model() {
    const query = prisma_1.default.settings;
    return {
        query: query,
        find: async (input) => {
            const data = await query.findFirst({
                where: {
                    OR: [
                        { id: Number(input) },
                        { name: { contains: String(input) } },
                        { value: { contains: String(input) } },
                    ],
                },
            });
            return data;
        },
        get: async (input) => {
            const data = await query.findMany({
                where: {
                    OR: [
                        { name: { contains: String(input) } },
                        { value: { contains: String(input) } },
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
                        { name: { contains: String(input) } },
                        { value: { contains: String(input) } },
                    ],
                },
                skip: index,
                take: limit,
                orderBy: { id: 'desc' }
            }) || [];
            const total = await query.count({
                where: {
                    OR: [
                        { name: { contains: String(input) } },
                        { value: { contains: String(input) } },
                    ],
                },
            }) || 0;
            return { data, total };
        }
    };
}
exports.SettingModel = model();

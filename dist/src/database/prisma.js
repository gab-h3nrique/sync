"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const prisma = global.prisma || new prisma_1.PrismaClient();
if (process.env.NODE_ENV === "development")
    global.prisma = prisma;
exports.default = prisma;

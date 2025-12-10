// import { PrismaClient } from '../generated/prisma'
// // import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV === "development") global.prisma = prisma;

// export default prisma;


// import { PrismaClient } from './generated/prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';

// const adapter = new PrismaPg({ 
//   connectionString: process.env.DATABASE_URL 
// });
// const prisma = new PrismaClient({ adapter });

import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export default prisma
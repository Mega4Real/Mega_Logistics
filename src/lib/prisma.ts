// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaNeonHTTP } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

const prismaGlobal = global as typeof global & {
    prisma?: PrismaClient;
};

if (!prismaGlobal.prisma) {
    let prisma: PrismaClient;

    if (connectionString) {
        const pool = new Pool({ connectionString });
        const adapter = new PrismaNeonHTTP(pool);
        prisma = new PrismaClient({ adapter });
    } else {
        prisma = new PrismaClient();
    }

    prismaGlobal.prisma = prisma;
}

export const prisma = prismaGlobal.prisma;

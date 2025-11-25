// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL ?? '';

if (!connectionString) {
    throw new Error(
        'DATABASE_URL is missing! Value was: ' + JSON.stringify(process.env.DATABASE_URL)
    );
}

declare global {
    var prisma: PrismaClient | undefined;
}

const pool = new Pool({ connectionString });
const prisma = global.prisma ?? new PrismaClient({ adapter: new PrismaNeon(pool) });

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

export default prisma;
export { prisma };
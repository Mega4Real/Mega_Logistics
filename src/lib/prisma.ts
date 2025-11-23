// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Required for Vercel/Next.js Edge runtime
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL;

let prismaInstance: PrismaClient;

if (globalForPrisma.prisma) {
    prismaInstance = globalForPrisma.prisma;
} else {
    if (connectionString) {
        const pool = new Pool({ connectionString });
        // Cast pool to any to avoid version mismatch type error
        const adapter = new PrismaNeon(pool as any);
        prismaInstance = new PrismaClient({ adapter });
    } else {
        prismaInstance = new PrismaClient();
    }
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

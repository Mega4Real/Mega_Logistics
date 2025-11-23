// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Required for Vercel/Next.js Edge runtime
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient(
        process.env.DATABASE_URL
            ? {
                adapter: new PrismaNeon(new Pool({ connectionString: process.env.DATABASE_URL })),
            }
            : {}
    );

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// src/lib/prisma.ts  ←  This version bypasses the bug once and for all
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

// This is the trick: read the env var directly from process.env at import time
// (some Next.js/Vercel edge cases lose process.env inside functions)
const connectionString = process.env.DATABASE_URL ?? '';

if (!connectionString) {
    throw new Error(
        'DATABASE_URL is missing! Check Vercel environment variables. Value was: ' +
        JSON.stringify(process.env.DATABASE_URL)
    );
}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({
    adapter: new PrismaNeon(new Pool({ connectionString })),
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
export { prisma };
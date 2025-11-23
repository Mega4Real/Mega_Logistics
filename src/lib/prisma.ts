// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Required for Vercel Edge runtime
neonConfig.webSocketConstructor = ws;

// Global singleton – works in dev and production
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

// Allow build to succeed without DATABASE_URL, but fail at runtime if missing
let prismaClient: PrismaClient;

if (!connectionString) {
    console.warn('DATABASE_URL is missing! Prisma will fail at runtime.');
    // Create a dummy client for build purposes
    prismaClient = new PrismaClient();
} else {
    prismaClient = new PrismaClient({
        adapter: new PrismaNeon(new Pool({ connectionString }) as any),
    });
}

export const prisma = global.prisma ?? prismaClient;

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

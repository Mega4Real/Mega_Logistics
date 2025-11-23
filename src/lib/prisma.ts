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
console.log("Prisma Init - DATABASE_URL defined:", !!connectionString);
console.log("Prisma Init - DATABASE_URL type:", typeof connectionString);
if (connectionString) console.log("Prisma Init - DATABASE_URL length:", connectionString.length);

let prismaInstance: PrismaClient;

if (globalForPrisma.prisma) {
    prismaInstance = globalForPrisma.prisma;
} else {
    if (connectionString) {
        try {
            console.log("Initializing Neon adapter...");
            const pool = new Pool({ connectionString });
            // Cast pool to any to avoid version mismatch type error
            const adapter = new PrismaNeon(pool as any);
            prismaInstance = new PrismaClient({ adapter });
            console.log("Neon adapter initialized successfully.");
        } catch (error) {
            console.error("Failed to initialize Neon adapter, falling back to default PrismaClient:", error);
            prismaInstance = new PrismaClient();
        }
    } else {
        console.warn("DATABASE_URL not found, using default PrismaClient.");
        prismaInstance = new PrismaClient();
    }
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

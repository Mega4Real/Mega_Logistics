// Prisma client with Neon adapter for Prisma 7
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL;

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter: connectionString ? new PrismaNeon(new Pool({ connectionString })) : undefined,
        log: process.env.NODE_ENV === "development" ? ["query"] : [],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

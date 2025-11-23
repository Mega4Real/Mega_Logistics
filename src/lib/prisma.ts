log: process.env.NODE_ENV === 'development' ? ['query'] : [],
        });
    } else {
    prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    });
}

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
}

export { prisma };

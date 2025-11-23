const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        const shipments = await prisma.shipment.findMany();
        console.log('Connection successful.');
        console.log('Shipments found:', shipments.length);
        console.log(JSON.stringify(shipments, null, 2));
    } catch (e) {
        console.error('Database error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

import 'dotenv/config';
import { prisma } from './src/lib/prisma';

async function main() {
    console.log('🔍 Testing database connection...');
    const url = process.env.DATABASE_URL;
    console.log('DATABASE_URL:', url ? 'Defined' : 'Missing');
    if (url) {
        console.log('First char:', url[0]);
        console.log('Last char:', url[url.length - 1]);
        console.log('Has quotes?', url.startsWith('"') || url.startsWith("'"));
    }

    try {
        console.log('Attempting to connect...');
        await prisma.$connect();
        console.log('✅ Connected successfully!');

        const count = await prisma.shipment.count();
        console.log('📊 Shipment count:', count);

        const shipments = await prisma.shipment.findMany({ take: 1 });
        if (shipments.length > 0) {
            console.log('📦 First shipment:', shipments[0].trackingCode);
        }
    } catch (e) {
        console.error('❌ Connection failed:');
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create sample shipments
    const shipment1 = await prisma.shipment.create({
        data: {
            trackingCode: 'TRK-123456789',
            sender: 'John Doe',
            recipient: 'Jane Smith',
            description: 'Electronics Package',
            weight: 5.5,
            from: 'New York, USA',
            to: 'Los Angeles, USA',
            status: 'In Transit',
            location: 'Chicago Distribution Center',
            estimatedDelivery: new Date('2025-11-30'),
        },
    });

    const shipment2 = await prisma.shipment.create({
        data: {
            trackingCode: 'TRK-987654321',
            sender: 'Alice Johnson',
            recipient: 'Bob Williams',
            description: 'Documents',
            weight: 0.5,
            from: 'San Francisco, USA',
            to: 'Seattle, USA',
            status: 'Out For Delivery',
            location: 'Seattle Hub',
            estimatedDelivery: new Date('2025-11-25'),
        },
    });

    const shipment3 = await prisma.shipment.create({
        data: {
            trackingCode: 'TRK-555444333',
            sender: 'Mike Brown',
            recipient: 'Sarah Davis',
            description: 'Clothing Package',
            weight: 2.3,
            from: 'Miami, USA',
            to: 'Boston, USA',
            status: 'Picked Up',
            location: 'Miami Sorting Facility',
            estimatedDelivery: new Date('2025-12-05'),
        },
    });

    const shipment4 = await prisma.shipment.create({
        data: {
            trackingCode: 'TRK-777888999',
            sender: 'Emily Wilson',
            recipient: 'David Martinez',
            description: 'Books',
            weight: 3.2,
            from: 'Austin, USA',
            to: 'Denver, USA',
            status: 'Delivered',
            location: 'Denver Delivery Center',
            estimatedDelivery: new Date('2025-11-20'),
        },
    });

    console.log('✅ Created shipments:');
    console.log('  -', shipment1.trackingCode, '(In Transit)');
    console.log('  -', shipment2.trackingCode, '(Out For Delivery)');
    console.log('  -', shipment3.trackingCode, '(Picked Up)');
    console.log('  -', shipment4.trackingCode, '(Delivered)');
    console.log('\n🎉 Database seeded successfully!');
}

main()
    .catch((error) => {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

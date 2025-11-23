import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    const shipments = await db.shipment.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(shipments);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { trackingCode, sender, recipient, description, weight, from, to, status, location, estimatedDelivery } = body;

    // Validate status
    const validStatuses = ["Picked Up", "In Transit", "Out For Delivery", "Delivered"];
    if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    // Validate weight
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
        return NextResponse.json({ error: 'Weight must be a positive number' }, { status: 400 });
    }

    try {
        const shipment = await db.shipment.create({
            data: {
                trackingCode,
                sender,
                recipient,
                description,
                weight: weightNum,
                from,
                to,
                status,
                location,
                estimatedDelivery: new Date(estimatedDelivery),
            },
        });
        return NextResponse.json(shipment);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating shipment' }, { status: 500 });
    }
}

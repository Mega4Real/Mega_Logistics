import { NextResponse } from 'next/server';
import { getShipments, createShipment } from '@/lib/db';

// API route for shipments
export async function GET() {
    const shipments = await getShipments();
    return NextResponse.json(shipments);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { trackingCode, sender, recipient, description, weight, from, to, status, location, estimatedDelivery } = body;

    // Validate status
    const validStatuses = ["Picked Up", "In Transit", "Out For Delivery", "Delivered", "On Hold"];
    if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    // Validate weight
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
        return NextResponse.json({ error: 'Weight must be a positive number' }, { status: 400 });
    }

    try {
        const shipment = await createShipment({
            trackingCode,
            sender,
            recipient,
            description,
            weight: weightNum,
            from,
            to,
            status,
            location,
            estimatedDelivery,
        });
        return NextResponse.json(shipment, { status: 201 });
    } catch (error: unknown) {
        console.error('Error creating shipment:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to create shipment';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}

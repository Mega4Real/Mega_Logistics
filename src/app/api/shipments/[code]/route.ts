import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const shipment = await db.shipment.findUnique({
        where: { trackingCode: code },
    });

    if (!shipment) {
        return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    return NextResponse.json(shipment);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;
    const body = await request.json();
    const { sender, recipient, description, weight, from, to, status, location, estimatedDelivery } = body;

    // Validate status
    const validStatuses = ["Picked Up", "In Transit", "Out For Delivery", "On Hold", "Delivered"];
    if (status && !validStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    // Validate weight if provided
    if (weight !== undefined) {
        const weightNum = parseFloat(weight);
        if (isNaN(weightNum) || weightNum <= 0) {
            return NextResponse.json({ error: 'Weight must be a positive number' }, { status: 400 });
        }
    }

    try {
        const updateData: any = {};
        if (sender) updateData.sender = sender;
        if (recipient) updateData.recipient = recipient;
        if (description) updateData.description = description;
        if (weight !== undefined) updateData.weight = parseFloat(weight);
        if (from) updateData.from = from;
        if (to) updateData.to = to;
        if (status) updateData.status = status;
        if (location) updateData.location = location;
        if (estimatedDelivery) updateData.estimatedDelivery = new Date(estimatedDelivery);

        console.log('PUT /api/shipments/[code] - Tracking code:', code);
        console.log('PUT /api/shipments/[code] - Update data:', updateData);

        const shipment = await db.shipment.update({
            where: { trackingCode: code },
            data: updateData,
        });

        console.log('PUT /api/shipments/[code] - Updated shipment:', shipment);
        return NextResponse.json(shipment);
    } catch (error) {
        console.error('PUT /api/shipments/[code] - Error:', error);
        return NextResponse.json({ error: 'Error updating shipment' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;

    try {
        const shipment = await db.shipment.delete({
            where: { trackingCode: code },
        });
        return NextResponse.json(shipment);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error deleting shipment' }, { status: 404 });
    }
}

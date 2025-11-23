import { NextResponse } from 'next/server';
import { getShipmentByCode, updateShipment, deleteShipment } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const shipment = await getShipmentByCode(code);

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
        if (sender !== undefined) updateData.sender = sender;
        if (recipient !== undefined) updateData.recipient = recipient;
        if (description !== undefined) updateData.description = description;
        if (weight !== undefined) updateData.weight = parseFloat(weight);
        if (from !== undefined) updateData.from = from;
        if (to !== undefined) updateData.to = to;
        if (status !== undefined) updateData.status = status;
        if (location !== undefined) updateData.location = location;
        if (estimatedDelivery !== undefined) updateData.estimatedDelivery = estimatedDelivery;

        const shipment = await updateShipment(code, updateData);

        if (!shipment) {
            return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
        }

        return NextResponse.json(shipment);
    } catch (error) {
        console.error('Error updating shipment:', error);
        return NextResponse.json({ error: 'Failed to update shipment' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;

    try {
        const success = await deleteShipment(code);

        if (!success) {
            return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Shipment deleted successfully' });
    } catch (error) {
        console.error('Error deleting shipment:', error);
        return NextResponse.json({ error: 'Failed to delete shipment' }, { status: 500 });
    }
}

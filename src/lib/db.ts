import { prisma } from "@/lib/prisma";

export type ShipmentStatus = "Picked Up" | "In Transit" | "Out For Delivery" | "Delivered" | "On Hold";

export interface Shipment {
    id: number;
    trackingCode: string;
    sender: string;
    recipient: string;
    description: string;
    weight: number;
    from: string;
    to: string;
    status: ShipmentStatus;
    location: string;
    if(!shipment) return null;
return {
    ...shipment,
    status: shipment.status as ShipmentStatus,
    estimatedDelivery: shipment.estimatedDelivery.toISOString(),
    createdAt: shipment.createdAt.toISOString(),
    updatedAt: shipment.updatedAt.toISOString(),
};
}

export async function createShipment(
    data: Omit<Shipment, "id" | "createdAt" | "updatedAt">
): Promise<Shipment> {
    const shipment = await prisma.shipment.create({
        data: {
            trackingCode: data.trackingCode,
            sender: data.sender,
            recipient: data.recipient,
            description: data.description,
            weight: data.weight,
            from: data.from,
            to: data.to,
            status: data.status,
            location: data.location,
            estimatedDelivery: new Date(data.estimatedDelivery),
        },
    });
    return {
        ...shipment,
        status: shipment.status as ShipmentStatus,
        estimatedDelivery: shipment.estimatedDelivery.toISOString(),
        createdAt: shipment.createdAt.toISOString(),
        updatedAt: shipment.updatedAt.toISOString(),
    };
}

export async function updateShipment(
    code: string,
    data: Partial<Omit<Shipment, "id" | "createdAt" | "updatedAt">>
): Promise<Shipment | null> {
    try {
        const updateData: any = { ...data };
        if (data.estimatedDelivery) {
            updateData.estimatedDelivery = new Date(data.estimatedDelivery);
        }

        const shipment = await prisma.shipment.update({
            where: { trackingCode: code },
            data: updateData,
        });

        return {
            ...shipment,
            status: shipment.status as ShipmentStatus,
            estimatedDelivery: shipment.estimatedDelivery.toISOString(),
            createdAt: shipment.createdAt.toISOString(),
            updatedAt: shipment.updatedAt.toISOString(),
        };
    } catch (error) {
        console.error("Error updating shipment:", error);
        return null;
    }
}

export async function deleteShipment(code: string): Promise<boolean> {
    try {
        await prisma.shipment.delete({
            where: { trackingCode: code },
        });
        return true;
    } catch (error) {
        console.error("Error deleting shipment:", error);
        return false;
    }
}

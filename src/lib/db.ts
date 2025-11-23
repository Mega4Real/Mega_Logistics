import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data.json');

export type ShipmentStatus = "Picked Up" | "In Transit" | "Out For Delivery" | "On Hold" | "Delivered";

export interface Shipment {
    id: number;
    trackingCode: string;
    sender: string;
    recipient: string;
    description: string;
    weight: number; // Weight in kg
    from: string; // Origin location
    to: string; // Destination location
    status: ShipmentStatus;
    location: string;
    estimatedDelivery: string; // Date stored as string
    createdAt: string;
    updatedAt: string;
}

function readDb(): Shipment[] {
    if (!fs.existsSync(DB_PATH)) {
        return [];
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeDb(data: Shipment[]) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export const db = {
    shipment: {
        findMany: async ({ orderBy }: { orderBy?: { createdAt: 'desc' } } = {}) => {
            const shipments = readDb();
            if (orderBy?.createdAt === 'desc') {
                return shipments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
            return shipments;
        },
        findUnique: async ({ where }: { where: { trackingCode: string } }) => {
            const shipments = readDb();
            return shipments.find((s) => s.trackingCode === where.trackingCode) || null;
        },
        create: async ({ data }: { data: Omit<Shipment, 'id' | 'createdAt' | 'updatedAt'> & { estimatedDelivery: Date } }) => {
            const shipments = readDb();
            const newShipment: Shipment = {
                ...data,
                id: shipments.length + 1,
                estimatedDelivery: data.estimatedDelivery.toISOString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            shipments.push(newShipment);
            writeDb(shipments);
            return newShipment;
        },
        update: async ({ where, data }: { where: { trackingCode: string }, data: Partial<Omit<Shipment, 'id' | 'createdAt' | 'updatedAt'>> & { estimatedDelivery?: Date } }) => {
            const shipments = readDb();
            const index = shipments.findIndex((s) => s.trackingCode === where.trackingCode);
            if (index === -1) {
                console.error('Shipment not found:', where.trackingCode);
                throw new Error('Shipment not found');
            }

            console.log('Updating shipment at index:', index);
            console.log('Current shipment:', shipments[index]);
            console.log('Update data:', data);

            const updatedShipment: Shipment = {
                ...shipments[index],
                ...data,
                estimatedDelivery: data.estimatedDelivery ? data.estimatedDelivery.toISOString() : shipments[index].estimatedDelivery,
                updatedAt: new Date().toISOString(),
            };

            console.log('Updated shipment:', updatedShipment);

            shipments[index] = updatedShipment;
            writeDb(shipments);
            return updatedShipment;
        },
        delete: async ({ where }: { where: { trackingCode: string } }) => {
            const shipments = readDb();
            const index = shipments.findIndex((s) => s.trackingCode === where.trackingCode);
            if (index === -1) {
                throw new Error('Shipment not found');
            }
            const deletedShipment = shipments[index];
            shipments.splice(index, 1);
            writeDb(shipments);
            return deletedShipment;
        },
    },
};

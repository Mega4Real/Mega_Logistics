"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, X } from "lucide-react"
import type { Shipment } from "@/lib/db"

interface ShipmentListProps {
    initialShipments: Shipment[]
}

export function ShipmentList({ initialShipments }: ShipmentListProps) {
    const [shipments, setShipments] = useState(initialShipments)
    const [editingShipment, setEditingShipment] = useState<Shipment | null>(null)
    const [formData, setFormData] = useState<Partial<Shipment>>({})

    const handleDelete = async (trackingCode: string) => {
        if (!confirm(`Are you sure you want to delete shipment ${trackingCode}?`)) {
            return
        }

        console.log('Attempting to delete:', trackingCode)

        try {
            const res = await fetch(`/api/shipments/${trackingCode}`, {
                method: "DELETE",
            })

            console.log('Delete response status:', res.status)
            const data = await res.json()
            console.log('Delete response data:', data)

            if (res.ok) {
                setShipments(shipments.filter(s => s.trackingCode !== trackingCode))
                alert('Shipment deleted successfully!')
            } else {
                alert(`Failed to delete shipment: ${data.error || 'Unknown error'}`)
            }
        } catch (error) {
            console.error('Delete error:', error)
            alert("Error deleting shipment")
        }
    }

    const handleEdit = (shipment: Shipment) => {
        console.log('Editing shipment:', shipment)
        setEditingShipment(shipment)
        setFormData({
            sender: shipment.sender,
            recipient: shipment.recipient,
            description: shipment.description,
            weight: shipment.weight,
            from: shipment.from,
            to: shipment.to,
            status: shipment.status,
            location: shipment.location,
            estimatedDelivery: shipment.estimatedDelivery.split('T')[0], // Format for date input
        })
    }

    const handleUpdate = async () => {
        if (!editingShipment) return

        console.log('Updating shipment:', editingShipment.trackingCode, formData)

        try {
            const res = await fetch(`/api/shipments/${editingShipment.trackingCode}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            console.log('Update response status:', res.status)
            const data = await res.json()
            console.log('Update response data:', data)

            if (res.ok) {
                setShipments(shipments.map(s =>
                    s.trackingCode === editingShipment.trackingCode ? data : s
                ))
                setEditingShipment(null)
                alert('Shipment updated successfully!')
            } else {
                alert(`Failed to update shipment: ${data.error || 'Unknown error'}`)
            }
        } catch (error) {
            console.error('Update error:', error)
            alert("Error updating shipment")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            {editingShipment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Edit Shipment: {editingShipment.trackingCode}</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setEditingShipment(null)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sender">Sender</Label>
                                    <Input
                                        id="sender"
                                        name="sender"
                                        value={formData.sender || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="recipient">Recipient</Label>
                                    <Input
                                        id="recipient"
                                        name="recipient"
                                        value={formData.recipient || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input
                                        id="weight"
                                        name="weight"
                                        type="number"
                                        step="0.1"
                                        value={formData.weight || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status || ''}
                                        onChange={handleChange}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="Picked Up">Picked Up</option>
                                        <option value="In Transit">In Transit</option>
                                        <option value="Out For Delivery">Out For Delivery</option>
                                        <option value="On Hold">On Hold</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="from">From</Label>
                                    <Input
                                        id="from"
                                        name="from"
                                        value={formData.from || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="to">To</Label>
                                    <Input
                                        id="to"
                                        name="to"
                                        value={formData.to || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Current Location</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        value={formData.location || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                                    <Input
                                        id="estimatedDelivery"
                                        name="estimatedDelivery"
                                        type="date"
                                        value={formData.estimatedDelivery || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" onClick={() => setEditingShipment(null)}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        console.log('Save Changes button clicked')
                                        handleUpdate()
                                    }}
                                    className="border-2 border-green-500 hover:border-green-600"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="space-y-4">
                {shipments.map((shipment) => (
                    <Card key={shipment.id}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{shipment.trackingCode}</CardTitle>
                                    <p className="text-sm text-muted-foreground">To: {shipment.recipient}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge>{shipment.status}</Badge>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            console.log('Edit button clicked for:', shipment.trackingCode)
                                            handleEdit(shipment)
                                        }}
                                        title="Edit shipment"
                                        className="gap-1"
                                    >
                                        <Pencil className="h-4 w-4" />
                                        <span className="hidden sm:inline">Edit</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            console.log('Delete button clicked for:', shipment.trackingCode)
                                            handleDelete(shipment.trackingCode)
                                        }}
                                        title="Delete shipment"
                                        className="gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="hidden sm:inline">Delete</span>
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">
                                <p><strong>From:</strong> {shipment.sender}</p>
                                <p><strong>Location:</strong> {shipment.location}</p>
                                <p><strong>ETA:</strong> {new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {shipments.length === 0 && (
                    <p className="text-muted-foreground">No shipments found.</p>
                )}
            </div>
        </>
    )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function AddShipmentForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        trackingCode: "",
        sender: "",
        recipient: "",
        description: "",
        weight: "",
        from: "",
        to: "",
        status: "Picked Up",
        location: "",
        estimatedDelivery: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/shipments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                setFormData({
                    trackingCode: "",
                    sender: "",
                    recipient: "",
                    description: "",
                    weight: "",
                    from: "",
                    to: "",
                    status: "Picked Up",
                    location: "",
                    estimatedDelivery: "",
                })
                router.refresh()
            } else {
                alert("Failed to create shipment")
            }
        } catch (error) {
            console.error(error)
            alert("Error creating shipment")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="trackingCode">Tracking Code</Label>
                        <Input
                            id="trackingCode"
                            name="trackingCode"
                            value={formData.trackingCode}
                            onChange={handleChange}
                            required
                            placeholder="e.g. TRK-123456789"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="sender">Sender</Label>
                            <Input
                                id="sender"
                                name="sender"
                                value={formData.sender}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="recipient">Recipient</Label>
                            <Input
                                id="recipient"
                                name="recipient"
                                value={formData.recipient}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="from">From (Origin)</Label>
                            <Input
                                id="from"
                                name="from"
                                value={formData.from}
                                onChange={handleChange}
                                required
                                placeholder="e.g. New York, USA"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="to">To (Destination)</Label>
                            <Input
                                id="to"
                                name="to"
                                value={formData.to}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Los Angeles, USA"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Electronics Package"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                            id="weight"
                            name="weight"
                            type="number"
                            step="0.1"
                            min="0.1"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 5.5"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            required
                        >
                            <option value="Picked Up">Picked Up</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Out For Delivery">Out For Delivery</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Current Location</Label>
                        <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                        <Input
                            id="estimatedDelivery"
                            name="estimatedDelivery"
                            type="date"
                            value={formData.estimatedDelivery}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating..." : "Create Shipment"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

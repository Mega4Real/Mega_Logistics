
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getShipmentByCode } from "@/lib/db"
import { ShipmentStatusTracker } from "@/components/shipment-status-tracker"

export default async function TrackingPage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params
    const shipment = await getShipmentByCode(code)

    if (!shipment) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-destructive">Shipment Not Found</CardTitle>
                        <CardDescription>We could not find a shipment with code {code}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/">Try Again</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 dark:bg-slate-900">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Shipment Details</CardTitle>
                        <Badge variant="outline" className="text-base">{shipment.status}</Badge>
                    </div>
                    <CardDescription>Tracking Code: {shipment.trackingCode}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Status Tracker */}
                    <ShipmentStatusTracker currentStatus={shipment.status} />

                    {/* Shipment Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Shipment Information</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Description</p>
                                <p className="text-base">{shipment.description}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Weight</p>
                                <p className="text-base">{shipment.weight} kg</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">From</p>
                                <p className="text-base">{shipment.from}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">To</p>
                                <p className="text-base">{shipment.to}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Sender</p>
                                <p className="text-base">{shipment.sender}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Recipient</p>
                                <p className="text-base">{shipment.recipient}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Current Location</p>
                                <p className="text-base">{shipment.location}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Estimated Delivery</p>
                                <p className="text-base">{new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/">Track Another</Link>
                    </Button>
                </div>
            </Card>
        </div>
    )
}

import { getShipments } from "@/lib/db"
import { AddShipmentForm } from "@/components/add-shipment-form"
import { ShipmentList } from "@/components/shipment-list"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LogOut } from "lucide-react"

export default async function DashboardPage() {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")

    if (!session) {
        redirect("/admin/login")
    }

    const shipments = await getShipments()

    return (
        <div className="container mx-auto p-4 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Add New Shipment</h2>
                    <AddShipmentForm />
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Recent Shipments</h2>
                    <ShipmentList initialShipments={shipments} />
                </div>
            </div>
        </div>
    )
}

import { Truck, Plane, Ship, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ServicesSection() {
    const services = [
        {
            title: "Ground Shipping",
            description: "Reliable nationwide trucking network for all your domestic shipping needs.",
            icon: Truck,
        },
        {
            title: "Air Freight",
            description: "Expedited international shipping for time-sensitive cargo.",
            icon: Plane,
        },
        {
            title: "Ocean Freight",
            description: "Cost-effective solutions for large volume international shipments.",
            icon: Ship,
        },
        {
            title: "Warehousing",
            description: "Secure storage and distribution services to streamline your supply chain.",
            icon: Package,
        },
    ]

    return (
        <section id="services" className="py-20 bg-white">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Comprehensive logistics solutions tailored to your business requirements.
                    </p>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => (
                        <Card key={service.title} className="transition-all hover:shadow-lg">
                            <CardHeader>
                                <service.icon className="h-10 w-10 text-primary mb-2" />
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

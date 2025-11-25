import { TrackingForm } from "@/components/tracking-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HeroSection() {
    return (
        <section className="relative flex min-h-[80vh] items-center justify-center bg-white py-20 text-black">
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            <div className="container relative z-10 grid gap-12 px-4 md:grid-cols-2 md:px-6">
                <div className="flex flex-col justify-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Global Logistics <br />
                        <span className="text-primary">Redefined</span>
                    </h1>
                    <p className="max-w-[600px] text-slate-700 md:text-xl">
                        Seamless shipping solutions for businesses of all sizes. Track your package in real-time and experience the future of logistics.
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <Card className="w-full max-w-md bg-slate-100 text-slate-900 backdrop-blur-md border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-2xl">Track Your Shipment</CardTitle>
                            <CardDescription className="text-slate-700">Enter your tracking ID to get started.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-slate-900">
                                <TrackingForm />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

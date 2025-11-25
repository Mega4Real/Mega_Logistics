

export function AboutSection() {
    return (
        <section id="about" className="pt-10 py-20 pb-10 bg-white text-black">
            <div className="container px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Mega Logistics</h2>
                        <p className="text-muted-foreground md:text-xl/relaxed">
                            Founded in 2010, Mega Logistics has grown from a small local courier to a global logistics powerhouse.
                            Our mission is to simplify the supply chain for businesses worldwide through technology and innovation.
                        </p>
                        <p className="text-muted-foreground md:text-xl/relaxed">
                            We believe in transparency, reliability, and speed. With our state-of-the-art tracking systems and
                            dedicated team of experts, we ensure your cargo reaches its destination safely and on time.
                        </p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl shadow-xl">
                        {/* Placeholder for About Image - using a colored div for now if image fails, but trying unsplash */}
                        <div
                            className="absolute inset-0 bg-slate-200"
                            style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

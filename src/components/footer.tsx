import Link from "next/link"
import { Truck } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-slate-50 text-black">
            <div className="container py-12 md:py-16 pl-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Truck className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold">MEGA LOGISTICS</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Global logistics solutions for a connected world. Fast, reliable, and secure shipping.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Services</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#services" className="hover:text-primary">Air Freight</Link></li>
                            <li><Link href="#services" className="hover:text-primary">Ocean Freight</Link></li>
                            <li><Link href="#services" className="hover:text-primary">Ground Shipping</Link></li>
                            <li><Link href="#services" className="hover:text-primary">Warehousing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="#contact" className="hover:text-primary">Careers</Link></li>
                            <li><Link href="#about" className="hover:text-primary">News</Link></li>
                            <li><Link href="#contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="hover:text-primary">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Mega Logistics. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

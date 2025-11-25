"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false)

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Track", href: "/#track" },
        { name: "Services", href: "/#services" },
        { name: "About", href: "/#about" },
        { name: "Contact", href: "/#contact" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between pl-8">
                <Link href="/" className="flex items-center space-x-2">
                    <Truck className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold tracking-tight">MEGA LOGISTICS</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="transition-colors hover:text-primary text-foreground/60"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button asChild variant="default" size="sm">
                        <Link href="/admin/login">Admin Login</Link>
                    </Button>
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64">
                            <nav className="flex flex-col items-start space-y-4 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-lg font-medium transition-colors hover:text-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Button asChild className="mt-4">
                                    <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                                        Admin Login
                                    </Link>
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

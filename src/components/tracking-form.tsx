"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TrackingForm() {
    const [code, setCode] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (code.trim()) {
            router.push(`/tracking/${code.trim()}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="code">Tracking Code</Label>
                <Input
                    id="code"
                    placeholder="e.g. TRK-123456789"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Track</Button>
            </div>
        </form>
    )
}

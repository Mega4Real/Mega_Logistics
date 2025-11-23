"use client";

import { Package, Truck, MapPin, CheckCircle2 } from "lucide-react";
import type { ShipmentStatus } from "@/lib/db";

interface ShipmentStatusTrackerProps {
    currentStatus: ShipmentStatus;
}

// On Hold is a valid status but not displayed in the tracker UI
const statuses: { label: ShipmentStatus; icon: React.ElementType }[] = [
    { label: "Picked Up", icon: Package },
    { label: "In Transit", icon: Truck },
    { label: "Out For Delivery", icon: MapPin },
    { label: "Delivered", icon: CheckCircle2 },
];

export function ShipmentStatusTracker({ currentStatus }: ShipmentStatusTrackerProps) {
    const currentIndex = statuses.findIndex((s) => s.label === currentStatus);
    const isOnHold = currentStatus === "On Hold";

    // For "On Hold", show 75% progress with red color
    const progressPercentage = isOnHold ? 100 : (currentIndex / (statuses.length - 1)) * 100;
    const progressColor = isOnHold ? "bg-red-500" : "bg-green-500";

    return (
        <div className="w-full py-8">
            <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-0 top-6 h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full">
                    <div
                        className={`h-full ${progressColor} transition-all duration-500 rounded-full`}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                {/* Status Steps */}
                <div className="relative flex justify-between">
                    {statuses.map((status, index) => {
                        const Icon = status.icon;
                        const isCompleted = index <= currentIndex;
                        const isCurrent = index === currentIndex;

                        return (
                            <div key={status.label} className="flex flex-col items-center">
                                {/* Icon Circle */}
                                <div
                                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 transition-all duration-300 ${isCompleted
                                        ? "border-green-500 bg-green-500 text-white"
                                        : "border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-800"
                                        } ${isCurrent ? "scale-110 shadow-lg" : ""}`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                                {/* Label */}
                                <div className="mt-3 text-center">
                                    <p
                                        className={`text-sm font-medium ${isCompleted ? "text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"
                                            } ${isCurrent ? "font-bold" : ""}`}
                                    >
                                        {status.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

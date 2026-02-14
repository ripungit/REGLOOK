import React from "react";

export default function PerformanceMetricsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen">
            {children}
        </div>
    );
}

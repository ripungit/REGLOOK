import React from "react";

export default function SdksAndDocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen bg-[#0f0f10]">
            {children}
        </div>
    );
}

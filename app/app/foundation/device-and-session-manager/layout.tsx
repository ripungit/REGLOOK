
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Device & Session Manager | Reglook",
    description: "Manage your active sessions and connected devices.",
};

export default function DeviceSessionManagerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

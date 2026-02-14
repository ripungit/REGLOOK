
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Security Center | Reglook",
    description: "Manage your security settings and firewall rules.",
};

export default function SecurityCenterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

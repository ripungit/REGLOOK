
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "2FA & Access Control | Reglook",
    description: "Manage two-factor authentication and access control settings.",
};

export default function TwoFAAccessControlLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

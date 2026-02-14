
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Audit Logs | Reglook",
    description: "View and filter detailed audit logs for your accounts.",
};

export default function AuditLogsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

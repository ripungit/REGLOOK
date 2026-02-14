
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Invoices & Tax | Foundation",
    description: "Access your billing invoices, receipts, and tax documents.",
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

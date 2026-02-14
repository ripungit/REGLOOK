
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Orders & Transactions | Foundation",
    description: "Manage your orders, transactions, and billing history.",
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}


import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Subscriptions | Foundation",
    description: "Manage your active subscriptions, billing cycles, and renewals.",
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

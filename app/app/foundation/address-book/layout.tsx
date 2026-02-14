
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Address Book | Foundation",
    description: "Manage your saved billing and shipping addresses.",
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

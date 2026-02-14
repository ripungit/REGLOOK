
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Profile & Preferences | Foundation",
    description: "Manage your Reglook account settings, profile information, and preferences.",
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

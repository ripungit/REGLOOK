
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Domain Performance | Foundation",
    description: "Analyze traffic, bounce rates, and visitor metrics for your domains.",
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}

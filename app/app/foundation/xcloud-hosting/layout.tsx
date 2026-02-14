import { Metadata } from "next"

export const metadata: Metadata = {
    title: "xCloud Hosting",
    description: "Deploy and host your modern web applications.",
}

export default function XCloudHostingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}

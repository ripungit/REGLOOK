import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AirNode | Real-time Cloud Hosting",
    description: "Experience ultra-fast, serverless-driven hosting with AirNode.",
};

export default function AirnodeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full">
            {children}
        </div>
    );
}

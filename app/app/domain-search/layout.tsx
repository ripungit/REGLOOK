import { Navbar } from "@/components/main/navbar";
import { Footer } from "@/components/global/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Domain Search | Reglook",
    description: "Search and register your perfect domain name with Reglook.",
    keywords: ["domain search", "domain registration", "buy domain", "website name", "reglook"],
};

export default function DomainSearchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#111] text-white">
            <Navbar backgroundColor="domain-search" />
            <div className="pt-28 md:pt-35 pb-20">
                {children}
            </div>
            <Footer />
        </div>
    );
}

import { Navbar } from "@/components/main/navbar";
import { Footer } from "@/components/global/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart | Reglook",
    description: "Review and complete your domain registration purchase.",
};

export default function CartLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#000] text-white">
            <Navbar />
            <div className="pt-28 md:pt-10 pb-20">
                {children}
            </div>
            <Footer />
        </div>
    );
}

import { FoundationNavbarWrapper } from "@/app/foundation/foundation-navbar-wrapper";
import { FoundationBackgroundWrapper } from "@/app/foundation/foundation-bg-wrapper";
import { Footer } from "@/components/global/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Foundation | Reglook",
    description: "Manage and discover seamlessly with Reglook Foundation.",
};

export default function FoundationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <FoundationBackgroundWrapper>
            <FoundationNavbarWrapper />
            <div className="pt-[80px] pb-20">
                {children}
            </div>
            <Footer />
        </FoundationBackgroundWrapper>
    );
}

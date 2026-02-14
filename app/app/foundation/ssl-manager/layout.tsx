import { FoundationNavbarWrapper } from "../foundation-navbar-wrapper";
import { FoundationBackgroundWrapper } from "../foundation-bg-wrapper";

export default function SSLManagerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <FoundationBackgroundWrapper>
            <FoundationNavbarWrapper />
            <div className="min-h-screen">
                {children}
            </div>
        </FoundationBackgroundWrapper>
    );
}

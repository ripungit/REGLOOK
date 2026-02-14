"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function FoundationBackgroundWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isDarkThemePage = pathname?.includes("/domain-manager") || pathname?.includes("/dns-manager") || pathname?.includes("/mail") || pathname?.includes("/transfers-and-renewals") || pathname?.includes("/domain-portfolio") || pathname?.includes("/whois-and-privacy") || pathname?.includes("/seller-console") || pathname?.includes("/listings-manager") || pathname?.includes("/hosting-manager") || pathname?.includes("/xcloud-hosting") || pathname?.includes("/airnode") || pathname?.includes("/virtual-machine-balancer") || pathname?.includes("/ssl-manager") || pathname?.includes("/performance-metrics") || pathname?.includes("/security-center") || pathname?.includes("/device-and-session-manager") || pathname?.includes("/2FA-and-access-control") || pathname?.includes("/audit-logs") || pathname?.includes("/payment-methods") || pathname?.includes("/orders-and-transactions") || pathname?.includes("/subscriptions") || pathname?.includes("/invoices-and-tax") || pathname?.includes("/domain-performance") || pathname?.includes("/profile-and-preferences") || pathname?.includes("/address-book") || pathname?.includes("/developers/sdks-and-docs") || pathname?.includes("/developers/webhooks");

    return (
        <div className={cn(
            "min-h-screen text-white transition-colors duration-300",
            isDarkThemePage ? "bg-[#0f0f10]" : "bg-[#432dd7]"
        )}>
            {children}
        </div>
    );
}

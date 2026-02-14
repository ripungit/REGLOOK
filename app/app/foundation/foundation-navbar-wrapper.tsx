"use client";

import { Navbar } from "@/components/main/navbar";
import { usePathname } from "next/navigation";

export function FoundationNavbarWrapper() {
    const pathname = usePathname();
    const isDomainManager = pathname?.includes("/domain-manager");
    const isDnsManager = pathname?.includes("/dns-manager");
    const isTransfersAndRenewals = pathname?.includes("/transfers-and-renewals");
    const isDomainPortfolio = pathname?.includes("/domain-portfolio");
    const isWhoisAndPrivacy = pathname?.includes("/whois-and-privacy");
    const isSellerConsole = pathname?.includes("/seller-console");
    const isListingsManager = pathname?.includes("/listings-manager");
    const isHostingManager = pathname?.includes("/hosting-manager");
    const isXcloudHosting = pathname?.includes("/xcloud-hosting");
    const isVirtualMachineBalancer = pathname?.includes("/virtual-machine-balancer");
    const isSSLManager = pathname?.includes("/ssl-manager");
    const isPerformanceMetrics = pathname?.includes("/performance-metrics");
    const isSecurityCenter = pathname?.includes("/security-center");
    const isDeviceAndSessionManager = pathname?.includes("/device-and-session-manager");
    const isTwoFAAccessControl = pathname?.includes("/2FA-and-access-control");
    const isAuditLogs = pathname?.includes("/audit-logs");
    const isPaymentMethods = pathname?.includes("/payment-methods");
    const isOrdersAndTransactions = pathname?.includes("/orders-and-transactions");
    const isSubscriptions = pathname?.includes("/subscriptions");
    const isInvoicesAndTax = pathname?.includes("/invoices-and-tax");
    const isDomainPerformance = pathname?.includes("/domain-performance");
    const isProfileAndPreferences = pathname?.includes("/profile-and-preferences");
    const isAddressBook = pathname?.includes("/address-book");
    const isSdksAndDocs = pathname?.includes("/developers/sdks-and-docs");
    const isWebhooks = pathname?.includes("/developers/webhooks");
    const isMail = pathname?.includes("/foundation/mail");
    const isAirnode = pathname?.includes("/airnode");

    let bgColor = "indigo";
    if (isDomainManager) bgColor = "teal";
    if (isDnsManager) bgColor = "red";
    if (isMail) bgColor = "mail";
    if (isTransfersAndRenewals) bgColor = "green";
    if (isDomainPortfolio) bgColor = "portfolio";
    if (isWhoisAndPrivacy) bgColor = "whois";
    if (isSellerConsole) bgColor = "seller";
    if (isListingsManager) bgColor = "listings";
    if (isHostingManager) bgColor = "hosting";
    if (isXcloudHosting) bgColor = "xcloud";
    if (isAirnode) bgColor = "airnode";
    if (isVirtualMachineBalancer) bgColor = "virtual-machine";
    if (isSSLManager) bgColor = "ssl-manager";
    if (isPerformanceMetrics) bgColor = "performance-metrics";
    if (isSecurityCenter) bgColor = "security-center";
    if (isDeviceAndSessionManager) bgColor = "device-and-session-manager";
    if (isTwoFAAccessControl) bgColor = "2FA-and-access-control";
    if (isAuditLogs) bgColor = "audit-logs";
    if (isPaymentMethods) bgColor = "payment-methods";
    if (isOrdersAndTransactions) bgColor = "orders-and-transactions";
    if (isSubscriptions) bgColor = "subscriptions";
    if (isInvoicesAndTax) bgColor = "invoices-and-tax";
    if (isDomainPerformance) bgColor = "domain-performance";
    if (isProfileAndPreferences) bgColor = "profile-and-preferences";
    if (isAddressBook) bgColor = "address-book";
    if (isSdksAndDocs) bgColor = "sdks-and-docs";
    if (isWebhooks) bgColor = "webhooks";

    return (
        <Navbar
            hideAnnouncement={true}
            backgroundColor={bgColor}
        />
    );
}

"use client";

import { Navbar } from "@/components/main/navbar";
import { XCloudHero } from "@/components/xcloud-hosting/hero";
import { XCloudPricing } from "@/components/xcloud-hosting/pricing";
import { FAQSection } from "@/components/main/faq-section";
import { Footer } from "@/components/global/footer";
import { SecondarySearch } from "@/components/main/secondary-search";
import { XCloudFeatures } from "@/components/xcloud-hosting/xcloud-features";
import { ComparePlans } from "@/components/xcloud-hosting/compare-plans";
import { BentoFeatures } from "@/components/xcloud-hosting/bento-features";

export default function XCloudHostingPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col">
            <Navbar hideAnnouncement={false} />
            <XCloudHero />
            <XCloudFeatures />
            <XCloudPricing />
            <ComparePlans />
            <BentoFeatures />
            <div className="py-10">
                <FAQSection />
            </div>
            <SecondarySearch />
            <Footer />
        </main>
    );
}

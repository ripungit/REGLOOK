"use client";

import { Navbar } from "@/components/main/navbar";
import { EmailHero } from "@/components/business-email/hero";
import { EmailPricing } from "@/components/business-email/pricing";
import { FAQSection } from "@/components/main/faq-section";
import { Footer } from "@/components/global/footer";
import { SecondarySearch } from "@/components/main/secondary-search";
import { EmailFeatures } from "@/components/business-email/email-features";
import { EmailComparePlans } from "@/components/business-email/compare-plans";
import { EmailBentoFeatures } from "@/components/business-email/bento-features";

export default function BusinessEmailPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col">
            <Navbar hideAnnouncement={false} />
            <EmailHero />
            <EmailFeatures />
            <EmailPricing />
            <EmailComparePlans />
            <EmailBentoFeatures />
            <div className="py-10">
                <FAQSection />
            </div>
            <SecondarySearch />
            <Footer />
        </main>
    );
}

import { Navbar } from "@/components/main/navbar";
import { HostingHero } from "@/components/hosting/hero";
import { HostingPlans } from "@/components/hosting/plans";
import { BentoFeatures } from "@/components/hosting/bento-features";
import { XCloudFeatures } from "@/components/hosting/xcloud-features";
import { ComparePlans } from "@/components/hosting/compare-plans";
import { FeatureCards } from "@/components/main/feature-cards";
import { FAQSection } from "@/components/main/faq-section";
import { Footer } from "@/components/global/footer";
import { SecondarySearch } from "@/components/main/secondary-search";

export default function HostingPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col">
            <Navbar hideAnnouncement={false} />

            <HostingHero />

            <HostingPlans />

            <BentoFeatures />

            <XCloudFeatures />

            <ComparePlans />




            {/* Additional Features / Grid could go here if needed */}

            <div className="py-10">
                <FAQSection />
            </div>

            <SecondarySearch />

            <Footer />
        </main>
    );
}

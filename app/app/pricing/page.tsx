"use client";

import { Navbar } from "@/components/main/navbar";
import { PricingHero } from "@/components/pricing/hero";
import { PricingDisplay } from "@/components/pricing/pricing-display";
import { Footer } from "@/components/global/footer";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col">
            {/* 1. Navbar */}
            <Navbar hideAnnouncement={false} />

            {/* 2. Hero Section */}
            <PricingHero />

            {/* 3. Pricing Display */}
            <PricingDisplay />

            {/* 5. Footer */}
            <Footer />
        </main>
    );
}

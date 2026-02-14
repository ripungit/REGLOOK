"use client";

import { Navbar } from "@/components/main/navbar";
import { DomainsHero } from "@/components/domains/hero";
import { FAQSection } from "@/components/main/faq-section";
import { Footer } from "@/components/global/footer";
import { SecondarySearch } from "@/components/main/secondary-search";

export default function DomainsPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col">
            {/* 1. Navbar */}
            <Navbar hideAnnouncement={false} />

            {/* 2. Hero Section */}
            <DomainsHero />

            {/* 5. Footer */}
            <Footer />
        </main>
    );
}

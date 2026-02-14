"use client"

import React from "react"
import { Navbar } from "@/components/main/navbar"
import { Footer } from "@/components/global/footer"
import { ContactHero } from "@/components/contact/contact-hero"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#16161e] text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans relative">

            <Navbar hideAnnouncement={true} backgroundColor="transparent" />

            {/* Main Content */}
            <main>
                <ContactHero />
            </main>

            <Footer />
        </div>
    )
}

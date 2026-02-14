"use client"

import React from "react"
import { Navbar } from "@/components/main/navbar"
import { Footer } from "@/components/global/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutStats } from "@/components/about/about-stats"
import { AboutStory } from "@/components/about/about-story"
import { AboutValues } from "@/components/about/about-values"
import { AboutTeam } from "@/components/about/about-team"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#000] text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans relative">

            <Navbar hideAnnouncement={true} backgroundColor="transparent" />

            <AboutHero />
            <AboutStats />
            <AboutStory />
            <AboutValues />
            <AboutTeam />

            <Footer />
        </div >
    )
}

"use client"

import React from "react"
import { Navbar } from "@/components/main/navbar"
import { Footer } from "@/components/global/footer"
import { StatusPageContent } from "@/components/status/status-page-content"

export default function StatusPage() {
    return (
        <div className="min-h-screen bg-[#000] text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans relative">
            <Navbar hideAnnouncement={true} backgroundColor="transparent" />

            <main>
                <StatusPageContent />
            </main>

            <Footer />
        </div>
    )
}

"use client"

import React from "react"
import { Navbar } from "@/components/main/navbar"
import { Footer } from "@/components/global/footer"
import { motion } from "framer-motion"
import { PressList } from "@/components/press/press-list"
import { MediaKit } from "@/components/press/media-kit"
import { PressContact } from "@/components/press/press-contact"

export default function PressPage() {
    return (
        <div className="min-h-screen bg-[#000] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans relative">

            <Navbar hideAnnouncement={true} backgroundColor="transparent" />

            <main className="relative z-10 w-full pt-48 pb-20 flex flex-col items-center">
                {/* Background Glows */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
                </div>

                <div className="relative z-20 w-full max-w-[1200px] px-6 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                    >
                        Latest updates from <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Reglook HQ.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
                    >
                        Announcements, product launches, and company news. Stay up to date with our mission to fix the internet's infrastructure.
                    </motion.p>

                </div>
            </main>

            <PressList />
            <MediaKit />
            <PressContact />

            <Footer />
        </div >
    )
}

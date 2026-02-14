"use client"

import React from "react"
import { Navbar } from "@/components/main/navbar"
import { Footer } from "@/components/global/footer"
import { motion } from "framer-motion"
import { TermsContent } from "@/components/legal/terms-content"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#000] text-white selection:bg-white/20 overflow-x-hidden font-sans relative">

            <Navbar hideAnnouncement={true} backgroundColor="transparent" />

            <main className="relative z-10 w-full pt-48 pb-10 flex flex-col items-center border-b border-white/5 bg-black">
                {/* Background Glows */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-1/2 translate-x-1/2 w-[1000px] h-[500px] bg-white/5 blur-[120px] rounded-full mix-blend-screen opacity-30" />
                </div>

                <div className="relative z-20 w-full max-w-[1100px] px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
                        <p className="text-lg text-white/50 max-w-2xl">
                            Effective date: January 12, 2026. Please read these terms carefully before using our services.
                        </p>
                        <div className="mt-6 pt-6 border-t border-white/5 text-sm text-white/60 max-w-xl">
                            <p className="mb-1"><span className="text-white font-semibold">Reglook</span>, a brand of <span className="text-white font-semibold">Intellaris Private Limited.</span></p>
                            <p className="uppercase text-[11px] tracking-wider opacity-70">INTL HQ, Wing 1, Block 1, Salbari, Baksa District, Assam 781320, India</p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <TermsContent />

            <Footer />
        </div >
    )
}

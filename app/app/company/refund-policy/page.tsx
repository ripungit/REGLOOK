"use client"

import React from "react"
import { Navbar } from "@/components/main/navbar"
import { Footer } from "@/components/global/footer"
import { motion } from "framer-motion"
import { RefundContent } from "@/components/legal/refund-content"

export default function RefundPolicyPage() {
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Refund Policy</h1>
                        <p className="text-lg text-white/50 max-w-2xl">
                            Effective date: January 12, 2026. Understand our refund terms and money-back guarantee.
                        </p>
                    </motion.div>
                </div>
            </main>

            <RefundContent />

            <Footer />
        </div >
    )
}

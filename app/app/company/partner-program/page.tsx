"use client"

import React from "react"
import { Navbar } from "@/components/main/navbar"
import { Footer } from "@/components/global/footer"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { PartnerBenefits } from "@/components/partner/partner-benefits"
import { PartnerSteps } from "@/components/partner/partner-steps"
import { PartnerFAQ } from "@/components/partner/partner-faq"
import { PartnerCTA } from "@/components/partner/partner-cta"

export default function PartnerProgramPage() {
    return (
        <div className="min-h-screen bg-[#000] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans relative">

            <Navbar hideAnnouncement={true} backgroundColor="transparent" />


            <main className="relative z-10 w-full h-[100vh] flex flex-col justify-center items-center">
                {/* Background Glows */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Central cyan Void */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/50 blur-[120px] rounded-full mix-blend-screen" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black blur-[100px] rounded-full" />
                </div>
                <div className="relative z-20 w-full max-w-[1200px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full pt-20">

                    {/* Left Column: Hero Text */}
                    <div className="md:col-span-9 flex flex-col justify-center space-y-12">

                        {/* Top Pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex w-fit items-center p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
                        >
                            <span className="px-4 py-1.5 rounded-full bg-white/5 cursor-pointer text-xs font-semibold text-white">Read documentation</span>
                            <span className="px-4 py-1.5 text-xs font-medium text-white/70 flex items-center gap-1 group cursor-pointer hover:text-white transition-colors">
                                Learn how it works
                                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
                            >
                                Hosting Infrastructure, Rebranded for You
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-lg text-white/80 max-w-2xl leading-relaxed"
                            >
                                The <span className="font-bold text-white">Reglook Partner Program</span> lets qualified businesses integrate our domain & hosting platform via APIs and deliver a fully white-labeled experience. Focus on growth and customers. Reglook takes care of the backend.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex items-center gap-6 mt-8"
                            >
                                <button className="px-8 py-3 cursor-pointer rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors flex items-center gap-2 group whitespace-nowrap">
                                    Apply for Partnership
                                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                                {/* <p className="text-xs text-white/40 max-w-[200px] leading-relaxed">
                                    We require a one-time $50 deposit to activate partner access. This is not a recurring charge.
                                </p> */}
                            </motion.div>
                        </div>

                        {/* Bottom Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex items-center gap-8 pt-10"
                        >
                            <div>
                                <h3 className="text-white text-lg font-bold">45+</h3>
                                <p className="text-lg font-medium text-white/60">Reglook APIs</p>
                            </div>

                            <div className="w-px h-10 bg-white/20" />

                            <div className="flex flex-col">
                                <h3 className="text-white text-lg font-bold">$50</h3>
                                <p className="text-lg font-medium text-white/60">One-time deposit</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Stripes Visual */}
                    <div className="md:col-span-3 h-full flex items-center justify-end pr-8 select-none pointer-events-none">
                        <div className="flex gap-12 h-full items-center opacity-30">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex gap-3 h-full items-center">
                                    <div className="w-px h-full bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                                    <div className="w-px h-full bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </main>

            <PartnerBenefits />
            <PartnerSteps />
            <PartnerFAQ />
            <PartnerCTA />

            <Footer />
        </div >
    )
}

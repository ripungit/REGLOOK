"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function ContactHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-20 bg-[#111]">
            <div className="container mx-auto px-6 max-w-[1100px] relative z-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-left"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                            Contact us
                        </h1>
                        <p className="text-lg md:text-xl text-white/70 max-w-md leading-relaxed">
                            If you have any questions or need some help, please email us at <a href="mailto:support@reglook.com" className="text-white hover:text-indigo-300 font-semibold transition-colors">support@reglook.com</a> or start a chat.
                        </p>
                    </motion.div>

                    {/* Right Graphic - Abstract Planet/Orb */}
                    <div className="relative h-[500px] w-full flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative w-[400px] h-[400px]"
                        >
                            {/* Main Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/30 blur-[100px] rounded-full" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-red-500/40 blur-[80px] rounded-full mix-blend-screen" />

                            {/* Core Brightness */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-gradient-to-br from-white via-red-100 to-indigo-200 rounded-full shadow-[0_0_100px_rgba(255,255,255,0.4)] blur-sm" />


                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

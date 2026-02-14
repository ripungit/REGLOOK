"use client"

import { motion } from "framer-motion"
import { Search, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export function SecondarySearch() {
    return (
        <section className="bg-black py-24 relative overflow-hidden">

            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-900/40 pointer-events-none" />

            {/* Magic Particles */}
            <Particles />

            <div className="mx-auto max-w-[1200px] px-6 lg:px-8 relative z-10 text-center">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                >
                    Claim your name today.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl text-white/50 mb-12 max-w-2xl mx-auto"
                >
                    The perfect domain for your next big idea is waiting.
                    Search now and secure your digital identity.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative max-w-2xl mx-auto group w-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative bg-[#0a0a0a] border border-white/10 rounded-full p-1.5 md:p-2 pl-4 md:pl-6 flex items-center shadow-2xl">
                        <Search className="w-4 h-4 md:w-5 md:h-5 text-white/30 mr-2 md:mr-4 shrink-0" />
                        <input
                            type="text"
                            placeholder="Type your domain name..."
                            className="bg-transparent border-none outline-none text-white text-base md:text-lg w-full placeholder:text-white/0 md:placeholder:text-white/50 font-medium min-w-0"
                        />
                        <button className="bg-white text-black px-4 md:px-6 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base hover:bg-gray-100 transition-colors flex items-center gap-2 shrink-0">
                            Search <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>

                {/* TLDs marquee or list could go here, but keeping it clean for now */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 flex flex-wrap justify-center gap-4 text-white/30 text-sm font-medium"
                >
                    <span>Popular:</span>
                    <span className="text-white/50 hover:text-white transition-colors cursor-pointer">.com</span>
                    <span className="text-white/50 hover:text-white transition-colors cursor-pointer">.io</span>
                    <span className="text-white/50 hover:text-white transition-colors cursor-pointer">.ai</span>
                    <span className="text-white/50 hover:text-white transition-colors cursor-pointer">.co</span>
                    <span className="text-white/50 hover:text-white transition-colors cursor-pointer">.app</span>
                    <span className="text-white/50 hover:text-white transition-colors cursor-pointer">.net</span>
                </motion.div>

            </div>
        </section>
    )
}

function Particles() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
                <Particle key={i} />
            ))}
        </div>
    )
}

function Particle() {
    const randomX = Math.random() * 100
    const randomY = Math.random() * 100
    const randomDuration = Math.random() * 10 + 10
    const randomDelay = Math.random() * 10

    return (
        <motion.div
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
            }}
            animate={{
                opacity: [0, 1, 0],
                y: [0, -100], // Float up
            }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "linear",
            }}
        />
    )
}

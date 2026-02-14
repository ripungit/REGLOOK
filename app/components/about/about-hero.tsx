"use client"

import { motion } from "framer-motion"

export function AboutHero() {
    return (
        <section className="relative pt-48 pb-32 overflow-hidden z-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-900/20 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <div className="container mx-auto px-6 max-w-[1200px] relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                        Our Mission
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                        Building the internet's <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">operating surface.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                        We started with a simple idea: Domain registration shouldn't be painful. Today, we're empowering millions of creators to own their corner of the web.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

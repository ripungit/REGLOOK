"use client"

import { motion } from "framer-motion"
import { ArrowRight, Globe, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"


export function FeatureCards() {
    return (
        <section className="relative overflow-hidden bg-black py-28 text-white">
            <div className="relative mt-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl"
                    >
                        Everything you need to build a powerful online presence
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex gap-4"
                    >
                        <Link
                            href="#"
                            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.03]"
                        >
                            View plans
                        </Link>
                        <Link
                            href="#"
                            className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                        >
                            Check domains
                        </Link>
                    </motion.div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card
                        delay={0.1}
                        title="Search & Register"
                        description="Find perferct domain for your brand."
                        accent="indigo"
                    >
                        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-80 mix-blend-overlay">
                            <Globe className="h-48 w-48 text-white/20 rotate-[-15deg]" strokeWidth={0.5} />
                        </div>
                    </Card>

                    <Card
                        delay={0.2}
                        title="High Speed"
                        description="Blazing-fast global hosting optimized."
                        accent="blue"
                    >
                        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-80 mix-blend-overlay">
                            <Zap className="h-48 w-48 text-white/20 rotate-[15deg]" strokeWidth={0.5} />
                        </div>
                    </Card>

                    <Card
                        delay={0.3}
                        title="Secure"
                        description="Enterprise-grade security included."
                        accent="emerald"
                    >
                        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-80 mix-blend-overlay">
                            <ShieldCheck className="h-48 w-48 text-white/20 rotate-[-10deg]" strokeWidth={0.5} />
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}

function Card({
    children,
    title,
    description,
    delay,
    accent,
}: {
    children: React.ReactNode
    title: string
    description: string
    delay: number
    accent: "indigo" | "blue" | "emerald"
}) {

    const gradients = {
        indigo: "bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-900",
        blue: "bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#0f0f10]",
        emerald: "bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0f0f10]",
    }

    const accents = {
        indigo: "bg-indigo-500",
        blue: "bg-blue-500",
        emerald: "bg-emerald-500",
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className={`group relative h-[360px] w-full overflow-hidden rounded-[40px] p-2 transition-all hover:scale-[1.02] duration-300 ${gradients[accent]}`}
        >
            {/* Right Side Visual Container (Behind content) */}
            <div className="absolute inset-0 z-0">
                {/* Gradient Orb */}
                <div className={`absolute right-[-20%] top-[20%] h-64 w-64 rounded-full ${accents[accent]} blur-[80px] opacity-100`} />
            </div>


            {/* Bottom Right Button */}
            <button className="absolute bottom-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 border border-white/10 group-hover:rotate-45 duration-300">
                <ArrowRight size={20} />
            </button>

            {/* Inner Floating Card */}
            <div className="relative z-10 h-full w-[65%] rounded-[32px] bg-black/20 backdrop-blur-2xl border border-white/5 p-8 flex flex-col justify-between shadow-2xl">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-3 tracking-tight leading-tight">
                        {title}
                    </h3>
                    <p className="text-sm font-medium text-white/60 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="text-sm font-semibold text-white/40 tracking-widest">
                    www.reglook.com
                </div>
            </div>
        </motion.div>
    )
}

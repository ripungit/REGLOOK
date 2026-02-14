"use client"

import { motion } from "framer-motion"
import { Globe, Link2, Bell, Box, ArrowRightLeft, ShieldCheck } from "lucide-react"

const features = [
    {
        icon: Globe,
        title: "Domains List",
        description: "Manage domain registrations with advanced settings, tools, and services at your fingertips."
    },
    {
        icon: Link2,
        title: "Connection Manager",
        description: "Seamlessly link your products and services with our intuitive connection interface."
    },
    {
        icon: Bell,
        title: "Communication Center",
        description: "Centralized hub for messages, notifications, and communication preference settings."
    },
    {
        icon: Box,
        title: "Library",
        description: "Instant access to the entire suite of Reglook products, services, and apps."
    },
    {
        icon: ArrowRightLeft,
        title: "Transfer Manager",
        description: "Track and manage domain transfers with real-time status updates and simple controls."
    },
    {
        icon: ShieldCheck,
        title: "Security Center",
        description: "Comprehensive security management including 2FA, device tracking, and safety logs."
    }
]

export function ControlGrid() {
    return (
        <section className="bg-black py-24 md:py-32 relative overflow-hidden">

            <div className="mx-auto max-w-[1150px] px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:text-center items-center justify-center gap-6 mb-20 md:mb-28">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
                    >
                        Total control instantly.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed"
                    >
                        Every tool you need to manage your digital assets, engineered for simplicity and power.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group relative p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-zinc-900/50 backdrop-blur-sm overflow-hidden"
                        >
                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800/50 text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-xl font-semibold mb-3 text-white tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

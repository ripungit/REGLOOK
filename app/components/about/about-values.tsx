"use client"

import { motion } from "framer-motion"
import { Heart, Zap, Shield, Globe } from "lucide-react"

const values = [
    {
        icon: Heart,
        title: "Customer Obsession",
        description: "We don't just support our customers; we advocate for them. Every decision we make starts with 'does this help the user?'"
    },
    {
        icon: Zap,
        title: "Radical Simplicity",
        description: "Complexity is the enemy. We strive to make powerful tools accessible through clean, intuitive interfaces."
    },
    {
        icon: Shield,
        title: "Privacy First",
        description: "Your data is yours. We believe privacy is a fundamental human right, not a premium feature."
    },
    {
        icon: Globe,
        title: "Open Internet",
        description: "We support open standards and an uncensored web. We build tools that promote freedom of information."
    }
]

export function AboutValues() {
    return (
        <section className="py-32 bg-zinc-950 relative z-20">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What drives us</h2>
                    <p className="text-lg text-white/50 max-w-2xl">
                        Our core values aren't just empty words on a wall; they are the principles that guide our product development and hiring.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-black border border-white/5 p-8 rounded-3xl hover:border-indigo-500/30 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-400">
                                <item.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                            <p className="text-white/50 leading-relaxed text-sm">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

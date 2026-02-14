"use client"

import { motion } from "framer-motion"

const stats = [
    { label: "Domains Managed", value: "2.5M+" },
    { label: "Happy Customers", value: "850k" },
    { label: "Countries Served", value: "140" },
    { label: "Uptime SLA", value: "99.99%" },
]

export function AboutStats() {
    return (
        <section className="py-12 border-y border-white/5 bg-white/[0.02] relative z-20">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-white/40 uppercase tracking-widest">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

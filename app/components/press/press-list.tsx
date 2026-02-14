"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Calendar } from "lucide-react"
import Link from "next/link"

const releases = [
    {
        id: 1,
        date: "October 24, 2025",
        category: "Product",
        title: "Reglook Launches Global Partner Program",
        summary: "Enabling agencies and platforms to integrate Reglook's domain and hosting infrastructure directly into their own products with a white-label solution.",
        link: "#"
    },
    {
        id: 2,
        date: "September 15, 2025",
        category: "Company",
        title: "Reglook Reaches 1 Million Domains Under Management",
        summary: "A significant milestone in our mission to simplify the open web. We thank our customers and partners for their trust.",
        link: "#"
    },
    {
        id: 3,
        date: "August 2, 2025",
        category: "Infrastructure",
        title: "Expanding Our Edge Network to 35 New Cities",
        summary: "Improved latency and reliability for all Reglook hosted sites. The new PoPs include locations in South America, Africa, and Southeast Asia.",
        link: "#"
    },
    {
        id: 4,
        date: "June 10, 2025",
        category: "Community",
        title: "Reglook Announces $5M Creator Fund",
        summary: "Supporting open-source developers and digital creators with free infrastructure and grants.",
        link: "#"
    }
]

export function PressList() {
    return (
        <section className="py-24 bg-black text-white relative z-20">
            <div className="container mx-auto px-6 max-w-[1000px]">

                <div className="mb-12 border-b border-white/10 pb-4">
                    <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest">Latest News</h2>
                </div>

                <div className="space-y-12">
                    {releases.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={item.link} className="block group-hover:bg-white/5 -mx-6 p-6 rounded-2xl transition-colors">
                                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                                    <div className="md:w-48 flex-shrink-0">
                                        <div className="flex items-center gap-2 text-white/40 text-sm font-mono mb-2">
                                            <Calendar size={12} />
                                            {item.date}
                                        </div>
                                        <span className="inline-block px-2 py-1 rounded border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/60">
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                            {item.title}
                                            <ArrowUpRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" size={20} />
                                        </h3>
                                        <p className="text-white/60 text-lg leading-relaxed">
                                            {item.summary}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white text-sm font-medium">
                        View Archive
                    </button>
                </div>

            </div>
        </section>
    )
}

"use client"

import { motion } from "framer-motion"

const timeline = [
    {
        year: "2019",
        title: "The Beginning",
        description: "Reglook was founded in a small garage in San Francisco. We were tired of clunky, up-sell heavy registrars and decided to build something cleaner."
    },
    {
        year: "2021",
        title: "Going Global",
        description: "We launched our global edge network, reducing latency for customers in Asia and Europe by 300%. Our team grew to 50 people."
    },
    {
        year: "2023",
        title: "The Platform Era",
        description: "We released the Reglook API, allowing developers to programmatically manage infrastructure. This shifted our focus from just domains to full-stack hosting."
    },
    {
        year: "2025",
        title: "Today",
        description: "With over 2.5 million domains under management, we are one of the fastest-growing infrastructure platforms in the world."
    }
]

export function AboutStory() {
    return (
        <section className="py-32 bg-black relative z-20">
            <div className="container mx-auto px-6 max-w-[1000px]">
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Journey</h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        We've come a long way in just a few years, but it feels like we're just getting started.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:-translate-x-1/2" />

                    <div className="space-y-24">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Year Bubble */}
                                <div className="absolute left-0 md:left-1/2 top-0 -translate-x-[5px] md:-translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-black z-10" />

                                <div className="flex-1 w-full md:w-1/2 pl-8 md:pl-0 md:px-12">
                                    <div className={`flex flex-col ${index % 2 === 0 ? "md:items-start" : "md:items-end md:text-right"}`}>
                                        <span className="text-indigo-400 font-mono font-bold text-lg mb-2">{item.year}</span>
                                        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                        <p className="text-white/60 leading-relaxed text-lg">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

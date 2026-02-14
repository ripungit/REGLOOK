"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, ArrowRight, ArrowLeft, CheckCheckIcon, BadgeCheck } from "lucide-react"

const reviews = [
    {
        title: "Easy dashboard",
        content: "Easy dashboard, many services and professional support",
        author: "Walid Benmahdi",
        date: "4 days ago",
        stars: 5,
    },
    {
        title: "Great products at great price",
        content: "Great products at great price, their domain management and ui/ux is superb at affordable rates",
        author: "Omal C.",
        date: "6 days ago",
        stars: 5,
    },
    {
        title: "Reglook makes it easy",
        content: "I like how easy it is to buy domains, connect email addresses to your domain with ease because of the instructions availed.",
        author: "Marco Kebaitse",
        date: "8 days ago",
        stars: 5,
    },
    {
        title: "Outstanding service",
        content: "The best domain registrar I have ever used. Simple, fast and efficient.",
        author: "Ram B.",
        date: "10 days ago",
        stars: 5,
    },
    {
        title: "Excellent support",
        content: "Customer support is top notch, they helped me transfer my domains in minutes.",
        author: "Sarah Jenkins",
        date: "2 weeks ago",
        stars: 5,
    }
]

export function TestimonialsSection() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef
            const scrollAmount = direction === "left" ? -400 : 400
            current.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }

    return (
        <section className="bg-black py-24 border-t border-white/5 relative overflow-hidden">

            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">

                {/* Centered Top Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-8">
                    <div>
                        <h2 className="text-5xl font-bold text-white mb-6">Customers know best</h2>
                        <p className="text-xl text-white/50 leading-relaxed max-w-2xl mx-auto">
                            Here&apos;s what people with first-hand experience are saying about Reglook.
                        </p>
                    </div>

                    {/* Trustpilot Summary - Centered */}
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">Excellent</h3>
                        <div className="flex gap-1 justify-center mb-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <div key={s} className="bg-[#00b67a] p-1.5 ">
                                    <Star className="w-6 h-6 fill-white text-white" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-white/60 mb-1">
                            Showing our favorite reviews
                        </p>
                        <p className="text-sm text-white/60 mb-6">
                            Based on <span className="underline font-semibold text-white">3,858 reviews</span>
                        </p>
                        <div className="flex justify-center items-center gap-2">
                            <Star className="w-5 h-5 fill-[#00b67a] text-[#00b67a]" />
                            <span className="font-bold text-white text-lg">Trustpilot</span>
                        </div>
                    </div>
                </div>

                {/* Carousel - Full Width */}
                <div className="w-full relative">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide no-scrollbar"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {reviews.map((review, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="min-w-[300px] md:min-w-[350px] bg-[#1a1a1a] p-8 rounded-2xl snap-start border border-white/5 flex flex-col justify-between h-[300px]"
                            >
                                <div>
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="bg-[#00b67a] p-1">
                                                <Star className="w-3 h-3 fill-white text-white" />
                                            </div>
                                        ))}
                                        <span className="ml-2 text-xs text-white font-semibold flex items-center gap-1">
                                            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                                                <BadgeCheck className="w-4 h-4 text-white" />
                                            </div>
                                            Verified
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2 line-clamp-1">{review.title}</h4>
                                    <p className="text-white/60 text-sm leading-relaxed line-clamp-4">
                                        {review.content}
                                    </p>
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <p className="font-bold text-white text-sm">{review.author}</p>
                                    <p className="text-white/30 text-xs mt-1">{review.date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Controls - Centered or Side? Keep separate container? */}
                    <div className="flex justify-center gap-4 mt-4">
                        <button onClick={() => scroll('left')} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => scroll('right')} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Bottom Button */}
                <div className="flex justify-center mt-20">
                    <button className="bg-white border text-black px-8 py-3 rounded-md font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                        Review us on <Star className="w-5 h-5 fill-[#00b67a] text-[#00b67a]" /> <span>Trustpilot</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

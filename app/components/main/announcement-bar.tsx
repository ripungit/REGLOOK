"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function AnnouncementBar() {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full bg-transparent backdrop-blur-sm text-white border-b-[1px] border-white/5 text-xs md:text-sm font-medium py-3 md:py-4 flex justify-center items-center overflow-hidden"
        >
            {/* Desktop View (Static) */}
            <div className="hidden md:flex items-center gap-2 group cursor-pointer transition-colors hover:text-white/80">
                <span>Get up to 2 FREE .com domains for 1 year with select 1-year hosting plans — WHOIS privacy included.</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </div>

            {/* Mobile View (Marquee) */}
            <div className="md:hidden flex w-full overflow-hidden mask-linear-gradient">
                <motion.div
                    className="flex shrink-0 whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ width: "fit-content" }}
                >
                    {/* Repeated content for seamless loop */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2 px-6">
                            <span>Get up to 2 FREE .com domains for 1 year with select 1-year hosting plans.</span>
                            <ArrowRight className="h-3 w-3" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    )
}

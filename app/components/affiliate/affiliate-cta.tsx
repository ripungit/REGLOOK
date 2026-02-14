"use client"

import { ArrowUpRight } from "lucide-react"

export function AffiliateCTA() {
    return (
        <section className="relative py-32 bg-black border-t border-white/5 overflow-hidden z-20">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                    Start earning with Reglook.
                </h2>
                <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">
                    Join thousands of creators and developers who rely on our affiliate program.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 transition-colors flex items-center gap-2 group">
                        Join Affiliate Program
                        <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
                        Member Login
                    </button>
                </div>
            </div>
        </section>
    )
}

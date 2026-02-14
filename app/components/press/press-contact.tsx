"use client"

import { Mail } from "lucide-react"

export function PressContact() {
    return (
        <section className="py-24 bg-black border-t border-white/5 relative z-20">
            <div className="container mx-auto px-6 max-w-[800px] text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Media Inquiries
                </h2>
                <p className="text-white/60 text-lg mb-10 leading-relaxed">
                    For press interviews, speaking opportunities, or additional information, please contact our communications team. We aim to respond within 24 hours.
                </p>
                <a
                    href="mailto:press@reglook.com"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-zinc-200 transition-colors"
                >
                    <Mail size={20} />
                    press@reglook.com
                </a>
            </div>
        </section>
    )
}

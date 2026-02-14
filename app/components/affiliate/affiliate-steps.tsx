"use client"

import { motion } from "framer-motion"

const steps = [
    {
        id: "01",
        title: "Join",
        description: "Sign up for the affiliate program. It takes less than 2 minutes."
    },
    {
        id: "02",
        title: "Promote",
        description: "Share your unique referral link on social media, blogs, or with clients."
    },
    {
        id: "03",
        title: "Earn",
        description: "Get 30% commission for every new customer you bring to Reglook."
    }
]

export function AffiliateSteps() {
    return (
        <section className="bg-black py-24 border-t border-white/5 relative z-20">
            <div className="mx-auto max-w-[1200px] px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            How it works
                        </h2>
                        <p className="text-white/60 text-lg mb-12 max-w-md">
                            Simple, transparent, and rewarding. Start earning passive income today.
                        </p>

                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex gap-6 relative"
                                >
                                    {/* Line connecting steps */}
                                    {index !== steps.length - 1 && (
                                        <div className="absolute left-[23px] top-[60px] bottom-[-20px] w-px bg-white/10" />
                                    )}

                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white font-mono font-bold bg-black">
                                            {step.id}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        {/* Visual representation - Link Sharing */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="rounded-2xl bg-[#000] border border-white/10 p-8 shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-center gap-6"
                        >
                            <div className="bg-[#111] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">R</div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="text-xs text-zinc-500 mb-1">Your Referral Link</div>
                                    <div className="text-sm text-white font-mono truncate">reglook.com/?ref=johndoe</div>
                                </div>
                                <div className="px-3 py-1.5 bg-white/10 rounded-md text-xs font-semibold hover:bg-white/20 cursor-pointer">Copy</div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 opacity-50">
                                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">👍</div>
                                    <div className="text-sm">Shared on Twitter</div>
                                    <div className="ml-auto text-xs text-green-400">+12 clicks</div>
                                </div>
                                <div className="flex items-center gap-3 opacity-70">
                                    <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">💌</div>
                                    <div className="text-sm">Shared in Newsletter</div>
                                    <div className="ml-auto text-xs text-green-400">+45 clicks</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">🎉</div>
                                    <div className="text-sm font-semibold">New Customer Signup!</div>
                                    <div className="ml-auto text-sm font-bold text-green-400">+$24.00</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="absolute -bottom-6 -left-6 bg-white text-black p-4 rounded-xl shadow-xl max-w-[200px]"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-green-600">Payment Sent</span>
                            </div>
                            <p className="text-sm font-bold leading-tight">You received a payout</p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}

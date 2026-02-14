"use client";

import { motion } from "framer-motion";
import { BarChart3, PieChart, TrendingUp, DollarSign, Share2, Wallet, ArrowRight, Gift } from "lucide-react";

export function AffiliateBenefits() {
    return (
        <section className="py-24 bg-black text-white relative z-20">
            <div className="container mx-auto px-6 max-w-[1200px]">

                {/* Header */}
                <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest border border-purple-500/20">
                                Earn with Reglook
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
                            Refer Users. <span className="text-white">Get Rewarded.</span>
                        </h2>
                        <p className="text-white font-medium text-lg md:text-xl max-w-2xl">
                            Join our high-paying affiliate program. We provide the assets, tracking, and huge commissions. You bring the audience.
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-4">
                        <div className="text-right">
                            <span className="block text-zinc-400 text-sm mb-1">Commission rate</span>
                            <span className="text-2xl font-bold text-white">30%<span className="text-zinc-500 text-lg font-medium">/referral</span></span>
                        </div>
                        <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold cursor-pointer hover:bg-zinc-200 transition-colors">
                            Start Earning
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 min-h-[500px]">

                    {/* Card 1: Dashboard Visual (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 md:row-span-2 bg-gradient-to-t from-black to-purple-900/40 rounded-[32px] p-8 md:p-12 relative overflow-hidden group flex flex-col"
                    >

                        <div className="relative z-10 mb-8">
                            <h3 className="text-3xl font-bold mb-4">Real-Time Analytics</h3>
                            <p className="text-zinc-400 text-lg max-w-md">
                                Track every click, sign-up, and sale in real-time. Our dashboard gives you detailed insights into your performance.
                            </p>
                        </div>

                        {/* Dashboard Visual */}
                        <div className="mt-auto relative w-full h-72 bg-[#000] rounded-xl overflow-hidden shadow-3xl p-6 flex flex-col gap-4">
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <div className="space-y-1">
                                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Total Earnings</div>
                                    <div className="text-2xl font-bold text-white">$1,240.50</div>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold flex items-center gap-1">
                                    <TrendingUp size={12} /> +12.5%
                                </div>
                            </div>

                            {/* Fake Graph Bars */}
                            <div className="flex-1 flex items-end justify-between gap-2 px-2">
                                {[35, 55, 40, 70, 50, 80, 65, 90, 75, 60, 85, 95].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: i * 0.05 }}
                                        className="w-full bg-purple-500/20 hover:bg-purple-500/60 rounded-t-sm transition-colors relative group/bar"
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity font-bold">
                                            ${h * 10}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Marketing Assets */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-transparent border border-white/5 rounded-[32px] p-8 flex flex-col justify-between group hover:border-white/10 transition-colors"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 text-white">
                                <Share2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Marketing Kit</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Get access to high-converting banners, social media assets, and copy templates.
                            </p>
                        </div>
                        <div className="mt-6 flex -space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-zinc-500/20 border border-white/10 transform -rotate-6 scale-90" />
                            <div className="w-10 h-10 rounded-lg bg-zinc-500/20 border border-white/10 transform rotate-12" />
                            <div className="w-10 h-10 rounded-lg bg-zinc-500/20 border border-white/10 transform -rotate-3 translate-x-1" />
                        </div>
                    </motion.div>

                    {/* Card 3: Payouts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-transparent border border-white/5 rounded-[32px] p-8 flex flex-col justify-between group hover:border-white/10 transition-colors"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 text-white">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Fast Payouts</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Reliable monthly payouts via PayPal or Bank Transfer. Net-30 terms.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center gap-3">
                            <div className="px-3 py-1.5 bg-white/5 rounded border border-white/10 text-xs text-zinc-400">PayPal</div>
                            <div className="px-3 py-1.5 bg-white/5 rounded border border-white/10 text-xs text-zinc-400">Wire</div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

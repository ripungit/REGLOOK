"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"

const plans = [
    {
        name: "Starter",
        price: "2.99",
        description: "Perfect for personal blogs and portfolios.",
        features: ["1 Website", "10 GB NVMe Storage", "Free SSL Certificate", "Daily Backups", "24/7 Support"],
        highlight: false,
    },
    {
        name: "Pro",
        price: "9.99",
        description: "Best for growing businesses and stores.",
        features: ["Unlimited Websites", "50 GB NVMe Storage", "Free Domain (1st Year)", "Priority Support", "Advanced Security", "Free CDN"],
        highlight: true,
    },
    {
        name: "Business",
        price: "24.99",
        description: "Maximum performance for high-traffic sites.",
        features: ["Unlimited Websites", "Unlimited NVMe Storage", "Dedicated IP", "Malware Scanning", "Phone Support", "Object Caching"],
        highlight: false,
    },
]

export function PricingTiers() {
    return (
        <section className="bg-black py-32 text-white relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 top-1/2 bg-indigo-900/20 blur-[120px] h-[500px]" />

            <div className="mx-auto max-w-[1200px] px-6 lg:px-12 relative z-10">

                {/* Header */}
                <div className="mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        Simple, transparent pricing
                    </motion.h2>
                    <p className="text-lg text-white/50">Choose the perfect plan for your needs.</p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function PricingCard({ plan, delay }: { plan: any, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className={`
                relative p-8 rounded-[32px] border backdrop-blur-xl flex flex-col gap-6 group
                ${plan.highlight
                    ? "bg-white/10 border-indigo-500/50 shadow-2xl shadow-indigo-500/10 md:-mt-8 md:mb-8"
                    : "bg-[#0f0f10] border-white/10 hover:border-white/20"}
            `}
        >
            {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                </div>
            )}

            <div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-sm text-white/50 mt-2">{plan.description}</p>
            </div>

            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-white/50">/mo</span>
            </div>

            <button className={`
                w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2
                ${plan.highlight
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                    : "bg-white/10 hover:bg-white/20 text-white"}
            `}>
                Get Started
                <ArrowRight size={16} />
            </button>

            <div className="space-y-4 pt-4 border-t border-white/10">
                {plan.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                        <div className={`p-1 rounded-full ${plan.highlight ? "bg-indigo-500/20 text-indigo-400" : "bg-white/10 text-white/60"}`}>
                            <Check size={12} strokeWidth={3} />
                        </div>
                        {feature}
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

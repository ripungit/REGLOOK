"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmailPricing = () => {
    const [billingCycle, setBillingCycle] = useState<"Monthly" | "Yearly">("Monthly");

    const plans = [
        {
            name: "Starter",
            tagline: "Perfect for individuals.",
            price: { monthly: 1.00, yearly: 10 },
            features: [
                "1 Email Account",
                "10 GB Storage",
                "Mobile & Desktop Sync",
                "Spam Protection",
                "Webmail Access"
            ],
            highlight: false
        },
        {
            name: "Pro",
            tagline: "For growing businesses.",
            price: { monthly: 3.00, yearly: 30 },
            features: [
                "5 Email Accounts",
                "50 GB Storage",
                "Priority Support",
                "Advanced Security",
                "Calendar & Contacts",
                "Team Aliases"
            ],
            highlight: true,
            badge: "Most Popular"
        },
        {
            name: "Enterprise",
            tagline: "Maximum power and control.",
            price: { monthly: 5.00, yearly: 50 },
            features: [
                "Unlimited Email Accounts",
                "100 GB Storage",
                "24/7 Dedicated Support",
                "Premium Anti-Spam",
                "Email Archiving",
                "ActiveSync Support"
            ],
            highlight: false
        }
    ];

    return (
        <section id="plans" className="py-32 bg-black relative">

            <div className="container mx-auto px-6 max-w-[1150px] relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-6xl font-semibold text-white tracking-tighter mb-6">
                        Simple, scalable <br className="hidden md:block" />
                        <span className="text-white">
                            pricing plans.
                        </span>
                    </h2>
                    <p className="text-white max-w-2xl mx-auto text-lg md:text-xl font-semibold">
                        Start small and scale as your team grows.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto mb-26 px-4">

                    {/* Billing Cycle Tabs */}
                    <div className="flex items-center p-1.5 bg-zinc-900/50 border border-white/10 rounded-full backdrop-blur-sm">
                        {["Monthly", "Yearly"].map((cycle) => (
                            <button
                                key={cycle}
                                onClick={() => setBillingCycle(cycle as "Monthly" | "Yearly")}
                                className={`
                                    px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                                    ${billingCycle === cycle
                                        ? "bg-white text-black shadow-lg"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    }
                                `}
                            >
                                {cycle}
                            </button>
                        ))}
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-16">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`
                                relative group overflow-hidden rounded-[2rem] p-8 flex flex-col h-full
                                border transition-all duration-500
                                ${plan.highlight
                                    ? "bg-transparent border-white/20 shadow-[0_0_80px_-20px_rgba(34,211,238,0.15)] backdrop-blur-3xl z-10 scale-[1.02] md:-mt-8 md:pb-12"
                                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-transparent backdrop-blur-xl"
                                }
                            `}
                        >
                            {/* Glass Reflection Gradient - indigo tinted */}
                            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            {plan.highlight && (
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-100" />
                            )}

                            {/* Header */}
                            <div className="relative z-10 mb-8">
                                <h3 className={`text-2xl font-semibold tracking-tight mb-2 text-white`}>
                                    {plan.name}
                                </h3>
                                <p className="text-sm text-zinc-400 font-medium">{plan.tagline}</p>
                            </div>

                            {/* Price */}
                            <div className="relative z-10 mb-10 pb-10 border-b border-white/5">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold tracking-tighter text-white">
                                        ${billingCycle === "Monthly" ? plan.price.monthly : Math.round(plan.price.yearly / 12)}
                                    </span>
                                    <span className="text-zinc-500 font-medium">/mo/user</span>
                                </div>

                            </div>

                            {/* Features */}
                            <div className="relative z-10 flex-1 mb-10">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className={`
                                                mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border
                                                ${plan.highlight ? "bg-indigo-500/10 border-indigo-500/20" : "bg-white/5 border-white/5"}
                                            `}>
                                                <Check className={`w-3 h-3 ${plan.highlight ? "text-indigo-400" : "text-zinc-400"}`} />
                                            </div>
                                            <span className="text-sm text-zinc-300 font-medium">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Button */}
                            <div className="relative z-10 mt-auto">
                                <Button className={`w-full h-14 rounded-full font-semibold text-[15px] transition-all duration-300 ${plan.highlight
                                    ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] border-none"
                                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20"
                                    }`}>
                                    Select {plan.name}
                                </Button>
                            </div>

                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

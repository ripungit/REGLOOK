"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const locations = [
    { name: "New York, USA", flag: "🇺🇸" },
    { name: "London, UK", flag: "🇬🇧" },
    { name: "Frankfurt, DE", flag: "🇩🇪" },
    { name: "Singapore, SG", flag: "🇸🇬" },
    { name: "Mumbai, IN", flag: "🇮🇳" },
];

export const XCloudPricing = () => {
    const [billingCycle, setBillingCycle] = useState<"Monthly" | "Yearly">("Monthly");
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    const plans = [
        {
            name: "Hobby",
            tagline: "For personal projects and experiments.",
            price: { monthly: 0.50, yearly: 5 },
            features: [
                "100 GB Bandwidth",
                "Unlimited Websites",
                "Community Support",
                "Automatic HTTPS",
                "Git Integration"
            ],
            highlight: false
        },
        {
            name: "Pro",
            tagline: "For production apps and growing teams.",
            price: { monthly: 19, yearly: 190 },
            features: [
                "1 TB Bandwidth",
                "Unlimited Websites",
                "Priority Email Support",
                "WAF & DDoS Protection",
                "Password Protection",
                "Team Collaboration"
            ],
            highlight: true,
            badge: "Most Popular"
        },
        {
            name: "Business",
            tagline: "For high-traffic and mission-critical apps.",
            price: { monthly: 99, yearly: 990 },
            features: [
                "5 TB Bandwidth",
                "99.99% Uptime SLA",
                "24/7 Priority Support",
                "Advanced Security",
                "Dedicated Build Infrastructure",
                "Single Sign-On (SSO)"
            ],
            highlight: false
        }
    ];

    return (
        <section id="plans" className="py-32 bg-black relative">

            <div className="container mx-auto px-6 max-w-[1150px] relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-6xl font-semibold text-white tracking-tighter mb-6">
                        Simple, transparent <br className="hidden md:block" />
                        <span className="text-white">
                            pricing plans.
                        </span>
                    </h2>
                    <p className="text-white max-w-2xl mx-auto text-lg md:text-xl font-semibold">
                        Pay only for what you use, or lock in predictable rates.
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

                    {/* Data Center Selector */}
                    <div className="relative z-50 group">
                        <div className="flex items-center gap-4 bg-zinc-900/60 border border-white/10 pr-6 pl-5 py-3 rounded-full backdrop-blur-md cursor-pointer hover:bg-zinc-800/80 transition-all hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[12px] uppercase font-semibold text-white">Data Center:</span>
                                <div className="text-sm font-semibold text-white flex items-center gap-2">
                                    <span>{selectedLocation.flag}</span>
                                    <span>{selectedLocation.name}</span>
                                </div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                        </div>

                        {/* Dropdown */}
                        <div className="absolute top-[calc(100%+12px)] right-0 w-72 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-[100]">
                            <div className="p-2 space-y-1">
                                {locations.map(loc => (
                                    <div
                                        key={loc.name}
                                        onClick={() => setSelectedLocation(loc)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all border ${selectedLocation.name === loc.name
                                            ? 'bg-white/10 border-white/10 shadow-inner'
                                            : 'border-transparent hover:bg-white/5'
                                            }`}
                                    >
                                        <span className="text-xl shadow-sm">{loc.flag}</span>
                                        <span className={`text-sm ${selectedLocation.name === loc.name ? 'text-white font-medium' : 'text-zinc-400'}`}>{loc.name}</span>
                                        {selectedLocation.name === loc.name && <Check className="w-3 h-3 text-green-400 ml-auto" />}
                                    </div>
                                ))}
                            </div>
                        </div>
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
                                    ? "bg-transparent border-white/20 shadow-[0_0_80px_-20px_rgba(79,70,229,0.15)] backdrop-blur-3xl z-10 scale-[1.02] md:-mt-8 md:pb-12"
                                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-transparent backdrop-blur-xl"
                                }
                            `}
                        >
                            {/* Glass Reflection Gradient - green tinted */}
                            <div className="absolute inset-0 bg-gradient-to-b from-green-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            {plan.highlight && (
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-green-900 to-transparent opacity-100" />
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
                                    <span className="text-zinc-500 font-medium">/mo</span>
                                </div>

                            </div>

                            {/* Features */}
                            <div className="relative z-10 flex-1 mb-10">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className={`
                                                mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border
                                                ${plan.highlight ? "bg-green-500/10 border-green-500/20" : "bg-white/5 border-white/5"}
                                            `}>
                                                <Check className={`w-3 h-3 ${plan.highlight ? "text-green-400" : "text-zinc-400"}`} />
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

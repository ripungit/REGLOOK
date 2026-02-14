"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus, Star, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const locations = [
    { name: "New York, USA", flag: "🇺🇸" },
    { name: "London, UK", flag: "🇬🇧" },
    { name: "Frankfurt, DE", flag: "🇩🇪" },
    { name: "Singapore, SG", flag: "🇸🇬" },
    { name: "Mumbai, IN", flag: "🇮🇳" },
];

const plans = [
    {
        name: "Dark Matter",
        tagline: "The invisible force starting it all.",
        price: "1.46",
        features: [
            "1x High-Performance vCPU",
            "20 GB NVMe Cloud Storage",
            "1 Hosted Domain",
            "Unlimited Sites & Subdomains",
            "Auto-SSL Encryption",
            "5 Enterprise Mailboxes (1 Year)",
            "Reglook Mail® Lite",
            "Imunify360™ AI-Defense"
        ],
        highlight: false
    },
    {
        name: "Cosmic Core",
        tagline: "Fusion power for expanding universes.",
        price: "5.99",
        features: [
            "2x High-Performance vCPUs",
            "50 GB NVMe Cloud Storage",
            "5 Hosted Domains",
            "Unlimited Sites & Subdomains",
            "Wildcard SSL Encryption",
            "Unlimited Enterprise Mailboxes",
            "REGLOOK MAIL® Professional",
            "Imunify360™ Pro + Malware Guard",
            "AI Website Architect"
        ],
        highlight: true
    },
    {
        name: "Matter Release",
        tagline: "Unbound energy for massive scale.",
        price: "12.99",
        features: [
            "4x High-Performance vCPUs",
            "Unmetered SSD Cloud Storage",
            "Unlimited Hosted Domains",
            "Unlimited Websites",
            "Advanced SSL Encryption",
            "5 Enterprise Mailboxes (1 Year)",
            "REGLOOK MAIL® Enterprise",
            "Imunify360™ Neural Network Protection",
            "Priority 24/7 Expert Access",
            "White-Glove Migration Concierge"
        ],
        highlight: false
    }
];

export const HostingPlans = () => {
    const [billingCycle, setBillingCycle] = useState("Monthly");
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    return (
        <section id="plans" className="py-32 bg-black relative">

            {/* Ambient Background Noise/Grain could be added here via CSS class if available globally, keeping it simple for now */}

            <div className="container mx-auto px-6 max-w-[1150px] relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-6xl font-semibold text-white tracking-tighter mb-6">
                        Infrastructure for <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
                            interstellar growth.
                        </span>
                    </h2>
                    <p className="text-white max-w-2xl mx-auto text-lg md:text-xl font-semibold">
                        Select your density. scale from a single particle to a galaxy.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto mb-26 px-4">

                    {/* Billing Cycle Tabs */}
                    <div className="flex items-center p-1.5 bg-zinc-900/50 border border-white/10 rounded-full backdrop-blur-sm">
                        {["Monthly", "Yearly", "Biyearly"].map((cycle) => (
                            <button
                                key={cycle}
                                onClick={() => setBillingCycle(cycle)}
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
                                        {selectedLocation.name === loc.name && <Check className="w-3 h-3 text-indigo-400 ml-auto" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
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
                                    ? "bg-transparent border-white/20 shadow-[0_0_80px_-20px_rgba(255,255,255,0.1)] backdrop-blur-3xl z-10 scale-[1.02] md:-mt-8 md:pb-12"
                                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-transparent backdrop-blur-xl"
                                }
                            `}
                        >
                            {/* Glass Reflection Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#5f2122]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            {plan.highlight && (
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#5f2122] to-transparent opacity-100" />
                            )}

                            {/* Header */}
                            <div className="relative z-10 mb-8">
                                <h3 className={`text-2xl font-semibold tracking-tight mb-2 ${plan.highlight ? "text-white" : "text-white"}`}>
                                    {plan.name}
                                </h3>
                                <p className="text-sm text-white font-semibold">{plan.tagline}</p>
                            </div>

                            {/* Price */}
                            <div className="relative z-10 mb-10 pb-10 border-b border-white/5">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold tracking-tighter text-white">
                                        ${plan.price}
                                    </span>
                                    <span className="text-zinc-500 font-medium">/mo</span>
                                </div>

                            </div>

                            {/* Features */}
                            <div className="relative z-10 flex-1 mb-10">
                                <ul className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                                {feature.includes("New") ? (
                                                    <Star className="w-2.5 h-2.5 text-indigo-300" fill="currentColor" />
                                                ) : (
                                                    <Check className="w-3 h-3 text-zinc-400" />
                                                )}
                                            </div>
                                            <span className="text-sm text-zinc-300 font-medium">
                                                {feature.replace("New", "")}
                                                {feature.includes("New") && (
                                                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 px-1.5 py-0.5 rounded">NEW</span>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Button */}
                            <div className="relative z-10 mt-auto">
                                <Button className={`w-full h-14 rounded-full font-semibold text-[15px] transition-all duration-300 ${plan.highlight
                                    ? "bg-white rounded-full text-black hover:bg-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                                    : "bg-white rounded-full text-black hover:bg-white/20 border border-white/5 shadow-lg"
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

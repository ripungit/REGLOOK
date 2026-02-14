"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield, Globe, Server, Mail, Minus } from "lucide-react";
import { siNextdotjs, siVite, siVuedotjs, siAngular } from "simple-icons/icons";

type CategoryId = "xcloud" | "hosting" | "email" | "security";

interface PricingCategory {
    id: CategoryId;
    label: string;
    icon: React.ElementType;
    description: string;
}

const categories: PricingCategory[] = [
    {
        id: "xcloud",
        label: "xCloud Serverless",
        icon: Globe,
        description:
            "Instantly deploy Next.js, Vite, React, Vue, and Angular apps. App-first hosting with automatic scaling, a global CDN, and zero server management."
    },
    {
        id: "hosting",
        label: "VPS & Web Hosting",
        icon: Server,
        description:
            "Reliable virtual servers with dedicated resources, full control, and predictable performance."
    },
    {
        id: "email",
        label: "Professional Email",
        icon: Mail,
        description:
            "Professional email on your domain with secure, ad-free mailboxes and reliable delivery."
    }
];


import { xcloudPlans, xcloudFeatures } from "@/lib/plans/xcloud.plans";
import { vpsPlans, vpsFeatures } from "@/lib/plans/vps.plans";
import { emailPlans, emailFeatures, emailAddons } from "@/lib/plans/email.plans";

const pricingData: Record<CategoryId, {
    plans: any[]; // Using any[] to allow flexibility for different plans structures
    featureCategories: { category: string; items: { name: string; values: (string | boolean)[] }[] }[];
    addons?: { name: string; price: string; period: string; desc: string }[]; // Optional addons for the category
}> = {
    xcloud: {
        plans: xcloudPlans,
        featureCategories: xcloudFeatures,
    },
    hosting: {
        plans: vpsPlans,
        featureCategories: vpsFeatures,
    },
    // Placeholders
    email: {
        plans: emailPlans,
        featureCategories: emailFeatures,
        addons: emailAddons
    },
    security: { plans: [], featureCategories: [] },
};

const renderCell = (value: string | boolean) => {
    if (value === true) return <Check className="w-5 h-5 text-orange-500 mx-auto" />;
    if (value === false) return <Minus className="w-5 h-5 text-zinc-700 mx-auto" />;
    return <span className="text-sm text-zinc-300">{value}</span>;
};

export const PricingDisplay = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryId>("xcloud");

    const activeData = pricingData[activeCategory];
    const hasData = activeData && activeData.plans.length > 0;

    return (
        <section className="w-full bg-black py-20 px-6 relative z-20">
            <div className="max-w-[1100px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Sidebar / Categories */}
                    <div className="w-full lg:w-56 flex-shrink-0">
                        <div className="sticky top-24">
                            <h3 className="px-4 mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                                Products
                            </h3>

                            <div className="flex flex-col gap-1 rounded-2xl bg-white/[0.03] border border-white/[0.06] p-2 backdrop-blur">
                                {categories.map((category) => {
                                    const isActive = activeCategory === category.id;

                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={`
                            relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-200
                            ${isActive
                                                    ? "text-white"
                                                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                                                }
                        `}
                                        >
                                            {/* Active background */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="sidebar-active"
                                                    className="absolute inset-0 rounded-xl bg-white/[0.06]"
                                                    transition={{ type: "spring", stiffness: 280, damping: 28 }}
                                                />
                                            )}

                                            {/* Left accent bar */}
                                            {/* {isActive && (
                                                <motion.span
                                                    layoutId="sidebar-accent"
                                                    className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-white"
                                                />
                                            )} */}

                                            {/* Icon */}
                                            <category.icon
                                                className={`
                                relative z-10 h-4.5 w-4.5
                                ${isActive ? "text-white" : "text-zinc-500"}
                            `}
                                            />

                                            {/* Label */}
                                            <span className="relative z-10 text-sm font-semibold">
                                                {category.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>


                    {/* Content Area */}
                    <div className="flex-1 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <div className="mb-10">
                                    <h2 className="text-3xl font-semibold text-white mb-2">
                                        {categories.find(c => c.id === activeCategory)?.label}
                                    </h2>
                                    <p className="text-zinc-400 text-lg">
                                        {categories.find(c => c.id === activeCategory)?.description}
                                    </p>
                                </div>

                                {hasData ? (
                                    <div className="w-full overflow-x-auto pb-4">
                                        <table className="w-full text-left border-collapse min-w-[900px]">
                                            <thead>
                                                <tr>
                                                    <th className="p-4 pl-0 text-md font-semibold bg-transparent text-white w-[20%]">Features</th>
                                                    {activeData.plans.map((plan, idx) => (
                                                        <th key={idx} className="p-4 text-center text-white w-[20%] relative align-top">
                                                            {plan.isPopular && (
                                                                <>
                                                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
                                                                    <div className="absolute inset-0 bg-white/5 opacity-100 pointer-events-none -z-10 rounded-t-xl"></div>
                                                                    <span className="absolute top-2 right-1/2 translate-x-1/2 text-[10px] text-orange-400 uppercase tracking-widest font-bold">
                                                                        Popular
                                                                    </span>
                                                                </>
                                                            )}
                                                            <div className={`mt-2 ${plan.isPopular ? "pt-2" : "pt-2"}`}>
                                                                <span className="block text-md font-bold text-white leading-tight">{plan.name}</span>
                                                                <div className="flex items-baseline justify-center gap-0.5 mt-2">
                                                                    <span className="text-2xl font-bold text-white">{plan.price}</span>
                                                                    <span className="text-xs text-zinc-500 font-medium">{plan.period}</span>
                                                                </div>
                                                                {/* <p className="text-xs text-zinc-500 mt-2 font-normal px-2 leading-relaxed min-h-[40px]">
                                                                    {plan.desc}
                                                                </p> */}
                                                            </div>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {activeData.featureCategories.map((cat, catIndex) => (
                                                    <React.Fragment key={catIndex}>
                                                        {/* Category Header */}
                                                        <tr className="border-b border-white/5 bg-zinc-900">
                                                            <td colSpan={activeData.plans.length + 1} className="p-3 pl-0 text-xs font-semibold uppercase tracking-widest text-white">
                                                                <span className="pl-4">{cat.category}</span>
                                                            </td>
                                                        </tr>

                                                        {/* Features */}
                                                        {cat.items.map((item, index) => (
                                                            <tr
                                                                key={index}
                                                                className="border border-white/5 hover:bg-white/[0.02] transition-colors group"
                                                            >
                                                                <td className="p-4 pl-0 text-white font-semibold border-r border-white/5 md:border-none relative">
                                                                    <span className="pl-4">{item.name}</span>
                                                                </td>

                                                                {item.values.map((val, vIndex) => {
                                                                    const isPopularCol = activeData.plans[vIndex].isPopular;
                                                                    return (
                                                                        <td
                                                                            key={vIndex}
                                                                            className={`
                                                                                p-4 text-center font-medium text-sm
                                                                                ${isPopularCol ? "text-white bg-white/[0.02]" : "text-zinc-400"}
                                                                            `}
                                                                        >
                                                                            <div className="flex items-center justify-center">
                                                                                {renderCell(val)}
                                                                            </div>
                                                                        </td>
                                                                    );
                                                                })}
                                                            </tr>
                                                        ))}
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>

                                        <div className="mt-8 flex gap-4 justify-end">
                                            {/* Spacer for feature column */}
                                            <div className="hidden lg:block w-[20%]"></div>
                                            {activeData.plans.map((plan, idx) => (
                                                <div key={idx} className="flex-1 w-[20%] text-center">
                                                    <button className={`
                                                        w-full py-2.5 rounded-full font-semibold text-sm transition-colors
                                                        ${plan.isPopular
                                                            ? "bg-white text-black hover:bg-zinc-200 hover:text-black cursor-pointer"
                                                            : "bg-white text-black hover:bg-zinc-200 hover:text-black cursor-pointer"}
                                                     `}>
                                                        Choose {plan.name.split(' ').pop()}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>



                                        {/* Addons - Only if present */}
                                        {activeData.addons && activeData.addons.length > 0 && (
                                            <div className="mt-16 flex flex-col items-center gap-6 pt-10 border-t border-white/5 w-full mx-auto">
                                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Available Add-ons</span>
                                                <div className="flex flex-wrap justify-center gap-6 w-full">
                                                    {activeData.addons.map((addon, idx) => (
                                                        <div key={idx} className="flex flex-col md:flex-row items-center gap-4 md:gap-8 p-5 bg-zinc-900/30 border border-white/5 rounded-2xl w-full max-w-2xl">
                                                            <div className="flex-1 text-center md:text-left">
                                                                <h4 className="text-white font-bold text-lg mb-1">{addon.name}</h4>
                                                                <p className="text-zinc-400 text-sm">{addon.desc}</p>
                                                            </div>
                                                            <div className="flex items-baseline gap-1">
                                                                <span className="text-2xl font-bold text-white">{addon.price}</span>
                                                                <span className="text-sm text-zinc-500 font-medium">{addon.period}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Supported Frameworks - Only for xCloud */}
                                        {activeCategory === "xcloud" && (
                                            <div className="mt-16 flex flex-col items-center gap-5 pt-10 border-t border-white/5 w-full mx-auto">
                                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Best for Modern Frameworks</span>
                                                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                                                    {[
                                                        { name: "Next.js", icon: siNextdotjs },
                                                        { name: "Vite", icon: siVite },
                                                        { name: "Vue", icon: siVuedotjs },
                                                        { name: "Angular", icon: siAngular },
                                                    ].map((fw) => (
                                                        <div key={fw.name} className="flex items-center gap-3 group cursor-default">
                                                            <div className="p-2.5 rounded-full bg-black border border-white/10 transition-colors">
                                                                <svg
                                                                    role="img"
                                                                    viewBox="0 0 24 24"
                                                                    className="w-5 h-5 transition-transform group-hover:scale-110"
                                                                    style={{ fill: fw.name === "Next.js" ? "white" : fw.name === "Angular" ? "#DD0031" : `#${fw.icon.hex}` }}
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <title>{fw.name}</title>
                                                                    <path d={fw.icon.path} />
                                                                </svg>
                                                            </div>
                                                            <span className="font-semibold text-sm text-zinc-400 group-hover:text-white transition-colors">{fw.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
                                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
                                            <Minus className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-medium text-white mb-2">Coming Soon</h3>
                                        <p className="text-zinc-400 max-w-sm">
                                            Pricing details for {categories.find(c => c.id === activeCategory)?.label} are currently being updated.
                                        </p>
                                    </div>
                                )}

                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

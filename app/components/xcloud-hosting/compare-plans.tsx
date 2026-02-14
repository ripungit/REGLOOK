"use client";

import React from "react";
import { Check, Minus } from "lucide-react";

const features = [
    {
        category: "Resources & Performance",
        items: [
            { name: "Bandwidth", hobby: "100 GB", pro: "1 TB", business: "5 TB" },
            { name: "Websites", hobby: "Unlimited", pro: "Unlimited", business: "Unlimited" },
            { name: "Serverless Functions", hobby: "Included", pro: "Higher Limits", business: "Custom Limits" },
            { name: "Build Minutes", hobby: "Unlimited (Standard)", pro: "Unlimited (Fast)", business: "Unlimited (Turbo)" },
            { name: "Retained Logs", hobby: "1 Day", pro: "3 Days", business: "30 Days" },
        ]
    },
    {
        category: "Workflow & CI/CD",
        items: [
            { name: "Git Integration", hobby: true, pro: true, business: true },
            { name: "Instant Rollbacks", hobby: true, pro: true, business: true },
            { name: "Preview Environments", hobby: true, pro: true, business: true },
            { name: "Team Collaboration", hobby: false, pro: true, business: true },
            { name: "Comment on Previews", hobby: false, pro: true, business: true },
        ]
    },
    {
        category: "Security & Optimization",
        items: [
            { name: "Automatic HTTPS", hobby: true, pro: true, business: true },
            { name: "DDoS Protection", hobby: "Standard", pro: "Advanced", business: "Enterprise-Grade" },
            { name: "Web Application Firewall", hobby: false, pro: true, business: true },
            { name: "Password Protection", hobby: false, pro: true, business: true },
            { name: "Single Sign-On (SSO)", hobby: false, pro: false, business: true },
        ]
    },
    {
        category: "Support & SLA",
        items: [
            { name: "Uptime SLA", hobby: false, pro: false, business: "99.99%" },
            { name: "Support Channel", hobby: "Community", pro: "Priority Email", business: "24/7 Priority Agent" },
            { name: "Onboarding Access", hobby: false, pro: false, business: true },
        ]
    }
];

export const ComparePlans = () => {
    return (
        <section className="py-32 bg-black text-white relative">
            <div className="container mx-auto px-6 max-w-[1150px]">

                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                        Compare xCloud features.
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Detailed breakdown of resources, security, and performance for every project scale.
                    </p>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto pb-4">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr>
                                <th className="p-6 text-xl font-bold bg-transparent text-white w-1/4">Features</th>
                                <th className="p-6 text-center text-zinc-300 w-1/4 align-top">
                                    <span className="block text-xl font-bold text-white mb-1">Hobby</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Starter</span>
                                </th>
                                <th className="p-6 text-center text-white w-1/4 relative align-top">
                                    {/* Highlight effect for popular plan */}
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
                                    <div className="absolute inset-0 bg-white/5 opacity-50 pointer-events-none -z-10 rounded-t-xl"></div>
                                    <span className="block text-xl font-bold text-white mb-1">Pro</span>
                                    <span className="text-xs text-green-400 uppercase tracking-widest font-bold">Most Popular</span>
                                </th>
                                <th className="p-6 text-center text-zinc-300 w-1/4 align-top">
                                    <span className="block text-xl font-bold text-white mb-1">Business</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Mission Critical</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((category, catIndex) => (
                                <React.Fragment key={catIndex}>
                                    {/* Category Header */}
                                    <tr className="border-b border-white/5 bg-zinc-900/20">
                                        <td colSpan={4} className="p-4 pl-6 text-xs font-bold uppercase tracking-widest text-white">
                                            {category.category}
                                        </td>
                                    </tr>

                                    {/* Rows */}
                                    {category.items.map((item: any, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <td className="p-6 text-zinc-300 font-medium border-r border-white/5 md:border-none relative">
                                                {item.name}
                                                {/* Tooltip hint could go here */}
                                            </td>

                                            {/* Hobby Cell */}
                                            <td className="p-6 text-center text-zinc-400 font-medium">
                                                {renderCell(item.hobby)}
                                                {item.hobby_sub && <span className="block text-[10px] text-zinc-600 mt-1 uppercase tracking-wide">{item.hobby_sub}</span>}
                                            </td>

                                            {/* Pro Cell (Highlighted) */}
                                            <td className="p-6 text-center text-white font-semibold bg-white/[0.02] relative">
                                                <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                                {renderCell(item.pro)}
                                                {item.pro_sub && <span className="block text-[10px] text-green-300/60 mt-1 uppercase tracking-wide">{item.pro_sub}</span>}
                                            </td>

                                            {/* Business Cell */}
                                            <td className="p-6 text-center text-zinc-400 font-medium">
                                                {renderCell(item.business)}
                                                {item.business_sub && <span className="block text-[10px] text-zinc-600 mt-1 uppercase tracking-wide">{item.business_sub}</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-zinc-500 mb-6">Need a custom enterprise solution?</p>
                    <button className="px-8 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all font-semibold text-sm">
                        Contact Sales
                    </button>
                </div>
            </div>
        </section>
    );
};

const renderCell = (value: string | boolean) => {
    if (value === true) return <Check className="w-5 h-5 text-emerald-500 mx-auto" />;
    if (value === false) return <Minus className="w-5 h-5 text-zinc-700 mx-auto" />;
    return value;
};

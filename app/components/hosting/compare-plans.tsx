"use client";

import React from "react";
import { Check, X, Minus } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        category: "Hardware & Performance",
        items: [
            { name: "CPU Allocation", dm: "1x High-Performance", cc: "2x High-Performance", mr: "4x High-Performance" },
            { name: "RAM Allocation", dm: "1 GB LVE", cc: "2 GB LVE", mr: "4 GB LVE" },
            { name: "Storage (NVMe)", dm: "20 GB", cc: "50 GB", mr: "500 GB (Unmetered)" },
            { name: "Bandwidth", dm: "Unmetered", cc: "Unmetered", mr: "Unmetered" },
            { name: "Inodes Limit", dm: "200,000", cc: "400,000", mr: "Unlimited" },
        ]
    },
    {
        category: "Domain & Web",
        items: [
            { name: "Hosted Domains", dm: "1", cc: "5", mr: "Unlimited" },
            { name: "Subdomains", dm: "Unlimited", cc: "Unlimited", mr: "Unlimited" },
            { name: "Free Domain (1st Year)", dm: false, cc: true, mr: true },
            { name: "Website Builder", dm: "Basic", cc: "AI Pro", mr: "AI Enterprise" },
        ]
    },
    {
        category: "Security & SSL",
        items: [
            { name: "SSL Certificate", dm: "AutoSSL (Free)", cc: "Wildcard SSL", mr: "Advanced EV Ready" },
            { name: "DDoS Protection", dm: true, cc: true, mr: true },
            { name: "Malware Scanner", dm: "Daily", cc: "Real-time", mr: "Real-time AI" },
            { name: "Imunify360™", dm: "Standard", cc: "Pro", mr: "Neural Network" },
            { name: "Auto-Backups", dm: "Weekly", cc: "Daily", mr: "Daily + Hourly" },
        ]
    },
    {
        category: "Email & Communication",
        items: [
            { name: "Mailboxes", dm: "5 (1 Year Free)", cc: "Unlimited", mr: "Unlimited" },
            { name: "Mail Storage", dm: "5 GB", cc: "10 GB / User", mr: "50 GB / User" },
            { name: "Spam Protection", dm: "Standard", cc: "Premium", mr: "Enterprise" },
            { name: "REGLOOK MAIL® Tier", dm: "Lite", cc: "Pro", mr: "Enterprise" },
        ]
    },
    {
        category: "Support & Extras",
        items: [
            { name: "Control Panel", dm: "cPanel", cc: "cPanel", mr: "cPanel + SSH" },
            { name: "Migration Service", dm: false, cc: "Standard", mr: "White-Glove" },
            { name: "Uptime SLA", dm: "99.9%", cc: "99.99%", mr: "100%" },
            { name: "Support Access", dm: "Ticket / Chat", dm_sub: "Standard Queue", cc: "Ticket / Chat", cc_sub: "Priority Queue", mr: "24/7 Expert", mr_sub: "Instant Access" },
        ]
    }
];

export const ComparePlans = () => {
    return (
        <section className="py-32 bg-black text-white relative">
            <div className="container mx-auto px-6 max-w-[1150px]">

                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                        Compare web hosting features.
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Detailed breakdown of resources, security, and performance for every mission scale.
                    </p>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto pb-4">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr>
                                <th className="p-6 text-xl font-bold bg-transparent text-white w-1/4">Features</th>
                                <th className="p-6 text-center text-zinc-300 w-1/4 align-top">
                                    <span className="block text-xl font-bold text-white mb-1">Dark Matter</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Starter</span>
                                </th>
                                <th className="p-6 text-center text-white w-1/4 relative align-top">
                                    {/* Highlight effect for popular plan */}
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
                                    <div className="absolute inset-0 bg-white/5 opacity-50 pointer-events-none -z-10 rounded-t-xl"></div>
                                    <span className="block text-xl font-bold text-white mb-1">Cosmic Core</span>
                                    <span className="text-xs text-indigo-400 uppercase tracking-widest font-bold">Most Popular</span>
                                </th>
                                <th className="p-6 text-center text-zinc-300 w-1/4 align-top">
                                    <span className="block text-xl font-bold text-white mb-1">Matter Release</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Business</span>
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

                                            {/* Dark Matter Cell */}
                                            <td className="p-6 text-center text-zinc-400 font-medium">
                                                {renderCell(item.dm)}
                                                {item.dm_sub && <span className="block text-[10px] text-zinc-600 mt-1 uppercase tracking-wide">{item.dm_sub}</span>}
                                            </td>

                                            {/* Cosmic Core Cell (Highlighted) */}
                                            <td className="p-6 text-center text-white font-semibold bg-white/[0.02] relative">
                                                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                                {renderCell(item.cc)}
                                                {item.cc_sub && <span className="block text-[10px] text-indigo-300/60 mt-1 uppercase tracking-wide">{item.cc_sub}</span>}
                                            </td>

                                            {/* Matter Release Cell */}
                                            <td className="p-6 text-center text-zinc-400 font-medium">
                                                {renderCell(item.mr)}
                                                {item.mr_sub && <span className="block text-[10px] text-zinc-600 mt-1 uppercase tracking-wide">{item.mr_sub}</span>}
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

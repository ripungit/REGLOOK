"use client";

import React from "react";
import { Check, Minus, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export const EmailComparePlans = () => {
    const features = [
        {
            category: "Mailbox Features",
            items: [
                { name: "Storage per User", starter: "10 GB", pro: "50 GB", enterprise: "100 GB" },
                { name: "Max Attachment Size", starter: "25 MB", pro: "50 MB", enterprise: "50 MB" },
                { name: "Email Aliases", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
                { name: "Webmail Access", starter: true, pro: true, enterprise: true },
                { name: "IMAP / POP3 / SMTP", starter: true, pro: true, enterprise: true },
            ]
        },
        {
            category: "Security & Protection",
            items: [
                { name: "SSL/TLS Encryption", starter: true, pro: true, enterprise: true },
                { name: "Spam & Virus Protection", starter: "Basic", pro: "Advanced", enterprise: "Premium" },
                { name: "Two-Factor Auth (2FA)", starter: true, pro: true, enterprise: true },
                { name: "Email Archiving", starter: false, pro: false, enterprise: true },
            ]
        },
        {
            category: "Collaboration & Tools",
            items: [
                { name: "Contact Management", starter: true, pro: true, enterprise: true },
                { name: "Calendar", starter: true, pro: true, enterprise: true },
                { name: "Shared Calendars", starter: false, pro: true, enterprise: true },
                { name: "ActiveSync", starter: false, pro: true, enterprise: true },
            ]
        },
        {
            category: "Support",
            items: [
                { name: "Support Level", starter: "Standard", pro: "Priority", enterprise: "Dedicated 24/7" },
                { name: "Migration Assistance", starter: false, pro: true, enterprise: true },
                { name: "Uptime SLA", starter: "99.9%", pro: "99.9%", enterprise: "99.99%" },
            ]
        }
    ];

    const renderCell = (value: string | boolean) => {
        if (typeof value === "boolean") {
            return value ? (
                <div className="flex justify-center"><Check className="w-5 h-5 text-indigo-400" /></div>
            ) : (
                <div className="flex justify-center"><Minus className="w-5 h-5 text-zinc-700" /></div>
            );
        }
        return <span className="text-zinc-300 font-medium">{value}</span>;
    };

    return (
        <section className="py-32 bg-black text-white relative">
            <div className="container mx-auto px-6 max-w-[1150px]">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Compare business email plans.</h2>
                    <p className="text-zinc-400 text-lg">Find the perfect solution for your communication needs.</p>
                </div>

                <div className="overflow-x-auto pb-4">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr>
                                <th className="p-6 w-1/4"></th>
                                <th className="p-6 w-1/4 text-center">
                                    <div className="text-xl font-bold mb-2">Starter</div>
                                    <div className="text-sm text-zinc-400">Essential basics</div>
                                </th>
                                <th className="p-6 w-1/4 text-center relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
                                    <div className="text-xl font-bold mb-2 text-white">Pro</div>
                                    <div className="text-sm text-indigo-400 font-medium">Most Popular</div>
                                </th>
                                <th className="p-6 w-1/4 text-center">
                                    <div className="text-xl font-bold mb-2">Enterprise</div>
                                    <div className="text-sm text-zinc-400">Maximum power</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((section, sIndex) => (
                                <React.Fragment key={section.category}>
                                    <tr>
                                        <td colSpan={4} className="p-6 bg-zinc-900/30 text-xs font-bold uppercase tracking-widest text-white border-y border-white/5">
                                            {section.category}
                                        </td>
                                    </tr>
                                    {section.items.map((item, iIndex) => (
                                        <tr key={item.name} className="group hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-none">
                                            <td className="p-6 py-5 text-zinc-300 font-medium flex items-center gap-2">
                                                {item.name}
                                                <HelpCircle className="w-3.5 h-3.5 text-zinc-600 cursor-help" />
                                            </td>
                                            <td className="p-6 py-5 text-center text-sm">{renderCell(item.starter)}</td>
                                            <td className={`p-6 py-5 text-center text-sm ${"bg-white/[0.02]"}`}>{renderCell(item.pro)}</td>
                                            <td className="p-6 py-5 text-center text-sm">{renderCell(item.enterprise)}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 text-center">
                    <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-zinc-200 transition-colors">
                        Get Started Now
                    </button>
                </div>
            </div>
        </section>
    );
};

"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    Eye,
    LayoutTemplate,
    Plus,
    Globe,
    Check,
    ArrowBigLeft,
    Grid,
    Grid2X2Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DomainManagerPage() {
    // Mock data based on the image
    const [domains, setDomains] = React.useState([
        {
            id: 1,
            name: "eeev.in",
            expiry: "Aug 20, 2026",
            expiryProgress: 75,
            autoRenew: false,
            privacy: "Public",
            icon: Globe
        },
        {
            id: 2,
            name: "touchpay.one",
            expiry: "Jun 21, 2026",
            expiryProgress: 60,
            autoRenew: false,
            privacy: "Private",
            icon: Globe
        }
    ]);

    const toggleAutoRenew = (id: number) => {
        setDomains(domains.map(domain =>
            domain.id === id ? { ...domain, autoRenew: !domain.autoRenew } : domain
        ));
    };

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10]">

            {/* 1. Teal Header Strip */}
            <div className="w-full bg-[#00695c] py-4 md:py-6 shadow-md z-10">
                <div className="w-full px-4 md:px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-2 md:gap-4">
                            <Link href="/foundation">
                                <Button variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-8 w-8 md:h-10 md:w-10">
                                    <ArrowLeft size={20} className="md:w-[22px] md:h-[22px]" />
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="hidden md:block p-1.5 md:p-2 bg-white/10 rounded-full backdrop-blur-sm">
                                    <Globe className="text-white w-4 h-4 md:w-[22px] md:h-[22px]" />
                                </div>
                                <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight">Domain Manager</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <Button className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-4 md:px-8 h-8 md:h-10 flex items-center gap-2 transition-all text-xs md:text-sm">
                                <Plus size={16} className="md:w-[18px] md:h-[18px]" />
                                <span className="hidden sm:inline">New domain</span>
                                <span className="sm:hidden">New</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full h-8 w-8 md:h-10 md:w-10">
                                <HelpCircle size={20} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="w-full px-4 md:px-6 max-w-[1200px] lg:px-10 py-6 md:py-8 flex-1">

                {/* Controls Bar */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-5 mb-6 md:mb-10 w-full">

                    {/* Search & Filters */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                        <div className="relative group w-full sm:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                            <Input
                                placeholder="Search here"
                                className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-full sm:w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-all shadow-sm"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <HelpCircle size={14} className="text-zinc-600 cursor-help hover:text-zinc-400 transition-colors" />
                            </div>
                        </div>

                        <div className="bg-[#1c1c1f] border border-zinc-800 rounded-lg flex items-center p-1 gap-1 shadow-sm">
                            <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                <SlidersHorizontal size={14} /> Filters
                            </Button>
                            <div className="w-[1px] h-5 bg-zinc-800" />
                            <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                <ArrowUpDown size={14} /> Alphabetically
                            </Button>
                        </div>
                    </div>

                    {/* View Options */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-9 text-white font-semibold hover:text-white bg-[#1c1c1f] hover:bg-[#1c1c1f]/60 cursor-pointer rounded-full gap-2 px-4 transition-colors">
                            <Eye size={16} /> <span className="text-xs">Show/Hide</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 text-white font-semibold hover:text-white bg-[#1c1c1f] hover:bg-[#1c1c1f]/60 cursor-pointer rounded-full gap-2 px-4 transition-colors">
                            <Grid2X2Check size={16} /> <span className="text-xs">Columns</span>
                        </Button>
                    </div>
                </div>

                {/* Domain List */}
                <div className="w-full">
                    {/* Header Row */}
                    <div className="grid grid-cols-12 gap-2 md:gap-4 px-2 md:px-4 py-3 border-b border-zinc-800/50 mb-2">
                        <div className="col-span-8 md:col-span-4 flex items-center gap-3 md:gap-6">
                            <Checkbox className="border-zinc-700 data-[state=checked]:bg-teal-600/90 data-[state=checked]:border-teal-600 rounded-[4px] h-4 w-4" />
                            <span className="text-xs md:text-sm font-semibold text-zinc-400">Domains ({domains.length})</span>
                        </div>
                        <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Expires on</div>
                        <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Auto-renew</div>
                        <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Privacy</div>
                        <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400 text-right">Connections</div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-2 md:space-y-1">
                        {domains.map((domain, index) => (
                            <motion.div
                                key={domain.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group grid grid-cols-12 gap-x-2 gap-y-3 md:gap-4 items-center px-3 py-4 md:px-4 md:py-4 rounded-xl bg-[#1c1c1f]/40 md:bg-transparent hover:bg-[#1c1c1f] transition-all border border-white/5 md:border-transparent hover:border-zinc-800 cursor-pointer"
                            >
                                {/* Name Column */}
                                <div className="col-span-12 md:col-span-4 flex items-center gap-3 md:gap-6">
                                    <div className="flex items-center justify-center">
                                        <Checkbox className="border-zinc-700 data-[state=checked]:bg-teal-600/90 data-[state=checked]:border-teal-600 rounded-[4px] h-4 w-4 transition-all opacity-100 md:opacity-40 group-hover:opacity-100" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                                            <domain.icon size={16} />
                                        </div>
                                        <span className="text-white font-semibold text-sm md:text-[15px] tracking-tight">{domain.name}</span>
                                    </div>
                                </div>

                                {/* Expiry Column */}
                                <div className="col-span-12 md:col-span-2 flex flex-col gap-2 md:pr-6 pl-11 md:pl-0">
                                    <div className="flex justify-between md:block">
                                        <span className="md:hidden text-xs text-zinc-500 font-medium">Expires</span>
                                        <span className="text-zinc-400 text-sm font-medium">{domain.expiry}</span>
                                    </div>
                                    <Progress value={domain.expiryProgress} className="h-1 bg-zinc-800" indicatorClassName={domain.expiryProgress > 50 ? "bg-emerald-500" : "bg-teal-500"} />
                                </div>

                                {/* Auto-renew Column */}
                                <div className="col-span-6 md:col-span-2 flex items-center justify-between md:justify-start gap-3 pl-11 md:pl-0">
                                    <span className="md:hidden text-xs text-zinc-500 font-medium">Auto-renew</span>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-semibold w-4 transition-colors ${domain.autoRenew ? "text-emerald-500" : "text-zinc-500"}`}>
                                            {domain.autoRenew ? "On" : "Off"}
                                        </span>
                                        <Switch
                                            checked={domain.autoRenew}
                                            onCheckedChange={() => toggleAutoRenew(domain.id)}
                                            className="data-[state=checked]:bg-emerald-600 scale-90 md:scale-100 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* Privacy Column */}
                                <div className="col-span-6 md:col-span-2 flex items-center justify-between md:justify-start pl-0 md:pl-0">
                                    <span className="md:hidden text-xs text-zinc-500 font-medium">Privacy</span>
                                    <span className={`text-sm font-semibold ${domain.privacy === 'Public' ? 'text-zinc-400' : 'text-emerald-500'}`}>
                                        {domain.privacy}
                                    </span>
                                </div>

                                {/* Connect Column */}
                                <div className="col-span-12 md:col-span-2 flex justify-start md:justify-end mt-2 md:mt-0">
                                    <Button className="w-full md:w-auto bg-[#27272a] md:bg-[#1c1c1f] cursor-pointer font-semibold rounded-lg md:rounded-full border border-zinc-700 md:border-zinc-800 text-zinc-200 md:text-zinc-300 hover:text-white hover:bg-zinc-700 hover:border-zinc-600 gap-1.5 h-9 md:h-8 px-4 text-xs transition-all shadow-sm">
                                        <Plus size={14} /> Connect
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

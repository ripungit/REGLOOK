"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    Eye,
    Grid2X2Check,
    Globe,
    Wifi,
    CreditCard,
    Box,
    Zap,
    ArrowRight,
    AlertTriangle,
    ExternalLink,
    Plus,
    ArrowUp,
    ChevronUp,
    LayoutDashboard,
    BoxIcon,
    ShieldCheck,
    Users,
    FileText,
    BarChart3,
    Settings2,
    AppWindow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function SellerConsoleContent() {
    // Mock data based on the provided image
    const [domains, setDomains] = React.useState([
        {
            id: 2,
            name: "ondust.com",
            isListed: true,
            isExternal: true,
            warning: "Product needs DNS configuration",
            minOffer: { status: "ON", currency: "$", value: "4,900" },
            buyItNow: { status: "ON", currency: "$", value: "5,000" },
            leasing: { value: "$5,000", duration: "12 months" },
            salePage: { status: "Connecting...", color: "text-zinc-400", dotColor: "bg-zinc-500" },
            dateListed: "Jan 2, 2026"
        }
    ]);

    const [activeTab, setActiveTab] = React.useState("Domains");

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Red Header Strip (Always Visible) */}
            <div className="w-full bg-[#173d39] py-4 md:py-6 shadow-md z-10 transition-colors duration-300">
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
                                    <ShieldCheck className="text-white w-4 h-4 md:w-[22px] md:h-[22px]" />
                                </div>
                                <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight">Seller Console</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            {/* <Button variant="ghost" size="sm" className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">Manage DNS presets</span>
                                <ExternalLink size={16} />
                            </Button> */}
                            {/* <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full h-10 w-10">
                                <HelpCircle size={22} />
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Navigation Tabs */}
            <div className="w-full border-b border-zinc-800 bg-[#0f0f10]">
                <div className="w-full px-4 md:px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                        {["Leads", "Domains", "Leasing", "Sold", "Statistics", "Settings"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-sm font-semibold py-4 relative transition-colors whitespace-nowrap ${activeTab === tab
                                    ? "text-white"
                                    : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#173d39] rounded-t-full"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Main Content Area */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-8 flex-1">

                {/* --- TAB: DOMAINS --- */}
                {activeTab === "Domains" && (
                    <>
                        {/* Controls Bar */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5 mb-6 md:mb-8 w-full">
                            {/* Search & Filters */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                                <div className="relative group w-full sm:w-[240px]">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                                    <Input
                                        placeholder="Search domains"
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 font-medium text-zinc-200 placeholder:text-zinc-500 rounded-lg w-full h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all shadow-sm"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <HelpCircle size={16} className="text-zinc-500 cursor-help hover:text-zinc-300 transition-colors" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <Button variant="ghost" className="flex-1 sm:flex-none h-10 bg-[#1c1c1f] border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 gap-2 px-4 text-sm font-semibold rounded-lg group">
                                        <SlidersHorizontal size={14} className="text-white" /> Filters <span className="text-zinc-500">· 1</span>
                                    </Button>

                                    <Button variant="ghost" className="flex-1 sm:flex-none h-10 bg-[#1c1c1f] border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 gap-2 px-4 text-sm font-semibold rounded-lg">
                                        <ArrowUpDown size={14} className="text-white" /> Domains
                                    </Button>
                                </div>
                            </div>

                            {/* Right Actions */}
                            <div className="flex items-center gap-3 w-full sm:w-auto mt-2 md:mt-0">
                                <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 hover:text-white bg-[#1c1c1f] hover:bg-zinc-800 border border-zinc-800 rounded-lg shrink-0">
                                    <ArrowUp size={18} className="rotate-180" />
                                </Button>
                                <Button className="flex-1 sm:flex-none h-10 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold text-sm px-6 rounded-lg flex items-center justify-center gap-2 transition-all">
                                    <Plus size={16} /> Import domains
                                </Button>
                            </div>
                        </div>

                        {/* Domain List Table */}
                        <div className="w-full">
                            {/* Header Row */}
                            <div className="grid grid-cols-12 gap-2 md:gap-4 px-2 md:px-4 py-3 border-b border-zinc-800 mb-2">
                                <div className="col-span-12 md:col-span-4 flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                    <span className="text-sm font-semibold text-zinc-400">Domains ({domains.length})</span>
                                    <ArrowUp size={12} className="text-zinc-400" />
                                </div>
                                <div className="hidden md:block md:col-span-2 text-sm font-semibold text-zinc-400">Min offer</div>
                                <div className="hidden md:block md:col-span-2 text-sm font-semibold text-zinc-400">Buy it now</div>
                                <div className="hidden md:block md:col-span-2 text-sm font-semibold text-zinc-400">Leasing</div>
                                <div className="hidden md:block md:col-span-1 text-sm font-semibold text-zinc-400 text-right">Date listed</div>
                            </div>

                            {/* Rows */}
                            <div className="space-y-2 md:space-y-1">
                                {domains.map((domain) => (
                                    <motion.div
                                        key={domain.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="group grid grid-cols-12 gap-y-4 md:gap-4 items-center px-4 py-4 hover:bg-[#1c1c1f]/40 transition-all border-b border-zinc-800/40 last:border-0 md:rounded-none rounded-xl bg-[#1c1c1f]/20 md:bg-transparent border border-white/5 md:border-0 md:border-b"
                                    >
                                        <div className="col-span-12 md:col-span-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-4">
                                                <BoxIcon size={20} className="mt-1 flex-shrink-0" />
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <span className="text-white font-bold text-[16px] tracking-tight truncate max-w-[200px] md:max-w-none">{domain.name}</span>
                                                    {domain.isListed && (
                                                        <Badge className="bg-[#173d39] text-white hover:bg-[#123126] mt-1 border-0 text-[10px] font-semibold uppercase tracking-wider h-5 px-1.5 rounded-sm">
                                                            LISTED
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-6 md:col-span-2 pl-9 md:pl-0 flex flex-col justify-center">
                                            <span className="text-xs text-zinc-500 uppercase font-bold md:hidden mb-1">Min Offer</span>
                                            <span className="text-white font-semibold text-lg">{domain.minOffer.currency}{domain.minOffer.value}</span>
                                        </div>

                                        <div className="col-span-6 md:col-span-2 flex flex-col justify-center">
                                            <span className="text-xs text-zinc-500 uppercase font-bold md:hidden mb-1">Buy It Now</span>
                                            <span className="text-white font-semibold text-lg">{domain.buyItNow.currency}{domain.buyItNow.value}</span>
                                        </div>

                                        <div className="col-span-12 md:col-span-2 flex items-center text-sm font-medium text-white pl-9 md:pl-0">
                                            <span className="text-xs text-zinc-500 uppercase font-bold md:hidden mr-2">Leasing:</span>
                                            {domain.leasing.value} <span className="text-zinc-500 ml-1">/ {domain.leasing.duration}</span>
                                        </div>

                                        <div className="hidden md:block col-span-12 md:col-span-1 text-right text-zinc-400 text-sm font-medium">
                                            {domain.dateListed}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* --- TAB: LEADS --- */}
                {activeTab === "Leads" && (
                    <div className="w-full flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-[#1c1c1f] rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                            <Users size={32} className="text-zinc-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">No active leads</h3>
                        <p className="text-zinc-400 max-w-sm mb-8 leading-relaxed">
                            You haven't received any inquiries or offers yet. Optimize your listings and pricing to attract more potential buyers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button className="w-full sm:w-auto bg-white text-black font-semibold hover:bg-gray-200 rounded-full cursor-pointer h-10 px-6">Optimize Listings</Button>
                            <Button className="w-full sm:w-auto bg-white text-black font-semibold hover:bg-gray-200 rounded-full cursor-pointer h-10 px-6">Learn how to sell faster</Button>
                        </div>
                    </div>
                )}

                {/* --- TAB: LEASING --- */}
                {activeTab === "Leasing" && (
                    <div className="w-full">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                            <h2 className="text-xl font-bold text-white">Active Lease Agreements</h2>
                            <Button className="w-full sm:w-auto bg-[#27272a] hover:bg-[#3f3f46] text-white font-semibold rounded-full px-5 h-9 flex items-center justify-center gap-2 transition-all">
                                <FileText size={16} className="text-zinc-400" />
                                Export Report
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="group relative p-6 bg-[#161618] border border-zinc-800 hover:border-zinc-700 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all shadow-sm">

                                {/* Left: Domain & Status */}
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20 shrink-0">
                                        <CreditCard size={20} className="text-teal-500" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-white font-bold text-xl tracking-tight">touchpay.one</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge className="bg-teal-500/15 text-teal-500 hover:bg-teal-500/25 border-0 text-[10px] font-bold uppercase tracking-wider px-2 h-5 rounded-md">
                                                Active
                                            </Badge>
                                            <span className="text-zinc-600 text-xs font-medium">•</span>
                                            <span className="text-zinc-400 text-xs font-medium">3 months remaining</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Price & Details */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 w-full md:w-auto">
                                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-0.5">
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Lease Value</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-white font-bold text-2xl">$5,000</span>
                                            <span className="text-zinc-500 text-sm font-medium">/ year</span>
                                        </div>
                                    </div>

                                    <div className="h-px w-full sm:h-10 sm:w-px bg-zinc-800 hidden sm:block" />

                                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-1 min-w-[100px]">
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Next Payment</p>
                                        <p className="text-white font-semibold text-sm">Feb 2, 2026</p>
                                    </div>

                                    <Button variant="ghost" size="icon" className="hidden sm:flex text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full h-8 w-8 ml-2">
                                        <ArrowRight size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: SOLD --- */}
                {activeTab === "Sold" && (
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-white">Sales History</h2>
                            <div className="flex gap-2">
                                <Button className="text-zinc-400 hover:text-white rounded-full font-semibold">Export CSV</Button>
                            </div>
                        </div>

                        <div className="bg-[#1c1c1f] border border-zinc-800 rounded-xl overflow-hidden">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center justify-between p-5 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <ArrowUp size={16} className="rotate-45" />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">retro-cloud.com</p>
                                            <p className="text-xs text-zinc-500">Sold via Buy It Now • Dec {10 + i}, 2025</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold">$2,900.00</p>
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full">PAID</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- TAB: STATISTICS --- */}
                {activeTab === "Statistics" && (
                    <div className="w-full">
                        {/* Header Row */}
                        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800 mb-2">
                            <div className="col-span-12 md:col-span-6 flex items-center gap-2">
                                <span className="text-sm font-semibold text-zinc-400">Domains (1)</span>
                            </div>
                            <div className="hidden md:flex col-span-2 items-center gap-2 text-zinc-200 text-sm font-semibold">
                                Page Views <ArrowUp size={12} className="rotate-180 text-zinc-500" />
                            </div>
                            <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">
                                Visits
                            </div>
                            <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">
                                Search Views
                            </div>
                        </div>

                        {/* Rows */}
                        <div className="space-y-1">
                            <div className="group grid grid-cols-12 gap-y-4 md:gap-4 items-center px-4 py-4 hover:bg-[#1c1c1f]/40 transition-all border-b border-zinc-800/40 last:border-0 hover:border-zinc-700/50 bg-[#1c1c1f]/20 md:bg-transparent rounded-xl md:rounded-none">
                                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                                    <BoxIcon size={20} className="mt-1" />
                                    <span className="text-white font-bold text-[16px] tracking-tight">ondust.com</span>
                                </div>

                                <div className="col-span-4 md:col-span-2 flex flex-col md:flex-row md:items-center gap-1 md:gap-2 pl-2">
                                    <span className="text-xs text-zinc-500 uppercase font-bold md:hidden">Page Views</span>
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <AppWindow size={16} className="text-zinc-500" /> 0
                                    </div>
                                </div>

                                <div className="col-span-4 md:col-span-2 flex flex-col md:flex-row md:items-center gap-1 md:gap-2 pl-1">
                                    <span className="text-xs text-zinc-500 uppercase font-bold md:hidden">Visits</span>
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <Globe size={16} className="text-zinc-500" /> 0
                                    </div>
                                </div>

                                <div className="col-span-4 md:col-span-2 flex flex-col md:flex-row md:items-center gap-1 md:gap-2 pl-1">
                                    <span className="text-xs text-zinc-500 uppercase font-bold md:hidden">Search Views</span>
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <Search size={16} className="text-zinc-500" /> 0
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: SETTINGS --- */}
                {activeTab === "Settings" && (
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#173d39] rounded-lg">
                                    <Settings2 className="text-white" size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-white">Seller Preferences</h2>
                            </div>
                            <Button className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 font-semibold px-6 rounded-full transition-colors">
                                Save Changes
                            </Button>
                        </div>

                        <div className="grid gap-6">
                            {/* Payment Configuration Card */}
                            <div className="bg-transparent border border-zinc-800 rounded-xl overflow-hidden">
                                <div className="px-6 py-4 border-b border-zinc-800 bg-white/5 flex items-center gap-2">
                                    <CreditCard size={18} className="text-zinc-400" />
                                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">Payment Configuration</h3>
                                </div>

                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-zinc-300">Default Currency</label>
                                        <Input
                                            defaultValue="USD - US Dollar"
                                            className="bg-[#0f0f10] border-zinc-800 mt-2 text-white h-12 focus-visible:ring-indigo-500 rounded-lg"
                                        />
                                        <p className="text-xs text-zinc-500">The currency used for all your listings by default.</p>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-zinc-300">Payout Method</label>
                                        <div className="relative">
                                            <Input
                                                defaultValue="Bank Transfer (**** 4212)"
                                                className="bg-[#0f0f10] border-zinc-800 mt-2 text-white h-12 focus-visible:ring-indigo-500 rounded-lg pr-10"
                                            />

                                        </div>
                                        <p className="text-xs text-zinc-500">Where your earnings will be sent automatically.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Automation Card */}
                            <div className="bg-transparent border border-zinc-800 rounded-xl overflow-hidden">
                                <div className="px-6 py-4 border-b border-zinc-800 bg-white/5 flex items-center gap-2">
                                    <Zap size={18} className="text-zinc-400" />
                                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">Automation</h3>
                                </div>

                                <div className="p-6">
                                    <label className="flex items-start gap-4 p-4 border border-zinc-800 bg-[#0f0f10] rounded-xl cursor-pointer hover:border-zinc-700 transition-all group">
                                        <Checkbox className="mt-1 border-[#173d39] data-[state=checked]:bg-[#173d39] data-[state=checked]:border-[#173d39]" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-base font-bold text-white group-hover:text-[#fff] transition-colors">Enable Auto-Accept Offers</p>
                                            </div>
                                            <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                                                Automatically accept any incoming offers that meet or exceed your set 'Buy It Now' price.
                                                This helps close deals faster without manual intervention.
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default function SellerConsolePage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <SellerConsoleContent />
        </React.Suspense>
    );
}



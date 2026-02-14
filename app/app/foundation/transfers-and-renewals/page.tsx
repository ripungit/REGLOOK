"use client";

import React from "react";
import {
    ArrowLeft,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    Eye,
    Grid2X2Check,
    Globe,
    Wifi,
    ExternalLink,
    Plus,
    RefreshCw,
    ArrowRightLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function TransfersAndRenewalsContent() {
    const [domains, setDomains] = React.useState([
        {
            id: 1,
            name: "eeev.in",
            expiryDate: "2026-09-26",
            autoRenew: true,
            status: "ACTIVE",
            statusColor: "text-emerald-500",
            daysLeft: 630
        },
        {
            id: 2,
            name: "ondust.com",
            expiryDate: "2025-11-15",
            autoRenew: false,
            status: "EXPIRING SOON",
            statusColor: "text-amber-500",
            daysLeft: 314
        },
        {
            id: 3,
            name: "touchpay.one",
            expiryDate: "2027-01-01",
            autoRenew: true,
            status: "ACTIVE",
            statusColor: "text-emerald-500",
            daysLeft: 726
        }
    ]);

    const [selectedDomain, setSelectedDomain] = React.useState<typeof domains[0] | null>(null);
    const [activeTab, setActiveTab] = React.useState("transfer-in");

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Sync URL param 'manage' with selectedDomain state
    React.useEffect(() => {
        const manageDomain = searchParams.get("manage");
        if (manageDomain) {
            const domain = domains.find(d => d.name === manageDomain);
            if (domain) {
                setSelectedDomain(domain);
            } else {
                setSelectedDomain(null);
            }
        } else {
            setSelectedDomain(null);
        }
    }, [searchParams, domains]);

    const handleDomainSelect = (domain: typeof domains[0]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("manage", domain.name);
        router.push(pathname + "?" + params.toString());
    };

    const handleClearSelection = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("manage");
        router.push(pathname + "?" + params.toString());
    };

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip (Always Visible - Green Theme) */}
            <div className="w-full bg-[#004030] py-4 md:py-6 shadow-md z-10 transition-colors duration-300">
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
                                    <RefreshCw className="text-white w-4 h-4 md:w-[22px] md:h-[22px]" />
                                </div>
                                <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight">Transfers & Renewals</h1>
                            </div>
                        </div>

                        {/* Right: Actions (Commented out but kept for consistent layout if needed later) */}
                        {/* <div className="flex items-center gap-3">...</div> */}
                    </div>
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="w-full px-4 max-w-[1200px] lg:px-10 mx-auto py-8">

                {/* LIST VIEW (Default) */}
                {!selectedDomain ? (
                    <>
                        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 md:gap-0">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                                <div className="relative group w-full md:w-[320px]">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                                    <Input
                                        placeholder="Search domains..."
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 text-zinc-200 placeholder:text-zinc-500 rounded-lg w-full h-10 focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:border-zinc-700 transition-all shadow-sm font-medium"
                                    />
                                </div>
                                <Button variant="secondary" className="h-10 bg-[#1c1c1f] hover:bg-[#27272a] text-zinc-300 hover:text-white border border-zinc-800 text-sm font-bold px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                    <SlidersHorizontal size={14} /> Filters
                                </Button>
                            </div>

                            {/* View Options */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
                                <Button variant="ghost" size="sm" className="h-9 text-white font-semibold hover:text-white bg-[#1c1c1f] hover:bg-[#1c1c1f]/60 cursor-pointer rounded-full gap-2 px-4 transition-colors shrink-0">
                                    <Eye size={16} /> <span className="text-xs">Show/Hide</span>
                                </Button>
                            </div>
                        </div>

                        {/* Domain List */}
                        <div className="w-full">
                            {/* Header Row */}
                            <div className="grid grid-cols-12 gap-2 md:gap-4 px-2 md:px-4 py-3 border-b border-zinc-800/50 mb-2">
                                <div className="col-span-8 md:col-span-4 flex items-center gap-3 md:gap-6">
                                    <Checkbox className="border-zinc-700 data-[state=checked]:bg-[#004030] data-[state=checked]:border-[#004030] rounded-[4px] h-4 w-4" />
                                    <span className="text-xs md:text-sm font-semibold text-zinc-400">Domains ({domains.length})</span>
                                </div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Expiry Date</div>
                                <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Auto-Renew</div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Status</div>
                            </div>

                            {/* Rows */}
                            <div className="space-y-2 md:space-y-1">
                                {domains.map((domain, index) => (
                                    <motion.div
                                        key={domain.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleDomainSelect(domain)}
                                        className="group grid grid-cols-12 gap-x-2 gap-y-4 md:gap-4 items-start px-3 py-4 md:px-4 md:py-6 rounded-xl bg-[#1c1c1f]/40 md:bg-[#1c1c1f]/30 hover:bg-[#1c1c1f] transition-all border border-white/5 md:border-transparent hover:border-zinc-800 cursor-pointer"
                                    >
                                        {/* Name Column */}
                                        <div className="col-span-12 md:col-span-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-3 md:gap-6">
                                                <div className="flex items-center justify-center">
                                                    <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-[#004030] data-[state=checked]:border-[#004030] rounded-[4px] h-4 w-4 transition-all opacity-100 md:opacity-40 group-hover:opacity-100" />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#004030] flex items-center justify-center text-white group-hover:bg-[#004030]/70 transition-colors">
                                                        <Globe size={16} />
                                                    </div>
                                                    <span className="text-white font-bold text-sm md:text-[15px] tracking-tight">{domain.name}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expiry Date Column */}
                                        <div className="col-span-12 md:col-span-3 flex flex-col gap-1 ml-11 md:ml-0 md:pl-0">
                                            <span className="md:hidden text-xs text-zinc-500 font-medium mb-1">Expires</span>
                                            <span className="text-white text-sm font-medium">{domain.expiryDate}</span>
                                            <span className="text-zinc-500 text-xs">({domain.daysLeft} days left)</span>
                                        </div>

                                        {/* Auto-Renew Column */}
                                        <div className="col-span-6 md:col-span-2 ml-11 md:ml-0 md:pl-0">
                                            <span className="md:hidden text-xs text-zinc-500 font-medium mb-1 block">Auto-Renew</span>
                                            <Badge variant="outline" className={`text-[10px] font-bold border-zinc-800 bg-zinc-900/50 rounded-md px-2 py-1 ${domain.autoRenew ? 'text-emerald-400' : 'text-zinc-500'}`}>
                                                {domain.autoRenew ? "ON" : "OFF"}
                                            </Badge>
                                        </div>

                                        {/* Status Column */}
                                        <div className="col-span-6 md:col-span-3 flex items-center justify-between md:justify-start md:gap-4 mt-0 md:mt-0">
                                            <div className="flex flex-col md:flex-row gap-2">
                                                <span className="md:hidden text-xs text-zinc-500 font-medium mb-1 block">Status</span>
                                                <div className="flex items-center gap-2">
                                                    <Wifi size={14} className={domain.statusColor} />
                                                    <span className="text-white font-bold text-xs tracking-wide">{domain.status}</span>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="hidden md:flex text-zinc-500 hover:text-white">
                                                <ArrowRightLeft size={16} />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    /* DETAIL VIEW */
                    <div className="w-full">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4 md:gap-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#004030] flex items-center justify-center text-white">
                                    <Globe size={16} className="md:w-5 md:h-5" />
                                </div>
                                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{selectedDomain.name}</h1>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 w-full md:w-auto">
                                <Button
                                    onClick={handleClearSelection}
                                    variant="secondary"
                                    className="bg-[#1c1c1f] hover:bg-[#27272a] text-white border border-zinc-800 rounded-full h-8 md:h-9 text-xs font-semibold px-4 flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft size={14} /> See all domains
                                </Button>
                            </div>
                        </div>

                        {/* Top Info Card */}
                        <div className="w-full bg-[#1c1c1f] border border-zinc-800 rounded-2xl p-4 md:p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
                            <div className="flex flex-col gap-1 w-full md:w-auto">
                                <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">EXPIRATION DATE</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-lg font-bold">{selectedDomain.expiryDate}</span>
                                    <Badge className={`bg-transparent border ${selectedDomain.daysLeft < 60 ? 'border-white/5 text-white mt-1' : 'border-white/5 text-white mt-1'} text-[10px] uppercase font-bold px-2`}>
                                        {selectedDomain.daysLeft} DAYS LEFT
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full md:w-auto">
                                <div className="flex flex-col gap-1">
                                    <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">AUTO-RENEW</span>
                                    <span className={`text-sm font-bold ${selectedDomain.autoRenew ? 'text-white' : 'text-zinc-500'}`}>{selectedDomain.autoRenew ? 'Enabled' : 'Disabled'}</span>
                                </div>
                                <Button className="w-full sm:w-auto bg-[#004030] hover:bg-[#004030]/80 text-white font-bold h-9 px-6 rounded-full text-xs">
                                    Renew now
                                </Button>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 pr-12 md:mx-0 md:px-0 md:pr-0">
                            <button
                                onClick={() => setActiveTab("transfer-in")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "transfer-in" ? "text-white border-b-4 border-[#004030]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Transfer In
                            </button>
                            <button
                                onClick={() => setActiveTab("transfer-out")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "transfer-out" ? "text-white border-b-4 border-[#004030]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Transfer Out
                            </button>
                        </div>

                        {/* TAB CONTENT: TRANSFER IN */}
                        {activeTab === "transfer-in" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Transfer Domain In</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Move your domain to Reglook to manage everything in one place.
                                </p>

                                <div className="w-full bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden mt-6">
                                    <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between border-b border-zinc-800/50 bg-[#161618]">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            Incoming Transfers <span className="text-zinc-500 text-xs font-normal ml-1">0 active</span>
                                        </h3>
                                    </div>
                                    <div className="p-6 md:p-12 flex flex-col items-center justify-center gap-6">
                                        <div className="flex gap-4 mb-4">
                                            <div className="w-12 h-12 bg-[#004030]/20 rounded-full flex items-center justify-center text-[#004030]">
                                                <RefreshCw size={24} />
                                            </div>
                                        </div>
                                        <span className="text-zinc-500 text-sm font-medium">Start a domain transfer to this account</span>
                                        <Button className="h-9 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold text-xs px-4 rounded-full flex items-center gap-2">
                                            <Plus size={14} /> Initiate Transfer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: TRANSFER OUT */}
                        {activeTab === "transfer-out" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Transfer Domain Out</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Unlock your domain and get the auth code to move to another registrar.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-[#004030] flex items-center justify-center text-white">
                                                <ExternalLink size={16} />
                                            </div>
                                            <h3 className="text-sm font-bold text-white">Domain Lock</h3>
                                        </div>
                                        <p className="text-zinc-400 text-xs mb-6 h-10">
                                            Prevent unauthorized transfers by keeping your domain locked. You must unlock it to transfer out.
                                        </p>
                                        <div className="flex items-center justify-between bg-[#161618] p-3 rounded-lg border border-zinc-800">
                                            <span className="text-sm font-medium text-white">Transfer Lock</span>
                                            <Badge className="bg-emerald-500/10 text-emerald-500 border-0 hover:bg-emerald-500/20">ON</Badge>
                                        </div>
                                        <Button className="w-full mt-5 bg-[#1c1c1f] hover:bg-[#27272a] text-white font-bold text-xs h-10 rounded-lg">
                                            Unlock Domain
                                        </Button>
                                    </div>

                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-[#004030] flex items-center justify-center text-white">
                                                <KeyIcon />
                                            </div>
                                            <h3 className="text-sm font-bold text-white">Auth Code</h3>
                                        </div>
                                        <p className="text-zinc-400 text-xs mb-6 h-10">
                                            You will need this authorization code to initiate the transfer at the new registrar.
                                        </p>
                                        <Button className="w-full bg-[#1c1c1f] hover:bg-[#27272a] text-white font-bold text-xs h-10 rounded-lg">
                                            Request Auth Code
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function KeyIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="7.5" cy="15.5" r="5.5" />
            <path d="m21 2-9.6 9.6" />
            <path d="m15.5 7.5 3 3L22 7l-3-3" />
        </svg>
    )
}

export default function TransfersAndRenewalsPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <TransfersAndRenewalsContent />
        </React.Suspense>
    );
}


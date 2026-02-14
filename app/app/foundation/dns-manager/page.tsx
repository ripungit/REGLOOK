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
    ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function DnsManagerContent() {
    // Mock data based on the provided image
    const [domains, setDomains] = React.useState([
        {
            id: 1,
            name: "eeev.in",
            nameservers: ["ns1.dns-parking.com", "ns2.dns-parking.com"],
            status: "ONLINE",
            statusColor: "text-emerald-500",
            recordsCount: 1,
            needsSetup: false,
            isExternal: false,
            warning: null
        },
        {
            id: 2,
            name: "ondust.com",
            nameservers: ["ns1.dns-parking.com", "ns2.dns-parking.com"],
            status: "ONLINE",
            statusColor: "text-emerald-500",
            recordsCount: 1,
            needsSetup: true,
            isExternal: true,
            warning: "Product needs DNS configuration"
        },
        {
            id: 3,
            name: "touchpay.one",
            nameservers: ["ns1.dns-parking.com", "ns2.dns-parking.com"],
            status: "ONLINE",
            statusColor: "text-emerald-500",
            recordsCount: 1,
            needsSetup: false,
            isExternal: false,
            warning: null
        }
    ]);

    const [selectedDomain, setSelectedDomain] = React.useState<typeof domains[0] | null>(null);
    const [activeTab, setActiveTab] = React.useState("dns-records");

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

            {/* 1. Red Header Strip (Always Visible) */}
            <div className="w-full bg-[#5A0E24] py-4 md:py-6 shadow-md z-10 transition-colors duration-300">
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
                                    <Wifi className="text-white w-4 h-4 md:w-[22px] md:h-[22px]" />
                                </div>
                                <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight">DNS Manager</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <Button className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-4 md:px-5 h-8 md:h-10 flex items-center gap-2 transition-all text-xs md:text-sm">
                                <span className="hidden sm:inline">Manage DNS presets</span>
                                <ExternalLink size={16} className="md:w-[16px] md:h-[16px]" />
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
                {!selectedDomain ? (
                    /* LIST VIEW */
                    <>
                        {/* Controls Bar */}
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-5 mb-6 md:mb-10 w-full">
                            {/* Search & Filters */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                                <div className="relative group w-full sm:w-auto">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                                    <Input
                                        placeholder="Search here"
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-full sm:w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:border-red-500 transition-all shadow-sm"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <HelpCircle size={14} className="text-zinc-600 cursor-help hover:text-zinc-400 transition-colors" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                                    <div className="bg-[#1c1c1f] border border-zinc-800 rounded-lg flex items-center p-1 gap-1 shadow-sm shrink-0">
                                        <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                            <SlidersHorizontal size={14} /> Filters
                                        </Button>
                                        <div className="w-[1px] h-5 bg-zinc-800" />
                                        <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                            <ArrowUpDown size={14} /> Alphabetically
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* View Options */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
                                <Button variant="ghost" size="sm" className="h-9 text-white font-semibold hover:text-white bg-[#1c1c1f] hover:bg-[#1c1c1f]/60 cursor-pointer rounded-full gap-2 px-4 transition-colors shrink-0">
                                    <Eye size={16} /> <span className="text-xs">Show/Hide</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-9 text-white font-semibold hover:text-white bg-[#1c1c1f] hover:bg-[#1c1c1f]/60 cursor-pointer rounded-full gap-2 px-4 transition-colors shrink-0">
                                    <Grid2X2Check size={16} /> <span className="text-xs">Manage DNS presets</span> <ExternalLink size={12} />
                                </Button>
                            </div>
                        </div>

                        {/* Domain List */}
                        <div className="w-full">
                            {/* Header Row */}
                            <div className="grid grid-cols-12 gap-2 md:gap-4 px-2 md:px-4 py-3 border-b border-zinc-800/50 mb-2">
                                <div className="col-span-8 md:col-span-4 flex items-center gap-3 md:gap-6">
                                    <Checkbox className="border-zinc-700 data-[state=checked]:bg-red-600/90 data-[state=checked]:border-red-600 rounded-[4px] h-4 w-4" />
                                    <span className="text-xs md:text-sm font-semibold text-zinc-400">Domains ({domains.length})</span>
                                </div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Nameservers</div>
                                <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Propagation status</div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Records</div>
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
                                                    <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-red-600/90 data-[state=checked]:border-red-600 rounded-[4px] h-4 w-4 transition-all opacity-100 md:opacity-40 group-hover:opacity-100" />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#5A0E24] flex items-center justify-center text-white group-hover:bg-[#5A0E24]/70 transition-colors">
                                                        <Globe size={16} />
                                                    </div>
                                                    <span className="text-white font-bold text-sm md:text-[15px] tracking-tight">{domain.name}</span>
                                                </div>
                                            </div>

                                            {/* Warnings / Labels */}
                                            {(domain.needsSetup || domain.isExternal) && (
                                                <div className="flex flex-col gap-2 ml-11 md:ml-[70px]">
                                                    <div className="flex items-center gap-2">
                                                        {domain.isExternal && (
                                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">EXTERNAL</span>
                                                        )}
                                                        {domain.needsSetup && (
                                                            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm">
                                                                NEEDS DNS SETUP
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    {domain.warning && (
                                                        <div className="flex items-center gap-2 text-amber-500 text-xs font-medium">
                                                            <AlertTriangle size={12} fill="currentColor" className="text-amber-500" />
                                                            {domain.warning}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Nameservers Column */}
                                        <div className="col-span-12 md:col-span-3 flex flex-col gap-1 ml-11 md:ml-0 md:pl-0">
                                            <span className="md:hidden text-xs text-zinc-500 font-medium mb-1">Nameservers</span>
                                            {domain.nameservers.map((ns, i) => (
                                                <span key={i} className="text-zinc-400 text-sm font-medium">{ns}</span>
                                            ))}
                                        </div>

                                        {/* Propagation Status Column */}
                                        <div className="col-span-6 md:col-span-2 ml-11 md:ml-0 md:pl-0">
                                            <span className="md:hidden text-xs text-zinc-500 font-medium mb-1 block">Status</span>
                                            <div className="flex items-center gap-2">
                                                <Wifi size={20} className={domain.statusColor} />
                                                <span className="text-white font-bold text-xs tracking-wide">{domain.status}</span>
                                            </div>
                                        </div>

                                        {/* Records Column */}
                                        <div className="col-span-6 md:col-span-3 flex items-center justify-between md:justify-start md:gap-4 mt-0 md:mt-0">
                                            <div className="flex flex-col md:flex-row gap-2">
                                                <span className="md:hidden text-xs text-zinc-500 font-medium mb-1 block">Records</span>
                                                <div className="flex items-center gap-2">
                                                    {domain.id === 2 && (
                                                        <>
                                                            <div className="p-1.5 rounded bg-teal-500/10 text-teal-500"><CreditCard size={14} /></div>
                                                            <div className="p-1.5 rounded bg-purple-500/10 text-purple-500"><Box size={14} /></div>
                                                        </>
                                                    )}
                                                    {domain.id === 3 && (
                                                        <div className="p-1.5 rounded bg-red-500/10 text-red-500"><Zap size={14} /></div>
                                                    )}
                                                    <Badge variant="outline" className="text-[10px] font-bold text-zinc-500 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 rounded-md px-2 py-1">
                                                        OTHER ({domain.recordsCount})
                                                    </Badge>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="hidden md:flex text-zinc-500 hover:text-white">
                                                <ArrowRight size={16} />
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
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#5A0E24] flex items-center justify-center text-white">
                                    <Globe size={16} className="md:w-5 md:h-5" />
                                </div>
                                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{selectedDomain.name}</h1>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 w-full md:w-auto">
                                <Button variant="secondary" className="bg-[#1c1c1f] hover:bg-[#27272a] text-white border border-zinc-800 rounded-full h-8 md:h-9 text-xs font-semibold px-4 justify-center">
                                    Manage DNS presets
                                </Button>
                                <Button
                                    onClick={handleClearSelection}
                                    variant="secondary"
                                    className="bg-[#1c1c1f] hover:bg-[#27272a] text-white border border-zinc-800 rounded-full h-8 md:h-9 text-xs font-semibold px-4 flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft size={14} /> See all domains
                                </Button>
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="w-full bg-[#161618] border border-zinc-800/60 rounded-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                            {/* Nameservers */}
                            <div className="md:col-span-5 space-y-4">
                                <h3 className="text-sm font-bold text-zinc-400">Nameservers</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-zinc-200">Custom nameservers</span>
                                        <HelpCircle size={14} className="text-zinc-500 mt-1" />
                                    </div>
                                    <Button variant="outline" size="sm" className="h-7 bg-transparent hover:bg-transparent border-zinc-700 text-zinc-300 hover:text-white hover:border-white/10 cursor-pointer text-xs px-3 rounded-lg flex items-center gap-2">
                                        <div className="p-0.5 rounded-[2px]"><ExternalLink size={10} className="text-zinc-300" /></div> Change
                                    </Button>
                                </div>
                                <div className="space-y-1">
                                    {selectedDomain.nameservers.map((ns, i) => (
                                        <p key={i} className="text-[#fff] text-sm font-semibold">{ns}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Propagation */}
                            <div className="md:col-span-4 space-y-4 border-t pt-6 md:border-t-0 md:pt-0 md:border-l border-zinc-800/60 md:pl-8">
                                <h3 className="text-sm font-bold text-zinc-400">Propagation status</h3>
                                <div className="flex items-center gap-2">
                                    <Wifi size={16} className={selectedDomain.statusColor} />
                                    <span className="text-white font-bold text-sm tracking-wide">{selectedDomain.status}</span>
                                </div>
                                <div className="pt-2">
                                    <Button variant="secondary" size="sm" className="h-7 bg-[#27272a] text-zinc-300 hover:text-white hover:bg-[#3f3f46] text-xs px-4 rounded-full">
                                        Check servers
                                    </Button>
                                </div>
                            </div>

                            {/* Manage In */}
                            <div className="md:col-span-3 space-y-4 border-t pt-6 md:border-t-0 md:pt-0 md:border-l border-zinc-800/60 md:pl-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">MANAGE IN</h3>
                                    <Button variant="outline" className="h-9 bg-transparent border-zinc-700 text-zinc-200 hover:text-white hover:border-zinc-500 hover:bg-[#27272a] text-xs font-semibold px-3 rounded-lg flex items-center gap-2 w-max">
                                        Domain Manager <div className="p-0.5 rounded text-[9px] px-1"><ExternalLink size={10} className="text-zinc-300" /></div>
                                    </Button>
                                </div>
                                <p className="text-[11px] text-zinc-500 font-medium">Last update: Sep 26, 2025 1:36 PM</p>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 pr-12 md:mx-0 md:px-0 md:pr-0">
                            <button
                                onClick={() => setActiveTab("dns-records")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "dns-records" ? "text-white border-b-4 border-[#5A0E24]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Dns Records ({selectedDomain.recordsCount})
                            </button>
                            <button
                                onClick={() => setActiveTab("dnssec")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "dnssec" ? "text-white border-b-4 border-[#5A0E24]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Dnssec
                            </button>
                            <button
                                onClick={() => setActiveTab("personal-nameservers")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "personal-nameservers" ? "text-white border-b-4 border-[#5A0E24]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Personal Nameservers
                            </button>
                            <button
                                onClick={() => setActiveTab("url-redirect")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "url-redirect" ? "text-white border-b-4 border-[#5A0E24]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                URL Redirect
                            </button>
                        </div>

                        {/* TAB CONTENT: DNS RECORDS */}
                        {activeTab === "dns-records" && (
                            <>
                                {/* Managed with Custom DNS Banner */}
                                <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center space-y-4 mb-8">
                                    <h2 className="text-xl md:text-2xl font-bold text-white">Managed with Custom DNS</h2>
                                    <p className="text-zinc-400 text-sm max-w-[600px] leading-relaxed">
                                        To manage your records here, change nameservers back to Reglook DNS. You can even
                                        choose to see your inactive records and prepare them before changing back.
                                    </p>
                                    <Button className="bg-[#27272a] hover:bg-[#3f3f46] text-white font-semibold rounded-full px-6 h-10 mt-2">
                                        Change nameservers
                                    </Button>
                                </div>

                                {/* Inactive Records Section (Expanded) */}
                                <div className="w-full">
                                    <div className="flex items-center justify-center mb-20">
                                        <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white hover:bg-transparent gap-2 text-sm font-semibold">
                                            Inactive records <div className="rounded-full p-0.5 mt-1"><ChevronUp size={12} /></div>
                                        </Button>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 md:gap-0">
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                                            <div className="relative group w-full sm:w-auto">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={14} />
                                                <Input
                                                    placeholder="Search here"
                                                    className="pl-9 bg-[#111111] border-zinc-800 font-medium text-zinc-200 placeholder:text-zinc-600 rounded-lg w-full sm:w-[200px] h-9 ring-offset-0 focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:border-zinc-700 transition-all shadow-sm text-xs"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
                                                <Button variant="secondary" className="h-9 bg-[#111111] border border-zinc-800 hover:bg-[#1c1c1f] text-zinc-300 text-xs font-bold px-4 rounded-lg flex items-center gap-2 shrink-0">
                                                    <SlidersHorizontal size={12} /> Filters
                                                </Button>
                                                <Button variant="secondary" className="h-9 bg-[#111111] border border-zinc-800 hover:bg-[#1c1c1f] text-zinc-300 text-xs font-bold px-4 rounded-lg flex items-center gap-2 shrink-0">
                                                    <ArrowUpDown size={12} /> Type
                                                </Button>
                                                <Button variant="secondary" className="h-9 bg-[#111111] border border-zinc-800 hover:bg-[#1c1c1f] text-zinc-300 text-xs font-bold px-4 rounded-lg flex items-center gap-2 shrink-0">
                                                    <Box size={12} /> Group view <ArrowUpDown size={10} className="ml-1" />
                                                </Button>
                                            </div>
                                        </div>
                                        <Button className="w-full md:w-auto h-9 bg-[#5A0E24] hover:bg-[#5A0E24]/60 cursor-pointer text-white text-xs font-bold px-4 rounded-full flex items-center justify-center gap-2">
                                            <Plus size={14} /> Add record
                                        </Button>
                                    </div>

                                    <div className="mb-2">
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">CUSTOM RECORDS</span>
                                    </div>

                                    <div className="w-full bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden">
                                        <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between border-b border-zinc-800/50 bg-[#161618]">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-sm font-bold text-white">Default record group</h3>
                                                <span className="text-xs text-zinc-500 font-medium">0 records</span>
                                            </div>
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <Badge className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border-0 text-[10px] uppercase font-bold px-2">INACTIVE</Badge>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-zinc-300 hover:bg-[#1c1c1f] hidden sm:inline-flex">
                                                    <div className="flex flex-col gap-0.5">
                                                        <div className="w-0.5 h-0.5 bg-current rounded-full" />
                                                        <div className="w-0.5 h-0.5 bg-current rounded-full" />
                                                        <div className="w-0.5 h-0.5 bg-current rounded-full" />
                                                    </div>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-zinc-300 hover:bg-[#1c1c1f]">
                                                    <ArrowUpDown size={14} className="rotate-180" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-6 md:p-12 flex flex-col items-center justify-center gap-6">
                                            <span className="text-zinc-500 text-sm font-medium">Start by choosing a record</span>
                                            <div className="flex flex-wrap items-center justify-center gap-2">
                                                {['A', 'AAAA', 'MX', 'CNAME', 'SRV', 'TXT', 'CAA', 'NS', 'PTR', 'TLSA', 'SVCB', 'HTTPS'].map((type) => (
                                                    <button key={type} className="h-8 px-4 rounded-full bg-[#1c1c1f] hover:bg-[#27272a] text-white font-bold text-xs transition-colors border border-transparent hover:border-zinc-700">
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full py-3 mt-4 border border-dashed border-zinc-700 rounded-xl text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900/30 transition-all text-sm font-semibold flex items-center justify-center gap-2">
                                        <Plus size={16} /> Create record group
                                    </button>
                                </div>
                            </>
                        )}

                        {/* TAB CONTENT: DNSSEC */}
                        {activeTab === "dnssec" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Protect your site and visitors</h2>
                                <p className="text-zinc-400 text-sm mb-4 max-w-[800px]">
                                    Domain name system security extensions (DNSSEC) is free and adds a layer of security to the DNS lookup and exchange process.
                                </p>
                                <div className="flex items-start gap-2 mb-6 text-sm text-zinc-400 bg-[#1c1c1f]/10 p-3 rounded-lg border border-zinc-800/20 max-w-fit">
                                    <div className="mt-0.5 flex-shrink-0 bg-[#5A0E24] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white">i</div>
                                    <p className="leading-5">
                                        When using Custom DNS, you must first enable DNSSEC on your DNS or hosting provider, and then add the provided DS records.
                                    </p>
                                </div>

                                <div className="w-full bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden mt-6">
                                    <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between border-b border-zinc-800/50 bg-[#161618]">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            DNSSEC <span className="text-zinc-500 text-xs font-normal ml-1">0 records</span>
                                        </h3>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-white hover:bg-[#27272a]">
                                            <ChevronUp size={16} />
                                        </Button>
                                    </div>
                                    <div className="p-6 md:p-12 flex flex-col items-center justify-center gap-6">
                                        <span className="text-zinc-500 text-sm font-medium">Start by adding a DS record</span>
                                        <Button className="h-9 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold text-xs px-4 rounded-full flex items-center gap-2">
                                            <Plus size={14} /> Add DS record
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: PERSONAL NAMESERVERS */}
                        {activeTab === "personal-nameservers" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Personal Nameservers</h2>
                                <p className="text-zinc-400 text-sm mb-4 max-w-[800px]">
                                    Register your own nameservers (e.g., ns1.reglook.com) based on your domain name.
                                </p>

                                <div className="w-full bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden mt-6">
                                    <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between border-b border-zinc-800/50 bg-[#161618]">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            Registered Nameservers <span className="text-zinc-500 text-xs font-normal ml-1">0 records</span>
                                        </h3>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-white hover:bg-[#27272a]">
                                            <ChevronUp size={16} />
                                        </Button>
                                    </div>
                                    <div className="p-6 md:p-12 flex flex-col items-center justify-center gap-6">
                                        <span className="text-zinc-500 text-sm font-medium">No personal nameservers registered yet</span>
                                        <Button className="h-9 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold text-xs px-4 rounded-full flex items-center gap-2">
                                            <Plus size={14} /> Add Nameserver
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: URL REDIRECT */}
                        {activeTab === "url-redirect" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">URL Forwarding</h2>
                                <p className="text-zinc-400 text-sm mb-4 max-w-[800px]">
                                    Forward your domain visitors to another destination URL.
                                </p>

                                <div className="w-full bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden mt-6">
                                    <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between border-b border-zinc-800/50 bg-[#161618]">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            Redirects <span className="text-zinc-500 text-xs font-normal ml-1">0 records</span>
                                        </h3>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-white hover:bg-[#27272a]">
                                            <ChevronUp size={16} />
                                        </Button>
                                    </div>
                                    <div className="p-6 md:p-12 flex flex-col items-center justify-center gap-6">
                                        <span className="text-zinc-500 text-sm font-medium">Start by adding a URL redirect</span>
                                        <Button className="h-9 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold text-xs px-4 rounded-full flex items-center gap-2">
                                            <Plus size={14} /> Add Redirect
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

export default function DnsManagerPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <DnsManagerContent />
        </React.Suspense>
    );
}



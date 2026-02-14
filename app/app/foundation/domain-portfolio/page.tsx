"use client";

import React from "react";
import {
    ArrowLeft,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    Eye,
    Globe,
    Wifi,
    ExternalLink,
    Briefcase,
    Shield,
    Users,
    ChevronUp,
    Plus,
    Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function DomainPortfolioContent() {
    const [domains, setDomains] = React.useState([
        {
            id: 1,
            name: "eeev.in",
            registrar: "Reglook",
            privacy: "Enabled",
            expiryDate: "2026-09-26",
            status: "ACTIVE",
            statusColor: "text-emerald-500",
        },
        {
            id: 2,
            name: "ondust.com",
            registrar: "Reglook",
            privacy: "Enabled",
            expiryDate: "2025-11-15",
            status: "ACTIVE",
            statusColor: "text-emerald-500",
        },
        {
            id: 3,
            name: "touchpay.one",
            registrar: "Reglook",
            privacy: "Disabled",
            expiryDate: "2027-01-01",
            status: "ACTIVE",
            statusColor: "text-emerald-500",
        }
    ]);

    const [selectedDomain, setSelectedDomain] = React.useState<typeof domains[0] | null>(null);
    const [activeTab, setActiveTab] = React.useState("details");

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

            {/* 1. Header Strip (Always Visible - Rose Theme) */}
            <div className="w-full bg-[#B9375D] py-4 md:py-6 shadow-md z-10 transition-colors duration-300">
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
                                    <Briefcase className="text-white w-4 h-4 md:w-[22px] md:h-[22px]" />
                                </div>
                                <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight">Domain Portfolio</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <Button variant="ghost" size="sm" className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-4 md:px-5 h-8 md:h-10 flex items-center gap-2 transition-all text-xs md:text-sm">
                                <span className="hidden sm:inline">Export List</span>
                                <ExternalLink size={16} className="md:w-[16px] md:h-[16px]" />
                            </Button>
                        </div>
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
                                        placeholder="Search portfolio..."
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
                                <div className="col-span-12 md:col-span-5 flex items-center gap-3 md:gap-6">
                                    <Checkbox className="border-zinc-700 data-[state=checked]:bg-[#B9375D] data-[state=checked]:border-[#B9375D] rounded-[4px] h-4 w-4" />
                                    <span className="text-xs md:text-sm font-semibold text-zinc-400">Domains ({domains.length})</span>
                                </div>
                                <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Registrar</div>
                                <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Privacy</div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Expiry</div>
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
                                        className="group grid grid-cols-12 gap-x-2 gap-y-4 md:gap-4 items-center px-3 py-4 md:px-4 md:py-6 rounded-xl bg-[#1c1c1f]/40 md:bg-[#1c1c1f]/30 hover:bg-[#1c1c1f] transition-all border border-white/5 md:border-transparent hover:border-zinc-800 cursor-pointer"
                                    >
                                        {/* Name Column */}
                                        <div className="col-span-12 md:col-span-5 flex items-center gap-3 md:gap-6">
                                            <div className="flex items-center justify-center">
                                                <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-[#B9375D] data-[state=checked]:border-[#B9375D] rounded-[4px] h-4 w-4 transition-all opacity-100 md:opacity-40 group-hover:opacity-100" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#B9375D] flex items-center justify-center text-white group-hover:bg-[#B9375D]/70 transition-colors">
                                                    <Globe size={16} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-bold text-sm md:text-[15px] tracking-tight">{domain.name}</span>
                                                    <div className="flex items-center gap-1.5 md:hidden">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                        <span className="text-emerald-500 text-xs font-bold">{domain.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Registrar Column */}
                                        <div className="hidden md:block col-span-2">
                                            <span className="text-zinc-300 text-sm font-medium">{domain.registrar}</span>
                                        </div>

                                        {/* Privacy Column */}
                                        <div className="hidden md:block col-span-2">
                                            <Badge variant="outline" className={`text-[10px] font-bold border-zinc-800 bg-zinc-900/50 rounded-md px-2 py-1 ${domain.privacy === 'Enabled' ? 'text-emerald-400' : 'text-zinc-500'}`}>
                                                {domain.privacy.toUpperCase()}
                                            </Badge>
                                        </div>

                                        {/* Expiry Column */}
                                        <div className="hidden md:flex col-span-3 items-center justify-between">
                                            <span className="text-zinc-400 text-sm font-medium">{domain.expiryDate}</span>
                                            <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white">
                                                <ExternalLink size={16} />
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
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#B9375D] flex items-center justify-center text-white">
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
                                    View full portfolio
                                </Button>
                            </div>
                        </div>

                        {/* Top Info Card */}
                        <div className="w-full bg-[#1c1c1f] border border-zinc-800 rounded-2xl p-4 md:p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto">
                                <div className="flex flex-col gap-1">
                                    <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">REGISTRATION DATE</span>
                                    <span className="text-white text-base font-bold">Sep 26, 2023</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">EXPIRATION DATE</span>
                                    <span className="text-white text-base font-bold">{selectedDomain.expiryDate}</span>
                                </div>
                            </div>
                            <Button className="w-full sm:w-auto bg-[#B9375D] hover:bg-[#B9375D]/80 text-white font-bold h-9 px-6 rounded-full text-xs">
                                Manage Subscription
                            </Button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 pr-12 md:mx-0 md:px-0 md:pr-0">
                            <button
                                onClick={() => setActiveTab("details")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "details" ? "text-white border-b-4 border-[#B9375D]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Domain Details
                            </button>
                            <button
                                onClick={() => setActiveTab("protection")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "protection" ? "text-white border-b-4 border-[#B9375D]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Protection
                            </button>
                            <button
                                onClick={() => setActiveTab("contacts")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "contacts" ? "text-white border-b-4 border-[#B9375D]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Contact Info
                            </button>
                        </div>

                        {/* TAB CONTENT: DETAILS */}
                        {activeTab === "details" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Domain Information</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Review the core details and status of your domain name.
                                </p>

                                <div className="w-full bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden mt-6">
                                    <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between border-b border-zinc-800/50 bg-[#161618]">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            Registration Data
                                        </h3>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-white">
                                            <ChevronUp size={16} />
                                        </Button>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-zinc-500 text-xs uppercase font-bold">Registrar</span>
                                            <span className="text-white text-sm font-medium">{selectedDomain.registrar}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-zinc-500 text-xs uppercase font-bold">Registry Status</span>
                                            <span className="text-emerald-500 text-sm font-medium">ClientTransferProhibited</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: PROTECTION */}
                        {activeTab === "protection" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Domain Privacy & Protection</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Ensure your personal data remains private and your domain is secure from unauthorized transfers.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-[#B9375D] flex items-center justify-center text-white">
                                                <Shield size={16} />
                                            </div>
                                            <h3 className="text-sm font-bold text-white">Whois Privacy</h3>
                                        </div>
                                        <p className="text-zinc-400 text-xs mb-6 h-10">
                                            Hides your personal contact information from the public Whois database.
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-white">Status</span>
                                            <Badge className={`border-0 ${selectedDomain.privacy === 'Enabled' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-400'}`}>
                                                {selectedDomain.privacy === 'Enabled' ? 'ACTIVE' : 'INACTIVE'}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-[#B9375D] flex items-center justify-center text-white">
                                                <Lock size={16} />
                                            </div>
                                            <h3 className="text-sm font-bold text-white">Transfer Lock</h3>
                                        </div>
                                        <p className="text-zinc-400 text-xs mb-6 h-10">
                                            Prevents unauthorized transfers to other registrars.
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-white">Status</span>
                                            <Badge className="bg-emerald-500/10 text-emerald-500 border-0">LOCKED</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: CONTACTS */}
                        {activeTab === "contacts" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Contact Information</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Manage the registrant, administrative, technical, and billing contacts for this domain.
                                </p>
                                <div className="w-full bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden mt-6">
                                    <div className="p-12 flex flex-col items-center justify-center gap-6">
                                        <span className="text-zinc-500 text-sm font-medium">Contact details are managed via your account profile</span>
                                        <Button className="h-9 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold text-xs px-4 rounded-full flex items-center gap-2">
                                            <Users size={14} /> Edit Contacts
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

export default function DomainPortfolioPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <DomainPortfolioContent />
        </React.Suspense>
    );
}


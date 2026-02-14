"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
    ArrowLeft,
    HelpCircle,
    Mail,
    Settings,
    Shield,
    Users,
    Inbox,
    Plus,
    Lock,
    AlertTriangle,
    ChevronRight,
    ExternalLink,
    Search,
    Copy,
    MoreHorizontal,
    Trash2,
    ArrowRight,
    ShieldCheck,
    Key,
    RefreshCcw,
    AlertOctagon,
    Sliders,
    Server,
    HardDrive,
    Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreateMailboxDialog } from "./components/create-mailbox-dialog";
import { CreateAliasDialog } from "./components/create-alias-dialog";

function MailManagerContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 1. Derive State from URL
    const selectedDomain = searchParams.get("manage");
    const createMailboxOpen = searchParams.get("new-mailbox") === "true";
    const createAliasOpen = searchParams.get("new-aliases") === "true";


    const [activeTab, setActiveTab] = useState("mailboxes");

    // Mock Domain List
    const DOMAINS = [
        { name: "reglook.com", status: "Active", mailboxes: 5, storage: "12.5 GB", active: true },
        { name: "foobar.io", status: "Not Configured", mailboxes: 0, storage: "0 GB", active: false },
        { name: "example.net", status: "Active", mailboxes: 12, storage: "45.2 GB", active: true },
    ];

    // Derived Logic for Active State
    const currentDomainData = DOMAINS.find((d) => d.name === selectedDomain);
    const isMailActive = currentDomainData?.active ?? false;

    // Helper to update URL params
    const updateParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        router.push(`?${params.toString()}`);
    };

    // Handle Domain Click
    const handleDomainSelect = (domain: any) => {
        updateParams({ manage: domain.name });
        setActiveTab("mailboxes"); // Reset tab
    };

    const toggleCreateMailbox = (open: boolean) => {
        updateParams({ "new-mailbox": open ? "true" : null });
    };

    const toggleCreateAlias = (open: boolean) => {
        updateParams({ "new-aliases": open ? "true" : null });
    };


    // Common Lock Overlay Component
    const LockOverlay = ({ title, description }: { title: string, description: string }) => (
        <div className="absolute inset-0 z-10 bg-[#0f0f10]/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 border border-zinc-800/50 rounded-xl">
            <div className="bg-zinc-800 p-4 rounded-full mb-4">
                <Lock className="text-zinc-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-zinc-400 max-w-sm mb-6">{description}</p>
        </div>
    );

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen font-sans">

            {/* 1. Header Strip (Themed matched to DNS Manager) */}
            <div className="w-full bg-[#5A0E24] py-6 shadow-md z-20 transition-colors duration-300">
                <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={() => router.push(selectedDomain ? "/foundation/mail" : "/foundation")}
                                className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-10 w-10"
                            >
                                <ArrowLeft size={22} />
                            </Button>
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                                    <Mail className="text-white" size={22} />
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-2xl font-bold text-white tracking-tight leading-none">Mail Manager</h1>
                                    {selectedDomain && <span className="text-white/60 text-xs font-medium">{selectedDomain}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            {selectedDomain && (
                                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 text-xs font-semibold text-white/80 border border-white/10">
                                    <span className={isMailActive ? "text-white" : "text-white"}>●</span>
                                    {isMailActive ? "Active" : "Not Configured"}
                                </div>
                            )}
                            <Button className="text-white/80 bg-transparent hover:text-white hover:bg-white/10 rounded-full h-10 w-10">
                                <Settings size={22} />
                            </Button>
                            <Button className="text-white/80 bg-transparent hover:text-white hover:bg-white/10 rounded-full h-10 w-10">
                                <HelpCircle size={22} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Setup Banner (Entry Gate - Step 1) - Only show if domain selected and not active */}
            {selectedDomain && !isMailActive && (
                <div className="w-full bg-zinc-500/10 border-b border-zinc-500/20 backdrop-blur-md sticky top-0 z-10">
                    <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-zinc-500/20 p-2 rounded-full hidden md:block">
                                <AlertTriangle className="text-zinc-500" size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Setup required</h3>
                                <p className="text-zinc-300 text-sm">Configure DNS records to start sending and receiving emails for {selectedDomain}.</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => router.push(`/foundation/mail/setup?domain=${selectedDomain}`)}
                            className="bg-white hover:bg-zinc-600 text-black font-semibold rounded-full px-8 hover:animate-none transition-all"
                        >
                            Start Mail Setup <ChevronRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </div>
            )}

            {/* 3. Main Content Area */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-8 flex-1">

                {/* VIEW 1: DOMAIN LIST SELECTION */}
                {!selectedDomain && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Controls Bar */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 w-full">
                            {/* Search & Filters */}
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                                    <Input
                                        placeholder="Search domains..."
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#5A0E24] focus-visible:border-[#5A0E24] transition-all shadow-sm"
                                    />
                                </div>

                                <div className="bg-[#1c1c1f] border border-zinc-800 rounded-lg flex items-center p-1 gap-1 shadow-sm">
                                    <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                        <Sliders size={14} /> Filters
                                    </Button>
                                    <div className="w-[1px] h-5 bg-zinc-800" />
                                    <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                        <ArrowRight size={14} className="rotate-90" /> Alphabetically
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Domain List Table */}
                        <div className="w-full">
                            {/* Header Row */}
                            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                                <div className="col-span-12 md:col-span-5 flex items-center gap-6">
                                    <span className="text-sm font-semibold text-zinc-400 pl-8">Domain Name</span>
                                </div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Mailbox Status</div>
                                <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Storage Usage</div>
                                <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400 text-right pr-4">Actions</div>
                            </div>

                            {/* Rows */}
                            <div className="space-y-1">
                                {DOMAINS.map((domain, i) => (
                                    <div
                                        key={i}
                                        onClick={() => handleDomainSelect(domain)}
                                        className="group grid grid-cols-12 gap-4 px-4 py-4 items-center bg-transparent hover:bg-[#202023] border border-zinc-800/50 hover:border-zinc-700/80 rounded-xl transition-all duration-200 cursor-pointer mb-2"
                                    >
                                        <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#5A0E24] flex items-center justify-center text-white group-hover:text-white group-hover:bg-[#5A0E24] transition-colors">
                                                <Globe size={18} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-base">{domain.name}</h3>
                                                <p className="text-zinc-500 text-xs">{domain.mailboxes} Mailboxes</p>
                                            </div>
                                        </div>

                                        <div className="hidden md:col-span-3 md:flex items-center">
                                            <Badge className={`border-0 uppercase text-[10px] font-black tracking-wider px-2.5 py-1 rounded-lg ${domain.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20' : 'bg-zinc-500/10 text-zinc-500 ring-1 ring-zinc-500/20'}`}>
                                                {domain.status}
                                            </Badge>
                                        </div>

                                        <div className="hidden md:col-span-2 md:flex items-center text-zinc-400 text-sm font-medium">
                                            {domain.storage}
                                        </div>

                                        <div className="hidden md:col-span-2 md:flex justify-end pr-2">
                                            <Button variant="ghost" size="sm" className="bg-zinc-800/50 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-bold h-8 rounded-lg px-3 transition-all flex items-center gap-2">
                                                Manage <ChevronRight size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW 2: CONTROL TOWER (Existing UI) */}
                {selectedDomain && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Top Controls (Search/Filter placeholder) */}
                        <div className={`flex flex-col md:flex-row items-center justify-between gap-5 mb-8 w-full ${!isMailActive ? "opacity-50 pointer-events-none grayscale-[0.5]" : ""}`}>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                    <Input
                                        placeholder="Search mailboxes..."
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 text-zinc-400 rounded-lg w-[280px] h-10"
                                        disabled={!isMailActive}
                                    />
                                </div>
                            </div>
                            <Button
                                className="bg-[#5A0E24] hover:bg-[#7a1230] cursor-pointer text-white rounded-full disabled:bg-opacity-50"
                                disabled={!isMailActive}
                                onClick={() => toggleCreateMailbox(true)}
                            >
                                <Plus size={16} className="mr-2" /> Create Mailbox
                            </Button>
                        </div>

                        {/* Tabs Interface */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="bg-transparent border-b border-zinc-800 w-full justify-start h-auto p-0 mb-8 rounded-none gap-8">
                                {['mailboxes', 'aliases', 'security', 'settings'].map((tab) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        disabled={!isMailActive} // Lock tabs
                                        className={`text-sm font-semibold py-4 border-b-2 rounded-none bg-transparent data-[state=active]:rounded-none data-[state=active]:border-[#5A0E24] data-[state=active]:text-white data-[state=active]:bg-[#5a0e24]  data-[state=active]:font-semibold text-zinc-500 hover:text-zinc-300 capitalize transition-all px-0 ${!isMailActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {tab}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <div className="relative min-h-[400px] w-full bg-[#0b0b0d] rounded-3xl overflow-hidden p-6">
                                {!isMailActive && (
                                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0f0f10]/60 backdrop-blur-[2px]">
                                        <div className="bg-[#1c1c1f] border border-zinc-700/50 p-8 rounded-2xl shadow-2xl text-center max-w-md">
                                            <div className="w-16 h-16 bg-[#fff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Lock size={32} className="text-[#fff]" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white mb-3">Mail Manager Locked</h2>
                                            <p className="text-zinc-400 mb-8 leading-relaxed">
                                                Complete the setup wizard to unlock mailbox creation, aliases, and security settings for <strong>{selectedDomain}</strong>.
                                            </p>
                                            <Button
                                                onClick={() => router.push(`/foundation/mail/setup?domain=${selectedDomain}`)}
                                                className="w-full h-12 bg-[#5A0E24] hover:bg-[#7a1230] text-white font-bold rounded-xl"
                                            >
                                                Unlock Mail Manager
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <TabsContent value="mailboxes" className="mt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {[
                                            { name: "Admin", email: `admin@${selectedDomain}`, usage: 45, status: "Active", lastActive: "Just now" },
                                        ].map((mailbox, i) => (
                                            <div key={i} className={`group relative bg-transparent hover:bg-transparent border border-zinc-800 hover:border-zinc-700 rounded-3xl p-6 transition-all duration-300 ${!isMailActive ? 'opacity-20 pointer-events-none' : ''}`}>

                                                {/* Header with Avatar and Status */}
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5A0E24] to-[#3E0703] flex items-center justify-center text-white shadow-inner font-bold text-lg border border-white/5 ring-4 ring-transparent group-hover:ring-[#202023] transition-all">
                                                            {mailbox.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-white font-bold text-lg leading-tight tracking-tight">{mailbox.name}</h3>
                                                            <p className="text-zinc-500 text-xs font-medium mt-1">Last active: {mailbox.lastActive}</p>
                                                        </div>
                                                    </div>
                                                    <Badge className={`border-0 uppercase text-[10px] font-black tracking-wider px-2.5 py-1 rounded-lg ${mailbox.status === 'Full' ? 'bg-red-500/10 text-red-500 ring-1 ring-red-500/20' : 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20'}`}>
                                                        {mailbox.status}
                                                    </Badge>
                                                </div>

                                                {/* Email Address Copy Area */}
                                                <div className="bg-black/40 rounded-xl p-3 mb-6 flex items-center justify-between group/email border border-white/5 hover:border-white/10 transition-colors cursor-pointer active:scale-[0.98]">
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        <Mail size={14} className="text-zinc-500 shrink-0" />
                                                        <span className="text-zinc-300 text-sm font-mono truncate tracking-tight">{mailbox.email}</span>
                                                    </div>
                                                    <Copy size={12} className="text-zinc-600 group-hover/email:text-zinc-400 opacity-0 group-hover/email:opacity-100 transition-all" />
                                                </div>

                                                {/* Storage Progress */}
                                                <div className="space-y-3 mb-6">
                                                    <div className="flex justify-between text-xs font-bold text-zinc-400">
                                                        <span>Storage Usage</span>
                                                        <span className={mailbox.usage > 80 ? 'text-red-400' : 'text-zinc-400'}>{mailbox.usage}% <span className="text-zinc-600 font-medium">/ 10GB</span></span>
                                                    </div>
                                                    <div className="h-2 w-full bg-zinc-800/50 rounded-full overflow-hidden p-[2px]">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-500 ease-out ${mailbox.status === 'Full' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-r from-[#5A0E24] to-[#9c183f]'}`}
                                                            style={{ width: `${mailbox.usage}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <Button className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold h-9 rounded-lg border border-white/5 hover:border-white/10 transition-all hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-700">
                                                        Open Webmail
                                                    </Button>
                                                    <Button className="bg-transparent border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold h-9 rounded-lg transition-all flex items-center gap-2">
                                                        <Settings size={14} /> Manage
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => toggleCreateMailbox(true)}
                                            className={`border border-dashed border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/30 rounded-2xl p-5 flex flex-col items-center justify-center gap-4 transition-all duration-300 min-h-[280px] group ${!isMailActive ? 'opacity-20 pointer-events-none' : ''}`}>
                                            <div className="w-16 h-16 rounded-full bg-zinc-900 group-hover:bg-[#5A0E24] flex items-center justify-center text-zinc-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                                                <Plus size={28} />
                                            </div>
                                            <div className="text-center group-hover:translate-y-1 transition-transform duration-300">
                                                <span className="text-zinc-400 group-hover:text-white font-bold block mb-1 text-base">Create Mailbox</span>
                                                <span className="text-zinc-600 group-hover:text-zinc-400 text-xs font-medium">Add a new user or alias</span>
                                            </div>
                                        </button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="aliases" className="mt-0">
                                    <div className={`bg-transparent border border-zinc-800 rounded-3xl overflow-hidden shadow-sm ${!isMailActive ? 'opacity-20 pointer-events-none' : ''}`}>

                                        {/* Table Header */}
                                        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-800 bg-zinc-900/50 text-[11px] font-bold text-zinc-500 uppercase tracking-wider items-center">
                                            <div className="col-span-5 pl-2">Alias Address</div>
                                            <div className="col-span-4">Targets</div>
                                            <div className="col-span-2">Status</div>
                                            <div className="col-span-1 text-right"></div>
                                        </div>

                                        {/* Table Body */}
                                        <div className="divide-y divide-zinc-800/50">

                                            {/* Add Alias Button Row */}
                                            <button
                                                onClick={() => toggleCreateAlias(true)}
                                                className="w-full py-4 flex items-center justify-center gap-2 text-zinc-500 hover:text-white hover:bg-zinc-900/50 transition-colors group"
                                            >
                                                <div className="w-6 h-6 rounded-full border border-dashed border-zinc-600 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                                                    <Plus size={12} />
                                                </div>
                                                <span className="font-bold text-xs uppercase tracking-wide">Create New Alias</span>
                                            </button>
                                            {[
                                                { alias: "contact", target: `admin@${selectedDomain}`, status: "Active" },
                                                { alias: "sales", target: `admin@${selectedDomain}`, status: "Active" },
                                                { alias: "jobs", target: `hr@${selectedDomain}`, status: "Inactive" },
                                                { alias: "no-reply", target: "dev-null", status: "Active" }
                                            ].map((item, i) => (
                                                <div key={i} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-zinc-800/30 transition-all duration-200 group">

                                                    {/* Alias Column */}
                                                    <div className="col-span-5 flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-colors shadow-inner">
                                                            <Mail size={16} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-white font-bold text-sm tracking-tight">{item.alias}@{selectedDomain}</span>
                                                            <span className="text-zinc-500 text-xs font-mono">Alias</span>
                                                        </div>
                                                    </div>

                                                    {/* Target Column */}
                                                    <div className="col-span-4 flex items-center gap-3">
                                                        <div className="px-2 py-1 rounded bg-zinc-800/50 border border-zinc-800 text-zinc-500">
                                                            <ArrowRight size={12} />
                                                        </div>
                                                        <span className="text-zinc-300 text-sm font-medium border-b border-dashed border-zinc-700 pb-0.5">{item.target}</span>
                                                    </div>

                                                    {/* Status Column */}
                                                    <div className="col-span-2">
                                                        <Badge className={`border-0 uppercase text-[10px] font-black tracking-wider px-2.5 py-1 rounded-lg ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20' : 'bg-zinc-500/10 text-zinc-500 ring-1 ring-zinc-500/20'}`}>
                                                            {item.status}
                                                        </Badge>
                                                    </div>

                                                    {/* Actions Column */}
                                                    <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                        <Button className="h-8 w-8 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                                            <Settings size={14} />
                                                        </Button>
                                                        <Button className="h-8 w-8 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-400 transition-colors">
                                                            <Trash2 size={14} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="security" className="mt-0">
                                    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${!isMailActive ? 'opacity-20 pointer-events-none' : ''}`}>

                                        {/* Left Column: DNS & Encryption Status */}
                                        <div className="lg:col-span-2 space-y-6">

                                            {/* 1. DNS Configuration Card */}
                                            <div className="bg-transparent border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group">

                                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]">
                                                        <ShieldCheck size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-bold text-lg">DNS Configuration</h3>
                                                        <p className="text-zinc-500 text-xs">SPF, DKIM, and DMARC records status</p>
                                                    </div>
                                                    <Badge className="ml-auto bg-emerald-500/10 text-emerald-500 border-0 hover:bg-emerald-500/20 px-3 py-1 uppercase tracking-wider font-bold text-[10px]">All Secure</Badge>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    {[
                                                        { label: "SPF Record", status: "Valid", desc: "Prevents spoofing" },
                                                        { label: "DKIM Signatures", status: "Active", desc: "Verifies sender identity" },
                                                        { label: "DMARC Policy", status: "Enforced", desc: "Instructs email servers" }
                                                    ].map((item, i) => (
                                                        <div key={i} className="bg-black/20 rounded-xl p-4 border border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                                <span className="text-zinc-300 font-bold text-sm">{item.label}</span>
                                                            </div>
                                                            <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* 2. Advanced Security Settings */}
                                            <div className="bg-transparent border border-zinc-800 rounded-3xl p-6">
                                                <div className="flex items-center justify-between mb-6">
                                                    <h3 className="text-white font-bold text-lg">Detailed Policies</h3>
                                                </div>
                                                <div className="space-y-1">
                                                    {[
                                                        { title: "TLS Encryption", desc: "Require TLS for all incoming/outgoing mail", active: true },
                                                        { title: "MTA-STS Policy", desc: "Strict Transport Security for SMTP", active: false },
                                                        { title: "BIMI Record", desc: "Brand Indicators for Message Identification", active: false },
                                                    ].map((setting, i) => (
                                                        <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-800/30 rounded-xl transition-colors group cursor-pointer">
                                                            <div className="flex items-center gap-4">
                                                                <div className={`p-2 rounded-lg ${setting.active ? 'bg-zinc-800 text-white' : 'bg-transparent text-zinc-600'} border border-zinc-800 group-hover:border-zinc-700 transition-colors`}>
                                                                    <Key size={18} />
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <h4 className={`font-bold text-sm ${setting.active ? 'text-white' : 'text-zinc-400'}`}>{setting.title}</h4>
                                                                        {!setting.active && <span className="text-[10px] px-1.5 py-0.5 bg-zinc-800 text-zinc-500 rounded font-medium border border-zinc-700">Optional</span>}
                                                                    </div>
                                                                    <p className="text-zinc-500 text-xs mt-0.5">{setting.desc}</p>
                                                                </div>
                                                            </div>
                                                            <div className={`w-11 h-6 rounded-full p-1 transition-colors ${setting.active ? 'bg-[#5A0E24]' : 'bg-zinc-800'}`}>
                                                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${setting.active ? 'translate-x-5' : 'translate-x-0'}`} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column: Threat Stats & Quick Actions */}
                                        <div className="space-y-6">
                                            <div className="bg-transparent border border-zinc-800 rounded-3xl p-6">
                                                <h3 className="text-white font-bold text-lg mb-6">Threat Management</h3>

                                                <div className="space-y-6">
                                                    <div className="relative pt-2">
                                                        <div className="flex justify-between text-xs font-bold text-zinc-400 mb-2">
                                                            <span>Spam Filter Strength</span>
                                                            <span className="text-[#fff]">Aggressive</span>
                                                        </div>
                                                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                                            <div className="h-full bg-gradient-to-r from-white to-red-600 w-[70%]" />
                                                        </div>
                                                        <p className="text-zinc-500 text-[11px] mt-2">Automatically moves suspected spam to Junk folder.</p>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 flex flex-col items-center justify-center text-center">
                                                            <AlertOctagon size={24} className="text-white mb-2" />
                                                            <span className="text-2xl font-black text-white">0</span>
                                                            <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider">Threats Blocked</span>
                                                        </div>
                                                        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 flex flex-col items-center justify-center text-center">
                                                            <RefreshCcw size={24} className="text-white mb-2" />
                                                            <span className="text-2xl font-black text-white">99%</span>
                                                            <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider">Uptime</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 pt-6 border-t border-zinc-800">
                                                    <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold h-10 rounded-xl border border-white/5">
                                                        View Access Logs
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="bg-zinc-900/10 border border-zinc-800 rounded-3xl p-6">
                                                <h4 className="text-white ml-3 font-bold text-sm mb-2">Need Help?</h4>
                                                <p className="text-white/70 ml-3 text-xs mb-4">Learn best practices for securing your domain email.</p>
                                                <Button

                                                    className="p-0 h-auto text-white font-bold text-xs hover:text-white 
              flex items-center gap-1 justify-start text-left"
                                                >
                                                    Read Security Guide <ArrowRight size={12} />
                                                </Button>

                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="settings" className="mt-0">
                                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${!isMailActive ? 'opacity-20 pointer-events-none' : ''}`}>

                                        {/* 1. General Configuration */}
                                        <div className="space-y-6">
                                            <div className="bg-transparent border border-zinc-800 rounded-3xl p-6">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-10 h-10 rounded-xl bg-zinc-800/10 flex items-center justify-center text-white border border-white/20">
                                                        <Sliders size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-bold text-lg">General Configuration</h3>
                                                        <p className="text-zinc-500 text-xs">Manage global mail settings</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    {[
                                                        { label: "Catch-All Address", desc: "Route unassigned emails to specific inbox", value: `admin@${selectedDomain}` },
                                                        { label: "Mail Retention", desc: "How long to keep deleted emails", value: "30 Days" },
                                                        { label: "Max Attachment Size", desc: "Limit for incoming/outgoing files", value: "25 MB" },
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl gap-3">
                                                            <div>
                                                                <h4 className="text-zinc-300 font-bold text-sm">{item.label}</h4>
                                                                <p className="text-zinc-500 text-xs">{item.desc}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-white font-mono text-sm bg-black/40 px-3 py-1.5 rounded-lg border border-zinc-800">{item.value}</span>
                                                                <Button className="h-8 w-8 text-zinc-500 hover:text-white">
                                                                    <Settings size={14} />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* 2. Danger Zone */}
                                            <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6">
                                                <h3 className="text-red-500 font-bold text-lg mb-2">Danger Zone</h3>
                                                <p className="text-red-500/60 text-xs mb-6">Irreversible actions for your mail service</p>

                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                                                        <span className="text-red-200 font-medium text-sm">Reset all configurations</span>
                                                        <Button className="text-red-500 hover:text-red-400 hover:bg-red-500/10 font-bold">Reset</Button>
                                                    </div>
                                                    <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                                                        <span className="text-red-200 font-medium text-sm">Disable Mail Service</span>
                                                        <Button className="text-red-500 hover:text-red-400 hover:bg-red-500/10 font-bold">Disable</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. Infrastructure & Storage */}
                                        <div className="space-y-6">
                                            <div className="bg-transparent border border-zinc-800 rounded-3xl p-6 h-full">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-10 h-10 rounded-xl bg-zinc-800/10 flex items-center justify-center text-white border border-white/20">
                                                        <Server size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-bold text-lg">Infrastructure</h3>
                                                        <p className="text-zinc-500 text-xs">Storage and server details</p>
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-gradient-to-br from-black to-black rounded-2xl border border-zinc-800 mb-6 relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-20 bg-zinc-800/10 rounded-full blur-3xl -mr-10 -mt-10" />
                                                    <div className="relative z-10 text-center">
                                                        <HardDrive size={32} className="text-zinc-500 mx-auto mb-3" />
                                                        <h4 className="text-3xl font-black text-white mb-1">12.5 <span className="text-lg text-zinc-500 font-medium">GB</span></h4>
                                                        <p className="text-zinc-500 text-xs uppercase tracking-wider font-bold">Total Storage Used</p>

                                                        <div className="mt-6 w-full bg-zinc-800/50 rounded-full h-3 overflow-hidden p-[2px]">
                                                            <div className="h-full bg-gradient-to-r from-zinc-800 via-zinc-800 to-white rounded-full w-[45%]" />
                                                        </div>
                                                        <div className="flex justify-between text-[10px] font-bold text-zinc-600 mt-2">
                                                            <span>0 GB</span>
                                                            <span>50 GB Limit</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h4 className="text-white font-bold text-sm mb-4">IMAP/SMTP Settings</h4>
                                                <div className="space-y-3">
                                                    {[
                                                        { label: "IMAP Server", value: `imap.${selectedDomain}`, port: "993 (SSL)" },
                                                        { label: "SMTP Server", value: `smtp.${selectedDomain}`, port: "465 (SSL)" },
                                                        { label: "POP3 Server", value: `pop.${selectedDomain}`, port: "995 (SSL)" },
                                                    ].map((server, i) => (
                                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors group cursor-copy">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-[#5A0E24] transition-colors" />
                                                                <span className="text-zinc-400 text-xs font-bold w-20">{server.label}</span>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <code className="text-zinc-300 text-xs bg-black/20 px-2 py-1 rounded border border-zinc-800/50">{server.value}</code>
                                                                <span className="text-zinc-600 text-[10px] font-mono border-l border-zinc-800 pl-3">{server.port}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <Button className="w-full mt-6 bg-[#5A0E24] hover:bg-[#7a1230] text-white font-bold h-10 rounded-xl">
                                                    Upgrade Storage Plan
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                )}
            </div>
            {/* Dialogs */}
            <CreateMailboxDialog
                open={createMailboxOpen}
                onOpenChange={toggleCreateMailbox}
                domain={selectedDomain || ""}
            />
            <CreateAliasDialog
                open={createAliasOpen}
                onOpenChange={toggleCreateAlias}
                domain={selectedDomain || ""}
            />
        </div>
    );
}

export default function MailManagerPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <MailManagerContent />
        </React.Suspense>
    );
}


"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    ShieldCheck,
    Lock,
    ExternalLink,
    ChevronUp,
    ShieldAlert,
    Activity,
    Smartphone,
    MailCheck,
    User,
    Key,
    QrCode,
    Fingerprint,
    Unlock,
    Shield,
    FileText,
    History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function TwoFAAccessControlContent() {
    // Mock data for Accounts/Identities
    const [accounts, setAccounts] = React.useState([
        {
            id: 1,
            name: "ripun@reglook.com",
            type: "Reglook Mail",
            mfaStatus: "ENABLED",
            mfaMethod: "Authenticator App",
            statusColor: "text-emerald-500",
            lastAuth: "Just now",
            needsAction: false,
        },
        {
            id: 2,
            name: "theripunbty",
            type: "Reglook Account",
            mfaStatus: "ENABLED",
            mfaMethod: "SMS & Email",
            statusColor: "text-emerald-500",
            lastAuth: "2 hours ago",
            needsAction: false,
        },
        {
            id: 3,
            name: "admin@dev.io",
            type: "Reglook Mail",
            mfaStatus: "DISABLED",
            mfaMethod: "None",
            statusColor: "text-red-500",
            lastAuth: "1 day ago",
            needsAction: true,
        }
    ]);

    // Mock data for Detail View
    const [selectedAccount, setSelectedAccount] = React.useState<typeof accounts[0] | null>(null);
    const [activeTab, setActiveTab] = React.useState("overview");

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Sync URL param 'manage' with selectedAccount state
    React.useEffect(() => {
        const manageAccount = searchParams.get("manage");
        if (manageAccount) {
            const acc = accounts.find(a => a.name === manageAccount);
            if (acc) {
                setSelectedAccount(acc);
            } else {
                setSelectedAccount(null);
            }
        } else {
            setSelectedAccount(null);
        }
    }, [searchParams, accounts]);

    const handleAccountSelect = (account: typeof accounts[0]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("manage", account.name);
        router.push(pathname + "?" + params.toString());
    };

    const handleClearSelection = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("manage");
        router.push(pathname + "?" + params.toString());
    };

    const ThemeColor = "#1C352D"; // Dark Green Theme

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip (Always Visible) - Theme Color #1C352D */}
            <div className={`w-full bg-[${ThemeColor}] py-6 shadow-md z-10 transition-colors duration-300`}>
                <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-4">
                            <Link href="/foundation">
                                <Button className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-10 w-10">
                                    <ArrowLeft size={22} />
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                                    <ShieldCheck className="text-white" size={22} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">2FA & Access Control</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Button className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">Audit Logs</span>
                                <FileText size={16} />
                            </Button>
                            <Button className="text-white/80 bg-white/10 hover:text-white hover:bg-white/10 rounded-full h-10 w-10">
                                <HelpCircle size={22} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-8 flex-1">
                {!selectedAccount ? (
                    /* LIST VIEW */
                    <>
                        {/* Controls Bar */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 w-full">
                            {/* Search & Filters */}
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                                    <Input
                                        placeholder="Search accounts..."
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all shadow-sm"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <HelpCircle size={14} className="text-zinc-600 cursor-help hover:text-zinc-400 transition-colors" />
                                    </div>
                                </div>

                                <div className="bg-[#1c1c1f] border border-zinc-800 rounded-lg flex items-center p-1 gap-1 shadow-sm">
                                    <Button className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                        <SlidersHorizontal size={14} /> Only Enabled
                                    </Button>
                                    <div className="w-[1px] h-5 bg-zinc-800" />
                                    <Button className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                        <ArrowUpDown size={14} /> Sort
                                    </Button>
                                </div>
                            </div>

                            {/* View Options */}
                            <div className="flex items-center gap-2">
                                <Button className="h-9 text-white font-semibold hover:text-white bg-[#1c1c1f] hover:bg-[#1c1c1f]/60 cursor-pointer rounded-full gap-2 px-4 transition-colors">
                                    <Activity size={16} /> <span className="text-xs">Authentication Activity</span>
                                </Button>
                            </div>
                        </div>

                        {/* Account List Split */}
                        <div className="space-y-12">
                            {/* User Accounts Section */}
                            <div className="w-full">
                                <h2 className="text-lg font-bold text-white mb-4 px-1 flex items-center gap-2">
                                    <User size={18} className="text-[#fff]" /> User Accounts
                                </h2>
                                {/* Header Row */}
                                <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                                    <div className="col-span-12 md:col-span-5 flex items-center gap-6">
                                        <Checkbox className="border-zinc-700 data-[state=checked]:bg-[#1C352D]/90 data-[state=checked]:border-[#1C352D] rounded-[4px] h-4 w-4" />
                                        <span className="text-sm font-semibold text-zinc-400">Account / Identity</span>
                                    </div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">2FA Status</div>
                                    <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Primary Method</div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Last Auth</div>
                                </div>

                                {/* Rows */}
                                <div className="space-y-1">
                                    {accounts.filter(a => a.type === "Reglook Account").map((account, index) => (
                                        <motion.div
                                            key={account.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => handleAccountSelect(account)}
                                            className="group grid grid-cols-12 gap-4 items-start px-4 py-6 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 cursor-pointer bg-[#1c1c1f]/30"
                                        >
                                            {/* Name Column */}
                                            <div className="col-span-12 md:col-span-5 flex flex-col gap-2">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center justify-center">
                                                        <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-[#1C352D]/90 data-[state=checked]:border-[#1C352D] rounded-[4px] h-4 w-4 transition-all opacity-40 group-hover:opacity-100" />
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-full bg-[${ThemeColor}] flex items-center justify-center text-white group-hover:bg-[${ThemeColor}]/70 transition-colors`}>
                                                            <User size={16} />
                                                        </div>
                                                        <div>
                                                            <span className="text-white font-bold text-[15px] tracking-tight block">{account.name}</span>
                                                            <span className="text-zinc-500 text-xs font-medium">{account.type}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {(account.needsAction) && (
                                                    <div className="flex items-center gap-2 pl-[70px] mt-1">
                                                        <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-0 text-[10px] uppercase font-bold px-2 py-0.5 pointer-events-none">
                                                            Setup Required
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Status Column */}
                                            <div className="col-span-6 md:col-span-2 pl-12 md:pl-0 flex items-center">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck size={18} className={account.statusColor} />
                                                    <span className="text-white font-bold text-xs tracking-wide">{account.mfaStatus}</span>
                                                </div>
                                            </div>

                                            {/* Method Column */}
                                            <div className="col-span-6 md:col-span-3 pl-12 md:pl-0 flex items-center">
                                                <div className="bg-zinc-800/50 rounded-md px-3 py-1.5 flex items-center gap-2 border border-zinc-800">
                                                    <Smartphone size={14} className="text-zinc-400" />
                                                    <span className="text-zinc-300 font-bold text-xs">{account.mfaMethod}</span>
                                                </div>
                                            </div>

                                            {/* Last Auth Column */}
                                            <div className="col-span-12 md:col-span-2 pl-12 md:pl-0 mt-2 md:mt-0 flex items-center justify-between">
                                                <span className="text-zinc-400 text-sm font-medium">{account.lastAuth}</span>
                                                <Button className="text-zinc-500 hover:text-white">
                                                    <ExternalLink size={16} />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Mail Accounts Section */}
                            <div className="w-full">
                                <h2 className="text-lg font-bold text-white mb-4 px-1 flex items-center gap-2">
                                    <MailCheck size={18} className="text-[#fff]" /> Mail Accounts
                                </h2>
                                {/* Header Row */}
                                <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                                    <div className="col-span-12 md:col-span-5 flex items-center gap-6">
                                        <Checkbox className="border-zinc-700 data-[state=checked]:bg-[#1C352D]/90 data-[state=checked]:border-[#1C352D] rounded-[4px] h-4 w-4" />
                                        <span className="text-sm font-semibold text-zinc-400">Email Address</span>
                                    </div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">2FA Status</div>
                                    <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Primary Method</div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Last Auth</div>
                                </div>

                                {/* Rows */}
                                <div className="space-y-1">
                                    {accounts.filter(a => a.type === "Reglook Mail").map((account, index) => (
                                        <motion.div
                                            key={account.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => handleAccountSelect(account)}
                                            className="group grid grid-cols-12 gap-4 items-start px-4 py-6 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 cursor-pointer bg-[#1c1c1f]/30"
                                        >
                                            {/* Name Column */}
                                            <div className="col-span-12 md:col-span-5 flex flex-col gap-2">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center justify-center">
                                                        <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-[#1C352D]/90 data-[state=checked]:border-[#1C352D] rounded-[4px] h-4 w-4 transition-all opacity-40 group-hover:opacity-100" />
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-full bg-[${ThemeColor}] flex items-center justify-center text-white border border-white/10 group-hover:bg-[${ThemeColor}]/70 transition-colors`}>
                                                            <div className="text-[16px] font-bold">@</div>
                                                        </div>
                                                        <div>
                                                            <span className="text-white font-bold text-[15px] tracking-tight block">{account.name}</span>
                                                            <span className="text-zinc-500 text-xs font-medium">{account.type}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {(account.needsAction) && (
                                                    <div className="flex items-center gap-2 pl-[70px] mt-1">
                                                        <Badge className="bg-red-900 text-white hover:bg-red-500/20 border-0 text-[12px] uppercase font-semibold px-2 py-0.5 pointer-events-none">
                                                            Setup Required
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Status Column */}
                                            <div className="col-span-6 md:col-span-2 pl-12 md:pl-0 flex items-center">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck size={18} className={account.statusColor} />
                                                    <span className="text-white font-bold text-xs tracking-wide">{account.mfaStatus}</span>
                                                </div>
                                            </div>

                                            {/* Method Column */}
                                            <div className="col-span-6 md:col-span-3 pl-12 md:pl-0 flex items-center">
                                                <div className="bg-zinc-800/50 rounded-md px-3 py-1.5 flex items-center gap-2 border border-zinc-800">
                                                    <Smartphone size={14} className="text-zinc-400" />
                                                    <span className="text-zinc-300 font-bold text-xs">{account.mfaMethod}</span>
                                                </div>
                                            </div>

                                            {/* Last Auth Column */}
                                            <div className="col-span-12 md:col-span-2 pl-12 md:pl-0 mt-2 md:mt-0 flex items-center justify-between">
                                                <span className="text-zinc-400 text-sm font-medium">{account.lastAuth}</span>
                                                <Button className="text-zinc-500 hover:text-white">
                                                    <ExternalLink size={16} />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    /* DETAIL VIEW */
                    <div className="w-full">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full bg-[${ThemeColor}] flex items-center justify-center text-white`}>
                                    {selectedAccount.type === "Reglook Mail" ? <span className="font-bold text-lg">@</span> : <User size={20} />}
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">{selectedAccount.name}</h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={handleClearSelection}
                                    className="bg-[#1c1c1f] hover:bg-[#27272a] text-white border border-zinc-800 rounded-full h-9 text-xs font-semibold px-4 flex items-center gap-2"
                                >
                                    <ArrowLeft size={14} /> Back to Accounts
                                </Button>
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="w-full bg-[#161618] border border-zinc-800/60 rounded-xl p-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                            {/* Card 1: 2FA Status */}
                            <div className="md:col-span-5 space-y-4">
                                <h3 className="text-sm font-bold text-zinc-400">2FA Status</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={20} className={selectedAccount.statusColor} />
                                        <span className="text-white font-bold text-lg">{selectedAccount.mfaStatus}</span>
                                    </div>
                                    {selectedAccount.needsAction && (
                                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 text-xs px-3 rounded-lg flex items-center gap-2">
                                            Enable Now
                                        </Button>
                                    )}
                                </div>
                                <p className="text-zinc-500 text-xs leading-relaxed">
                                    Two-factor authentication adds an extra layer of security to your account.
                                </p>
                            </div>

                            {/* Card 2: Primary Method */}
                            <div className="md:col-span-4 space-y-4 border-l border-zinc-800/60 pl-8">
                                <h3 className="text-sm font-bold text-zinc-400">Primary Method</h3>
                                <div className="flex items-center gap-2">
                                    <Smartphone size={16} className="text-zinc-300" />
                                    <span className="text-white text-sm font-medium">{selectedAccount.mfaMethod}</span>
                                </div>
                                <div className="pt-2">
                                    <Button size="sm" className="h-7 bg-[#27272a] text-zinc-300 hover:text-white hover:bg-[#3f3f46] text-xs px-4 rounded-full">
                                        Change Method
                                    </Button>
                                </div>
                            </div>

                            {/* Card 3: Security Score */}
                            <div className="md:col-span-3 space-y-4 border-l border-zinc-800/60 pl-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">SECURITY SCORE</h3>
                                    <div className="text-2xl font-bold text-emerald-500 mb-1">High</div>
                                    <span className="text-xs text-zinc-400">Based on your configuration</span>
                                </div>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "overview" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab("methods")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "methods" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                2FA Methods
                            </button>
                            <button
                                onClick={() => setActiveTab("recovery")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "recovery" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Recovery Codes
                            </button>
                            <button
                                onClick={() => setActiveTab("access")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "access" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Access Rules
                            </button>
                        </div>

                        {/* TAB: OVERVIEW */}
                        {activeTab === "overview" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Security Overview</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Review the security health of this account.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="bg-transparent border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
                                        <h3 className="text-white font-bold text-sm flex items-center gap-2"><Lock size={16} /> Password</h3>
                                        <p className="text-zinc-500 text-xs">Last changed 3 months ago</p>
                                        <Button className="justify-start border-zinc-700 bg-[#161618] text-zinc-300 hover:text-white hover:bg-zinc-800">
                                            Change Password
                                        </Button>
                                    </div>
                                    <div className="bg-transparent border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
                                        <h3 className="text-white font-bold text-sm flex items-center gap-2"><Key size={16} /> Passkeys</h3>
                                        <p className="text-zinc-500 text-xs">0 Passkeys configured</p>
                                        <Button className="justify-start border-zinc-700 bg-[#161618] text-zinc-300 hover:text-white hover:bg-zinc-800">
                                            Manage Passkeys
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: METHODS */}
                        {activeTab === "methods" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Authentication Methods</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Configure how you sign in to your account.
                                </p>

                                <div className="space-y-4">
                                    {/* Authenticator App */}
                                    <div className="bg-transparent border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[#1c1c1f] flex items-center justify-center text-zinc-400">
                                                <QrCode size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-base">Authenticator App</h3>
                                                <p className="text-zinc-400 text-sm">Use an app like Google Authenticator or Authy</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] uppercase font-bold px-2 py-1">
                                            Enabled
                                        </Badge>
                                    </div>

                                    {/* SMS */}
                                    <div className="bg-transparent border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[#1c1c1f] flex items-center justify-center text-zinc-400">
                                                <Smartphone size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-base">Text Message (SMS)</h3>
                                                <p className="text-zinc-400 text-sm">Receive codes via SMS</p>
                                            </div>
                                        </div>
                                        <Button className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">Setup</Button>
                                    </div>

                                    {/* Security Key */}
                                    <div className="bg-transparent border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[#1c1c1f] flex items-center justify-center text-zinc-400">
                                                <Fingerprint size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-base">Security Key</h3>
                                                <p className="text-zinc-400 text-sm">Hardware keys like YubiKey</p>
                                            </div>
                                        </div>
                                        <Button className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">Setup</Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: RECOVERY */}
                        {activeTab === "recovery" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Recovery Codes</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Codes to access your account if you lose your 2FA device.
                                </p>
                                <div className="bg-transparent border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center h-[200px]">
                                    <div className="flex flex-col items-center gap-4">
                                        <Lock className="text-zinc-600" size={32} />
                                        <div className="text-center">
                                            <h3 className="text-white font-bold text-lg">Hidden for Security</h3>
                                            <p className="text-zinc-500 text-sm">Click below to view or regenerate your recovery codes.</p>
                                        </div>
                                        <Button className="bg-[#1C352D] hover:bg-[#142620] text-white">View Codes</Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: ACCESS */}
                        {activeTab === "access" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Access Rules</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Define rules for who can access this account.
                                </p>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-transparent border border-zinc-800 rounded-xl p-6 h-full flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-white font-bold mb-2">IP Allowlist</h4>
                                            <p className="text-zinc-400 text-xs mb-4">
                                                Only allow logins from specific IP addresses.
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-zinc-500 text-xs font-bold uppercase">Disabled</span>
                                            <Checkbox className="data-[state=checked]:bg-[#1C352D] border-zinc-600" />
                                        </div>
                                    </div>
                                    <div className="bg-transparent border border-zinc-800 rounded-xl p-6 h-full flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Country Restrictions</h4>
                                            <p className="text-zinc-400 text-xs mb-4">
                                                Block logins from specific countries.
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-zinc-500 text-xs font-bold uppercase">Disabled</span>
                                            <Checkbox className="data-[state=checked]:bg-[#1C352D] border-zinc-600" />
                                        </div>
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

export default function TwoFAAccessControlPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <TwoFAAccessControlContent />
        </React.Suspense>
    );
}


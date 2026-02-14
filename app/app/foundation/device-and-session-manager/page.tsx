"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    Eye,
    ShieldCheck,
    Lock,
    Globe,
    AlertTriangle,
    ExternalLink,
    Plus,
    ChevronUp,
    ShieldAlert,
    Activity,
    FileText,
    Settings,
    Shield,
    Smartphone,
    Laptop,
    Monitor,
    LogOut,
    MapPin,
    Clock,
    User,
    MailCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function DeviceSessionManagerContent() {
    // Mock data for Accounts/Identities
    const [accounts, setAccounts] = React.useState([
        {
            id: 1,
            name: "ripun@reglook.com",
            type: "Reglook Mail",
            sessions: 3,
            status: "SECURE",
            statusColor: "text-emerald-500",
            lastActive: "Just now",
            needsAction: false,
            issue: null
        },
        {
            id: 2,
            name: "theripunbty",
            type: "Reglook Account",
            sessions: 1,
            status: "SECURE",
            statusColor: "text-emerald-500",
            lastActive: "2 hours ago",
            needsAction: false,
            needsSetup: false,
            issue: null
        },
        {
            id: 3,
            name: "admin@dev.io",
            type: "Reglook Mail",
            sessions: 5,
            status: "REVIEW NEEDED",
            statusColor: "text-amber-500",
            lastActive: "1 day ago",
            needsAction: true,
            needsSetup: false,
            issue: "Unusual login attempt"
        }
    ]);

    // Mock data for Sessions (Detail View)
    const activeSessions = [
        {
            id: "s1",
            device: "MacBook Pro 16\"",
            os: "macOS Sonoma",
            browser: "Chrome 120.0",
            location: "Mumbai, India",
            ip: "103.21.12.45",
            lastActive: "Current Session",
            isCurrent: true,
            icon: <Laptop size={20} />
        },
        {
            id: "s2",
            device: "iPhone 15 Pro",
            os: "iOS 17.2",
            browser: "Safari",
            location: "Mumbai, India",
            ip: "103.21.12.45",
            lastActive: "15 mins ago",
            isCurrent: false,
            icon: <Smartphone size={20} />
        },
        {
            id: "s3",
            device: "Windows PC",
            os: "Windows 11",
            browser: "Edge",
            location: "Bangalore, India",
            ip: "14.15.112.99",
            lastActive: "2 days ago",
            isCurrent: false,
            icon: <Monitor size={20} />
        }
    ];

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

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip (Always Visible) - Theme Color #3E0703 */}
            <div className="w-full bg-[#3E0703] py-6 shadow-md z-10 transition-colors duration-300">
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
                                    <Smartphone className="text-white" size={22} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Device & Session Manager</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Button className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">Sign Out All</span>
                                <LogOut size={16} />
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
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:border-red-500 transition-all shadow-sm"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <HelpCircle size={14} className="text-zinc-600 cursor-help hover:text-zinc-400 transition-colors" />
                                    </div>
                                </div>

                                <div className="bg-[#1c1c1f] border border-zinc-800 rounded-lg flex items-center p-1 gap-1 shadow-sm">
                                    <Button className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                        <SlidersHorizontal size={14} /> Only Active
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
                                    <Activity size={16} /> <span className="text-xs">Login History</span>
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
                                        <Checkbox className="border-zinc-700 data-[state=checked]:bg-[#3E0703]/90 data-[state=checked]:border-[#3E0703] rounded-[4px] h-4 w-4" />
                                        <span className="text-sm font-semibold text-zinc-400">Account / Identity</span>
                                    </div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                                    <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Active Sessions</div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Last Active</div>
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
                                                        <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-[#3E0703]/90 data-[state=checked]:border-[#3E0703] rounded-[4px] h-4 w-4 transition-all opacity-40 group-hover:opacity-100" />
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-[#3E0703] flex items-center justify-center text-white group-hover:bg-[#3E0703]/70 transition-colors">
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
                                                        <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-0 text-[10px] uppercase font-bold px-2 py-0.5 pointer-events-none">
                                                            Review Required
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Status Column */}
                                            <div className="col-span-6 md:col-span-2 pl-12 md:pl-0 flex items-center">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck size={18} className={account.statusColor} />
                                                    <span className="text-white font-bold text-xs tracking-wide">{account.status}</span>
                                                </div>
                                            </div>

                                            {/* Sessions Column */}
                                            <div className="col-span-6 md:col-span-3 pl-12 md:pl-0 flex items-center">
                                                <div className="bg-zinc-800/50 rounded-md px-3 py-1.5 flex items-center gap-2 border border-zinc-800">
                                                    <Monitor size={14} className="text-zinc-400" />
                                                    <span className="text-zinc-300 font-bold text-xs">{account.sessions} {account.sessions === 1 ? 'Device' : 'Devices'}</span>
                                                </div>
                                            </div>

                                            {/* Last Active Column */}
                                            <div className="col-span-12 md:col-span-2 pl-12 md:pl-0 mt-2 md:mt-0 flex items-center justify-between">
                                                <span className="text-zinc-400 text-sm font-medium">{account.lastActive}</span>
                                                <Button className="text-zinc-500 hover:text-white" >
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
                                        <Checkbox className="border-zinc-700 data-[state=checked]:bg-[#3E0703]/90 data-[state=checked]:border-[#3E0703] rounded-[4px] h-4 w-4" />
                                        <span className="text-sm font-semibold text-zinc-400">Email Address</span>
                                    </div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                                    <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Active Sessions</div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Last Active</div>
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
                                                        <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-[#3E0703]/90 data-[state=checked]:border-[#3E0703] rounded-[4px] h-4 w-4 transition-all opacity-40 group-hover:opacity-100" />
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-[#3e0703] flex items-center justify-center text-white border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
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
                                                        <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-0 text-[10px] uppercase font-bold px-2 py-0.5 pointer-events-none">
                                                            Review Required
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Status Column */}
                                            <div className="col-span-6 md:col-span-2 pl-12 md:pl-0 flex items-center">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck size={18} className={account.statusColor} />
                                                    <span className="text-white font-bold text-xs tracking-wide">{account.status}</span>
                                                </div>
                                            </div>

                                            {/* Sessions Column */}
                                            <div className="col-span-6 md:col-span-3 pl-12 md:pl-0 flex items-center">
                                                <div className="bg-zinc-800/50 rounded-md px-3 py-1.5 flex items-center gap-2 border border-zinc-800">
                                                    <Monitor size={14} className="text-zinc-400" />
                                                    <span className="text-zinc-300 font-bold text-xs">{account.sessions} {account.sessions === 1 ? 'Device' : 'Devices'}</span>
                                                </div>
                                            </div>

                                            {/* Last Active Column */}
                                            <div className="col-span-12 md:col-span-2 pl-12 md:pl-0 mt-2 md:mt-0 flex items-center justify-between">
                                                <span className="text-zinc-400 text-sm font-medium">{account.lastActive}</span>
                                                <Button className="text-zinc-500 hover:text-white" >
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
                                <div className="w-10 h-10 rounded-full bg-[#3E0703] flex items-center justify-center text-white">
                                    <User size={20} />
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
                            {/* Card 1: Status */}
                            <div className="md:col-span-5 space-y-4">
                                <h3 className="text-sm font-bold text-zinc-400">Account Status</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={20} className={selectedAccount.statusColor} />
                                        <span className="text-white font-bold text-lg">{selectedAccount.status}</span>
                                    </div>
                                    {selectedAccount.needsAction && (
                                        <Button size="sm" className="bg-amber-600 hover:bg-amber-500 text-white border-0 text-xs px-3 rounded-lg flex items-center gap-2">
                                            Resolve Issue
                                        </Button>
                                    )}
                                </div>
                                <p className="text-zinc-500 text-xs leading-relaxed">
                                    Your account security is being monitored 24/7. No critical vulnerabilities detected at this time.
                                </p>
                            </div>

                            {/* Card 2: 2FA */}
                            <div className="md:col-span-4 space-y-4 border-l border-zinc-800/60 pl-8">
                                <h3 className="text-sm font-bold text-zinc-400">Two-Factor Authentication</h3>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] font-bold">ENABLED</Badge>
                                    <span className="text-zinc-400 text-xs">via Authenticator App</span>
                                </div>
                                <div className="pt-2">
                                    <Button size="sm" className="h-7 bg-[#27272a] text-zinc-300 hover:text-white hover:bg-[#3f3f46] text-xs px-4 rounded-full">
                                        Manage 2FA
                                    </Button>
                                </div>
                            </div>

                            {/* Card 3: Sessions */}
                            <div className="md:col-span-3 space-y-4 border-l border-zinc-800/60 pl-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">ACTIVE SESSIONS</h3>
                                    <div className="text-2xl font-bold text-white mb-1">{selectedAccount.sessions}</div>
                                    <span className="text-xs text-zinc-400">Across all platforms</span>
                                </div>
                                <p className="text-[11px] text-zinc-500 font-medium">Last login: {selectedAccount.lastActive}</p>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "overview" ? "text-white border-b-4 border-[#3E0703]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab("sessions")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "sessions" ? "text-white border-b-4 border-[#3E0703]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Active Sessions
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "history" ? "text-white border-b-4 border-[#3E0703]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Device History
                            </button>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "settings" ? "text-white border-b-4 border-[#3E0703]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Security Settings
                            </button>
                        </div>

                        {/* TAB: OVERVIEW */}
                        {activeTab === "overview" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Session Overview</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    A quick glance at where your account is currently logged in.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Map Card Placeholder */}
                                    <div className="col-span-1 md:col-span-2 bg-transparent border border-zinc-800 rounded-xl p-6 h-[250px] flex flex-col items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-transparent" />
                                        <MapPin className="text-[#fff] mb-3 opacity-50" size={48} />
                                        <span className="text-zinc-500 text-sm font-medium z-10">Sign-in Location Map</span>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-transparent border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
                                        <h3 className="text-white font-bold text-sm">Quick Actions</h3>
                                        <Button className="justify-start border-zinc-700 bg-[#161618] text-zinc-300 hover:text-white hover:bg-zinc-800">
                                            <Lock size={16} className="mr-2" /> Change Password
                                        </Button>
                                        <Button className="justify-start border-zinc-700 bg-[#161618] text-zinc-300 hover:text-white hover:bg-zinc-800">
                                            <LogOut size={16} className="mr-2" /> Sign Out All Devices
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: SESSIONS */}
                        {activeTab === "sessions" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Active Sessions</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Devices currently logged into your account. If you don't recognize a device, sign it out immediately.
                                </p>

                                <div className="space-y-4">
                                    {activeSessions.map((session) => (
                                        <div key={session.id} className="bg-transparent border border-zinc-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:border-zinc-700 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[#1c1c1f] flex items-center justify-center text-zinc-400">
                                                    {session.icon}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-white font-bold text-base">{session.device}</h3>
                                                        {session.isCurrent && (
                                                            <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] font-bold uppercase">Current Device</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-zinc-400 text-sm mt-1">
                                                        {session.browser} on {session.os} • {session.location}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
                                                        <Clock size={12} />
                                                        <span>Last active: {session.lastActive}</span>
                                                        <span className="text-zinc-700 mx-1">|</span>
                                                        <span>IP: {session.ip}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <Button className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-[#3E0703] hover:border-[#3E0703] transition-colors">
                                                Sign Out
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB: HISTORY */}
                        {activeTab === "history" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Device History</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Devices that have accessed your account in the last 30 days.
                                </p>

                                <div className="bg-transparent border border-zinc-800 rounded-xl overflow-hidden">
                                    <div className="p-8 flex flex-col items-center justify-center gap-4 text-center">
                                        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center">
                                            <Clock size={32} className="text-zinc-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">No other devices found</h4>
                                            <p className="text-zinc-500 text-sm mt-1">
                                                Only the currently active devices have accessed your account recently.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB: SETTINGS */}
                        {activeTab === "settings" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Security Settings</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Manage how devices can access your account.
                                </p>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-transparent border border-zinc-800 rounded-xl p-6 h-full flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Require 2FA</h4>
                                            <p className="text-zinc-400 text-xs mb-4">
                                                Ask for a verification code when signing in from a new device.
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-emerald-500 text-xs font-bold uppercase">Enabled</span>
                                            <Checkbox defaultChecked className="data-[state=checked]:bg-[#3E0703] border-zinc-600" />
                                        </div>
                                    </div>

                                    <div className="bg-transparent border border-zinc-800 rounded-xl p-6 h-full flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-white font-bold mb-2">Device Approval</h4>
                                            <p className="text-zinc-400 text-xs mb-4">
                                                Manually approve every new device via email before it can access your account.
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-zinc-500 text-xs font-bold uppercase">Disabled</span>
                                            <Checkbox className="data-[state=checked]:bg-[#3E0703] border-zinc-600" />
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

export default function DeviceSessionManagerPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <DeviceSessionManagerContent />
        </React.Suspense>
    );
}


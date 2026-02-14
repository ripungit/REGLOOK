"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    FileText,
    Download,
    Filter,
    Calendar,
    ChevronDown,
    User,
    MailCheck,
    ShieldAlert,
    ShieldCheck,
    Lock,
    Settings,
    LogIn,
    Globe,
    AlertCircle,
    Info,
    ExternalLink,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function AuditLogsContent() {
    // Mock data for Accounts/Identities
    const [accounts, setAccounts] = React.useState([
        {
            id: 1,
            name: "ripun@reglook.com",
            type: "Reglook Mail",
            recentEvents: 12,
            status: "ACTIVE",
            statusColor: "text-emerald-500",
            lastEvent: "Login success",
            lastEventTime: "Just now",
        },
        {
            id: 2,
            name: "theripunbty",
            type: "Reglook Account",
            recentEvents: 4,
            status: "ACTIVE",
            statusColor: "text-emerald-500",
            lastEvent: "Password changed",
            lastEventTime: "2 hours ago",
        },
        {
            id: 3,
            name: "admin@dev.io",
            type: "Reglook Mail",
            recentEvents: 25,
            status: "FLAGGED",
            statusColor: "text-red-500",
            lastEvent: "Failed login attempt",
            lastEventTime: "1 day ago",
            needsAction: true,
        }
    ]);

    // Mock Audit Logs Data
    const auditLogs = [
        {
            id: "evt-001",
            action: "User Login",
            category: "Authentication",
            user: "ripun@reglook.com",
            ip: "103.21.12.45",
            location: "Mumbai, IN",
            status: "Success",
            time: "Oct 24, 2023 10:42:00 AM",
            details: "Standard login via password",
            icon: <LogIn size={16} />
        },
        {
            id: "evt-002",
            action: "2FA Verified",
            category: "Authentication",
            user: "ripun@reglook.com",
            ip: "103.21.12.45",
            location: "Mumbai, IN",
            status: "Success",
            time: "Oct 24, 2023 10:42:15 AM",
            details: "Verified via Authenticator App",
            icon: <ShieldCheck size={16} />
        },
        {
            id: "evt-003",
            action: "Password Change",
            category: "Security",
            user: "theripunbty",
            ip: "14.15.112.99",
            location: "Bangalore, IN",
            status: "Success",
            time: "Oct 24, 2023 08:15:00 AM",
            details: "User initiated password reset",
            icon: <Lock size={16} />
        },
        {
            id: "evt-004",
            action: "Failed Login",
            category: "Authentication",
            user: "admin@dev.io",
            ip: "192.168.1.1",
            location: "Unknown",
            status: "Failed",
            time: "Oct 23, 2023 11:20:00 PM",
            details: "Invalid password entered 3 times",
            icon: <ShieldAlert size={16} />,
            isError: true
        },
        {
            id: "evt-005",
            action: "Settings Updated",
            category: "Administration",
            user: "ripun@reglook.com",
            ip: "103.21.12.45",
            location: "Mumbai, IN",
            status: "Success",
            time: "Oct 23, 2023 04:30:00 PM",
            details: "Changed notification preferences",
            icon: <Settings size={16} />
        }
    ];

    const [selectedAccount, setSelectedAccount] = React.useState<typeof accounts[0] | null>(null);
    const [activeTab, setActiveTab] = React.useState("all");
    const [expandedLogs, setExpandedLogs] = React.useState<string[]>([]);

    const toggleExpand = (id: string) => {
        setExpandedLogs(prev =>
            prev.includes(id) ? prev.filter(logId => logId !== id) : [...prev, id]
        );
    };

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

    const ThemeColor = "#1A2A80"; // Deep Blue Theme

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip (Always Visible) - Theme Color #1A2A80 */}
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
                                    <FileText className="text-white" size={22} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Audit Logs</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Button className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">Export CSV</span>
                                <Download size={16} />
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
                                        placeholder="Search logs by user, IP..."
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all shadow-sm"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <HelpCircle size={14} className="text-zinc-600 cursor-help hover:text-zinc-400 transition-colors" />
                                    </div>
                                </div>

                                <div className="bg-[#1c1c1f] border border-zinc-800 rounded-lg flex items-center p-1 gap-1 shadow-sm">
                                    <Button className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                        <Filter size={14} /> Filter
                                    </Button>
                                    <div className="w-[1px] h-5 bg-zinc-800" />
                                    <Button className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                        <Calendar size={14} /> Date Range
                                    </Button>
                                </div>
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
                                        <Checkbox className="border-zinc-700 data-[state=checked]:bg-[#1A2A80]/90 data-[state=checked]:border-[#1A2A80] rounded-[4px] h-4 w-4" />
                                        <span className="text-sm font-semibold text-zinc-400">Account / Identity</span>
                                    </div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                                    <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Recent Activity</div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Last Event</div>
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
                                                        <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-[#1A2A80]/90 data-[state=checked]:border-[#1A2A80] rounded-[4px] h-4 w-4 transition-all opacity-40 group-hover:opacity-100" />
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
                                                        <Badge className="bg-red-900 text-white hover:bg-red-900/80 border-0 text-[10px] uppercase font-bold px-2 py-0.5 pointer-events-none">
                                                            Security Alert
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Status Column */}
                                            <div className="col-span-6 md:col-span-2 pl-12 md:pl-0 flex items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${account.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500"}`} />
                                                    <span className="text-white font-bold text-xs tracking-wide">{account.status}</span>
                                                </div>
                                            </div>

                                            {/* Activity Column */}
                                            <div className="col-span-6 md:col-span-3 pl-12 md:pl-0 flex items-center">
                                                <div className="bg-zinc-800/50 rounded-md px-3 py-1.5 flex items-center gap-2 border border-zinc-800">
                                                    <Activity size={14} className="text-zinc-400" />
                                                    <span className="text-zinc-300 font-bold text-xs">{account.recentEvents} Events</span>
                                                </div>
                                            </div>

                                            {/* Last Event Column */}
                                            <div className="col-span-12 md:col-span-2 pl-12 md:pl-0 mt-2 md:mt-0 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-zinc-300 text-xs font-bold">{account.lastEvent}</span>
                                                    <span className="text-zinc-500 text-[10px]">{account.lastEventTime}</span>
                                                </div>
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
                                        <Checkbox className="border-zinc-700 data-[state=checked]:bg-[#1A2A80]/90 data-[state=checked]:border-[#1A2A80] rounded-[4px] h-4 w-4" />
                                        <span className="text-sm font-semibold text-zinc-400">Email Address</span>
                                    </div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                                    <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Recent Activity</div>
                                    <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Last Event</div>
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
                                                        <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-[#1A2A80]/90 data-[state=checked]:border-[#1A2A80] rounded-[4px] h-4 w-4 transition-all opacity-40 group-hover:opacity-100" />
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
                                                        <Badge className="bg-red-900 text-white hover:bg-red-900/80 border-0 text-[10px] uppercase font-bold px-2 py-0.5 pointer-events-none">
                                                            Security Alert
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Status Column */}
                                            <div className="col-span-6 md:col-span-2 pl-12 md:pl-0 flex items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${account.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500"}`} />
                                                    <span className="text-white font-bold text-xs tracking-wide">{account.status}</span>
                                                </div>
                                            </div>

                                            {/* Activity Column */}
                                            <div className="col-span-6 md:col-span-3 pl-12 md:pl-0 flex items-center">
                                                <div className="bg-zinc-800/50 rounded-md px-3 py-1.5 flex items-center gap-2 border border-zinc-800">
                                                    <Activity size={14} className="text-zinc-400" />
                                                    <span className="text-zinc-300 font-bold text-xs">{account.recentEvents} Events</span>
                                                </div>
                                            </div>

                                            {/* Last Event Column */}
                                            <div className="col-span-12 md:col-span-2 pl-12 md:pl-0 mt-2 md:mt-0 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-zinc-300 text-xs font-bold">{account.lastEvent}</span>
                                                    <span className="text-zinc-500 text-[10px]">{account.lastEventTime}</span>
                                                </div>
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

                        {/* Tab Navigation */}
                        <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab("all")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "all" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                All Events
                            </button>
                            <button
                                onClick={() => setActiveTab("security")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "security" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Security
                            </button>
                            <button
                                onClick={() => setActiveTab("authentication")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "authentication" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Authentication
                            </button>
                            <button
                                onClick={() => setActiveTab("administration")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "administration" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Administration
                            </button>
                        </div>

                        {/* Logs Table */}
                        <div className="w-full">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                                <div className="col-span-4 text-sm font-semibold text-zinc-400">Action</div>
                                <div className="col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                                <div className="col-span-2 text-sm font-semibold text-zinc-400">IP Address</div>
                                <div className="col-span-2 text-sm font-semibold text-zinc-400">Date & Time</div>
                                <div className="col-span-2 text-sm font-semibold text-zinc-400 text-right">Details</div>
                            </div>

                            {/* Table Rows */}
                            <div className="space-y-1">
                                {auditLogs
                                    .filter(log => activeTab === 'all' || log.category.toLowerCase() === activeTab)
                                    .map((log, index) => (
                                        <React.Fragment key={log.id}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={() => toggleExpand(log.id)}
                                                className={`grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 cursor-pointer ${expandedLogs.includes(log.id) ? "bg-[#1c1c1f] border-zinc-800" : "bg-[#1c1c1f]/30"}`}
                                            >
                                                <div className="col-span-4 flex items-center gap-4">
                                                    <div className="w-9 h-9 rounded-full bg-[#1c1c1f] flex items-center justify-center text-zinc-400 border border-zinc-800">
                                                        {log.icon}
                                                    </div>
                                                    <div>
                                                        <span className="text-white font-bold text-sm block">{log.action}</span>
                                                        <span className="text-zinc-500 text-xs">{log.category}</span>
                                                    </div>
                                                </div>
                                                <div className="col-span-2">
                                                    <Badge className={`${log.status === "Success" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"} border-0 text-[10px] font-bold`}>
                                                        {log.status.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <div className="col-span-2 flex flex-col">
                                                    <span className="text-zinc-300 text-xs font-medium">{log.ip}</span>
                                                    <span className="text-zinc-500 text-[10px] flex items-center gap-1"><Globe size={10} /> {log.location}</span>
                                                </div>
                                                <div className="col-span-2 text-zinc-400 text-xs font-medium">
                                                    {log.time}
                                                </div>
                                                <div className="col-span-2 flex items-center justify-end">
                                                    <Button variant="ghost" className={`h-8 w-8 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white p-0 flex items-center justify-center transition-transform ${expandedLogs.includes(log.id) ? "rotate-180" : ""}`}>
                                                        <ChevronDown size={16} />
                                                    </Button>
                                                </div>
                                            </motion.div>

                                            {expandedLogs.includes(log.id) && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden bg-[#161618] border-x border-b border-zinc-800 rounded-b-xl -mt-2 mb-2 mx-2 p-6"
                                                >
                                                    <div className="grid grid-cols-3 gap-8">
                                                        <div className="col-span-2 space-y-4">
                                                            <div>
                                                                <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Event Details</h4>
                                                                <p className="text-white text-sm bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 font-mono">
                                                                    {log.details}
                                                                </p>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <h4 className="text-zinc-500 text-xs font-bold mb-1">User Agent</h4>
                                                                    <p className="text-zinc-300 text-xs truncate">Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)</p>
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-zinc-500 text-xs font-bold mb-1">Session ID</h4>
                                                                    <p className="text-zinc-300 text-xs font-mono">sess_{Math.random().toString(36).substring(7)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1 border-l border-zinc-800 pl-8 flex flex-col justify-center">
                                                            <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-4">Actions</h4>
                                                            <div className="space-y-2">
                                                                <Button className="w-full justify-start text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white">
                                                                    <ShieldCheck size={14} className="mr-2" /> View Security Report
                                                                </Button>
                                                                <Button className="w-full justify-start text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white">
                                                                    <Info size={14} className="mr-2" /> Raw Log Data
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </React.Fragment>
                                    ))}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default function AuditLogsPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <AuditLogsContent />
        </React.Suspense>
    );
}


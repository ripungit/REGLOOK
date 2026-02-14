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
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function SecurityCenterContent() {
    // Mock data for Security Center
    const [securityServices, setSecurityServices] = React.useState([
        {
            id: 1,
            name: "eeev.in",
            features: ["WAF Enabled", "DDoS Protection"],
            status: "SECURE",
            statusColor: "text-emerald-500",
            threatsBlocked: 24,
            needsSetup: false,
            issue: null
        },
        {
            id: 2,
            name: "ondust.com",
            features: ["WAF Disabled", "Basic Protection"],
            status: "AT RISK",
            statusColor: "text-amber-500",
            threatsBlocked: 0,
            needsSetup: true,
            issue: "WAF Configuration Missing"
        },
        {
            id: 3,
            name: "touchpay.one",
            features: ["WAF Enabled", "Bot Fight Mode"],
            status: "SECURE",
            statusColor: "text-emerald-500",
            threatsBlocked: 142,
            needsSetup: false,
            issue: null
        }
    ]);

    const [selectedService, setSelectedService] = React.useState<typeof securityServices[0] | null>(null);
    const [activeTab, setActiveTab] = React.useState("overview");

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Sync URL param 'manage' with selectedService state
    React.useEffect(() => {
        const manageService = searchParams.get("manage");
        if (manageService) {
            const service = securityServices.find(s => s.name === manageService);
            if (service) {
                setSelectedService(service);
            } else {
                setSelectedService(null);
            }
        } else {
            setSelectedService(null);
        }
    }, [searchParams, securityServices]);

    const handleServiceSelect = (service: typeof securityServices[0]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("manage", service.name);
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
            <div className="w-full bg-[#5A0E24] py-6 shadow-md z-10 transition-colors duration-300">
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
                                <h1 className="text-2xl font-bold text-white tracking-tight">Security Center</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Button className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">Security Scan</span>
                                <Activity size={16} />
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
                {!selectedService ? (
                    /* LIST VIEW */
                    <>
                        {/* Controls Bar */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 w-full">
                            {/* Search & Filters */}
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                                    <Input
                                        placeholder="Search assets..."
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:border-red-500 transition-all shadow-sm"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <HelpCircle size={14} className="text-zinc-600 cursor-help hover:text-zinc-400 transition-colors" />
                                    </div>
                                </div>

                                <div className="bg-[#1c1c1f] border border-zinc-800 rounded-lg flex items-center p-1 gap-1 shadow-sm">
                                    <Button className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                        <SlidersHorizontal size={14} /> Filters
                                    </Button>
                                    <div className="w-[1px] h-5 bg-zinc-800" />
                                    <Button className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md">
                                        <ArrowUpDown size={14} /> Risk Level
                                    </Button>
                                </div>
                            </div>

                            {/* View Options */}
                            <div className="flex items-center gap-2">
                                <Button className="h-9 text-white font-semibold hover:text-white bg-[#1c1c1f] hover:bg-[#1c1c1f]/60 cursor-pointer rounded-full gap-2 px-4 transition-colors">
                                    <Eye size={16} /> <span className="text-xs">Show/Hide</span>
                                </Button>
                                <Button className="h-9 text-white font-semibold hover:text-white bg-[#1c1c1f] hover:bg-[#1c1c1f]/60 cursor-pointer rounded-full gap-2 px-4 transition-colors">
                                    <Activity size={16} /> <span className="text-xs">Audit Logs</span> <ExternalLink size={12} />
                                </Button>
                            </div>
                        </div>

                        {/* Security List */}
                        <div className="w-full">
                            {/* Header Row */}
                            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                                <div className="col-span-12 md:col-span-4 flex items-center gap-6">
                                    <Checkbox className="border-zinc-700 data-[state=checked]:bg-red-600/90 data-[state=checked]:border-red-600 rounded-[4px] h-4 w-4" />
                                    <span className="text-sm font-semibold text-zinc-400">Assets ({securityServices.length})</span>
                                </div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Active Protections</div>
                                <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Security Status</div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Threats Blocked</div>
                            </div>

                            {/* Rows */}
                            <div className="space-y-1">
                                {securityServices.map((service, index) => (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleServiceSelect(service)}
                                        className="group grid grid-cols-12 gap-4 items-start px-4 py-6 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 cursor-pointer bg-[#1c1c1f]/30"
                                    >
                                        {/* Name Column */}
                                        <div className="col-span-12 md:col-span-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center justify-center">
                                                    <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-red-600/90 data-[state=checked]:border-red-600 rounded-[4px] h-4 w-4 transition-all opacity-40 group-hover:opacity-100" />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-[#5A0E24] flex items-center justify-center text-white group-hover:bg-[#5A0E24]/70 transition-colors">
                                                        <Globe size={16} />
                                                    </div>
                                                    <span className="text-white font-bold text-[15px] tracking-tight">{service.name}</span>
                                                </div>
                                            </div>

                                            {/* Warnings / Labels */}
                                            {(service.needsSetup || service.issue) && (
                                                <div className="flex flex-col gap-2 pl-[70px]">
                                                    {service.needsSetup && (
                                                        <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm w-fit">
                                                            ACTION REQUIRED
                                                        </Badge>
                                                    )}
                                                    {service.issue && (
                                                        <div className="flex items-center gap-2 text-amber-500 text-xs font-medium">
                                                            <AlertTriangle size={12} fill="currentColor" className="text-amber-500" />
                                                            {service.issue}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Features Column */}
                                        <div className="col-span-12 md:col-span-3 flex flex-col gap-1 pl-12 md:pl-0">
                                            {service.features.map((feature, i) => (
                                                <span key={i} className="text-zinc-400 text-sm font-medium flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" /> {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Status Column */}
                                        <div className="col-span-6 md:col-span-2 pl-12 md:pl-0">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck size={20} className={service.statusColor} />
                                                <span className="text-white font-bold text-xs tracking-wide">{service.status}</span>
                                            </div>
                                        </div>

                                        {/* Threats Blocked Column */}
                                        <div className="col-span-12 md:col-span-3 flex items-center justify-between pl-12 md:pl-0 mt-2 md:mt-0">
                                            <div className="flex items-center gap-2">
                                                <Badge className="text-[10px] font-bold text-zinc-500 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 rounded-md px-2 py-1">
                                                    {service.threatsBlocked} THREATS
                                                </Badge>
                                            </div>
                                            <Button className="text-zinc-500 hover:text-white">
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
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#5A0E24] flex items-center justify-center text-white">
                                    <Shield size={20} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">{selectedService.name}</h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button className="bg-[#1c1c1f] hover:bg-[#27272a] text-white border border-zinc-800 rounded-full h-9 text-xs font-semibold px-4">
                                    Export Report
                                </Button>
                                <Button
                                    onClick={handleClearSelection}

                                    className="bg-[#1c1c1f] hover:bg-[#27272a] text-white border border-zinc-800 rounded-full h-9 text-xs font-semibold px-4 flex items-center gap-2"
                                >
                                    <ArrowLeft size={14} /> See all assets
                                </Button>
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="w-full bg-[#161618] border border-zinc-800/60 rounded-xl p-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                            {/* Security Score */}
                            <div className="md:col-span-5 space-y-4">
                                <h3 className="text-sm font-bold text-zinc-400">Security Configuration</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-zinc-200">Firewall Rules</span>
                                        <HelpCircle size={14} className="text-zinc-500 mt-1" />
                                    </div>
                                    <Button size="sm" className="h-7 bg-transparent hover:bg-transparent border-zinc-700 text-zinc-300 hover:text-white hover:border-white/10 cursor-pointer text-xs px-3 rounded-lg flex items-center gap-2">
                                        <Settings size={12} className="text-zinc-300" /> Configure
                                    </Button>
                                </div>
                                <div className="space-y-1">
                                    {selectedService.features.map((feature, i) => (
                                        <p key={i} className="text-[#fff] text-sm font-semibold flex items-center gap-2">
                                            <ShieldCheck size={14} className="text-emerald-500" /> {feature}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Status */}
                            <div className="md:col-span-4 space-y-4 border-l border-zinc-800/60 pl-8">
                                <h3 className="text-sm font-bold text-zinc-400">Current Status</h3>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={16} className={selectedService.statusColor} />
                                    <span className="text-white font-bold text-sm tracking-wide">{selectedService.status}</span>
                                </div>
                                <div className="pt-2">
                                    <Button size="sm" className="h-7 bg-[#27272a] text-zinc-300 hover:text-white hover:bg-[#3f3f46] text-xs px-4 rounded-full">
                                        Run Diagnostics
                                    </Button>
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="md:col-span-3 space-y-4 border-l border-zinc-800/60 pl-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">LAST 24 HOURS</h3>
                                    <div className="text-2xl font-bold text-white mb-1">{selectedService.threatsBlocked}</div>
                                    <span className="text-xs text-zinc-400">Threats Mitigated</span>
                                </div>
                                <p className="text-[11px] text-zinc-500 font-medium">Last scan: Oct 24, 2025 2:00 PM</p>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "overview" ? "text-white border-b-4 border-[#5A0E24]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab("waf")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "waf" ? "text-white border-b-4 border-[#5A0E24]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                WAF
                            </button>
                            <button
                                onClick={() => setActiveTab("bots")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "bots" ? "text-white border-b-4 border-[#5A0E24]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Bots
                            </button>
                            <button
                                onClick={() => setActiveTab("ddos")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "ddos" ? "text-white border-b-4 border-[#5A0E24]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                DDoS
                            </button>
                            <button
                                onClick={() => setActiveTab("events")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "events" ? "text-white border-b-4 border-[#5A0E24]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Events
                            </button>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "settings" ? "text-white border-b-4 border-[#5A0E24]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Settings
                            </button>
                        </div>

                        {/* TAB CONTENT: OVERVIEW */}
                        {activeTab === "overview" && (
                            <>
                                {/* Security Summary Banner */}
                                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 mb-8">
                                    <h2 className="text-2xl font-bold text-white">Security Posture</h2>
                                    <p className="text-zinc-400 text-sm max-w-[600px] leading-relaxed">
                                        Your asset is currently monitored by our advanced threat detection network.
                                        Review recent incidents and adjust your protection levels below.
                                    </p>
                                    <Button className="bg-[#27272a] hover:bg-[#3f3f46] text-white font-semibold rounded-full px-6 h-10 mt-2">
                                        View Security Report
                                    </Button>
                                </div>

                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6">
                                        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldAlert size={18} className="text-red-500" /> Recent Threats</h3>
                                        <div className="space-y-4">
                                            {[1, 2, 3].map((_, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#1c1c1f] border border-zinc-800/50">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                                        <div>
                                                            <div className="text-sm font-medium text-white">SQL Injection Attempt</div>
                                                            <div className="text-xs text-zinc-500">192.168.1.{100 + i} • 2 hours ago</div>
                                                        </div>
                                                    </div>
                                                    <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-[10px]">BLOCKED</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6">
                                        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Activity size={18} className="text-blue-500" /> Traffic Analysis</h3>
                                        <div className="flex items-center justify-center h-[200px] bg-[#1c1c1f] rounded-lg border border-zinc-800/50">
                                            <span className="text-zinc-500 text-sm font-medium">Traffic Chart Placeholder</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* TAB CONTENT: WAF */}
                        {activeTab === "waf" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Web Application Firewall</h2>
                                <p className="text-zinc-400 text-sm mb-4 max-w-[800px]">
                                    Create and manage rules to block malicious traffic before it reaches your server.
                                </p>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Managed Rules */}
                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6 h-full">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-white font-bold text-sm">Reglook Managed Rules</h3>
                                            <Badge className="text-[#5A0E24] border-[#5A0E24] bg-[#5A0E24]/10">ENABLED</Badge>
                                        </div>
                                        <p className="text-xs text-zinc-500 mb-4 h-10">
                                            A set of rules optimized for your technology stack (WordPress, PHP, etc).
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-[#1c1c1f] rounded-lg">
                                                <span className="text-sm text-zinc-300">Reglook Core Ruleset</span>
                                                <Checkbox defaultChecked className="data-[state=checked]:bg-red-600 border-zinc-600" />
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-[#1c1c1f] rounded-lg">
                                                <span className="text-sm text-zinc-300">OWASP Top 10</span>
                                                <Checkbox defaultChecked className="data-[state=checked]:bg-red-600 border-zinc-600" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Custom Rules */}
                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden h-full flex flex-col">
                                        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-800/50 bg-[#161618]">
                                            <h3 className="text-sm font-bold text-white">Custom Rules</h3>
                                            <Button size="sm" className="h-8 bg-[#5A0E24] hover:bg-[#5A0E24]/60 text-white rounded-lg flex items-center gap-2 text-xs">
                                                <Plus size={14} /> Create Rule
                                            </Button>
                                        </div>
                                        <div className="p-12 flex flex-col items-center justify-center gap-6 flex-1">
                                            <span className="text-zinc-500 text-sm font-medium">No custom rules configured</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: BOTS */}
                        {activeTab === "bots" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Bot Management</h2>
                                <p className="text-zinc-400 text-sm mb-4 max-w-[800px]">
                                    Challenge or block requests from known bots and automated scripts.
                                </p>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="p-6 bg-[#111111] border border-zinc-800 rounded-xl flex flex-col justify-between h-full">
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-white font-bold text-sm">Bot Fight Mode</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-white/50">OFF</span>
                                                    <Checkbox className="data-[state=checked]:bg-red-600 border-zinc-600" />
                                                    <span className="text-xs font-bold text-white">ON</span>
                                                </div>
                                            </div>
                                            <p className="text-zinc-500 text-xs max-w-[400px]">
                                                Blocks patterns that match known bad bots before they access your site.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-[#111111] border border-zinc-800 rounded-xl flex flex-col justify-between h-full opacity-50 relative overflow-hidden">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-white font-bold text-sm">Super Bot Fight Mode</h4>
                                                    <Badge className="bg-amber-500 text-white hover:bg-amber-600 border-0 text-[10px] uppercase font-bold px-1.5 py-0">PRO</Badge>
                                                </div>
                                                <Button size="sm" className="border-zinc-700 text-zinc-300 h-7 text-xs">Upgrade</Button>
                                            </div>
                                            <p className="text-zinc-500 text-xs max-w-[400px]">
                                                Advanced protection against sophisticated automated attacks. Requires Pro plan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: DDOS */}
                        {activeTab === "ddos" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">DDoS Protection</h2>
                                <p className="text-zinc-400 text-sm mb-4 max-w-[800px]">
                                    Configure thresholds for Denial of Service attacks.
                                </p>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="p-6 bg-[#111111] border border-zinc-800 rounded-xl h-full">
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="text-white font-bold text-sm">HTTP DDoS Attack Protection</h4>
                                            <Button className="h-8 text-zinc-400 text-xs">Configure</Button>
                                        </div>
                                        <div className="relative pt-6 pb-2">
                                            <div className="h-2 bg-zinc-800 rounded-full w-full relative">
                                                <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-blue-500/50 rounded-l-full" />
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow cursor-pointer" />
                                            </div>
                                            <div className="flex justify-between mt-2 text-xs text-zinc-500 px-1">
                                                <span>Easy</span>
                                                <span className="text-white font-bold">Standard</span>
                                                <span>High Sensitivity</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-zinc-400 mt-4 bg-[#1c1c1f] p-3 rounded-lg border border-zinc-800">
                                            Standard setting challenges visitors that exhibit uncommon traffic patterns.
                                        </p>
                                    </div>

                                    {/* Placeholder for future DDoS settings */}
                                    <div className="p-6 bg-[#111111] border border-zinc-800/50 border-dashed rounded-xl h-full flex flex-col items-center justify-center text-center">
                                        <div className="p-3 bg-zinc-900 rounded-full mb-3">
                                            <ShieldAlert className="text-zinc-600" size={24} />
                                        </div>
                                        <h4 className="text-zinc-400 font-bold text-sm">Layer 4 Protection</h4>
                                        <p className="text-zinc-600 text-xs mt-1 max-w-[250px]">
                                            Advanced packet inspection and mitigation strategies coming soon.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: EVENTS (Renamed from Firewall) */}
                        {activeTab === "events" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Security Events</h2>
                                <p className="text-zinc-400 text-sm mb-4 max-w-[800px]">
                                    Review all security events including WAF, DDoS, and Firewall actions.
                                </p>

                                <div className="w-full bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden mt-6">
                                    <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-800/50 bg-[#161618]">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            Event Log <span className="text-zinc-500 text-xs font-normal ml-1">Last 24 hours</span>
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <Button className="h-6 w-6 text-zinc-500 hover:text-white hover:bg-[#27272a]">
                                                <Search size={16} />
                                            </Button>
                                            <Button className="h-6 w-6 text-zinc-500 hover:text-white hover:bg-[#27272a]">
                                                <SlidersHorizontal size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-12 flex flex-col items-center justify-center gap-6">
                                        <span className="text-zinc-500 text-sm font-medium">No recorded events in this period</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: SETTINGS */}
                        {activeTab === "settings" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Security Settings</h2>
                                <p className="text-zinc-400 text-sm mb-4 max-w-[800px]">
                                    Configure global security policies for this asset.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                    <div className="p-5 bg-[#111111] border border-zinc-800 rounded-xl flex flex-col justify-between h-full hover:border-zinc-700 transition-colors">
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-white font-bold text-sm">Under Attack Mode</h4>
                                                <Checkbox className="data-[state=checked]:bg-red-600 border-zinc-600 mt-1" />
                                            </div>
                                            <p className="text-zinc-500 text-xs leading-relaxed">
                                                Show a JavaScript challenge to every visitor correctly to mitigate attacks.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-[#111111] border border-zinc-800 rounded-xl flex flex-col justify-between h-full hover:border-zinc-700 transition-colors">
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-white font-bold text-sm">Always Use HTTPS</h4>
                                                <Checkbox defaultChecked className="data-[state=checked]:bg-red-600 border-zinc-600 mt-1" />
                                            </div>
                                            <p className="text-zinc-500 text-xs leading-relaxed">
                                                Redirect all HTTP requests to HTTPS for secure connections.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-[#111111] border border-zinc-800 rounded-xl flex flex-col justify-between h-full hover:border-zinc-700 transition-colors">
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-white font-bold text-sm">Browser Integrity Check</h4>
                                                <Checkbox defaultChecked className="data-[state=checked]:bg-red-600 border-zinc-600 mt-1" />
                                            </div>
                                            <p className="text-zinc-500 text-xs leading-relaxed">
                                                Evaluate HTTP headers for commonly used threats and bad actors.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-[#111111] border border-zinc-800 rounded-xl flex flex-col justify-between h-full hover:border-zinc-700 transition-colors">
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-white font-bold text-sm">Security Level</h4>
                                                <Button className="h-6 text-xs text-zinc-400">Edit</Button>
                                            </div>
                                            <p className="text-zinc-500 text-xs leading-relaxed mb-3">
                                                Controls how much to challenge visitors to your website.
                                            </p>
                                            <Badge className="border-zinc-700 text-zinc-300">Medium</Badge>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-[#111111] border border-zinc-800 rounded-xl flex flex-col justify-between h-full hover:border-zinc-700 transition-colors">
                                        <div>
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-white font-bold text-sm">Challenge Passage</h4>
                                                <Button className="h-6 text-xs text-zinc-400">Edit</Button>
                                            </div>
                                            <p className="text-zinc-500 text-xs leading-relaxed mb-3">
                                                Specify how long a visitor is allowed access after passing a challenge.
                                            </p>
                                            <Badge className="border-zinc-700 text-zinc-300">30 Minutes</Badge>
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

export default function SecurityCenterPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <SecurityCenterContent />
        </React.Suspense>
    );
}


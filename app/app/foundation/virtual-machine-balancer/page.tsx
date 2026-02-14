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
    Server,
    Activity,
    Cpu,
    Zap,
    ArrowRight,
    AlertTriangle,
    ExternalLink,
    Plus,
    ArrowUp,
    ChevronUp,
    Settings,
    Shield,
    GitBranch,
    Terminal,
    Play,
    Clock,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function VirtualMachineBalancerContent() {
    // Mock data for load balancers
    const [balancers, setBalancers] = React.useState([
        {
            id: 1,
            name: "lb-prod-us-east",
            region: "US East (N. Virginia)",
            status: "ACTIVE",
            statusColor: "text-emerald-500",
            targetsCount: 4,
            algorithm: "Round Robin",
            warning: null
        },
        {
            id: 2,
            name: "lb-staging-eu",
            region: "EU West (London)",
            status: "DEGRADED",
            statusColor: "text-amber-500",
            targetsCount: 2,
            algorithm: "Least Connections",
            warning: "High latency detected on instance i-0392"
        },
        {
            id: 3,
            name: "lb-dev-internal",
            region: "US West (Oregon)",
            status: "ACTIVE",
            statusColor: "text-emerald-500",
            targetsCount: 1,
            algorithm: "Round Robin",
            warning: null
        }
    ]);

    const [selectedBalancer, setSelectedBalancer] = React.useState<typeof balancers[0] | null>(null);
    const [isCreating, setIsCreating] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState("overview");

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Sync URL param 'manage' with selectedBalancer state
    React.useEffect(() => {
        const manageBalancer = searchParams.get("manage");
        if (manageBalancer) {
            const balancer = balancers.find(b => b.name === manageBalancer);
            if (balancer) {
                setSelectedBalancer(balancer);
            } else {
                setSelectedBalancer(null);
            }
        } else {
            setSelectedBalancer(null);
        }
    }, [searchParams, balancers]);

    const handleBalancerSelect = (balancer: typeof balancers[0]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("manage", balancer.name);
        router.push(pathname + "?" + params.toString());
    };

    const handleClearSelection = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("manage");
        router.push(pathname + "?" + params.toString());
    };

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip (Color #662222) */}
            <div className="w-full bg-[#662222] py-6 shadow-md z-10 transition-colors duration-300">
                <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-4">
                            <Link href="/foundation">
                                <Button variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-10 w-10">
                                    <ArrowLeft size={22} />
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex p-2 bg-white/10 rounded-full backdrop-blur-sm">
                                    <Server className="text-white" size={22} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">VM Balancer</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={() => setIsCreating(true)}
                                className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">Create Balancer</span>
                                <Plus size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full h-10 w-10">
                                <HelpCircle size={22} className="md:w-[22px] md:h-[22px] w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-8 flex-1">
                {isCreating ? (
                    // CREATE VIEW
                    <div className="w-full max-w-[1200px] mx-auto">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <Button
                                onClick={() => setIsCreating(false)}
                                variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full">
                                <ArrowLeft size={20} />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Create Load Balancer</h1>
                                <p className="text-zinc-400 text-sm mt-1">Configure your new load balancer settings</p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="space-y-8 bg-[#161618] border border-zinc-800 rounded-2xl p-8">
                            {/* Section 1: Basic Info */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#662222] text-xs flex items-center justify-center font-bold">1</div>
                                    Basic Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-zinc-400 uppercase">Balancer Name</label>
                                        <Input
                                            placeholder="e.g. lb-production-01"
                                            className="bg-[#111111] border-zinc-700 text-white focus:ring-[#662222] focus:border-[#662222] mt-2"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-zinc-400 uppercase">Region</label>
                                        <select className="w-full h-10 px-3 rounded-md bg-[#111111] border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#662222] focus:border-[#662222] mt-2">
                                            <option>US East (N. Virginia)</option>
                                            <option>US West (Oregon)</option>
                                            <option>EU West (London)</option>
                                            <option>Asia Pacific (Singapore)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Algorithm */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#662222] text-xs flex items-center justify-center font-bold">2</div>
                                    Algorithm
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                                    <div className="p-4 rounded-xl border border-[#662222] bg-[#662222]/10 cursor-pointer relative">
                                        <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#662222] border-2 border-[#161618] shadow-sm"></div>
                                        <h4 className="font-bold text-white text-sm">Round Robin</h4>
                                        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">Requests are distributed sequentially across all available storage.</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-zinc-800 bg-[#1c1c1f] hover:border-zinc-700 cursor-pointer transition-colors">
                                        <h4 className="font-bold text-zinc-300 text-sm">Least Connections</h4>
                                        <p className="text-xs text-zinc-500 mt-2 leading-relaxed">Requests are sent to the instance with the fewest active connections.</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-zinc-800 bg-[#1c1c1f] hover:border-zinc-700 cursor-pointer transition-colors">
                                        <h4 className="font-bold text-zinc-300 text-sm">IP Hash</h4>
                                        <p className="text-xs text-zinc-500 mt-2 leading-relaxed">The client's IP address determines which server receives the request.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Settings */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#662222] text-xs flex items-center justify-center font-bold">3</div>
                                    Settings
                                </h3>
                                <div className="pl-8 space-y-3">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1c1c1f] border border-zinc-800">
                                        <Checkbox className="border-zinc-600 data-[state=checked]:bg-[#662222] data-[state=checked]:border-[#662222]" />
                                        <div>
                                            <p className="text-sm font-medium text-white">Enable Health Checks</p>
                                            <p className="text-xs text-zinc-500">Automatically remove unhealthy instances</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1c1c1f] border border-zinc-800">
                                        <Checkbox className="border-zinc-600 data-[state=checked]:bg-[#662222] data-[state=checked]:border-[#662222]" />
                                        <div>
                                            <p className="text-sm font-medium text-white">Enable Sticky Sessions</p>
                                            <p className="text-xs text-zinc-500">Bind a user's session to a specific instance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                                <Button
                                    onClick={() => setIsCreating(false)}
                                    variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsCreating(false);
                                        // Mock create
                                        const newId = balancers.length + 1;
                                        setBalancers([...balancers, {
                                            id: newId,
                                            name: "lb-new-balancer-" + newId,
                                            region: "US East (N. Virginia)",
                                            status: "PROVISIONING",
                                            statusColor: "text-zinc-400",
                                            targetsCount: 0,
                                            algorithm: "Round Robin",
                                            warning: null
                                        }]);
                                    }}
                                    className="bg-[#662222] hover:bg-[#662222]/80 text-white font-semibold px-8">
                                    Create Balancer
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : !selectedBalancer ? (
                    /* LIST VIEW */
                    <>
                        {/* Controls Bar */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 w-full">
                            {/* Search & Filters */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                <div className="relative group w-full sm:w-auto">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                                    <Input
                                        placeholder="Search balancers..."
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-full sm:w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#662222] focus-visible:border-[#662222] transition-all shadow-sm"
                                    />
                                </div>

                                <div className="bg-[#1c1c1f] border border-zinc-800 rounded-lg flex items-center p-1 gap-1 shadow-sm w-full sm:w-auto">
                                    <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md w-full sm:w-auto justify-center">
                                        <SlidersHorizontal size={14} /> Filters
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Balancer List */}
                        <div className="w-full">
                            {/* Header Row */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                                <div className="col-span-5 md:col-span-4 flex items-center gap-6">
                                    <Checkbox className="border-zinc-700 data-[state=checked]:bg-[#662222] data-[state=checked]:border-[#662222] rounded-[4px] h-4 w-4" />
                                    <span className="text-sm font-semibold text-zinc-400">Load Balancer ({balancers.length})</span>
                                </div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Region</div>
                                <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Targets</div>
                            </div>

                            {/* Rows */}
                            <div className="space-y-1">
                                {balancers.map((balancer, index) => (
                                    <motion.div
                                        key={balancer.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleBalancerSelect(balancer)}
                                        className="group flex flex-col md:grid md:grid-cols-12 gap-4 items-start px-4 py-6 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 cursor-pointer bg-[#1c1c1f]/30"
                                    >
                                        {/* Name Column */}
                                        <div className="w-full md:col-span-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center justify-center">
                                                    <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-[#662222] data-[state=checked]:border-[#662222] rounded-[4px] h-4 w-4 transition-all opacity-40 group-hover:opacity-100" />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-[#662222] flex items-center justify-center text-white group-hover:bg-[#662222]/70 transition-colors shrink-0">
                                                        <Activity size={16} />
                                                    </div>
                                                    <span className="text-white font-bold text-[15px] tracking-tight break-all">{balancer.name}</span>
                                                </div>
                                            </div>

                                            {balancer.warning && (
                                                <div className="flex flex-col gap-2 pl-[70px]">
                                                    <div className="flex items-center gap-2 text-amber-500 text-xs font-medium">
                                                        <AlertTriangle size={12} fill="currentColor" className="text-amber-500 shrink-0" />
                                                        {balancer.warning}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Region Column */}
                                        <div className="w-full md:col-span-3 flex flex-col gap-1 pl-[70px] md:pl-0 -mt-2 md:mt-0">
                                            <span className="md:hidden text-xs font-bold text-zinc-500 uppercase">Region</span>
                                            <span className="text-zinc-400 text-sm font-medium">{balancer.region}</span>
                                        </div>

                                        {/* Status Column */}
                                        <div className="w-full md:col-span-2 pl-[70px] md:pl-0">
                                            <span className="md:hidden text-xs font-bold text-zinc-500 uppercase block mb-1">Status</span>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${balancer.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                <span className="text-white font-bold text-xs tracking-wide">{balancer.status}</span>
                                            </div>
                                        </div>

                                        {/* Targets Column */}
                                        <div className="w-full md:col-span-3 flex items-center justify-between pl-[70px] md:pl-0 mt-2 md:mt-0">
                                            <div className="flex items-center gap-2">
                                                <span className="md:hidden text-xs font-bold text-zinc-500 uppercase mr-2">Targets</span>
                                                <Badge variant="outline" className="text-[10px] font-bold text-zinc-500 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 rounded-md px-2 py-1">
                                                    {balancer.targetsCount} INSTANCES
                                                </Badge>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white">
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
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#662222] flex items-center justify-center text-white">
                                    <Server size={20} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">{selectedBalancer.name}</h1>
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Button
                                    onClick={handleClearSelection}
                                    variant="secondary"
                                    className="bg-[#1c1c1f] hover:bg-[#27272a] text-white border border-zinc-800 rounded-full h-9 text-xs font-semibold px-4 flex items-center gap-2 w-full md:w-auto justify-center"
                                >
                                    <ArrowLeft size={14} /> Back to List
                                </Button>
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="w-full bg-[#161618] border border-zinc-800/60 rounded-xl p-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                            <div className="md:col-span-4 space-y-4">
                                <h3 className="text-sm font-bold text-zinc-400">Distribution Algorithm</h3>
                                <div className="space-y-1">
                                    <p className="text-[#fff] text-sm font-semibold">{selectedBalancer.algorithm}</p>
                                </div>
                            </div>

                            <div className="md:col-span-4 space-y-4 border-l border-zinc-800/60 pl-8 md:border-l-0 md:pl-0 lg:border-l lg:pl-8">
                                <h3 className="text-sm font-bold text-zinc-400">Health Status</h3>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${selectedBalancer.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                    <span className="text-white font-bold text-sm tracking-wide">{selectedBalancer.status}</span>
                                </div>
                            </div>

                            <div className="md:col-span-4 space-y-4 border-l border-zinc-800/60 pl-8 md:border-l-0 md:pl-0 lg:border-l lg:pl-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">REGION</h3>
                                    <span className="text-zinc-200 text-sm font-semibold">{selectedBalancer.region}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "overview" ? "text-white border-b-4 border-[#662222]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab("targets")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "targets" ? "text-white border-b-4 border-[#662222]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Target Groups
                            </button>
                            <button
                                onClick={() => setActiveTab("security")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "security" ? "text-white border-b-4 border-[#662222]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Security
                            </button>
                            <button
                                onClick={() => setActiveTab("pipelines")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "pipelines" ? "text-white border-b-4 border-[#662222]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Pipelines
                            </button>
                            <button
                                onClick={() => setActiveTab("monitoring")}
                                className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "monitoring" ? "text-white border-b-4 border-[#662222]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Monitoring
                            </button>
                        </div>

                        {/* TAB CONTENT: OVERVIEW */}
                        {activeTab === "overview" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Balancer Performance</h2>
                                <p className="text-zinc-400 text-sm mb-6 max-w-[800px]">
                                    Real-time metrics for connection handling and latency.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6">
                                        <div className="text-zinc-500 text-xs font-bold uppercase mb-2">Active Connections</div>
                                        <div className="text-2xl font-bold text-white">1,248</div>
                                        <div className="text-emerald-500 text-xs font-medium mt-1">+12% from last hour</div>
                                    </div>
                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6">
                                        <div className="text-zinc-500 text-xs font-bold uppercase mb-2">Requests / Sec</div>
                                        <div className="text-2xl font-bold text-white">450</div>
                                        <div className="text-zinc-400 text-xs font-medium mt-1">Peak: 620</div>
                                    </div>
                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6">
                                        <div className="text-zinc-500 text-xs font-bold uppercase mb-2">Avg Latency</div>
                                        <div className="text-2xl font-bold text-white">24ms</div>
                                        <div className="text-emerald-500 text-xs font-medium mt-1">Normal range</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: TARGETS */}
                        {activeTab === "targets" && (
                            <div className="w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                                    <h2 className="text-xl font-bold text-white">Registered Targets</h2>
                                    <Button className="h-8 bg-[#662222] hover:bg-[#662222]/80 text-white text-xs font-bold px-4 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto">
                                        <Plus size={14} /> Add Target
                                    </Button>
                                </div>
                                <div className="w-full bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden">
                                    <div className="hidden md:flex px-6 py-4 items-center justify-between border-b border-zinc-800/50 bg-[#161618]">
                                        <div className="grid grid-cols-12 gap-4 w-full text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                            <div className="col-span-4">Instance ID</div>
                                            <div className="col-span-3">Port</div>
                                            <div className="col-span-3">Status</div>
                                            <div className="col-span-2">Health</div>
                                        </div>
                                    </div>
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="px-6 py-4 flex items-center border-b border-zinc-800/30 last:border-0 hover:bg-[#1c1c1f] transition-colors">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 w-full items-start md:items-center">
                                                <div className="col-span-1 md:col-span-4 text-white font-medium text-sm flex items-center gap-2">
                                                    <div className="md:hidden text-zinc-500 text-xs w-20 shrink-0">INSTANCE</div>
                                                    <Cpu size={14} className="text-zinc-400" /> i-0f92b{i}93
                                                </div>
                                                <div className="col-span-1 md:col-span-3 text-zinc-300 text-sm flex items-center gap-2">
                                                    <span className="md:hidden text-zinc-500 text-xs w-20 shrink-0 uppercase">Port</span>
                                                    80
                                                </div>
                                                <div className="col-span-1 md:col-span-3 flex items-center gap-2">
                                                    <span className="md:hidden text-zinc-500 text-xs w-20 shrink-0 uppercase">Status</span>
                                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] h-5">IN SERVICE</Badge>
                                                </div>
                                                <div className="col-span-1 md:col-span-2 text-emerald-500 text-xs font-bold flex items-center gap-2">
                                                    <span className="md:hidden text-zinc-500 text-xs w-20 shrink-0 uppercase font-normal text-left">Health</span>
                                                    HEALTHY
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: SECURITY */}
                        {activeTab === "security" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Security Groups & TLS</h2>
                                <p className="text-zinc-400 text-sm mb-6">
                                    Manage SSL certificates and firewall rules.
                                </p>

                                <div className="w-full bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden mb-6">
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row items-start gap-4">
                                            <div className="p-2 bg-zinc-800/50 rounded-lg">
                                                <Shield size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-sm">SSL Certificate</h3>
                                                <p className="text-zinc-400 text-xs mt-1">Issued by Reglook Global CA</p>
                                                <div className="flex items-center gap-2 mt-3">
                                                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/5 text-[10px]">VALID</Badge>
                                                    <span className="text-zinc-500 text-xs">Expires on Oct 24, 2026</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#1c1c1f] px-6 py-3 border-t border-zinc-800 flex justify-end">
                                        <Button className="text-zinc-400 hover:text-white text-xs h-8">Manage Certificate</Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: PIPELINES */}
                        {activeTab === "pipelines" && (
                            <div className="w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
                                    <h2 className="text-xl font-bold text-white">CI/CD Pipelines</h2>
                                    <Button className="h-8 bg-[#662222] hover:bg-[#662222]/80 text-white text-xs font-bold px-4 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto">
                                        <Plus size={14} /> Connect Pipeline
                                    </Button>
                                </div>
                                <p className="text-zinc-400 text-sm mb-6">
                                    Manage automated deployments and easy rollbacks.
                                </p>

                                <div className="space-y-4">
                                    {/* Pipeline Item 1 */}
                                    <div className="w-full bg-[#111111] border border-zinc-800 rounded-xl overflow-hidden p-6">
                                        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-zinc-800/50 rounded-lg">
                                                    <GitBranch size={24} className="text-white" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="text-white font-bold text-base break-all">reglook-backend-deploy</h3>
                                                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px] shrink-0">GITHUB ACTIONS</Badge>
                                                    </div>
                                                    <p className="text-zinc-500 text-sm mt-1">Last run: 2 hours ago</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                                <Button className="bg-transparent border-zinc-700 text-zinc-300 hover:text-white h-8 text-xs flex-1 sm:flex-none">
                                                    <Settings size={14} className="mr-2" /> Configure
                                                </Button>
                                                <Button size="sm" className="bg-[#662222] hover:bg-[#662222]/80 text-white h-8 text-xs flex-1 sm:flex-none">
                                                    <Play size={14} className="mr-2" /> Run Pipeline
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-[#1c1c1f] rounded-lg border border-zinc-800/50">
                                                <div className="flex items-center gap-3">
                                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                                    <span className="text-zinc-300 text-sm font-medium">Deploy to Production</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                                                    <span className="flex items-center gap-1"><Clock size={12} /> 2m 45s</span>
                                                    <span>#1042</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-[#1c1c1f] rounded-lg border border-zinc-800/50">
                                                <div className="flex items-center gap-3">
                                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                                    <span className="text-zinc-300 text-sm font-medium">Run Integration Tests</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                                                    <span className="flex items-center gap-1"><Clock size={12} /> 4m 12s</span>
                                                    <span>#1042</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-[#1c1c1f] rounded-lg border border-zinc-800/50">
                                                <div className="flex items-center gap-3">
                                                    <XCircle size={16} className="text-red-500" />
                                                    <span className="text-zinc-300 text-sm font-medium">Load Testing (Canary)</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                                                    <span className="flex items-center gap-1"><Clock size={12} /> 1m 05s</span>
                                                    <span className="text-red-400">FAILED</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB CONTENT: MONITORING */}
                        {activeTab === "monitoring" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Real-time Monitoring</h2>
                                <p className="text-zinc-400 text-sm mb-6">
                                    Deep dive into instance performance and request logs.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6 h-[250px] flex flex-col">
                                        <h3 className="text-zinc-400 text-xs font-bold uppercase mb-4">Request Latency (p99)</h3>
                                        <div className="flex-1 flex items-end gap-1">
                                            {[45, 60, 30, 80, 50, 40, 70, 45, 30, 60, 80, 90, 40, 50, 60, 30].map((h, i) => (
                                                <div key={i} className="flex-1 bg-[#662222]/80 hover:bg-[#662222] rounded-t-sm transition-all" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between mt-2 text-[10px] text-zinc-600 font-mono">
                                            <span>10:00 AM</span>
                                            <span>11:00 AM</span>
                                        </div>
                                    </div>
                                    <div className="bg-[#111111] border border-zinc-800 rounded-xl p-6 h-[250px] flex flex-col">
                                        <h3 className="text-zinc-400 text-xs font-bold uppercase mb-4">Error Rate (5xx)</h3>
                                        <div className="flex-1 flex items-end gap-1">
                                            {[5, 10, 5, 5, 20, 5, 5, 5, 5, 10, 30, 5, 5, 5, 5, 5].map((h, i) => (
                                                <div key={i} className="flex-1 bg-zinc-800 hover:bg-zinc-700 rounded-t-sm transition-all" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between mt-2 text-[10px] text-zinc-600 font-mono">
                                            <span>10:00 AM</span>
                                            <span>11:00 AM</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full bg-[#0f0f10] border border-zinc-800 rounded-xl overflow-hidden font-mono text-xs">
                                    <div className="flex items-center justify-between px-4 py-2 bg-[#161618] border-b border-zinc-800">
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <Terminal size={14} />
                                            <span className="font-bold">Access Logs (Live)</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-1 max-h-[300px] overflow-y-auto text-zinc-400 overflow-x-auto whitespace-nowrap">
                                        <p><span className="text-emerald-500">[INFO]</span> 10:42:01 - GET /api/v1/health - 200 OK - 12ms</p>
                                        <p><span className="text-emerald-500">[INFO]</span> 10:42:05 - GET /app/dashboard - 200 OK - 145ms</p>
                                        <p><span className="text-amber-500">[WARN]</span> 10:42:12 - POST /api/v1/upload - 429 Too Many Requests - 5ms</p>
                                        <p><span className="text-emerald-500">[INFO]</span> 10:42:15 - GET /static/main.css - 304 Not Modified - 2ms</p>
                                        <p><span className="text-red-500">[ERR ]</span> 10:42:22 - Timeout on upstream target i-0f92b193 (5000ms)</p>
                                        <p><span className="text-emerald-500">[INFO]</span> 10:42:30 - GET /api/v1/users - 200 OK - 88ms</p>
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

export default function VirtualMachineBalancerPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <VirtualMachineBalancerContent />
        </React.Suspense>
    );
}


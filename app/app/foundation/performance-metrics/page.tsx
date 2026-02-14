"use client";

import React from "react";
import {
    ArrowLeft,
    Activity,
    Server,
    Cpu,
    HardDrive,
    Database,
    BarChart3,
    MoreHorizontal,
    PlayCircle,
    StopCircle,
    RefreshCw,
    Search,
    Filter,
    ArrowRight,
    Zap,
    Clock,
    AlertTriangle,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
    { time: '10:00', cpu: 30, memory: 40, disk: 20 },
    { time: '10:05', cpu: 45, memory: 42, disk: 25 },
    { time: '10:10', cpu: 35, memory: 45, disk: 22 },
    { time: '10:15', cpu: 55, memory: 48, disk: 30 },
    { time: '10:20', cpu: 40, memory: 50, disk: 28 },
    { time: '10:25', cpu: 60, memory: 52, disk: 35 },
    { time: '10:30', cpu: 50, memory: 55, disk: 32 },
    { time: '10:35', cpu: 75, memory: 58, disk: 40 },
    { time: '10:40', cpu: 65, memory: 60, disk: 38 },
    { time: '10:45', cpu: 55, memory: 58, disk: 35 },
    { time: '10:50', cpu: 45, memory: 55, disk: 30 },
    { time: '10:55', cpu: 40, memory: 52, disk: 25 },
];

function PerformanceMetricsContent() {
    // Mock data for monitored resources
    const [resources, setResources] = React.useState([
        {
            id: 1,
            name: "web-prod-01",
            type: "Virtual Machine",
            region: "us-east-1",
            status: "RUNNING",
            uptime: "99.99%",
            cpu: 45,
            memory: 62,
            disk: 28,
            health: "HEALTHY"
        },
        {
            id: 2,
            name: "db-primary-01",
            type: "Database Cluster",
            region: "us-east-1",
            status: "RUNNING",
            uptime: "99.95%",
            cpu: 78,
            memory: 85,
            disk: 65,
            health: "WARNING"
        },
        {
            id: 3,
            name: "cache-redis-01",
            type: "Redis Cache",
            region: "us-west-2",
            status: "STOPPED",
            uptime: "0%",
            cpu: 0,
            memory: 0,
            disk: 0,
            health: "OFFLINE"
        }
    ]);

    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const selectedResource = resources.find(r => r.id === selectedId);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const isAddingMonitor = searchParams.get("add-monitor") === "true";

    const handleStartAddMonitor = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("add-monitor", "true");
        router.push(pathname + "?" + params.toString());
        setSelectedId(null); // Ensure we leave detail view
    };

    const handleCancelAddMonitor = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("add-monitor");
        router.push(pathname + "?" + params.toString());
    };

    const getStatusColor = (status: string) => {
        if (status === "RUNNING") return "text-emerald-500";
        if (status === "STOPPED") return "text-zinc-500";
        return "text-amber-500";
    };

    const getHealthColor = (health: string) => {
        if (health === "HEALTHY") return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        if (health === "WARNING") return "bg-amber-500/10 text-amber-500 border-amber-500/20";
        return "bg-zinc-800 text-zinc-500 border-zinc-700";
    };

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">



            {/* 2. Header Strip (Color #5A0E24) */}
            <div className="w-full bg-[#5A0E24] py-6 shadow-md z-10 transition-colors duration-300 relative">
                <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-4">
                            <Link href="/foundation">
                                <Button size="icon" className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-10 w-10">
                                    <ArrowLeft size={22} />
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex p-2 bg-white/10 rounded-full backdrop-blur-sm">
                                    <Activity className="text-white" size={22} />
                                </div>
                                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Performance Metrics</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        {/* <div className="flex items-center gap-3">
                            <Button onClick={handleStartAddMonitor} className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span>Add Monitor</span>
                                <Zap size={16} />
                            </Button>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* 3. Main Content */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-8 flex-1 z-10">

                {isAddingMonitor ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl mx-auto"
                    >
                        <div className="bg-[#161618] border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="p-2 bg-[#5A0E24]/20 rounded-lg text-[#ff4d79]">
                                    <Zap size={24} />
                                </div>
                                Configure New Monitor
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Resource Name</label>
                                    <Input placeholder="e.g. production-api-01" className="bg-[#0f0f10] border-zinc-700 text-white focus:ring-[#5A0E24] focus:border-[#5A0E24]" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">Resource Type</label>
                                        <select className="flex h-10 w-full rounded-md border border-zinc-700 bg-[#0f0f10] px-3 py-2 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A0E24] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50">
                                            <option>Virtual Machine</option>
                                            <option>Database Cluster</option>
                                            <option>Redis Cache</option>
                                            <option>Load Balancer</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">Region</label>
                                        <select className="flex h-10 w-full rounded-md border border-zinc-700 bg-[#0f0f10] px-3 py-2 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A0E24] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50">
                                            <option>us-east-1 (N. Virginia)</option>
                                            <option>us-west-2 (Oregon)</option>
                                            <option>eu-central-1 (Frankfurt)</option>
                                            <option>ap-southeast-1 (Singapore)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Endpoint / IP Address</label>
                                    <Input placeholder="e.g. 192.168.1.10 or api.example.com" className="bg-[#0f0f10] border-zinc-700 text-white focus:ring-[#5A0E24] focus:border-[#5A0E24]" />
                                </div>

                                <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-zinc-800 mt-6">
                                    <Button onClick={handleCancelAddMonitor} variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800 w-full sm:w-auto">Cancel</Button>
                                    <Button className="bg-[#5A0E24] hover:bg-[#5A0E24]/80 text-white font-bold w-full sm:w-auto">
                                        Create Monitor
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : !selectedResource ? (
                    /* LIST VIEW */
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                    >
                        {/* Stats Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-[#161618] border border-zinc-800 rounded-lg p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Total Resources</p>
                                    <p className="text-2xl font-bold text-white tracking-tight">12</p>
                                </div>
                                <div className="p-3 rounded-md bg-[#5A0E24]/20 text-[#ff4d79]">
                                    <Server size={20} />
                                </div>
                            </div>
                            <div className="bg-[#161618] border border-zinc-800 rounded-lg p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Healthy</p>
                                    <p className="text-2xl font-bold text-white tracking-tight">10</p>
                                </div>
                                <div className="p-3 rounded-md bg-emerald-500/10 text-emerald-500">
                                    <CheckCircle2 size={20} />
                                </div>
                            </div>
                            <div className="bg-[#161618] border border-zinc-800 rounded-lg p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Warnings</p>
                                    <p className="text-2xl font-bold text-white tracking-tight">2</p>
                                </div>
                                <div className="p-3 rounded-md bg-amber-500/10 text-amber-500">
                                    <AlertTriangle size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-6 w-full">
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                <div className="relative w-full sm:w-auto">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                                    <Input
                                        placeholder="Search resources..."
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 text-white w-full sm:w-[300px] focus:ring-[#5A0E24] focus:border-[#5A0E24]"
                                    />
                                </div>
                                <Button className="border-zinc-800 bg-[#1c1c1f] text-zinc-400 hover:text-white hover:bg-zinc-800 w-full sm:w-auto">
                                    <Filter size={14} className="mr-2" /> Filter
                                </Button>
                            </div>
                            <div className="bg-[#1c1c1f] border border-zinc-800 rounded-lg flex items-center p-1 w-full md:w-auto justify-end">
                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white h-8 w-8">
                                    <RefreshCw size={18} />
                                </Button>
                            </div>
                        </div>

                        {/* Resource List */}
                        {/* Resource List Table Style */}
                        <div className="w-full">
                            {/* Table Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800 mb-2">
                                <div className="col-span-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Resource Name</div>
                                <div className="col-span-5 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Health & Metrics</div>
                                <div className="col-span-3 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Status</div>
                            </div>

                            <div className="space-y-1">
                                {resources.map((resource) => (
                                    <div
                                        key={resource.id}
                                        onClick={() => setSelectedId(resource.id)}
                                        className="group flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center px-4 py-3 bg-[#161618]/50 hover:bg-[#1c1c1f] border border-transparent hover:border-zinc-800 rounded-lg cursor-pointer transition-all"
                                    >
                                        {/* Name & Type */}
                                        <div className="w-full md:col-span-4 flex items-center gap-3">
                                            <div className={`p-2 rounded-md ${resource.status === 'RUNNING' ? 'bg-[#5A0E24]/20 text-[#ff4d79]' : 'bg-zinc-800 text-zinc-500'} shrink-0`}>
                                                {resource.type.includes('Database') ? <Database size={16} /> : <Server size={16} />}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-zinc-200 text-sm group-hover:text-white transition-colors">{resource.name}</h3>
                                                <p className="text-[10px] text-zinc-500">{resource.type}</p>
                                            </div>
                                        </div>

                                        {/* Metrics */}
                                        <div className="w-full md:col-span-5 grid grid-cols-3 gap-2 md:flex md:items-center md:justify-center md:gap-6">
                                            <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 w-full md:w-20">
                                                <span className="text-[10px] text-zinc-500 font-bold">CPU</span>
                                                <div className="h-1.5 w-full md:flex-1 bg-zinc-800 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${resource.cpu > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${resource.cpu}%` }} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 w-full md:w-20">
                                                <span className="text-[10px] text-zinc-500 font-bold">MEM</span>
                                                <div className="h-1.5 w-full md:flex-1 bg-zinc-800 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${resource.memory > 80 ? 'bg-amber-500' : 'bg-purple-500'}`} style={{ width: `${resource.memory}%` }} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 w-full md:w-20">
                                                <span className="text-[10px] text-zinc-500 font-bold">DSK</span>
                                                <div className="h-1.5 w-full md:flex-1 bg-zinc-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${resource.disk}%` }} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status & Action */}
                                        <div className="w-full md:col-span-3 flex items-center justify-between md:justify-end gap-4 mt-2 md:mt-0">
                                            <span className="md:hidden text-xs font-bold text-zinc-500 uppercase">Status</span>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${resource.health === 'HEALTHY' ? 'bg-emerald-500' : resource.health === 'WARNING' ? 'bg-amber-500' : 'bg-zinc-500'}`} />
                                                <span className={`text-xs font-bold ${resource.health === 'HEALTHY' ? 'text-emerald-500' : resource.health === 'WARNING' ? 'text-amber-500' : 'text-zinc-500'}`}>{resource.health}</span>
                                            </div>
                                            <ArrowRight size={16} className="text-zinc-600 group-hover:text-zinc-300 transition-colors opacity-0 group-hover:opacity-100 hidden md:block" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* DETAILS VIEW */
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${selectedResource.status === 'RUNNING' ? 'bg-[#5A0E24] text-white' : 'bg-zinc-800 text-zinc-500'} shrink-0`}>
                                    {selectedResource.type.includes('Database') ? <Database size={24} /> : <Server size={24} />}
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none break-all">{selectedResource.name}</h1>
                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                        <span className={`flex items-center gap-1.5 text-xs font-bold ${selectedResource.status === 'RUNNING' ? 'text-emerald-500' : 'text-zinc-500'}`}>
                                            <span className="relative flex h-2 w-2">
                                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selectedResource.status === 'RUNNING' ? 'bg-emerald-500' : 'hidden'}`}></span>
                                                <span className={`relative inline-flex rounded-full h-2 w-2 ${selectedResource.status === 'RUNNING' ? 'bg-emerald-500' : 'bg-zinc-500'}`}></span>
                                            </span>
                                            {selectedResource.status}
                                        </span>
                                        <span className="text-zinc-600 text-xs">•</span>
                                        <span className="text-zinc-400 text-xs">{selectedResource.type}</span>
                                        <span className="text-zinc-600 text-xs hidden sm:inline">•</span>
                                        <span className="text-zinc-400 text-xs hidden sm:inline">{selectedResource.region}</span>
                                    </div>
                                </div>
                            </div>
                            <Button onClick={() => setSelectedId(null)} className="bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 w-full md:w-auto">
                                <ArrowLeft size={16} className="mr-2" /> Back to List
                            </Button>
                        </div>

                        {/* Detailed Metrics */}
                        {/* Detailed Metrics */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-[#161618] border border-zinc-800 rounded-2xl p-6">
                                <h3 className="text-zinc-400 text-sm font-bold uppercase mb-4 flex items-center gap-2"><Cpu size={16} /> CPU Usage</h3>
                                <div className="text-4xl font-bold text-white mb-2">{selectedResource.cpu}%</div>
                                <div className="h-[150px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={mockChartData}>
                                            <defs>
                                                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#161618', borderColor: '#27272a', borderRadius: '8px' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                            <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-xs text-zinc-500 mt-4">Average usage over last 1 hour.</p>
                            </div>
                            <div className="bg-[#161618] border border-zinc-800 rounded-2xl p-6">
                                <h3 className="text-zinc-400 text-sm font-bold uppercase mb-4 flex items-center gap-2"><Server size={16} /> Memory Usage</h3>
                                <div className="text-4xl font-bold text-white mb-2">{selectedResource.memory}%</div>
                                <div className="h-[150px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={mockChartData}>
                                            <defs>
                                                <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#161618', borderColor: '#27272a', borderRadius: '8px' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                            <Area type="monotone" dataKey="memory" stroke="#a855f7" fillOpacity={1} fill="url(#colorMem)" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-xs text-zinc-500 mt-4">12GB / 16GB Total Allocated</p>
                            </div>
                            <div className="bg-[#161618] border border-zinc-800 rounded-2xl p-6">
                                <h3 className="text-zinc-400 text-sm font-bold uppercase mb-4 flex items-center gap-2"><HardDrive size={16} /> Disk I/O</h3>
                                <div className="text-4xl font-bold text-white mb-2">{selectedResource.disk}%</div>
                                <div className="h-[150px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={mockChartData}>
                                            <defs>
                                                <linearGradient id="colorDisk" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#161618', borderColor: '#27272a', borderRadius: '8px' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                            <Area type="monotone" dataKey="disk" stroke="#f97316" fillOpacity={1} fill="url(#colorDisk)" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-xs text-zinc-500 mt-4">Read/Write operations are consistent.</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-[#161618] border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-6">Management Actions</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button className="bg-[#5A0E24] hover:bg-[#5A0E24]/80 text-white border-0 flex-1 sm:flex-none">
                                    <BarChart3 size={16} className="mr-2" /> View Full Report
                                </Button>
                                <Button className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 flex-1 sm:flex-none">
                                    <RefreshCw size={16} className="mr-2" /> Restart Agent
                                </Button>
                                <Button className="border-zinc-700 text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/20 flex-1 sm:flex-none">
                                    <StopCircle size={16} className="mr-2" /> Stop Monitoring
                                </Button>
                            </div>
                        </div>

                    </motion.div>
                )}

            </div>
        </div>
    );
}

function ChevronRightIcon() {
    return (
        <div className="p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors">
            <ArrowRight size={20} />
        </div>
    )
}

export default function PerformanceMetricsPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <PerformanceMetricsContent />
        </React.Suspense>
    );
}


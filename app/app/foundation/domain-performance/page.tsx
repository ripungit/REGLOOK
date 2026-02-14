"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    BarChart2,
    Filter,
    ChevronDown,
    Download,
    Globe,
    TrendingUp,
    Activity,
    MousePointer,
    Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DomainPerformancePage() {
    // Mock Performance Data
    const domainStats = [
        {
            id: "dom-001",
            domain: "reglook.com",
            visitors: "125.4K",
            bounceRate: "42.3%",
            avgDuration: "2m 14s",
            status: "Healthy",
            trend: "+12.5%"
        },
        {
            id: "dom-002",
            domain: "design.io",
            visitors: "45.2K",
            bounceRate: "38.1%",
            avgDuration: "3m 05s",
            status: "Healthy",
            trend: "+5.2%"
        },
        {
            id: "dom-003",
            domain: "codebase.net",
            visitors: "18.9K",
            bounceRate: "55.4%",
            avgDuration: "1m 45s",
            status: "Needs Attention",
            trend: "-2.1%"
        },
        {
            id: "dom-004",
            domain: "shop-demo.store",
            visitors: "8.1K",
            bounceRate: "62.0%",
            avgDuration: "1m 12s",
            status: "Critical",
            trend: "-8.4%"
        }
    ];

    const [expandedDomains, setExpandedDomains] = React.useState<string[]>([]);

    const toggleExpand = (id: string) => {
        setExpandedDomains(prev =>
            prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]
        );
    };

    const ThemeColor = "#4338ca"; // Indigo-700

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip - Theme Blue/Indigo */}
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
                                    <BarChart2 className="text-white" size={22} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Domain Performance</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Button className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">Export Report</span>
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
                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 w-full">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                            <Input
                                placeholder="Search domains..."
                                className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-[320px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all shadow-sm"
                            />
                        </div>
                        <Button variant="outline" className="bg-[#1c1c1f] border-zinc-800 text-zinc-400 hover:text-white hover:bg-[#27272a] h-10 px-3">
                            <Filter size={16} className="mr-2" /> Filter
                        </Button>
                    </div>
                </div>

                {/* Metrics Cards Trend - Optional visual summary could go here */}

                {/* Content Area */}
                <div className="w-full">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                        <div className="col-span-4 text-sm font-semibold text-zinc-400">Domain</div>
                        <div className="col-span-2 text-sm font-semibold text-zinc-400">Visitors</div>
                        <div className="col-span-2 text-sm font-semibold text-zinc-400">Bounce Rate</div>
                        <div className="col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                        <div className="col-span-2 text-sm font-semibold text-zinc-400 text-right">Details</div>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-1">
                        {domainStats.map((stat, index) => (
                            <React.Fragment key={stat.id}>
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => toggleExpand(stat.id)}
                                    className={`grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 cursor-pointer ${expandedDomains.includes(stat.id) ? "bg-[#1c1c1f] border-zinc-800" : "bg-[#1c1c1f]/30"}`}
                                >
                                    <div className="col-span-4 flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded bg-[#4338ca]/20 flex items-center justify-center text-[#a5b4fc] border border-[#4338ca]/30`}>
                                            <Globe size={18} />
                                        </div>
                                        <div>
                                            <span className="text-white font-bold text-sm block">{stat.domain}</span>
                                            <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {stat.trend} this month
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-white font-bold text-sm">
                                        {stat.visitors}
                                    </div>
                                    <div className="col-span-2 text-zinc-300 text-sm font-medium">
                                        {stat.bounceRate}
                                    </div>
                                    <div className="col-span-2">
                                        <Badge className={`${stat.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-500' : stat.status === 'Needs Attention' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'} border-0 text-[10px] font-bold`}>
                                            {stat.status.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-end z-10 gap-2">
                                        <Button variant="ghost" className={`h-8 w-8 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white p-0 flex items-center justify-center transition-transform ${expandedDomains.includes(stat.id) ? "rotate-180" : ""}`}>
                                            <ChevronDown size={16} />
                                        </Button>
                                    </div>
                                </motion.div>

                                {expandedDomains.includes(stat.id) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden bg-[#161618] border-x border-b border-zinc-800 rounded-b-xl -mt-2 mb-2 mx-2 p-6"
                                    >
                                        <div className="grid grid-cols-4 gap-8">
                                            <div className="col-span-3">
                                                <h4 className="text-zinc-500 text-xs font-bold mb-4">Performance Metrics</h4>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Activity size={14} className="text-indigo-400" />
                                                            <span className="text-zinc-400 text-xs font-semibold">Avg. Session</span>
                                                        </div>
                                                        <p className="text-xl font-bold text-white">{stat.avgDuration}</p>
                                                    </div>
                                                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <MousePointer size={14} className="text-indigo-400" />
                                                            <span className="text-zinc-400 text-xs font-semibold">Click Rate</span>
                                                        </div>
                                                        <p className="text-xl font-bold text-white">2.4%</p>
                                                    </div>
                                                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Eye size={14} className="text-indigo-400" />
                                                            <span className="text-zinc-400 text-xs font-semibold">Pageviews</span>
                                                        </div>
                                                        <p className="text-xl font-bold text-white">210K</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-1 border-l border-zinc-800 pl-8 flex flex-col justify-center space-y-2">
                                                <Button className="w-full justify-start text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white">
                                                    <TrendingUp size={14} className="mr-2" /> View Full Report
                                                </Button>
                                                <Button className="w-full justify-start text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white">
                                                    <Activity size={14} className="mr-2" /> Real-time Analytics
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

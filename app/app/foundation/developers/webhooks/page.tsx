"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Plus,
    Zap,
    MoreVertical,
    Trash2,
    RefreshCw,
    Edit3,
    CheckCircle2,
    XCircle,
    Activity,
    Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WebhooksPage() {

    // Mock Webhooks Data (Initially empty to show empty state, or populated)
    const [endpoints] = React.useState([
        {
            id: "1",
            url: "https://api.mysaas.com/webhooks/reglook",
            status: "active",
            events: ["domain.registered", "domain.renewed"],
            successRate: "99.8%",
            lastDelivery: "2 mins ago"
        },
        {
            id: "2",
            url: "https://staging.mysaas.com/hooks",
            status: "failed",
            events: ["payment.succeeded"],
            successRate: "0%",
            lastDelivery: "1 hour ago"
        }
    ]);

    const ThemeColor = "#4338ca"; // Indigo-700

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen font-sans">

            {/* 1. Header Strip */}
            <div className={`w-full bg-[${ThemeColor}] py-8 shadow-2xl z-10 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <Link href="/foundation">
                                <Button className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-11 w-11 transition-all border border-white/10">
                                    <ArrowLeft size={20} />
                                </Button>
                            </Link>
                            <div className="space-y-1">
                                <h1 className="text-3xl font-bold text-white tracking-tight">Webhooks</h1>
                                <p className="text-blue-100/70 text-sm">Real-time event notifications for your applications.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button className="bg-white text-black hover:bg-white/90 font-semibold rounded-lg px-6 h-11 flex items-center gap-2 transition-all shadow-lg active:scale-95">
                                <Plus size={18} strokeWidth={2.5} />
                                <span>Add Endpoint</span>
                            </Button>
                            <Button className="text-white/80 bg-black/20 hover:text-white hover:bg-black/30 rounded-lg h-11 w-11 border border-white/10">
                                <HelpCircle size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-10 flex-1 space-y-10">

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                        { label: "Events Delivered (24h)", value: "2,304", icon: Zap, color: "text-amber-400" },
                        { label: "Mean Delivery Time", value: "145ms", icon: Activity, color: "text-blue-400" },
                        { label: "Active Endpoints", value: "2 / 5", icon: Globe, color: "text-emerald-400" },
                    ].map((stat, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={stat.label}
                            className="bg-transparent/60 backdrop-blur-md border border-zinc-800/60 p-6 rounded-2xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-zinc-900 ${stat.color}`}>
                                    <stat.icon size={22} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
                                <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Endpoints Table */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-6">Configured Endpoints</h2>
                    <div className="w-full overflow-hidden rounded-xl border border-zinc-800/60 bg-transparent/20">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800/80 bg-zinc-900/40">
                                    <th className="py-4 pl-6 pr-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Endpoint URL</th>
                                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Status</th>
                                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Subscribed Events</th>
                                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-center">Success Rate</th>
                                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-right">Last Delivery</th>
                                    <th className="pr-6 pl-4 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {endpoints.map((ep) => (
                                    <tr key={ep.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="py-4 pl-6 pr-4">
                                            <div className="font-medium text-white font-mono text-sm max-w-[250px] truncate" title={ep.url}>{ep.url}</div>
                                            <div className="text-xs text-zinc-500 mt-1">ID: we_{ep.id}8293</div>
                                        </td>
                                        <td className="px-4 py-4 align-top">
                                            {ep.status === 'active' ? (
                                                <Badge className="bg-emerald-500/10 text-emerald-400 border-0 uppercase text-[10px] tracking-wide font-bold px-2 py-0.5 mt-0.5 group-hover:bg-emerald-500/20">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-red-500/10 text-red-400 border-0 uppercase text-[10px] tracking-wide font-bold px-2 py-0.5 mt-0.5 group-hover:bg-red-500/20">
                                                    Failed
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 max-w-[250px]">
                                            <div className="flex flex-wrap gap-1.5">
                                                {ep.events.map(event => (
                                                    <span key={event} className="text-[10px] text-zinc-400 bg-zinc-800/50 px-1.5 py-0.5 rounded border border-zinc-700/50 font-mono">
                                                        {event}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`text-sm font-semibold ${ep.status === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {ep.successRate}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <span className="text-zinc-400 text-sm">{ep.lastDelivery}</span>
                                        </td>
                                        <td className="pr-6 pl-4 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-500 hover:text-white hover:bg-white/10 rounded-md">
                                                        <MoreVertical size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-[#1c1c1f] border-zinc-800 text-white min-w-[160px]">
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Activity size={14} className="mr-2" /> View Deliveries
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Edit3 size={14} className="mr-2" /> Edit Endpoint
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <RefreshCw size={14} className="mr-2" /> Send Test Event
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/10" />
                                                    <DropdownMenuItem className="text-red-400 focus:text-red-300 cursor-pointer">
                                                        <Trash2 size={14} className="mr-2" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Deliveries Log (Mini) */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-white">Recent Event Log</h2>
                        <Button variant="link" className="text-[#4338ca] hover:text-[#608afa] text-sm h-auto p-0">View All Logs</Button>
                    </div>
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-zinc-800/40 bg-transparent hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    {i === 2 ? <XCircle size={18} className="text-red-500" /> : <CheckCircle2 size={18} className="text-emerald-500" />}
                                    <div className="font-mono text-xs text-zinc-400">evt_1Ou289L...</div>
                                    <span className="text-sm text-white font-medium">domain.registered</span>
                                </div>
                                <div className="text-xs text-zinc-500">2026-01-07 14:2{i}:00 UTC</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

"use client";

import React from "react";
import {
    Clock,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Metrics() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium text-white">Metrics</h3>
                    <p className="text-sm text-zinc-400">Real-time performance data.</p>
                </div>
                <Select defaultValue="1h">
                    <SelectTrigger className="w-[140px] bg-[#151518] border-zinc-800 text-xs">
                        <Clock size={14} className="mr-2 text-zinc-400" />
                        <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1c1c1f] border-zinc-800 text-white">
                        <SelectItem value="1h">Last 1 hour</SelectItem>
                        <SelectItem value="6h">Last 6 hours</SelectItem>
                        <SelectItem value="24h">Last 24 hours</SelectItem>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Requests Chart Card */}
                <Card className="bg-[#151518] border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Requests</CardTitle>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">2.4M</span>
                            <span className="text-xs text-green-500 flex items-center"><ArrowUpRight size={12} className="mr-0.5" /> +12%</span>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-end justify-between gap-1 p-6 pt-0">
                        {/* Fake Bar Chart */}
                        {[30, 45, 60, 50, 70, 85, 90, 80, 60, 50, 40, 55, 65, 75, 80, 95, 100, 90, 70, 60].map((h, i) => (
                            <div key={i} className="w-full bg-[#4D2B8C]/40 hover:bg-[#4D2B8C] transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {h * 105} reqs
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Latency Chart Card */}
                <Card className="bg-[#151518] border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Avg. Latency (p99)</CardTitle>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">124ms</span>
                            <span className="text-xs text-green-500 flex items-center"><ArrowDownRight size={12} className="mr-0.5" /> -5%</span>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-end justify-between gap-1 p-6 pt-0">
                        {/* Fake Line/Bar Chart */}
                        {[40, 35, 30, 32, 45, 50, 48, 40, 35, 30, 28, 25, 30, 35, 40, 45, 50, 40, 30, 25].map((h, i) => (
                            <div key={i} className="w-full bg-blue-500/30 hover:bg-blue-500/80 transition-colors rounded-t-sm relative group" style={{ height: `${h * 1.5}%` }}>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {h * 3}ms
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* 5xx Errors Chart Card */}
                <Card className="bg-[#151518] border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">5xx Errors</CardTitle>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">0.02%</span>
                            <span className="text-xs text-zinc-500">stable</span>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[150px] flex items-end justify-between gap-1 p-6 pt-0">
                        {/* Fake Bar Chart Sparse */}
                        {[2, 0, 0, 5, 0, 0, 0, 2, 0, 0, 0, 0, 10, 2, 0, 0, 0, 0, 0, 1].map((h, i) => (
                            <div key={i} className="w-full bg-red-500/40 hover:bg-red-500 transition-colors rounded-t-sm" style={{ height: `${h * 5}%`, opacity: h > 0 ? 1 : 0.1 }}></div>
                        ))}
                    </CardContent>
                </Card>

                {/* Data Transfer Chart Card */}
                <Card className="bg-[#151518] border-zinc-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Data Transfer</CardTitle>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">45 GB</span>
                            <span className="text-xs text-zinc-500">proj. 60GB/mo</span>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[150px] flex items-end justify-between gap-1 p-6 pt-0">
                        {/* Fake Bar Chart */}
                        {[10, 15, 20, 25, 30, 45, 60, 80, 70, 60, 50, 40, 45, 55, 65, 75, 80, 85, 90, 100].map((h, i) => (
                            <div key={i} className="w-full bg-purple-500/40 hover:bg-purple-500 transition-colors rounded-t-sm" style={{ height: `${h * 0.8}%` }}></div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

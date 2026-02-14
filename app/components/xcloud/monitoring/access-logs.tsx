"use client";

import React from "react";
import {
    Search,
    Download,
    Filter,
    RefreshCw,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AccessLogs() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-medium text-white">Access Logs</h3>
                        <p className="text-sm text-zinc-400">View and analyze incoming requests to your application.</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 bg-transparent h-9 flex-1 sm:flex-none">
                            <Download size={14} className="mr-2" /> Export CSV
                        </Button>
                        <Button size="icon" variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 bg-transparent h-9 w-9 shrink-0">
                            <RefreshCw size={14} />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                        <Input
                            placeholder="Search by IP, path, or status code..."
                            className="pl-9 bg-[#151518] border-zinc-800 focus:border-zinc-600 text-zinc-200 h-9 text-sm w-full"
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Select defaultValue="1h">
                            <SelectTrigger className="w-full md:w-[140px] bg-[#151518] border-zinc-800 h-9 text-xs">
                                <Clock size={14} className="mr-2 text-zinc-400" />
                                <SelectValue placeholder="Time Range" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c1c1f] border-zinc-800 text-white">
                                <SelectItem value="1h">Last 1 hour</SelectItem>
                                <SelectItem value="24h">Last 24 hours</SelectItem>
                                <SelectItem value="7d">Last 7 days</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 bg-transparent h-9 flex-1 md:flex-none justify-center">
                            <Filter size={14} className="mr-2" /> Status: All
                        </Button>
                    </div>
                </div>
            </div>

            <div className="border border-zinc-800 rounded-lg overflow-hidden bg-[#151518]">
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-12 gap-4 p-3 border-b border-zinc-800 text-xs font-bold text-zinc-500 bg-zinc-900/30">
                            <div className="col-span-2">Time</div>
                            <div className="col-span-1">Status</div>
                            <div className="col-span-1">Method</div>
                            <div className="col-span-4">Path</div>
                            <div className="col-span-2">IP Address</div>
                            <div className="col-span-1 text-right">Latency</div>
                            <div className="col-span-1 text-right">Size</div>
                        </div>

                        {/* Mock Data Lines */}
                        {[
                            { time: "10:42:15", status: 200, method: "GET", path: "/", ip: "192.168.1.42", lat: "45ms", size: "2.4KB" },
                            { time: "10:42:12", status: 200, method: "GET", path: "/_next/static/css/app.css", ip: "192.168.1.42", lat: "12ms", size: "14.2KB" },
                            { time: "10:41:55", status: 304, method: "GET", path: "/api/auth/session", ip: "10.0.0.5", lat: "88ms", size: "0B" },
                            { time: "10:41:20", status: 404, method: "GET", path: "/favicon.ico", ip: "172.16.0.22", lat: "5ms", size: "156B" },
                            { time: "10:40:05", status: 200, method: "POST", path: "/api/webhooks/stripe", ip: "54.12.34.11", lat: "240ms", size: "520B" },
                            { time: "10:39:48", status: 200, method: "GET", path: "/dashboard", ip: "192.168.1.42", lat: "120ms", size: "8.1KB" },
                            { time: "10:38:11", status: 500, method: "POST", path: "/api/generate", ip: "192.168.1.10", lat: "5000ms", size: "45B" },
                        ].map((log, i) => (
                            <div key={i} className="grid grid-cols-12 gap-4 p-3 border-b border-zinc-800/50 text-xs text-zinc-300 font-mono hover:bg-zinc-800/20 transition-colors cursor-pointer last:border-0 min-w-max">
                                <div className="col-span-2 text-zinc-500">{log.time}</div>
                                <div className="col-span-1">
                                    <span className={`${log.status >= 500 ? "text-red-500" :
                                        log.status >= 400 ? "text-amber-500" :
                                            log.status >= 300 ? "text-blue-500" : "text-green-500"
                                        }`}>{log.status}</span>
                                </div>
                                <div className="col-span-1 text-zinc-400">{log.method}</div>
                                <div className="col-span-4 text-zinc-300 truncate max-w-[300px]" title={log.path}>{log.path}</div>
                                <div className="col-span-2 text-zinc-500">{log.ip}</div>
                                <div className="col-span-1 text-right text-zinc-400">{log.lat}</div>
                                <div className="col-span-1 text-right text-zinc-500">{log.size}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

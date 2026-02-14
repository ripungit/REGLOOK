"use client";

import React from "react";
import { Server } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function HostingComputeLogs() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-medium text-white">Hosting Compute Logs</h3>
                    <p className="text-sm text-zinc-400">System logs for the underlying compute instances.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full md:w-[180px] bg-[#151518] border-zinc-800 text-xs">
                            <Server size={14} className="mr-2 text-zinc-400" />
                            <SelectValue placeholder="Instance ID" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1c1c1f] border-zinc-800 text-white">
                            <SelectItem value="all">All Instances</SelectItem>
                            <SelectItem value="i-123">i-0a1b2c3d (Primary)</SelectItem>
                            <SelectItem value="i-456">i-9e8f7a6b (Replica)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="bg-[#0f0f10] border border-zinc-800 rounded-lg p-4 font-mono text-xs overflow-y-auto max-h-[500px] shadow-inner overflow-x-auto">
                <div className="space-y-1 min-w-[600px] md:min-w-0">
                    <div className="text-zinc-500 border-b border-zinc-800 pb-2 mb-2 italic">
                        Viewing logs for production environment...
                    </div>
                    {[
                        { time: "2025-12-19T10:00:01Z", level: "INFO", msg: "Starting application server on port 3000..." },
                        { time: "2025-12-19T10:00:02Z", level: "INFO", msg: "Connected to database: production-db-cluster" },
                        { time: "2025-12-19T10:00:02Z", level: "INFO", msg: "Cache warmed up: 142 keys loaded." },
                        { time: "2025-12-19T10:05:23Z", level: "WARN", msg: "High memory usage detected (78%). Garbage collection triggered." },
                        { time: "2025-12-19T10:05:24Z", level: "INFO", msg: "GC complete. Memory usage now at 45%." },
                        { time: "2025-12-19T10:15:00Z", level: "INFO", msg: "Scheduled task 'DataArchive' started." },
                        { time: "2025-12-19T10:15:05Z", level: "INFO", msg: "Scheduled task 'DataArchive' completed successfully." },
                        { time: "2025-12-19T11:22:10Z", level: "ERROR", msg: "Failed to connect to external API (timeout). Retrying in 5s..." },
                        { time: "2025-12-19T11:22:15Z", level: "INFO", msg: "Connection established." },
                    ].map((log, i) => (
                        <div key={i} className="flex gap-3 hover:bg-white/5 p-0.5 rounded">
                            <span className="text-zinc-600 shrink-0 select-none">{log.time}</span>
                            <span className={`shrink-0 w-12 font-bold ${log.level === "INFO" ? "text-blue-400" :
                                log.level === "WARN" ? "text-amber-400" :
                                    "text-red-500"
                                }`}>{log.level}</span>
                            <span className="text-zinc-300 break-all">{log.msg}</span>
                        </div>
                    ))}
                    <div className="animate-pulse text-zinc-600 mt-2">_</div>
                </div>
            </div>
        </div>
    );
}

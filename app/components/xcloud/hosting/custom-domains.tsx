
"use client";

import React from "react";
import { Globe, Plus, AlertCircle, CheckCircle2, RefreshCw, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function CustomDomains() {
    const [domains, setDomains] = React.useState([
        { id: 1, name: "reglook-marketing-site.xcloud.reglook.com", type: "Automatic", status: "Active", isPrimary: false },
        { id: 2, name: "app.reglook.com", type: "Custom", status: "Active", isPrimary: true },
        { id: 3, name: "www.reglook.com", type: "Custom", status: "Invalid Configuration", isPrimary: false }
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">Custom Domains</h3>
                    <p className="text-zinc-400 text-sm">Manage access to your deployment.</p>
                </div>
            </div>

            <div className="bg-[#151518] border border-zinc-800 rounded-xl overflow-hidden p-6 space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <Input placeholder="example.com" className="pl-10 bg-[#0f0f10] border-zinc-700 text-zinc-200 w-full" />
                    </div>
                    <Button className="bg-white text-black hover:bg-zinc-200 font-bold w-full sm:w-auto">Add</Button>
                </div>

                <div className="space-y-4">
                    {domains.map((domain) => (
                        <div key={domain.id} className="bg-[#0f0f10] border border-zinc-800 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 w-2 h-2 rounded-full ${domain.status === "Active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"}`} />
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-white font-bold font-mono text-sm sm:text-base break-all">{domain.name}</h4>
                                        {domain.isPrimary && <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 h-5 text-[10px] shrink-0">Primary</Badge>}
                                        {domain.type === "Automatic" && <Badge variant="outline" className="border-zinc-700 text-zinc-500 h-5 text-[10px]">Automatic</Badge>}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        {domain.status === "Active" ? (
                                            <span className="text-xs text-zinc-500 flex items-center gap-1">
                                                <CheckCircle2 size={12} className="text-green-500" /> Valid Configuration
                                            </span>
                                        ) : (
                                            <span className="text-xs text-red-400 flex items-center gap-1">
                                                <AlertCircle size={12} /> Invalid DNS Configuration
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                {domain.status !== "Active" && (
                                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 h-8">
                                        <RefreshCw size={12} className="mr-2" /> Verify
                                    </Button>
                                )}
                                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white h-8 w-8">
                                    <ExternalLink size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-400 h-8 w-8 hover:bg-zinc-800/50">
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

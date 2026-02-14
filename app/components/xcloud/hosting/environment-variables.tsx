
"use client";

import React from "react";
import { Plus, Eye, EyeOff, Trash2, Save, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export function EnvironmentVariables() {
    const [variables, setVariables] = React.useState([
        { id: 1, key: "DATABASE_URL", value: "postgres://user:pass@host:5432/db", environments: ["Production", "Preview", "Development"] },
        { id: 2, key: "NEXT_PUBLIC_API_URL", value: "https://api.reglook.com", environments: ["Production"] },
        { id: 3, key: "STRIPE_SECRET_KEY", value: "sk_live_...", environments: ["Production"] },
    ]);
    const [showValues, setShowValues] = React.useState<Record<number, boolean>>({});

    const toggleValue = (id: number) => {
        setShowValues(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">Environment Variables</h3>
                    <p className="text-zinc-400 text-sm">Configure environment variables for your deployment.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
                        <Upload size={14} className="mr-2" /> Import
                    </Button>
                </div>
            </div>

            <div className="bg-[#151518] border border-zinc-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-zinc-800 grid grid-cols-12 gap-4 bg-zinc-900/50 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    <div className="col-span-4">Key</div>
                    <div className="col-span-4">Value</div>
                    <div className="col-span-3">Environments</div>
                    <div className="col-span-1"></div>
                </div>
                <div className="divide-y divide-zinc-800">
                    {variables.map((v) => (
                        <div key={v.id} className="p-4 grid grid-cols-12 gap-4 items-center group">
                            <div className="col-span-4">
                                <span className="font-mono text-sm text-zinc-200">{v.key}</span>
                            </div>
                            <div className="col-span-4 relative">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm text-zinc-400 truncate max-w-[200px]">
                                        {showValues[v.id] ? v.value : "••••••••••••••••"}
                                    </span>
                                    <button onClick={() => toggleValue(v.id)} className="text-zinc-600 hover:text-zinc-300 transition-colors">
                                        {showValues[v.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-wrap gap-1">
                                {v.environments.map(env => (
                                    <Badge key={env} variant="outline" className="border-zinc-700 text-zinc-400 text-[10px] bg-zinc-800/50">
                                        {env}
                                    </Badge>
                                ))}
                            </div>
                            <div className="col-span-1 flex justify-end">
                                <button className="p-2 text-zinc-600 hover:text-red-400 transition-colors rounded opacity-0 group-hover:opacity-100">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Add New Row */}
                    <div className="p-4 bg-zinc-900/20">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                            <div className="col-span-4 space-y-1.5">
                                <label className="text-xs text-zinc-500 font-semibold">Key</label>
                                <Input placeholder="EXAMPLE_KEY" className="bg-[#0f0f10] border-zinc-800 focus:border-[#4D2B8C] transition-colors" />
                            </div>
                            <div className="col-span-4 space-y-1.5">
                                <label className="text-xs text-zinc-500 font-semibold">Value</label>
                                <Input placeholder="Value..." className="bg-[#0f0f10] border-zinc-800 focus:border-[#4D2B8C] transition-colors" />
                            </div>
                            <div className="col-span-3 space-y-1.5">
                                <label className="text-xs text-zinc-500 font-semibold">Target</label>
                                <Select defaultValue="all">
                                    <SelectTrigger className="bg-[#0f0f10] border-zinc-800">
                                        <SelectValue placeholder="Environments" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1c1c1f] border-zinc-800 text-white">
                                        <SelectItem value="all">All Environments</SelectItem>
                                        <SelectItem value="production">Production</SelectItem>
                                        <SelectItem value="preview">Preview</SelectItem>
                                        <SelectItem value="development">Development</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-1">
                                <Button size="icon" className="bg-[#4D2B8C] hover:bg-[#3D2270] text-white w-full">
                                    <Plus size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


"use client";

import React from "react";
import {
    Copy,
    ExternalLink,
    ChevronDown,
    Check,
    Shield,
    GitBranch,
    Search,
    Plus,
    CheckCircle2,
    Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

import { Deployments } from "@/components/xcloud/deployments";

export function Overview({ appName }: { appName: string }) {
    const [isProductionStepsOpen, setIsProductionStepsOpen] = React.useState(true);
    const [viewingDeployments, setViewingDeployments] = React.useState(false);

    if (viewingDeployments) {
        return <Deployments appName={appName} onBack={() => setViewingDeployments(false)} />;
    }

    return (
        <div className="space-y-8">
            {/* Top Bar Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-sm">App ID:</span>
                    <Badge variant="outline" className="font-mono text-zinc-300 border-zinc-700 bg-zinc-900/50 flex items-center gap-2 py-1 break-all">
                        dgpjzbnulyw1i
                        <Copy size={12} className="cursor-pointer hover:text-white transition-colors shrink-0" />
                    </Badge>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 bg-transparent w-full sm:w-auto">
                        Manage sandboxes
                    </Button>
                    <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold w-full sm:w-auto">
                        Visit deployed URL <ExternalLink size={16} className="ml-2" />
                    </Button>
                </div>
            </div>

            {/* Get to Production Card */}
            <div className="bg-[#151518] border border-zinc-800 rounded-xl overflow-hidden">
                <div
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-800/30 transition-colors"
                    onClick={() => setIsProductionStepsOpen(!isProductionStepsOpen)}
                >
                    <div className="flex items-center gap-2">
                        <ChevronDown
                            size={20}
                            className={`text-white transition-transform duration-300 ${isProductionStepsOpen ? "" : "-rotate-90"}`}
                        />
                        <h3 className="font-bold text-white">Get to production</h3>
                    </div>
                    <Badge variant="secondary" className="bg-[#241b35] text-[#a78bfa] border border-[#a78bfa]/20 rounded-full px-3">
                        1 of 3 steps complete
                    </Badge>
                </div>

                <AnimatePresence>
                    {isProductionStepsOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-[#0f0f10] border-t border-zinc-800"
                        >
                            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative">

                                {/* Step 1: Done */}
                                <div className="relative z-10 flex flex-col space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                                            <Check size={16} className="text-white font-bold" />
                                        </div>
                                        <h4 className="font-bold text-white text-sm">Add a custom domain</h4>
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed min-h-[40px]">
                                        Use your own custom domain with free HTTPS to provide a secure, friendly URL for your app.
                                    </p>
                                    <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
                                        Added <CheckCircle2 size={12} />
                                    </div>
                                </div>

                                {/* Step 2: Active */}
                                <div className="relative z-10 flex flex-col space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1c1c1f] border border-zinc-700 flex items-center justify-center shrink-0 text-zinc-400 font-mono text-xs">
                                            2
                                        </div>
                                        <h4 className="font-bold text-zinc-300 text-sm">Enable firewall protections</h4>
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed min-h-[40px]">
                                        Web traffic restrictions for xCloud Hosting are offered by our Web Application Firewall (WAF).
                                    </p>
                                    <div>
                                        <Button className="bg-[#151518] hover:bg-zinc-800 border-zinc-700 text-zinc-300 h-8 text-xs font-semibold">
                                            Enable firewall
                                        </Button>
                                    </div>
                                </div>

                                {/* Step 3: Pending */}
                                <div className="relative z-10 flex flex-col space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#1c1c1f] border border-zinc-700 flex items-center justify-center shrink-0 text-zinc-400 font-mono text-xs">
                                            3
                                        </div>
                                        <h4 className="font-bold text-zinc-300 text-sm">Connect new branches</h4>
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed min-h-[40px]">
                                        Connect another branch from your Git repository to set up multiple environments.
                                    </p>
                                    <div>
                                        <Button className="bg-[#151518] hover:bg-zinc-800 border-zinc-700 text-zinc-300 h-8 text-xs font-semibold">
                                            Connect a new branch
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Branches Section */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <h3 className="text-lg font-bold text-white">Branches</h3>
                        <Badge className="bg-[#4D2B8C] text-white hover:bg-[#4D2B8C] border-0">1</Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                            <Input
                                placeholder="Search..."
                                className="pl-9 bg-[#151518] border-zinc-800 focus:border-zinc-600 text-zinc-200 h-9 text-sm rounded-lg"
                            />
                        </div>
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 bg-transparent h-9 w-full sm:w-auto">
                            <Plus size={16} className="mr-2" /> Add branch
                        </Button>
                    </div>
                </div>

                {/* Branch List */}
                <div className="bg-[#151518] border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div
                                className="space-y-3 flex-1 cursor-pointer"
                                onClick={() => setViewingDeployments(true)}
                            >
                                <div className="flex items-center gap-3">
                                    <h4 className="text-xl font-bold text-white hover:text-[#a78bfa] transition-colors">main</h4>
                                    <div className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                                        Deployed <CheckCircle2 size={12} />
                                    </div>
                                </div>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">Domain</p>
                                    <a href={`https://${appName}.xcloud.reglook.com`} target="_blank" rel="noreferrer" className="text-[#a78bfa] hover:text-[#c4b5fd] text-sm font-medium transition-colors break-all block">
                                        https://{appName}.xcloud.reglook.com
                                    </a>
                                </div>
                            </div>

                            <div
                                className="flex flex-col space-y-4 md:text-right cursor-pointer"
                                onClick={() => setViewingDeployments(true)}
                            >
                                <div className="flex items-center md:justify-end gap-2 text-zinc-300 text-xs font-bold">
                                    <Star size={12} className="fill-white text-white" /> Production branch
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-zinc-500">Last deployment <span className="text-zinc-300">2m ago</span></p>
                                    <p className="text-xs text-zinc-500 break-all">
                                        Last commit <span className="text-zinc-300 font-mono">build changes / {appName}:main</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

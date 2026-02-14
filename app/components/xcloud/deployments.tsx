
"use client";

import React from "react";
import {
    Download,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Search,
    ChevronLeft,
    ChevronRight,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

type DeploymentStatus = "Deployed" | "Failed" | "Building";

interface Deployment {
    id: string;
    description: string;
    status: DeploymentStatus;
    duration: string;
    time: string;
    read: boolean;
    commitMessage: string;
}

export function Deployments({ appName, onBack }: { appName: string, onBack: () => void }) {
    const deployments: Deployment[] = [
        { id: "13", description: "Deployment 13", status: "Deployed", duration: "2 minutes 35 seconds", time: "12/19/2025, 3:50 PM", read: true, commitMessage: "build changes" },
        { id: "12", description: "Deployment 12", status: "Failed", duration: "1 minute 5 seconds", time: "12/19/2025, 3:33 PM", read: false, commitMessage: "new update" },
        { id: "11", description: "Deployment 11", status: "Failed", duration: "1 minute 3 seconds", time: "12/19/2025, 12:20 PM", read: false, commitMessage: "new whiteboard update" },
        { id: "10", description: "Deployment 10", status: "Failed", duration: "1 minute 2 seconds", time: "12/19/2025, 11:19 AM", read: false, commitMessage: "new update" },
        { id: "9", description: "Deployment 9", status: "Deployed", duration: "2 minutes 34 seconds", time: "12/19/2025, 8:39 AM", read: false, commitMessage: "new changes" },
        { id: "8", description: "Deployment 8", status: "Deployed", duration: "2 minutes 29 seconds", time: "12/18/2025, 11:00 PM", read: false, commitMessage: "error fixes" },
        { id: "7", description: "Deployment 7", status: "Failed", duration: "1 minute 30 seconds", time: "12/18/2025, 10:56 PM", read: false, commitMessage: "final update" },
        { id: "6", description: "Deployment 6", status: "Failed", duration: "2 minutes 34 seconds", time: "12/18/2025, 10:17 PM", read: false, commitMessage: "latest edit" },
        { id: "5", description: "Deployment 5", status: "Failed", duration: "1 minute 33 seconds", time: "12/18/2025, 9:26 PM", read: false, commitMessage: "docs" },
        { id: "4", description: "Deployment 4", status: "Deployed", duration: "2 minutes 26 seconds", time: "12/18/2025, 4:37 PM", read: false, commitMessage: "pink theme" },
        { id: "3", description: "Deployment 3", status: "Deployed", duration: "2 minutes 18 seconds", time: "12/18/2025, 4:29 PM", read: false, commitMessage: "pink theme" },
        { id: "2", description: "Deployment 2", status: "Deployed", duration: "2 minutes 35 seconds", time: "12/18/2025, 2:43 PM", read: false, commitMessage: "new update" },
        { id: "1", description: "Deployment 1", status: "Deployed", duration: "2 minutes 26 seconds", time: "12/18/2025, 11:42 AM", read: false, commitMessage: "Auto-build" },
    ];

    const currentDeployment = deployments[0];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Button onClick={onBack} className="text-zinc-400 hover:text-white -ml-2">
                    <ChevronLeft size={16} className="mr-1" /> Back to Overview
                </Button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Deployments</h2>
                </div>
            </div>

            {/* Current Deployment Detail Card */}
            <div className="bg-[#151518] border border-zinc-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                {currentDeployment.description}
                                <span className="text-green-500 text-sm flex items-center gap-1 font-bold bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                                    {currentDeployment.status} <CheckCircle2 size={14} />
                                </span>
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-8 text-xs">
                            <div>
                                <p className="text-zinc-500 mb-1">Started at</p>
                                <p className="text-zinc-300 font-medium">{currentDeployment.time}</p>
                            </div>
                            <div>
                                <p className="text-zinc-500 mb-1">Build duration</p>
                                <p className="text-zinc-300 font-medium">{currentDeployment.duration}</p>
                            </div>
                            <div>
                                <p className="text-zinc-500 mb-1">Domain</p>
                                <a href={`https://${appName}.xcloud.reglook.com`} className="text-[#a78bfa] hover:text-[#c4b5fd] font-medium">https://{appName}.xcloud.reglook.com</a>
                            </div>
                            <div>
                                <p className="text-zinc-500 mb-1">Repository</p>
                                <span className="text-[#a78bfa] font-medium">{appName}:main</span>
                            </div>
                            <div>
                                <p className="text-zinc-500 mb-1">Last commit</p>
                                <span className="text-[#a78bfa] font-medium">{currentDeployment.commitMessage}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 bg-transparent h-9">
                            <Download size={14} className="mr-2" /> Download
                        </Button>
                        <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 bg-transparent h-9">
                            <RefreshCw size={14} className="mr-2" /> Redeploy this version
                        </Button>
                    </div>
                </div>

                {/* Progress Steps (Simulated) */}
                <div className="bg-[#0f0f10]">
                    <div className="p-3 border-b border-zinc-800 flex items-center justify-between text-xs px-6">
                        <span className="text-white font-bold">Build</span>
                        <span className="text-zinc-400 flex items-center gap-2">2 minutes 12 seconds <CheckCircle2 size={14} className="text-zinc-600" /></span>
                    </div>
                    <div className="p-3 flex items-center justify-between text-xs px-6">
                        <span className="text-white font-bold">Deploy</span>
                        <span className="text-zinc-400 flex items-center gap-2">22 seconds <CheckCircle2 size={14} className="text-zinc-600" /></span>
                    </div>
                </div>
            </div>

            {/* Deployment History Table */}
            <div className="space-y-4">
                <div className="flex items-center gap-6 border-b border-zinc-800 pb-2">
                    <button className="text-white font-bold text-sm border-b-2 border-[#a78bfa] pb-2 px-1">Deployment history</button>
                    <button className="text-zinc-500 font-medium text-sm pb-2 px-1 hover:text-zinc-300 transition-colors">Deployed backend resources</button>
                </div>

                <div className="flex items-center gap-4">
                    <Badge className="bg-[#4D2B8C] text-white hover:bg-[#4D2B8C] border-0 h-7">13</Badge>
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                        <Input
                            placeholder="Search..."
                            className="pl-9 bg-[#151518] border-zinc-800 focus:border-zinc-600 text-zinc-200 h-9 text-sm rounded-lg"
                        />
                    </div>
                </div>

                <div className="bg-[#151518] border border-zinc-800 rounded-xl overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 text-xs font-bold text-zinc-400 bg-zinc-900/30">
                        <div className="col-span-3 pl-8">Name</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Build duration</div>
                        <div className="col-span-3">Commit message</div>
                        <div className="col-span-2 text-right">Started at</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-zinc-800">
                        {deployments.map((deployment) => (
                            <div
                                key={deployment.id}
                                className={`grid grid-cols-12 gap-4 p-4 items-center text-xs hover:bg-[#1f1f23] transition-colors cursor-pointer group ${deployment.read ? 'bg-[#4D2B8C]/20 hover:bg-[#4D2B8C]/30' : ''}`}
                            >
                                <div className="col-span-3 flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${deployment.read ? 'bg-white' : 'border border-zinc-500'}`}></div>
                                    <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">{deployment.description}</span>
                                </div>
                                <div className="col-span-2">
                                    <div className={`flex items-center gap-1.5 font-bold ${deployment.status === "Deployed" ? "text-green-500" : deployment.status === "Failed" ? "text-red-500" : "text-amber-500"}`}>
                                        {deployment.status}
                                        {deployment.status === "Deployed" ? <CheckCircle2 size={12} /> : deployment.status === "Failed" ? <XCircle size={12} /> : <Loader2 size={12} className="animate-spin" />}
                                    </div>
                                </div>
                                <div className="col-span-2 text-zinc-400 font-medium">
                                    {deployment.duration}
                                </div>
                                <div className="col-span-3 text-zinc-300 font-medium truncate pr-4">
                                    {deployment.commitMessage}
                                </div>
                                <div className="col-span-2 text-right text-zinc-400 font-medium">
                                    {deployment.time}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="p-3 border-t border-zinc-800 flex justify-end items-center gap-6 text-xs text-zinc-400 bg-zinc-900/30">
                        <div className="flex items-center gap-2">
                            Rows per page
                            <Select defaultValue="15">
                                <SelectTrigger className="h-7 w-14 bg-[#0f0f10] border-zinc-700 text-zinc-300 text-xs">
                                    <SelectValue placeholder="15" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1c1c1f] border-zinc-800 text-white min-w-[3rem]">
                                    <SelectItem value="15">15</SelectItem>
                                    <SelectItem value="30">30</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-white mx-2">1</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-zinc-300"><ChevronLeft size={14} /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-zinc-300"><ChevronRight size={14} /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, GitPullRequest, Layout } from "lucide-react";

export function Previews() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">Preview Deployments</h3>
                    <p className="text-zinc-400 text-sm">Configure settings for preview deployments created from Pull Requests.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-[#151518] border border-zinc-800 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-zinc-800 rounded-lg">
                                <MessageSquare size={20} className="text-zinc-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Comments</h4>
                                <p className="text-sm text-zinc-400 max-w-[500px]">Allow team members to comment directly on preview deployments.</p>
                            </div>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-[#4D2B8C]" />
                    </div>
                </div>

                <div className="bg-[#151518] border border-zinc-800 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-zinc-800 rounded-lg">
                                <GitPullRequest size={20} className="text-zinc-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Git Comments</h4>
                                <p className="text-sm text-zinc-400 max-w-[500px]">Automatically comment on Pull Requests with deployment URLs and status.</p>
                            </div>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-[#4D2B8C]" />
                    </div>
                </div>

                <div className="bg-[#151518] border border-zinc-800 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-zinc-800 rounded-lg">
                                <Layout size={20} className="text-zinc-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Show Toolbar</h4>
                                <p className="text-sm text-zinc-400 max-w-[500px]">Display the Vercel toolbar on preview deployments.</p>
                            </div>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-[#4D2B8C]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

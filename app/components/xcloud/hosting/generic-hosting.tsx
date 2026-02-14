
"use client";

import React from "react";
import { Bell, Shield, Lock, FileCode, ArrowRightLeft, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function BuildNotifications() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">Build Notifications</h3>
                    <p className="text-zinc-400 text-sm">Get notified when your build status changes.</p>
                </div>
            </div>

            <div className="bg-[#151518] border border-zinc-800 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-800 rounded-lg"><Bell size={18} className="text-zinc-400" /></div>
                        <span className="text-white font-medium">Email Notifications</span>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#4D2B8C]" />
                </div>
                <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-800 rounded-lg"><span className="text-lg">#</span></div>
                        <span className="text-white font-medium">Slack Notifications</span>
                    </div>
                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300">Connect</Button>
                </div>
            </div>
        </div>
    );
}

export function CustomHeaders() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white">Custom Headers</h3>
                <p className="text-zinc-400 text-sm">Configure HTTP headers for your deployment.</p>
            </div>
            <div className="bg-[#151518] border border-zinc-800 rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-zinc-900 rounded-full border border-zinc-800">
                    <FileCode size={32} className="text-zinc-500" />
                </div>
                <div>
                    <h4 className="text-white font-bold">No Custom Headers</h4>
                    <p className="text-zinc-500 text-sm max-w-sm mx-auto mt-2">You haven't configured any custom headers yet. Add them in your <code>next.config.js</code> or <code>vercel.json</code> file.</p>
                </div>
                <Button variant="outline" className="border-zinc-700 text-zinc-300">Learn More</Button>
            </div>
        </div>
    );
}

export function Firewall() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">Firewall</h3>
                    <p className="text-zinc-400 text-sm">Manage traffic and block malicious requests.</p>
                </div>
                <Button className="bg-[#4D2B8C] hover:bg-[#3D2270] text-white">
                    <Plus size={16} className="mr-2" /> Add Rule
                </Button>
            </div>

            <div className="bg-[#151518] border border-zinc-800 rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-zinc-900 rounded-full border border-zinc-800">
                    <Shield size={32} className="text-zinc-500" />
                </div>
                <div>
                    <h4 className="text-white font-bold">No Active Rules</h4>
                    <p className="text-zinc-500 text-sm max-w-sm mx-auto mt-2">Your application is currently accepting all traffic. Create rules to block or challenge requests.</p>
                </div>
            </div>
        </div>
    );
}

export function RewritesRedirects() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-white">Rewrites & Redirects</h3>
                <p className="text-zinc-400 text-sm">Manage URL rewrites and redirects.</p>
            </div>
            <div className="bg-[#151518] border border-zinc-800 rounded-xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-zinc-900 rounded-full border border-zinc-800">
                    <ArrowRightLeft size={32} className="text-zinc-500" />
                </div>
                <div>
                    <h4 className="text-white font-bold">Configured in Code</h4>
                    <p className="text-zinc-500 text-sm max-w-sm mx-auto mt-2">Rewrites and redirects are currently managed in your project's configuration file.</p>
                </div>
            </div>
        </div>
    );
}

export function Secrets() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">Secrets</h3>
                    <p className="text-zinc-400 text-sm">Manage sensitive encrypted values.</p>
                </div>
            </div>

            <div className="bg-[#151518] border border-zinc-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900/50">
                    <Lock size={16} className="text-zinc-500" />
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Note</span>
                    <span className="text-xs text-zinc-500">Secrets are encrypted and cannot be viewed after creation.</span>
                </div>
                <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-full border border-zinc-800">
                        <Lock size={32} className="text-zinc-500" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold">No Secrets</h4>
                        <p className="text-zinc-500 text-sm max-w-sm mx-auto mt-2">You haven't added any secrets yet.</p>
                    </div>
                    <Button className="bg-[#4D2B8C] hover:bg-[#3D2270] text-white">Add Secret</Button>
                </div>
            </div>
        </div>
    );
}

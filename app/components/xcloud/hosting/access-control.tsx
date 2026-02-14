
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Lock, Shield, UserCheck, Users, Save } from "lucide-react";

export function AccessControl() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">Access Control</h3>
                    <p className="text-zinc-400 text-sm">Control who can access your deployments.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-[#151518] border border-zinc-800 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-zinc-800 rounded-lg">
                                <Lock size={20} className="text-zinc-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Password Protection</h4>
                                <p className="text-sm text-zinc-400 max-w-[500px]">Protect your deployment with a password. Visitors will need to enter this password to view the site.</p>
                            </div>
                        </div>
                        <Switch className="data-[state=checked]:bg-[#4D2B8C]" />
                    </div>
                </div>

                <div className="bg-[#151518] border border-zinc-800 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-zinc-800 rounded-lg">
                                <Shield size={20} className="text-zinc-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Vercel Authentication</h4>
                                <p className="text-sm text-zinc-400 max-w-[500px]">Require visitors to log in with their Vercel account to access the deployment.</p>
                            </div>
                        </div>
                        <Switch className="data-[state=checked]:bg-[#4D2B8C]" />
                    </div>
                </div>

                <div className="bg-[#151518] border border-zinc-800 rounded-xl p-6 transition-all opacity-50 cursor-not-allowed">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-zinc-800 rounded-lg">
                                <UserCheck size={20} className="text-zinc-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Trusted IPs</h4>
                                <p className="text-sm text-zinc-400 max-w-[500px]">Only allow access from specific IP addresses or CIDR blocks. (Enterprise only)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-[#4D2B8C] bg-[#4D2B8C]/10 border border-[#4D2B8C] px-2 py-0.5 rounded">UPGRADE</span>
                            <Switch disabled />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button disabled className="bg-[#4D2B8C] hover:bg-[#3D2270] text-white opacity-50 cursor-not-allowed">
                    <Save size={16} className="mr-2" /> Save Changes
                </Button>
            </div>
        </div>
    );
}

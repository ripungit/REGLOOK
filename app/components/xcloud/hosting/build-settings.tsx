
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Terminal, Save } from "lucide-react";

export function BuildSettings() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white">Build Settings</h3>
                    <p className="text-zinc-400 text-sm">Configure how your project is built and deployed.</p>
                </div>
            </div>

            <div className="bg-[#151518] border border-zinc-800 rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <Label className="text-zinc-300">Framework Preset</Label>
                        <Select defaultValue="nextjs">
                            <SelectTrigger className="bg-[#0f0f10] border-zinc-700 text-zinc-200">
                                <SelectValue placeholder="Select Framework" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c1c1f] border-zinc-800 text-white">
                                <SelectItem value="nextjs">Next.js</SelectItem>
                                <SelectItem value="react">Create React App</SelectItem>
                                <SelectItem value="vue">Vue.js</SelectItem>
                                <SelectItem value="vite">Vite</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-zinc-500">We'll automatically detect optimal settings for your framework.</p>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-zinc-300">Node.js Version</Label>
                        <Select defaultValue="18.x">
                            <SelectTrigger className="bg-[#0f0f10] border-zinc-700 text-zinc-200">
                                <SelectValue placeholder="Select Version" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c1c1f] border-zinc-800 text-white">
                                <SelectItem value="18.x">18.x (Active LTS)</SelectItem>
                                <SelectItem value="16.x">16.x (Maintenance)</SelectItem>
                                <SelectItem value="20.x">20.x (Current)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-zinc-300">Build Command</Label>
                            <div className="relative">
                                <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                                <Input className="pl-9 bg-[#0f0f10] border-zinc-700 text-zinc-200 font-mono text-sm" placeholder="npm run build" defaultValue="npm run build" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-300">Output Directory</Label>
                            <Input className="bg-[#0f0f10] border-zinc-700 text-zinc-200 font-mono text-sm" placeholder=".next" defaultValue=".next" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-300">Install Command</Label>
                            <div className="relative">
                                <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                                <Input className="pl-9 bg-[#0f0f10] border-zinc-700 text-zinc-200 font-mono text-sm" placeholder="npm install" defaultValue="npm install" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button className="bg-[#4D2B8C] hover:bg-[#3D2270] text-white">
                        <Save size={16} className="mr-2" /> Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}

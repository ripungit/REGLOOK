"use client";

import React from "react";
import { Copy, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function GeneralSettings() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                    <h3 className="text-lg font-medium text-white">General Settings</h3>
                    <p className="text-sm text-zinc-400">Configure general information for your application.</p>
                </div>
            </div>

            {/* Application Information */}
            <Card className="bg-[#151518] border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-base text-white">Application Information</CardTitle>
                    <CardDescription className="text-zinc-500">
                        The name and ID of your application.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-300">App Name</label>
                        <div className="flex gap-2">
                            <Input
                                defaultValue="reglook-marketing-site"
                                className="bg-[#0f0f10] border-zinc-800 text-zinc-200 max-w-md"
                            />
                            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 bg-transparent">
                                <Save size={14} className="mr-2" /> Save
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-300">App ID</label>
                        <div className="flex items-center gap-2">
                            <code className="bg-[#0f0f10] border border-zinc-800 rounded px-3 py-2 text-zinc-400 font-mono text-sm block w-fit">
                                dgpjzbnulyw1i
                            </code>
                            <Button size="icon" variant="ghost" className="text-zinc-500 hover:text-white">
                                <Copy size={14} />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Build & Development Settings */}
            <Card className="bg-[#151518] border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-base text-white">Framework & Root</CardTitle>
                    <CardDescription className="text-zinc-500">
                        The framework preset and root directory used for this project.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-300">Framework Preset</label>
                        <div className="flex items-center gap-2 p-2 px-3 border border-zinc-800 bg-[#0f0f10] rounded-md max-w-md text-sm text-zinc-300">
                            Next.js
                        </div>
                        <p className="text-xs text-zinc-500">To change the framework, update your <span className="font-mono text-zinc-400">package.json</span> scripts.</p>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-zinc-300">Root Directory</label>
                        <Input
                            defaultValue="./"
                            className="bg-[#0f0f10] border-zinc-800 text-zinc-200 max-w-md"
                        />
                        <p className="text-xs text-zinc-500">The directory where your code is located within the repository.</p>
                    </div>
                    <Button className="w-fit bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-[#151518] border-red-900/20">
                <CardHeader>
                    <CardTitle className="text-base text-red-500">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-medium text-white">Delete Application</h4>
                            <p className="text-xs text-zinc-500 mt-1">
                                Permanently delete this application and all of its resources. This action cannot be undone.
                            </p>
                        </div>
                        <Button variant="destructive" className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50">
                            <Trash2 size={14} className="mr-2" /> Delete App
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

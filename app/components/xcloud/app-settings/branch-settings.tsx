"use client";

import React from "react";
import { GitBranch, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function BranchSettings() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                    <h3 className="text-lg font-medium text-white">Branch Settings</h3>
                    <p className="text-sm text-zinc-400">Manage how different branches are deployed.</p>
                </div>
            </div>

            {/* Production Branch */}
            <Card className="bg-[#151518] border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-base text-white">Production Branch</CardTitle>
                    <CardDescription className="text-zinc-500">
                        The branch that triggers a production deployment.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="flex-1 w-full">
                            <Select defaultValue="main">
                                <SelectTrigger className="w-full bg-[#0f0f10] border-zinc-800 text-zinc-200">
                                    <GitBranch size={14} className="mr-2 text-zinc-500" />
                                    <SelectValue placeholder="Select branch" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1c1c1f] border-zinc-800 text-white">
                                    <SelectItem value="main">main</SelectItem>
                                    <SelectItem value="master">master</SelectItem>
                                    <SelectItem value="dev">dev</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="bg-[#4D2B8C] hover:bg-[#3D2270] text-white whitespace-nowrap">
                            Save
                        </Button>
                    </div>
                    <p className="text-sm text-zinc-400">
                        Pushes to this branch will trigger a production deployment, updating the live URL.
                    </p>
                </CardContent>
            </Card>

            {/* Preview Branches */}
            <Card className="bg-[#151518] border-zinc-800">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-base text-white">Preview Branches</CardTitle>
                            <CardDescription className="text-zinc-500 mt-1">
                                Automatically deploy preview environments for these branches.
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 bg-transparent">
                            <Plus size={14} className="mr-2" /> Add Pattern
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Pattern List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-[#0f0f10]">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-800/50 font-mono">
                                    *
                                </Badge>
                                <span className="text-sm text-zinc-300">Matches all branches</span>
                            </div>
                            <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-[#0f0f10]">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-800/50 font-mono">
                                    feat/*
                                </Badge>
                                <span className="text-sm text-zinc-300">Matches feature branches</span>
                            </div>
                            <Switch checked={true} />
                        </div>
                    </div>

                    <div className="border-t border-zinc-800 pt-6">
                        <h4 className="text-sm font-medium text-white mb-4">Pull Request Comments</h4>
                        <div className="flex items-start gap-3">
                            <Switch checked={true} id="pr-comments" />
                            <label htmlFor="pr-comments" className="text-sm text-zinc-400 cursor-pointer">
                                Enable previews for Pull Requests. <br />
                                <span className="text-xs text-zinc-500">
                                    xCloud will automatically comment on PRs with a link to the preview deployment.
                                </span>
                            </label>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

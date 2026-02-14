"use client";

import React from "react";
import { Plus, User, MoreVertical, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserRoles() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                    <h3 className="text-lg font-medium text-white">User Roles</h3>
                    <p className="text-sm text-zinc-400">Manage access to this application.</p>
                </div>
                <Button className="bg-[#4D2B8C] hover:bg-[#3D2270] text-white">
                    <Plus size={16} className="mr-2" /> Invite User
                </Button>
            </div>

            <Card className="bg-[#151518] border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-base text-white">Team Members</CardTitle>
                    <CardDescription className="text-zinc-500">
                        Users with access to this project.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        {/* Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            <div className="col-span-6">User</div>
                            <div className="col-span-3">Role</div>
                            <div className="col-span-3 text-right">Actions</div>
                        </div>

                        {/* User Row 1 */}
                        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 py-3 items-start md:items-center hover:bg-zinc-800/30 rounded-lg transition-colors border border-transparent hover:border-zinc-800">
                            <div className="w-full md:col-span-6 flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-white truncate">John Doe</p>
                                    <p className="text-xs text-zinc-500 truncate">john@example.com</p>
                                </div>
                            </div>
                            <div className="w-full md:col-span-3 flex justify-between md:block pl-11 md:pl-0">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                    <Shield size={10} className="mr-1" /> Owner
                                </span>
                                <div className="md:hidden">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white" disabled>
                                        <MoreVertical size={16} />
                                    </Button>
                                </div>
                            </div>
                            <div className="hidden md:flex col-span-3 justify-end">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white" disabled>
                                    <MoreVertical size={16} />
                                </Button>
                            </div>
                        </div>

                        {/* User Row 2 */}
                        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 py-3 items-start md:items-center hover:bg-zinc-800/30 rounded-lg transition-colors border border-transparent hover:border-zinc-800">
                            <div className="w-full md:col-span-6 flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-zinc-800 text-zinc-400">RK</AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-white truncate">Ripun Kumar</p>
                                    <p className="text-xs text-zinc-500 truncate">ripun@example.com</p>
                                </div>
                            </div>
                            <div className="w-full md:col-span-3 flex justify-between md:block pl-11 md:pl-0">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    Developer
                                </span>
                                <div className="md:hidden">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                                                <MoreVertical size={16} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-[#1c1c1f] border-zinc-800 text-white">
                                            <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                                            <DropdownMenuSeparator className="bg-zinc-800" />
                                            <DropdownMenuItem>Admin</DropdownMenuItem>
                                            <DropdownMenuItem>Developer</DropdownMenuItem>
                                            <DropdownMenuItem>Viewer</DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-zinc-800" />
                                            <DropdownMenuItem className="text-red-500 focus:text-red-500">Remove User</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="hidden md:flex col-span-3 justify-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-[#1c1c1f] border-zinc-800 text-white">
                                        <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-zinc-800" />
                                        <DropdownMenuItem>Admin</DropdownMenuItem>
                                        <DropdownMenuItem>Developer</DropdownMenuItem>
                                        <DropdownMenuItem>Viewer</DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-zinc-800" />
                                        <DropdownMenuItem className="text-red-500 focus:text-red-500">Remove User</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* User Row 3 */}
                        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 py-3 items-start md:items-center hover:bg-zinc-800/30 rounded-lg transition-colors border border-transparent hover:border-zinc-800">
                            <div className="w-full md:col-span-6 flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-zinc-800 text-zinc-400">AM</AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-white truncate">Alex Martin</p>
                                    <p className="text-xs text-zinc-500 truncate">alex@example.com</p>
                                </div>
                            </div>
                            <div className="w-full md:col-span-3 flex justify-between md:block pl-11 md:pl-0">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
                                    Viewer
                                </span>
                                <div className="md:hidden">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                                                <MoreVertical size={16} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-[#1c1c1f] border-zinc-800 text-white">
                                            <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                                            <DropdownMenuSeparator className="bg-zinc-800" />
                                            <DropdownMenuItem>Admin</DropdownMenuItem>
                                            <DropdownMenuItem>Developer</DropdownMenuItem>
                                            <DropdownMenuItem>Viewer</DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-zinc-800" />
                                            <DropdownMenuItem className="text-red-500 focus:text-red-500">Remove User</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="hidden md:flex col-span-3 justify-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-[#1c1c1f] border-zinc-800 text-white">
                                        <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-zinc-800" />
                                        <DropdownMenuItem>Admin</DropdownMenuItem>
                                        <DropdownMenuItem>Developer</DropdownMenuItem>
                                        <DropdownMenuItem>Viewer</DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-zinc-800" />
                                        <DropdownMenuItem className="text-red-500 focus:text-red-500">Remove User</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

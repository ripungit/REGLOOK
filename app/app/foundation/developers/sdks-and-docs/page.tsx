"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    Download,
    ExternalLink,
    BookOpen,
    Code,
    Terminal,
    ChevronRight,
    FileText,
    Github
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SdksAndDocsPage() {
    const [searchQuery, setSearchQuery] = React.useState("");

    const sdks = [
        {
            name: "Node.js",
            version: "v4.2.1",
            description: "Official Node.js library for the Reglook API.",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            installCmd: "npm install reglook-node",
            github: "#",
            docs: "#"
        },
        {
            name: "Python",
            version: "v3.0.5",
            description: "Python bindings for the Reglook API.",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            installCmd: "pip install reglook-python",
            github: "#",
            docs: "#"
        },
        {
            name: "Go",
            version: "v2.1.0",
            description: "Go client library for accessing Reglook services.",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
            installCmd: "go get github.com/reglook/go",
            github: "#",
            docs: "#"
        },
        {
            name: "PHP",
            version: "v5.4.2",
            description: "PHP bindings for the Reglook API.",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
            installCmd: "composer require reglook/reglook-php",
            github: "#",
            docs: "#"
        },
        {
            name: "Java",
            version: "v1.8.0",
            description: "Java client library for Reglook API.",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
            installCmd: "gradle :install reglook-java",
            github: "#",
            docs: "#"
        },
        {
            name: "Ruby",
            version: "v2.6.0",
            description: "Ruby gem for interacting with Reglook API.",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
            installCmd: "gem install reglook",
            github: "#",
            docs: "#"
        }
    ];

    const guides = [
        { title: "Quickstart Guide", desc: "Get up and running with your first API request in minutes.", icon: Zap },
        { title: "Authentication", desc: "Learn how to authenticate your requests using API keys.", icon: Lock },
        { title: "Error Handling", desc: "Best practices for handling errors and rate limits.", icon: AlertTriangle },
        { title: "Pagination", desc: "How to work with list endpoints and pagination cursors.", icon: List },
    ];

    const ThemeColor = "#4338ca"; // Indigo-700

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen font-sans">

            {/* 1. Header Strip */}
            <div className={`w-full bg-[${ThemeColor}] py-8 shadow-2xl z-10 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <Link href="/foundation">
                                <Button className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-11 w-11 transition-all border border-white/10">
                                    <ArrowLeft size={20} />
                                </Button>
                            </Link>
                            <div className="space-y-1">
                                <h1 className="text-3xl font-bold text-white tracking-tight">SDKs & Docs</h1>
                                <p className="text-blue-100/70 text-sm">Official client libraries and comprehensive documentation.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button className="bg-white text-black hover:bg-white/90 font-semibold rounded-lg px-5 h-11 flex items-center gap-2 transition-all shadow-lg active:scale-95">
                                <FileText size={18} />
                                <span>Go to API Reference</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-10 flex-1 space-y-12">

                {/* Search */}
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                    <Input
                        placeholder="Search libraries, guides, and resources..."
                        className="bg-[#161618] border-zinc-800 text-white pl-12 h-14 rounded-2xl focus:border-[#4338ca] focus:ring-1 focus:ring-[#4338ca] text-lg placeholder:text-zinc-600 transition-all shadow-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* SDKs Grid */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Code size={24} className="text-[#4338ca]" />
                        Official Server-side Libraries
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sdks.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((sdk, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={sdk.name}
                                className="group bg-transparent border border-zinc-800 hover:border-zinc-700/80 rounded-2xl p-6 transition-all hover:bg-white/5 relative overflow-hidden"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 p-2 flex items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={sdk.icon} alt={sdk.name} className="w-8 h-8" />
                                    </div>
                                    <Badge className="bg-[#4338ca]/10 text-[#608afa] border-0">{sdk.version}</Badge>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{sdk.name}</h3>
                                <p className="text-zinc-400 text-sm mb-6 h-10">{sdk.description}</p>

                                <div className="bg-[#000]/30 rounded-lg p-3 flex items-center justify-between gap-2 mb-6 border border-white/5 group-hover:border-white/10 transition-colors">
                                    <code className="text-xs text-zinc-300 font-mono truncate">{sdk.installCmd}</code>
                                    <Button size="icon" variant="ghost" className="h-6 w-6 text-zinc-500 hover:text-white">
                                        <Download size={14} />
                                    </Button>
                                </div>

                                <div className="flex gap-3">
                                    <Button className="flex-1 bg-white text-black hover:bg-zinc-200 font-semibold h-9 text-sm">
                                        View Docs
                                    </Button>
                                    <Button variant="outline" className="flex-1 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 bg-transparent h-9 text-sm">
                                        <Github size={16} className="mr-2" /> GitHub
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Docs / Guides */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <BookOpen size={24} className="text-[#4338ca]" />
                        Popular Guides
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {guides.map((guide, i) => (
                            <Link href="#" key={i} className="group block">
                                <div className="bg-[#161618] border border-zinc-800 hover:border-[#4338ca]/50 rounded-2xl p-5 flex items-center gap-5 transition-all hover:bg-[#1a1a20]">
                                    <div className="h-12 w-12 rounded-full bg-[#4338ca]/10 flex items-center justify-center text-[#608afa] group-hover:bg-[#4338ca] group-hover:text-white transition-colors">
                                        <guide.icon size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-semibold group-hover:text-[#608afa] transition-colors flex items-center gap-2">
                                            {guide.title}
                                            <ChevronRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </h3>
                                        <p className="text-zinc-500 text-sm mt-1">{guide.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Icons for guides
import { Zap, Lock, AlertTriangle, List } from "lucide-react";

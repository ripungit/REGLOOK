"use client";

import React from "react";
import { Search, Sparkles, HelpCircle, User, Info, LayoutDashboard, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { SearchCommand } from "@/components/foundation/search-command";
import { Loader } from "@/components/global/loader";

export default function FoundationPage() {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="min-h-[85vh] w-full flex flex-col items-center relative bg-[#0f0f10]">

            {/* 1. Feature Header - Extension of Blue Navbar */}
            <div className="w-full bg-[#432dd7] pb-4 pt-10">
                <div className="w-full max-w-[1200px] px-6 lg:px-12 mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Loader size="sm" />
                        <h1 className="text-xl font-bold text-white tracking-tight">Foundation <sup className="text-xs text-white/50">TM</sup></h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold transition-colors items-center gap-2">
                            Request New Feature
                        </button>
                        <button className="text-white/70 hover:text-white transition-colors">
                            <HelpCircle size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. User Greeting Strip - Darker Gray */}
            <div className="w-full bg-[#18181b] border-b border-white/5 py-6">
                <div className="w-full max-w-[1200px] px-6 lg:px-12 mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-[#2a2a35] flex items-center justify-center">
                            <User size={16} className="text-[#fff]" />
                        </div>
                        <span className="text-xl font-semibold text-white">Hello, Ripun Basumatary</span>
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info size={16} className="text-white/30 ml-3 mt-2 hover:text-white transition-colors cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent side="bottom" align="start" className="bg-white text-slate-900 border-none p-5 rounded-xl shadow-xl w-[250px] mr-[-13px]" sideOffset={10}>
                                    <h4 className="font-bold text-sm mb-2">Last login</h4>
                                    <div className="text-xs text-slate-600  mb-3 font-medium leading-relaxed">
                                        <p>Dec 14, 25, 10:26 PM</p>
                                        <p>Guwahati, Assam, India</p>
                                        <p>Firefox - Windows</p>
                                    </div>
                                    <a href="#" className="flex items-center gap-1 text-xs font-semibold text-slate-900 hover:underline hover:text-black transition-colors border-t border-slate-100 pt-3">
                                        See more on Security Center
                                        <ArrowRight size={12} />
                                    </a>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>

            {/* 3. Main Content - Deep Dark with Blue Glow */}
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl px-6 relative mt-10 md:mt-20 z-10">
                {/* Blue Glow Background */}
                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" /> */}

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-5xl font-bold text-center text-white mb-10 tracking-tight leading-tight"
                >
                    One place to discover<br /> and manage.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="w-full max-w-xl relative group z-20"
                >
                    <div
                        onClick={() => setOpen(true)}
                        className="relative flex items-center h-14 bg-[#fff]/5 hover:bg-[#fff]/5 border border-[#fff]/10 rounded-full px-5 py-4 gap-3 cursor-pointer transition-all hover:border-white/10"
                    >
                        {/* Icon */}
                        <Search size={18} className="text-white shrink-0" />

                        {/* Placeholder text */}
                        <span className="flex-1 text-md text-white/40 font-medium leading-none">
                            Find anything on Reglook.com
                        </span>

                        {/* Shortcuts */}

                    </div>

                </motion.div>

            </div>
            <div className="h-20" />
            <SearchCommand open={open} setOpen={setOpen} />
        </div>
    );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Globe, Shield, Cloud, Mail, Zap, Server,
    Rocket, Lock, LayoutGrid, Box, ArrowRight, User,
    FlameKindlingIcon
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
    { id: "hot", label: "What's hot", icon: FlameKindlingIcon, active: true },
];

const mainLinks = [
    {
        title: "Domain Search",
        desc: "Search and find your ideal domain name.",
        href: "/domain-search",
        isNew: false
    },
    {
        title: "Reglook Mail Login",
        desc: "Access your email account right here.",
        href: "/login",
        external: true
    },
    {
        title: "Domain Pricing",
        desc: "Check the latest and best domain prices.",
        href: "/pricing",
        isNew: false
    },
    {
        title: "Transfer Domains",
        desc: "Move your domains to Reglook.",
        href: "/transfer",
        isNew: false
    },
    {
        title: "Foundation™",
        desc: "Discover how everything comes together.",
        href: "/foundation",
        isNew: false
    },
    {
        title: "Web Hosting",
        desc: "Run apps and services on flexible, virtual cloud servers.",
        href: "/hosting",
        isNew: false
    },
    {
        title: "Virtual Machines",
        desc: "Run apps and services on flexible, virtual cloud servers.",
        href: "/vm",
        isNew: false
    },
    {
        title: "AirNode™ Hosting",
        desc: "Push to deploy. Real-time serverless infra.",
        href: "/foundation/airnode",
        isNew: true
    },
    {
        title: "Request New Feature",
        desc: "Tell us how to make your life easier.",
        href: "/feedback",
        isNew: false
    }
];

export const ProductsDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="absolute top-full left-0 w-full h-screen bg-black/30 backdrop-blur-sm z-40 cursor-default"
                    // style={{ marginTop: 'var(--navbar-height, 0px)' }} // Fallback or handle via parent
                    />

                    {/* Dropdown Content */}
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 w-full bg-[#000] border-b border-t border-white/10 z-50 overflow-hidden shadow-2xl"
                    >
                        <div className="mx-auto max-w-[1150px] flex min-h-[500px]">

                            {/* Left Sidebar */}
                            <div className="w-[260px] border-r border-white/5 bg-[#000] py-8 pl-6 pr-4 flex flex-col justify-between">
                                <div className="space-y-1">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group text-sm font-medium",
                                                cat.active
                                                    ? "bg-[#1A1A1E] text-white shadow-inner shadow-white/5"
                                                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                            )}
                                        >
                                            <cat.icon
                                                size={18}
                                                className={cn(
                                                    "transition-colors",
                                                    cat.active ? "text-green-400" : "text-zinc-500 group-hover:text-zinc-300"
                                                )}
                                            />
                                            {cat.label}
                                            {cat.id === "hot" && (
                                                <ArrowRight size={14} className="ml-auto text-zinc-500" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-8 border-t border-white/5 mt-auto">
                                    <div className="px-4">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">
                                            Reglook Gravity
                                        </h4>
                                        <Link href="#" className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm py-2 transition-colors">
                                            <ArrowRight size={16} className="-rotate-45" />
                                            Transfer to us
                                        </Link>
                                        <Link href="#" className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm py-2 transition-colors">
                                            <Rocket size={16} />
                                            Why Reglook
                                        </Link>
                                        <Link href="#" className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm py-2 transition-colors">
                                            <User size={16} />
                                            About us
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Center Content - Grid */}
                            <div className="flex-1 p-10 bg-[#000]">
                                <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                                    {mainLinks.map((link, idx) => (
                                        <Link
                                            key={idx}
                                            href={link.href}
                                            className="group block"
                                        >
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <h3 className="text-[15px] font-bold text-white group-hover:text-green-400 transition-colors">
                                                    {link.title}
                                                </h3>
                                                {link.external && <ArrowRight size={12} className="-rotate-45 text-zinc-500" />}
                                            </div>
                                            <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                                                {link.desc}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Right Panel - Promo */}
                            <div className="w-[320px] bg-[#000] p-8 flex flex-col justify-center relative overflow-hidden group border-l border-white/5">

                                <div className="relative z-10">
                                    <h3 className="text-3xl font-semibold text-white tracking-tight mb-4">
                                        New Infra<br /> xCloud Serverless
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                                        Build, host, and deploy containerized apps straight from GitHub without touching infrastructure.
                                    </p>
                                    <button className="bg-white text-black font-semibold text-sm px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2">
                                        Explore xCloud
                                        <ArrowRight size={16} />
                                    </button>
                                </div>

                                {/* Abstract Graphic */}
                                <div className="absolute bottom-[-20px] right-[-20px] w-48 h-48 opacity-100 z-0 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent blur-2xl" />
                                    <div className="w-full h-full border-[20px] border-green-500/10 rounded-full" />
                                    <div className="absolute bottom-0 right-0 w-32 h-32 border-[20px] border-green-500/20 rounded-full" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f0f10] to-transparent pointer-events-none" />
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Custom Icon for 'What's Hot'
const FlameIcon = ({ className, size }: { className?: string, size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3a1 1 0 0 1 .9 2.5z" />
    </svg>
);

"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Smartphone, ArrowRight, Lock, Check, Mail, Star, Search, Paperclip, Plus } from "lucide-react";
import { siGmail, siApple, siThunderbird } from 'simple-icons/icons';

const SimpleIcon = ({ icon, className }: { icon: any, className?: string }) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        className={`fill-current ${className}`}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d={icon.path} />
    </svg>
);

export const EmailFeatures = () => {
    return (
        <section className="py-24 mt-20 bg-black text-white relative">
            <div className="container mx-auto px-6 max-w-[1150px]">

                {/* Header */}
                <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest border border-indigo-500/20">
                                Professional Email
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
                            Reglook <span className="text-white">Mail.</span>
                        </h2>
                        <p className="text-white font-semibold text-lg md:text-xl max-w-2xl">
                            Secure, reliable, and ad-free email hosting for your business. Build trust with every email you send.
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-4">
                        <div className="text-right">
                            <span className="block text-zinc-400 text-sm mb-1">Price starting from</span>
                            <span className="text-2xl font-bold text-white">$1.00<span className="text-zinc-500 text-lg font-medium">/month</span></span>
                        </div>
                        <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold cursor-pointer hover:bg-zinc-200 transition-colors">
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 min-h-[500px]">

                    {/* Card 1: Main Feature (Large) - Inbox Experience */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 md:row-span-2 bg-gradient-to-t from-[#000] to-indigo-800 rounded-[32px] p-8 md:p-12 relative overflow-hidden group flex flex-col"
                    >

                        <div className="relative z-10 mb-8">
                            <h3 className="text-3xl font-bold mb-4">The Inbox, Reimagined.</h3>
                            <p className="text-white text-lg max-w-md">
                                Experience a lightning-fast, clutter-free interface designed for focus. Breeze through your emails with speed and style.
                            </p>
                        </div>

                        {/* Visual - Desktop Email Client */}
                        <div className="mt-auto relative w-full h-80 bg-[#000] rounded-xl overflow-hidden flex shadow-2xl">

                            {/* 1. Sidebar (Collapsed) */}
                            <div className="w-14 bg-[#000] border-r border-white/5 flex flex-col py-3 items-center hidden sm:flex">
                                <div className="mb-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black shadow-lg hover:bg-zinc-200 transition-colors cursor-default">
                                        <div className="text-xl font-light">
                                            <Plus className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 w-full px-2 items-center">
                                    <div className="flex items-center justify-center p-2 rounded-lg bg-white/5 text-white cursor-default">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-default">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <div className="flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-default">
                                        <Paperclip className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* 2. Email List (Compact) */}
                            <div className="w-64 border-r border-white/5 flex flex-col bg-[#000] hidden md:flex">
                                <div className="p-3 border-b border-white/5 flex items-center gap-2">
                                    <div className="relative w-full">
                                        <Search className="absolute left-2 top-1.5 w-3 h-3 text-zinc-500" />
                                        <div className="w-full h-6 bg-white/5 rounded-md pl-7" />
                                    </div>
                                </div>
                                <div className="overflow-hidden">
                                    {/* Item 1 - Active */}
                                    <div className="px-4 py-3 bg-[#1a1a1a] border-l-2 border-white cursor-default">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-semibold text-sm text-white">Sarah Miller</span>
                                            <span className="text-[10px] text-zinc-500">10:42 AM</span>
                                        </div>
                                        <div className="text-xs font-medium text-white mb-0.5">Q4 Marketing Strategy</div>
                                        <div className="text-[11px] text-zinc-500 line-clamp-1">Hi team, attached is the final deck...</div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="px-4 py-3 border-b border-white/5 opacity-50 cursor-default">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-semibold text-sm text-zinc-300">Design Team</span>
                                            <span className="text-[10px] text-zinc-600">Yesterday</span>
                                        </div>
                                        <div className="text-xs font-medium text-zinc-400 mb-0.5">New Brand Assets</div>
                                        <div className="text-[11px] text-zinc-600">The new logo files are ready for review...</div>
                                    </div>
                                    {/* Item 3 */}
                                    <div className="px-4 py-3 border-b border-white/5 opacity-40 cursor-default">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-medium text-sm text-zinc-400">Stripe</span>
                                            <span className="text-[10px] text-zinc-600">Oct 24</span>
                                        </div>
                                        <div className="text-xs font-medium text-zinc-500 mb-0.5">Invoice #4920 Paid</div>
                                        <div className="text-[11px] text-zinc-600">Receipt for your recent payment...</div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Reading Pane */}
                            <div className="flex-1 bg-[#09090b] flex flex-col relative min-w-0">
                                {/* Email Toolbar */}
                                <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-[#111]">
                                    <div className="flex gap-4 text-zinc-500">
                                        <div className="w-4 h-4 bg-zinc-800 rounded" />
                                        <div className="w-4 h-4 bg-zinc-800 rounded" />
                                        <div className="w-4 h-4 bg-zinc-800 rounded" />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-4 h-4 bg-zinc-800 rounded-full" />
                                        <div className="w-4 h-4 bg-zinc-800 rounded-full" />
                                    </div>
                                </div>

                                {/* Email Content */}
                                <div className="p-5 flex-1 overflow-hidden">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                                                SM
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-white">Sarah Miller</div>
                                                <div className="text-[11px] text-zinc-500">to me, Design • <span className="text-zinc-400">details</span></div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-zinc-500">Oct 25, 10:42 AM</div>
                                    </div>

                                    <h1 className="text-lg font-bold text-white mb-2">Q4 Marketing Strategy</h1>
                                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                                        Hi team, <br /><br />
                                        I&apos;ve attached the final deck for tomorrow&apos;s all-hands. We&apos;re focusing on the new product features and the expansion into the APAC region.
                                    </p>

                                    {/* Attachment Chip */}
                                    <div className="inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group/att">
                                        <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center text-[10px] font-bold text-red-400">PDF</div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-zinc-200">Q4_Strategy_Deck.pdf</span>
                                            <span className="text-[10px] text-zinc-500">2.4 MB</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Mobile App */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-black rounded-[32px] p-8 flex flex-col justify-between group hover:bg-transparent transition-colors border border-white/5 relative overflow-hidden"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-zinc-500/10 flex items-center justify-center mb-4 text-white">
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Reglook Mail</h3>
                            <p className="text-zinc-400 text-sm">
                                Take your inbox with you. Download our top-rated app for iOS and Android.
                            </p>
                        </div>

                        <div className="mt-6 flex gap-4 items-end">
                            {/* QR Code */}
                            <div className="bg-white p-2 rounded-lg">
                                <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://reglook.com/mobile-app&color=000000&bgcolor=ffffff"
                                    alt="Download App QR Code"
                                    className="w-20 h-20"
                                />
                            </div>

                            {/* Store Buttons */}
                            <div className="flex flex-col gap-2">
                                <button className="flex items-center gap-2 bg-black border border-white/10 hover:bg-zinc-800 transition-colors px-3 py-2 rounded-lg w-full">
                                    <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>Apple</title><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.26 3.51 7.59 10.15 7.64c1.33.02 2.26.63 2.98.63.77 0 2.05-.72 3.49-.6 1.15.11 2.4.61 3.1 1.6-2.73 1.62-2.3 5.48.51 6.64-.67 1.76-1.63 3.47-3.18 4.37zM12.03 7.25c-.24-2.12 1.62-4.04 3.7-4.25.32 2.27-2.34 4.35-3.7 4.25z" /></svg>
                                    <div className="text-left">
                                        <div className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold leading-none">Download on the</div>
                                        <div className="text-xs font-bold text-white leading-none mt-0.5">App Store</div>
                                    </div>
                                </button>
                                <button className="flex items-center gap-2 bg-black border border-white/10 hover:bg-zinc-800 transition-colors px-3 py-2 rounded-lg w-full">
                                    <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title>Google Play</title><path d="M22.84,17.27,6.86,26.43a2.31,2.31,0,0,1-3.23-2.61V8.18A2.32,2.32,0,0,1,6.86,5.57L22.84,14.73A1.47,1.47,0,0,1,22.84,17.27Z" /></svg>
                                    <div className="text-left">
                                        <div className="text-[8px] uppercase tracking-wider text-zinc-500 font-bold leading-none">Get it on</div>
                                        <div className="text-xs font-bold text-white leading-none mt-0.5">Google Play</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Custom Domain */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-black rounded-[32px] p-8 flex flex-col justify-between group hover:bg-transparent transition-colors border border-white/5"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4 text-pink-400">
                                <Mail className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Custom Domain</h3>
                            <p className="text-zinc-400 text-sm">
                                Use your own domain name. Look professional instantly.
                            </p>
                        </div>

                        <div className="mt-6 flex items-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-xs font-semibold hover:bg-white/90 transition-colors">
                                <Globe className="w-4 h-4" />
                                <span>Connect Domain</span>
                            </button>
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                                <Check className="w-4 h-4 text-green-500" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

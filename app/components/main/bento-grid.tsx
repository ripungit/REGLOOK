"use client"

import { motion } from "framer-motion"
import { Cloud, AppWindow, Brain, Podcast } from "lucide-react"

export function BentoGrid() {
    return (
        <section className="bg-black py-32 text-white relative">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12">

                {/* Header */}
                <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight"
                    >
                        Your domain is the foundation
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-white md:max-w-md md:ml-auto md:text-left pb-2"
                    >
                        Choose exactly what you need to take your domain and website confidently to the world.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Item 1: Web Hosting (Server Theme) */}
                    <div className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-[#0B0C10] border border-white/5 h-auto md:h-[500px] flex flex-col md:flex-row group">

                        {/* Visual Side (Left) */}
                        <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 md:p-12 mb-8 md:mb-0 h-64 md:h-auto overflow-hidden">
                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-transparent rounded-full blur-3xl pointer-events-none" />

                            {/* Server Rack Visual */}
                            <div className="relative z-10 flex flex-col gap-4 transform transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 perspective-1000">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className={`relative w-48 h-12 bg-[#1A1D24] rounded-lg border border-white/5 shadow-2xl flex items-center px-4 gap-3 transform transition-all duration-500 ${i === 1 ? 'translate-x-4' : ''} group-hover:translate-x-0`}>
                                        {/* Status Lights */}
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                                            <div className="w-2 h-2 rounded-full bg-red-500/30" />
                                        </div>
                                        {/* Disk Slots */}
                                        <div className="flex gap-1 ml-auto">
                                            {[...Array(4)].map((_, j) => (
                                                <div key={j} className="w-1 h-6 bg-black/40 rounded-sm" />
                                            ))}
                                        </div>
                                        {/* Activity highlight */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content Side (Right) */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="p-1 rounded bg-red-500/10 text-red-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="7.5 4.21 12 6.81 16.5 4.21" /><polyline points="7.5 19.79 7.5 14.6 3 12" /><polyline points="21 12 16.5 14.6 16.5 19.79" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" x2="12" y1="22.08" y2="12" /></svg>
                                </span>
                                <span className="text-xs font-bold tracking-widest text-white uppercase">Web Hosting</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Built to perform.<br />Easy to manage.</h3>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm">
                                Everything you need to launch and run a fast, reliable website - without complexity.
                            </p>

                            <div className="mt-8 flex gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-white">99.9%</span>
                                    <span className="text-xs text-white/40 uppercase tracking-wider">Uptime</span>
                                </div>
                                <div className="w-px h-10 bg-white/10" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-white">24/7</span>
                                    <span className="text-xs text-white/40 uppercase tracking-wider">Support</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 2: Email */}
                    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-pink-900 to-[#000] min-h-[500px] md:h-[600px] p-8 md:p-10 flex flex-col justify-between group">
                        {/* Mail Visual */}
                        <div className="absolute top-0 right-0 w-full h-[60%] flex items-center justify-center pointer-events-none">
                            <div className="relative w-48 h-32 perspective-1000 rotate-[-8deg] translate-x-0 md:-rotate-12 md:translate-x-4 md:group-hover:rotate-[-8deg] md:group-hover:translate-x-0 transition-all duration-500 ease-out">
                                {/* Envelope Back */}
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl z-20 overflow-hidden">
                                    {/* Flap effect using CSS gradients/shapes */}
                                    <div
                                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent"
                                        style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0)' }}
                                    />
                                </div>

                                {/* Paper/Letter peeking out */}
                                <div className="absolute top-2 left-2 right-2 bottom-0 bg-white rounded-[4px] z-10 shadow-lg transform transition-transform duration-500 -translate-y-8 md:translate-y-0 md:group-hover:-translate-y-8 flex flex-col p-3 gap-2">
                                    <div className="w-16 h-2 bg-indigo-100 rounded-full" />
                                    <div className="w-24 h-2 bg-gray-100 rounded-full" />
                                    <div className="w-20 h-2 bg-gray-100 rounded-full" />
                                    <div className="mt-auto flex justify-end">
                                        <div className="w-6 h-6 rounded-full bg-indigo-50/50" />
                                    </div>
                                </div>

                                {/* Envelope Front (Overlay for depth) */}
                                <div className="absolute inset-0 z-30 pointer-events-none">
                                    <div className="absolute bottom-0 left-0 w-full h-0 border-b-[60px] border-l-[90px] border-r-[90px] border-b-white/10 border-l-transparent border-r-transparent rounded-b-lg mix-blend-overlay" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto relative z-10">
                            <div className="flex items-center gap-2 mb-4 text-white/80">
                                {/* Mail Icon */}
                                <div className="flex items-center justify-center h-8 w-8 rounded bg-white/20 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </div>
                                <span className="font-semibold text-lg">Reglook Mail</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Email, without the <br />noise.</h3>
                            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xs">
                                Professional email built for your domain - fast, secure, and effortless to manage.
                            </p>
                        </div>
                    </div>

                    {/* Item 3: VM Balancer (Mail-like Theme) */}
                    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-amber-500 to-[#000] min-h-[500px] md:h-[600px] p-8 md:p-10 flex flex-col justify-between group">

                        {/* Visual Side (Top) */}
                        <div className="absolute top-0 right-0 w-full h-[65%] flex items-center justify-center pointer-events-none overflow-hidden">
                            {/* Radial Balance Visualization */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Glowing Core */}
                                <div className="absolute w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-3xl animate-pulse" />

                                {/* Orbit System Container */}
                                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">

                                    {/* Outer Ring */}
                                    <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute inset-4 border border-white/5 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]" />

                                    {/* Central Stabilizer */}
                                    <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#1A1D24] to-black rounded-full border border-white/10 shadow-2xl flex items-center justify-center z-20">
                                        <div className="absolute inset-0 bg-amber-500/5 rounded-full" />
                                        {/* Inner Icon */}
                                        <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="mt-auto relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="p-1 rounded bg-white/20 text-white backdrop-blur-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg>
                                </span>
                                <span className="text-xs text-white font-bold tracking-widest uppercase">VM Balancer</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Balanced power, on demand.</h3>
                            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                                Scale compute instantly with flexible virtual machines designed for performance, stability, and control.
                            </p>
                        </div>
                    </div>

                    {/* Item: xCloud */}
                    <div className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-gradient-to-b from-indigo-600 to-[#000] h-auto md:h-[500px] flex flex-col md:flex-row-reverse group">

                        {/* Visual Side (Right) */}
                        <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 md:p-12 mb-8 md:mb-0 h-64 md:h-auto overflow-hidden">

                            {/* Cloud Icon Visual */}
                            <div className="relative z-10 w-48 h-48 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                {/* Outer Glow Ring */}
                                <div className="absolute inset-0 border border-white rounded-full animate-pulse blur-sm" />

                                {/* Lucide Cloud Icon */}
                                <Cloud className="w-32 h-32 text-white" strokeWidth={1} />
                            </div>
                        </div>

                        {/* Content Side (Left) */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="p-1 rounded bg-white/20 text-white">
                                    <Cloud className="w-4 h-4" />
                                </span>
                                <span className="text-xs font-bold tracking-widest text-white uppercase">xCloud</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Scale without limits.</h3>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm">
                                Deploy globally distributed instances in seconds with our high-performance xCloud infrastructure.
                            </p>

                            <div className="mt-8 flex gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-white">100%</span>
                                    <span className="text-xs text-white/40 uppercase tracking-wider">SLA</span>
                                </div>
                                <div className="w-px h-10 bg-white/10" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-white">&lt;50ms</span>
                                    <span className="text-xs text-white/40 uppercase tracking-wider">Latency</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item: LoopSync Pro */}
                    <div className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-gradient-to-b from-red-800 to-[#000] h-auto md:h-[500px] flex flex-col md:flex-row group">
                        {/* Visual Side (Left) */}
                        <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 md:p-12 mb-8 md:mb-0 h-64 md:h-auto overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                            {/* App Icon Visual */}
                            <div className="relative z-10 w-48 h-48 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                {/* Outer Glow Ring */}
                                <div className="absolute inset-0 border border-white rounded-full animate-pulse blur-sm" />

                                {/* Lucide AppWindow Icon */}
                                <AppWindow className="w-32 h-32 text-white" strokeWidth={1} />
                            </div>
                        </div>

                        {/* Content Side (Right) */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="p-1 rounded bg-white/20 text-white">
                                    <AppWindow className="w-4 h-4" />
                                </span>
                                <span className="text-xs font-bold tracking-widest text-white uppercase">LoopSync Pro</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Build. Publish. <br />Grow.</h3>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm">
                                A multisided marketplace for developers to publish apps, software, and extensions. Get a free developer account with any hosting plan.
                            </p>

                            <div className="mt-8 flex gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-white">10k+</span>
                                    <span className="text-xs text-white/40 uppercase tracking-wider">Apps</span>
                                </div>
                                <div className="w-px h-10 bg-white/10" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-white">Zero</span>
                                    <span className="text-xs text-white/40 uppercase tracking-wider">Fees</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item: Via AI */}
                    <div className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-gradient-to-b from-teal-800 to-[#000] h-auto md:h-[500px] flex flex-col md:flex-row-reverse group">
                        {/* Visual Side (Right) */}
                        <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 md:p-12 mb-8 md:mb-0 h-64 md:h-auto overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                            {/* Orb Circle Visual */}
                            <div className="relative z-10 w-48 h-48 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                {/* Outer Glow Ring */}
                                <div className="absolute inset-0 border border-white rounded-full animate-pulse blur-sm" />

                                {/* Inner Rotating Ring */}
                                <div className="absolute inset-4 border border-white/20 rounded-full animate-[spin_3s_linear_infinite]" />

                                {/* Core Orb */}
                                <div className="w-32 h-32 bg-white/10 rounded-full backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                    <Podcast className="w-16 h-16 text-white" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>

                        {/* Content Side (Left) */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="p-1 rounded bg-emerald-500/10 text-white">
                                    <Podcast className="w-4 h-4" />
                                </span>
                                <span className="text-xs font-bold tracking-widest text-white uppercase">Via AI</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Your intelligent <br />support assistant.</h3>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm">
                                An AI built to resolve customer issues faster with smart automation and clear, helpful responses.
                            </p>

                            <div className="mt-8 flex gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-white">24/7</span>
                                    <span className="text-xs text-white/40 uppercase tracking-wider">Support</span>
                                </div>
                                <div className="w-px h-10 bg-white/10" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-white">Smart</span>
                                    <span className="text-xs text-white/40 uppercase tracking-wider">Auto</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 4: Unbox (Wide Minimal) */}
                    <div className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-[#0c0c0e] border border-white/5 h-auto md:h-[400px] flex flex-col md:flex-row items-start md:items-center p-8 md:p-16 group">
                        <div className="w-full md:w-1/2 mb-8 md:mb-0">
                            <div className="flex items-center gap-3 mb-6">
                                {/* Unbox Logo */}
                                <div className="grid grid-cols-2 gap-1 w-8 h-8 rotate-45">
                                    <div className="bg-white rounded-full scale-75" />
                                    <div className="bg-white/50 rounded-full scale-75" />
                                    <div className="bg-white/50 rounded-full scale-75" />
                                    <div className="bg-white/10 rounded-full scale-75" />
                                </div>
                                <span className="text-2xl font-medium text-white">Foundation</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                Ready by default.
                            </h3>
                        </div>
                        <div className="w-full md:w-1/2 pt-8 md:pt-0 border-t md:border-t-0 md:pl-12 md:border-l border-white/10">
                            <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-8">
                                Foundation automatically activates as part of your purchase setup, swiftly getting your products ready to launch and manage.
                            </p>
                            <button className="px-6 py-3 rounded-full bg-white/10 text-sm font-semibold hover:bg-white/20 transition-colors">
                                Discover more
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

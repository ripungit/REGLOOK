"use client";

import { motion } from "framer-motion";
import { Server, Globe, ShieldCheck, Cpu, Database, Network, Lock, Zap } from "lucide-react";

export const BentoFeatures = () => {
    return (
        <section className="py-24 bg-black text-white relative">
            <div className="container mx-auto px-6 max-w-[1150px]">
                <div className="mb-16 max-w-4xl">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
                        Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-300">dominance.</span>
                    </h2>
                    <p className="text-white text-lg font-semibold">
                        The underlying technology that powers your digital empire.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Card 1: VPS Power (Large - 2x1) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-[#0B0C10] border border-white/5 h-auto md:h-[500px] flex flex-col md:flex-row group"
                    >
                        {/* Visual Side (Left) - Server Rack Theme */}
                        <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 md:p-12 mb-8 md:mb-0 h-64 md:h-auto overflow-hidden">

                            {/* Server Rack Visual */}
                            <div className="relative z-10 flex flex-col gap-4 transform transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2 perspective-1000">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className={`relative w-64 h-16 bg-[#1A1D24] rounded-lg border border-white/5 shadow-2xl flex items-center px-6 gap-4 transform transition-all duration-500 ${i === 1 ? 'translate-x-6' : ''} group-hover:translate-x-0`}>
                                        {/* Status Lights */}
                                        <div className="flex gap-2.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D4D] shadow-[0_0_8px_rgba(255,77,77,0.5)] animate-pulse" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D4D]/30" />
                                        </div>
                                        {/* Disk Slots */}
                                        <div className="flex gap-1.5 ml-auto">
                                            {[...Array(6)].map((_, j) => (
                                                <div key={j} className="w-1.5 h-8 bg-black/40 rounded-sm" />
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
                                <span className="p-1 rounded bg-[#FF4D4D]/10 text-[#FF4D4D]">
                                    <Cpu className="w-4 h-4" />
                                </span>
                                <span className="text-xs font-bold tracking-widest text-white uppercase">Dedicated Core</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Raw power.<br />Zero sharing.</h3>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm">
                                Full root access to dedicated resources. No noisy neighbors, just pure, unadulterated performance for your heavy workloads.
                            </p>
                            <div className="mt-8 flex gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-white">100%</span>
                                    <span className="text-xs text-white/40 uppercase tracking-wider">Isolation</span>
                                </div>
                                <div className="w-px h-10 bg-white/10" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-white">Root</span>
                                    <span className="text-xs text-white/40 uppercase tracking-wider">Access</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Dedicated IP (Terminal/Code Theme) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-indigo-700 to-black min-h-[600px] p-8 md:p-10 flex flex-col justify-between group"
                    >
                        {/* Visual Side (Top) */}
                        <div className="absolute top-0 right-0 w-full h-[60%] flex items-center justify-center pointer-events-none overflow-hidden">
                            {/* Terminal Window */}
                            <div className="w-[90%] max-w-sm bg-[#0f0f10] rounded-xl border border-white/10 shadow-2xl p-4 font-mono text-xs text-green-400 opacity-90 group-hover:scale-105 transition-transform duration-500">
                                <div className="flex gap-1.5 mb-3 border-b border-white/5 pb-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                </div>
                                <div className="space-y-1">
                                    <p><span className="text-indigo-400">root@vps:~$</span> ping 192.168.1.1</p>
                                    <p className="text-zinc-500">PING 192.168.1.1 (192.168.1.1): 56 data bytes</p>
                                    <p>64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.034 ms</p>
                                    <p>64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.041 ms</p>
                                    <p className="animate-pulse">_</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto relative z-10">
                            <div className="flex items-center gap-2 mb-4 text-white/80">
                                <div className="flex items-center justify-center h-8 w-8 rounded bg-white/10 text-white">
                                    <Network className="w-4 h-4" />
                                </div>
                                <span className="font-semibold text-md uppercase tracking-wider">Static IP</span>
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-4 leading-tight">Your address.<br />Permanent.</h3>
                            <p className="text-white text-md leading-relaxed max-w-xs">
                                Establish reputation and trust with a unique static IPv4 address dedicated solely to your hosting environment.
                            </p>
                        </div>
                    </motion.div>


                    {/* Card 3: NVMe Storage (Speed Theme) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-black to-black border border-white/5 min-h-[500px] p-8 md:p-10 flex flex-col justify-between group"
                    >
                        {/* Visual Side (Top) */}
                        <div className="absolute top-0 right-0 w-full h-[60%] flex items-center justify-center pointer-events-none overflow-hidden">
                            <div className="relative w-48 h-48 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-4 border-t-2 border-indigo-500 rounded-full animate-[spin_2s_linear_infinite]" />
                                <div className="w-24 h-24 bg-indigo-500/10 rounded-full backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.3)]">
                                    <Database className="w-10 h-10 text-indigo-400" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto relative z-10">
                            <div className="flex items-center gap-2 mb-4 text-white/80">
                                <div className="flex items-center justify-center h-8 w-8 rounded bg-white/10 text-white">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <span className="font-semibold text-md uppercase tracking-wider">NVMe Storage</span>
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-4 leading-tight">6x Faster<br />Read/Write.</h3>
                            <p className="text-white text-md leading-relaxed max-w-xs">
                                High-performance NVMe storage eliminates bottlenecks, ensuring your database and assets load instantly.
                            </p>
                        </div>
                    </motion.div>


                    {/* Card 4: Unmetered Bandwidth (Wide) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-[#000] border border-white/5 h-auto md:h-[350px] flex flex-col md:flex-row items-center p-8 md:p-16 group"
                    >
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#5f2122]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="w-full md:w-1/2 mb-8 md:mb-0">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-medium text-white tracking-tight">Unmetered Access</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                                No traffic limits.
                            </h3>
                            <p className="text-white/60 text-lg leading-relaxed max-w-md">
                                Push as much data as you need. We don't cap your bandwidth or throttle your connection speeds.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            {/* Visual Graphic representing flow */}
                            <div className="relative w-full max-w-[300px] h-32 flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 bg-[#FF4D4D]"
                                        animate={{ height: ['20%', '80%', '20%'] }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            delay: i * 0.05,
                                            ease: "easeInOut"
                                        }}
                                        style={{ height: '40%' }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

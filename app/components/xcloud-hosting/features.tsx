"use client";

import { motion } from "framer-motion";
import { siNextdotjs, siVite, siAngular, siVuedotjs, siReact, siGithub, siGitlab } from 'simple-icons/icons';
import { Cloud, GitBranch, Globe, Zap, ArrowRight, Terminal, Layers, ShieldCheck } from "lucide-react";

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

export const XCloudFeatures = () => {
    return (
        <section className="py-24 bg-black text-white relative">
            <div className="container mx-auto px-6 max-w-[1150px]">

                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                        Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">ship faster.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        A complete serverless platform engineered for modern frontend development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 min-h-[500px]">

                    {/* Card 1: Main Deployment (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 md:row-span-2 bg-[#0A0A0A] border border-white/10 rounded-[32px] p-8 md:p-12 relative overflow-hidden group flex flex-col"
                    >
                        {/* Abstract Background */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

                        <div className="relative z-10 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400">
                                <Terminal className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Zero-Config Deployment</h3>
                            <p className="text-zinc-400 text-lg max-w-md">
                                Push to git and we handle the build, deploy, and caching. Your site is live on our global edge network in seconds.
                            </p>
                        </div>

                        {/* Deployment Visual */}
                        <div className="mt-auto relative w-full h-64 bg-[#111] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                                </div>
                                <div className="mx-auto text-xs font-mono text-zinc-500">xcloud-pipeline</div>
                            </div>
                            <div className="p-4 font-mono text-xs space-y-2">
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <span className="text-green-500">✔</span>
                                    <span>Cloning repository...</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <span className="text-green-500">✔</span>
                                    <span>Installing dependencies...</span>
                                    <span className="text-zinc-600 ml-2">1.2s</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <span className="text-green-500">✔</span>
                                    <span>Building static assets...</span>
                                    <span className="text-zinc-600 ml-2">2.4s</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <span className="animate-pulse text-indigo-400">➜</span>
                                    <span>Deploying to Edge Network...</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Global Edge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-zinc-900/50 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between group hover:bg-zinc-900 transition-colors"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-400">
                                <Globe className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Global Edge</h3>
                            <p className="text-zinc-400 text-sm">
                                Your content is replicated across 35+ regions worldwide for <span className="text-white">50ms</span> latency.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3: Instant Rollbacks */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-zinc-900/50 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between group hover:bg-zinc-900 transition-colors"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4 text-pink-400">
                                <GitBranch className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Instant Rollbacks</h3>
                            <p className="text-zinc-400 text-sm">
                                Every deployment is immutable. Rollback to any previous version instantly.
                            </p>
                        </div>
                    </motion.div>

                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-zinc-900/50 border border-white/10 rounded-[32px] p-8 flex flex-col gap-4 group hover:bg-zinc-900 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1">DDoS Protection</h3>
                            <p className="text-zinc-400 text-sm">Enterprise-grade mitigation included by default.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-zinc-900/50 border border-white/10 rounded-[32px] p-8 flex flex-col gap-4 group hover:bg-zinc-900 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1">Serverless Functions</h3>
                            <p className="text-zinc-400 text-sm">Run backend logic at the edge with zero cold starts.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-zinc-900/50 border border-white/10 rounded-[32px] p-8 flex flex-col gap-4 group hover:bg-zinc-900 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Layers className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1">Preview Envs</h3>
                            <p className="text-zinc-400 text-sm">Automatic preview URLs for every Pull Request.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

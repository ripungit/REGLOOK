"use client";

import { motion } from "framer-motion";
import { siNextdotjs, siVite, siAngular, siVuedotjs, siReact, siGithub, siGitlab, siDocker, siNodedotjs, siPython, siGo } from 'simple-icons/icons';
import { Cloud, GitBranch, Globe, Zap, ArrowRight, Terminal, Server, ShieldCheck, Database, Key } from "lucide-react";

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

export function PartnerBenefits() {
    return (
        <section className="py-24 bg-black text-white relative z-20">
            <div className="container mx-auto px-6 max-w-[1200px]">

                {/* Header */}
                <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest border border-red-500/20">
                                Global Infrastructure
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
                            Your Brand. <span className="text-white">Our Backend.</span>
                        </h2>
                        <p className="text-white font-medium text-lg md:text-xl max-w-2xl">
                            Leverage our 45+ APIs with data centers worldwide. Integrate domains, hosting, and email directly into your own dashboard via our powerful API.
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-4">
                        <div className="text-right">
                            <span className="block text-zinc-400 text-sm mb-1">One-time deposit</span>
                            <span className="text-2xl font-bold text-white">$50<span className="text-zinc-500 text-lg font-medium">/lifetime</span></span>
                        </div>
                        <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold cursor-pointer hover:bg-zinc-200 transition-colors">
                            Apply now
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 min-h-[500px]">

                    {/* Card 1: Main API Visual (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 md:row-span-2 bg-gradient-to-t from-black to-cyan-900 rounded-[32px] p-8 md:p-12 relative overflow-hidden group flex flex-col"
                    >

                        <div className="relative z-10 mb-8">
                            <h3 className="text-3xl font-bold mb-4">API-First Platform</h3>
                            <p className="text-zinc-400 text-lg max-w-md">
                                Everything we build is API-first. You get the same controls we use. Provision domains, manage DNS, and deploy servers programmatically.
                            </p>
                        </div>

                        {/* Code Visual */}
                        <div className="mt-auto relative w-full h-72 bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
                            <div className="flex items-center px-4 py-3 border-b border-white/10 bg-transparent">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                </div>
                                <div className="mx-auto text-xs font-mono text-zinc-500">partner-integration.js</div>
                            </div>
                            <div className="p-6 font-mono text-sm space-y-1 leading-relaxed">
                                <div className="flex text-zinc-400">
                                    <span className="text-purple-400 mr-2">const</span>
                                    <span className="text-blue-400 mr-2">order</span>
                                    <span>=</span>
                                    <span className="text-purple-400 mx-2">await</span>
                                    <span className="text-yellow-300">reglook</span>.
                                    <span className="text-blue-300">domains</span>.
                                    <span className="text-green-300">register</span>({'{'}
                                </div>
                                <div className="pl-6 text-zinc-300">
                                    domain: <span className="text-orange-400">'client-site.com'</span>,
                                </div>
                                <div className="pl-6 text-zinc-300">
                                    years: <span className="text-orange-400">1</span>,
                                </div>
                                <div className="pl-6 text-zinc-300">
                                    privacy: <span className="text-blue-400">true</span>,
                                </div>
                                <div className="pl-6 text-zinc-300">
                                    nameservers: [<span className="text-orange-400">'ns1.yourbrand.com'</span>]
                                </div>
                                <div className="text-zinc-400">{'}'});</div>
                                <br />
                                <div className="text-zinc-500">// Response: 200 OK - Domain Active</div>
                            </div>

                            {/* Floating Icons */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute right-8 bottom-8 p-4 rounded-2xl bg-[#0f0f10] border border-white/10 shadow-xl"
                            >
                                <SimpleIcon icon={siNodedotjs} className="w-10 h-10 text-[#339933]" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Card 2: White Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-transparent border border-white/5 rounded-[32px] p-8 flex flex-col justify-between group hover:border-white/10 transition-colors"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-500/20 to-zinc-500/20 flex items-center justify-center mb-6 text-white">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">White-Label Ready</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Your brand, our technology. Remove all Reglook branding. Even the WHOIS data shows your company.
                            </p>
                        </div>

                        <div className="mt-8 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                            <div className="text-xs font-mono text-zinc-500">powered by</div>
                            <div className="h-px flex-1 bg-white/10 mx-4" />
                            <div className="font-bold text-white text-sm">YOU</div>
                        </div>
                    </motion.div>

                    {/* Card 3: Stack Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-transparent border border-white/5 rounded-[32px] p-8 flex flex-col justify-between group hover:border-white/10 transition-colors"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-500/20 to-zinc-500/20 flex items-center justify-center mb-6 text-white">
                                <Database className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Modern Stack</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Compatible with any language or framework your team uses.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <div className="p-2.5 bg-black rounded-lg border border-white/10" title="Python">
                                <SimpleIcon icon={siPython} className="w-5 h-5 text-[#3776AB]" />
                            </div>
                            <div className="p-2.5 bg-black rounded-lg border border-white/10" title="Go">
                                <SimpleIcon icon={siGo} className="w-5 h-5 text-[#00ADD8]" />
                            </div>
                            <div className="p-2.5 bg-black rounded-lg border border-white/10" title="Docker">
                                <SimpleIcon icon={siDocker} className="w-5 h-5 text-[#2496ED]" />
                            </div>
                            <div className="p-2.5 bg-black rounded-lg border border-white/10" title="Node.js">
                                <SimpleIcon icon={siNodedotjs} className="w-5 h-5 text-[#339933]" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

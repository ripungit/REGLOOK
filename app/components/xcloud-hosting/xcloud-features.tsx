"use client";

import { motion } from "framer-motion";
import { siNextdotjs, siVite, siAngular, siVuedotjs, siReact, siGithub, siGitlab } from 'simple-icons/icons';
import { Cloud, GitBranch, Globe, Zap, ArrowRight, Terminal } from "lucide-react";

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
        <section className="py-24 mt-20 bg-black text-white relative">
            <div className="container mx-auto px-6 max-w-[1150px]">

                {/* Header */}
                <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest border border-indigo-500/20">
                                New Infrastructure
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
                            xCloud <span className="text-white">Serverless.</span>
                        </h2>
                        <p className="text-white font-semibold text-lg md:text-xl max-w-2xl">
                            Deploy full-stack web applications in seconds. Link your repository, and let xCloud handle the build, deployment, and scaling globally.
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-4">
                        <div className="text-right">
                            <span className="block text-zinc-400 text-sm mb-1">Price starting from</span>
                            <span className="text-2xl font-bold text-white">$6.66<span className="text-zinc-500 text-lg font-medium">/month</span></span>
                        </div>
                        <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold cursor-pointer hover:bg-zinc-200 transition-colors">
                            Let&apos;s build it
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 min-h-[500px]">

                    {/* Card 1: Main Deployment (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 md:row-span-2 bg-gradient-to-t from-[#000] to-green-900 rounded-[32px] p-8 md:p-12 relative overflow-hidden group flex flex-col"
                    >

                        <div className="relative z-10 mb-8">
                            <h3 className="text-3xl font-bold mb-4">Build. Ship. Scale.</h3>
                            <p className="text-zinc-400 text-lg max-w-md">
                                Experience the developer experience of the future. Just push code and we take care of the rest. Similar to Vercel or AWS Amplify, but on your terms.
                            </p>
                        </div>

                        {/* Deployment Visual */}
                        <div className="mt-auto relative w-full h-64 bg-gradient-to-t from-[#000] to-[#000] rounded-xl overflow-hidden shadow-2xl">
                            <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                                </div>
                                <div className="mx-auto text-xs font-mono text-zinc-500">xcloud-deploy-pipeline</div>
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

                            {/* Floating Icons */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute right-8 bottom-8 p-3 rounded-xl bg-black border border-white/10 shadow-xl"
                            >
                                <SimpleIcon icon={siReact} className="w-8 h-8 text-[#61DAFB]" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Card 2: Framework Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-black rounded-[32px] p-8 flex flex-col justify-between group hover:bg-transparent transition-colors"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400">
                                <Globe className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Any Framework</h3>
                            <p className="text-zinc-400 text-sm">
                                Zero-config deployments for modern frameworks.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-4">
                            <div className="p-3 bg-black rounded-lg border border-white/10 hover:border-white/10 transition-colors" title="Next.js">
                                <SimpleIcon icon={siNextdotjs} className="w-6 h-6 text-white" />
                            </div>
                            <div className="p-3 bg-black rounded-lg border border-white/10 hover:border-white/10 transition-colors" title="Vite">
                                <SimpleIcon icon={siVite} className="w-6 h-6 text-[#646CFF]" />
                            </div>
                            <div className="p-3 bg-black rounded-lg border border-white/10 hover:border-white/10 transition-colors" title="Vue">
                                <SimpleIcon icon={siVuedotjs} className="w-6 h-6 text-[#4FC08D]" />
                            </div>
                            <div className="p-3 bg-black rounded-lg border border-white/10 hover:border-white/10 transition-colors" title="Angular">
                                <SimpleIcon icon={siAngular} className="w-6 h-6 text-[#DD0031]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Git Integration */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-black rounded-[32px] p-8 flex flex-col justify-between group hover:bg-transparent transition-colors"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4 text-pink-400">
                                <GitBranch className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Git Integrated</h3>
                            <p className="text-zinc-400 text-sm">
                                Connect your repo. Every push creates a preview deployment.
                            </p>
                        </div>

                        <div className="mt-6 flex items-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-xs font-semibold hover:bg-white/90 transition-colors">
                                <SimpleIcon icon={siGithub} className="w-4 h-4" />
                                <span>Connect</span>
                            </button>
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
                                <SimpleIcon icon={siGitlab} className="w-4 h-4 text-[#FC6D26]" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

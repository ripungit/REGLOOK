"use client";

import { motion, useTime, useTransform } from "framer-motion";
import { ArrowRight, Zap, Globe, Cpu } from "lucide-react";
import { siNextdotjs, siVite, siVuedotjs, siAngular } from 'simple-icons/icons';
import Link from "next/link";

export const XCloudHero = () => {
    const time = useTime();
    const rotate = useTransform(time, [0, 20000], [0, 360], { clamp: false });

    // Dynamic box shadow colors for the glow effect - Blue/green/green theme for xCloud
    const glowColors = {
        blue: "rgba(99, 102, 241, 1)", // blue-500
        green: "rgba(0, 255, 13, 1)",   // green-400
        purple: "rgba(168, 85, 247, 1)", // Purple-500
    };

    const getBoxShadow = (color: string) => `
        inset 0 40px 80px ${color.replace("1)", "0.6)")},
        inset 0 40px 80px ${color.replace("1)", "0.6)")},
        inset 0 40px 80px ${color.replace("1)", "0.6)")},
        inset 0 90px 160px ${color.replace("1)", "0.6)")},
        inset 0 160px 300px ${color.replace("1)", "0.4)")},
        inset 0 260px 520px ${color.replace("1)", "0.2)")}
    `;

    return (
        <div className="relative w-full min-h-[85vh] bg-[#000] text-white flex items-center justify-center overflow-hidden pt-24 pb-12">

            {/* Background Glow Effect */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* The Glow Sphere */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-55%" }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: "-50%",
                        y: "-55%",
                        boxShadow: [
                            getBoxShadow(glowColors.green),
                        ]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeOut",
                        boxShadow: {
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }
                    }}
                    className="
                        absolute left-1/2
                        top-0
                        md:top-[-30%]
                        w-[260%] md:w-[120%]
                        aspect-square
                        rounded-full
                        bg-black
                        overflow-hidden
                    "
                    style={{
                        maskImage: "linear-gradient(to top, black 40%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to top, black 40%, transparent 100%)",
                    }}
                >
                    {/* Inner bloom - green/Blue tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-black to-transparent opacity-100" />
                </motion.div>

                {/* Satellite Orbit */}
                {/* <motion.div
                    style={{ rotate }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ opacity: { duration: 1.2, delay: 0.5 } }}
                    className="
                        pointer-events-none
                        absolute left-1/2 top-0
                        md:top-[-30%]
                        -translate-x-1/2 -translate-y-[55%]
                        w-[260%] md:w-[120%]
                        aspect-square
                        rounded-full
                    "
                >
                    <div className="absolute inset-0 rounded-full border border-white/5" />

                    <div className="absolute bottom-[1.5%] left-1/2 -translate-x-1/2">
                        <div className="relative flex items-center gap-[2px]">
                            <div className="w-4 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-sm opacity-90" />
                            <div className="w-2 h-2 rounded-sm bg-gradient-to-b from-white to-green-300 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                            <div className="w-4 h-1 bg-gradient-to-l from-green-400 to-green-600 rounded-sm opacity-90" />
                        </div>
                        <div className="absolute inset-0 blur-md bg-white/20 -z-10" />
                    </div>
                </motion.div> */}
            </div>


            <div className="w-full max-w-[1150px] mx-auto px-6 flex flex-col items-center justify-center relative z-10">

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center mt-25 text-center mx-auto max-w-6xl"
                >

                    <h1 className="text-3xl md:text-[5rem] font-semibold tracking-tight leading-[1.1] mb-6 text-white text-shadow-lg">
                        Build without limits.
                        <br /><span className="text-transparent ml-2 md:ml-5 bg-clip-text bg-gradient-to-r from-green-500 via-white to-green-500 animate-gradient-x">
                            Deploy globally.
                        </span>
                    </h1>

                    <p className="text-sm md:text-lg text-white font-normal md:font-semibold mt-5 mb-10 max-w-2xl mx-auto leading-relaxed text-center">
                        Instant deployments for Next.js, Vite, and full-stack apps.
                        <br className="hidden md:block" />Zero config. Infinite scaling. Starting at <span className="text-white font-bold">$6.66/month</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                        <Link
                            href="#deploy"
                            className="group bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            Start Deploying
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/docs"
                            className="px-8 py-4 rounded-full backdrop-blur-sm font-semibold border border-white/10 hover:bg-white/5 transition-colors text-center text-zinc-300 hover:text-white"
                        >
                            Read Documentation
                        </Link>
                    </div>

                    {/* 
                    <div className="mt-12 flex flex-wrap font-semibold justify-center items-center gap-6 text-sm text-white">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-white" />
                            <span>Global Edge Network</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-white rounded-full" />
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-white" />
                            <span>Instant Invalidation</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-white rounded-full" />
                        <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-white" />
                            <span>Auto-Scaling</span>
                        </div>
                    </div> */}

                    {/* Supported Frameworks */}
                    <div className="mt-16 flex flex-col items-center gap-5 pt-10 border-t border-white/5 w-full max-w-3xl">
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Gravity for Modern Frameworks</span>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            {[
                                { name: "Next.js", icon: siNextdotjs },
                                { name: "Vite", icon: siVite },
                                { name: "Vue", icon: siVuedotjs },
                                { name: "Angular", icon: siAngular },
                            ].map((fw) => (
                                <div key={fw.name} className="flex items-center gap-3 group cursor-default">
                                    <div className="p-2.5 rounded-full bg-black  transition-colors">
                                        <svg
                                            role="img"
                                            viewBox="0 0 24 24"
                                            className="w-6 h-6 transition-transform group-hover:scale-150"
                                            style={{ fill: fw.name === "Next.js" ? "white" : fw.name === "Angular" ? "#DD0031" : `#${fw.icon.hex}` }}

                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>{fw.name}</title>
                                            <path d={fw.icon.path} />
                                        </svg>
                                    </div>
                                    <span className="font-semibold text-sm text-zinc-400 group-hover:text-white transition-colors">{fw.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

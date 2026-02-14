"use client";

import { motion, useTime, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Shield, MonitorPlay } from "lucide-react";
import Link from "next/link";

export const HostingHero = () => {
    const time = useTime();
    const rotate = useTransform(time, [0, 20000], [0, 360], { clamp: false });

    // Dynamic box shadow colors for the glow effect
    const glowColors = {
        indigo: "rgba(255, 93, 93, 1)",
        cyan: "rgba(34, 211, 238, 1)",
        purple: "rgba(168, 85, 247, 1)",
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

            {/* Background Glow Effect - Adapted from Main Hero */}
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
                            getBoxShadow(glowColors.indigo),
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
                    {/* Inner bloom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-zinc-900/40 to-transparent opacity-100" />
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
                            <div className="w-4 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-sm opacity-90" />
                            <div className="w-2 h-2 rounded-sm bg-gradient-to-b from-white to-red-300 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                            <div className="w-4 h-1 bg-gradient-to-l from-red-400 to-red-600 rounded-sm opacity-90" />
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
                    className="flex flex-col items-center text-center mx-auto max-w-6xl"
                >


                    <h1 className="text-3xl md:text-[5rem] mt-32 font-semibold tracking-tight leading-[1.1] mb-6 text-white text-shadow-lg">
                        Escape slow hosting.
                        <span className="text-transparent ml-5 bg-clip-text bg-gradient-to-r from-red-300 via-white to-red-300 animate-gradient-x">
                            <br />Enter orbit.
                        </span>
                    </h1>

                    <p className="text-sm md:text-lg text-white font-normal md:font-semibold mt-5 mb-10 max-w-lg mx-auto leading-relaxed text-center">
                        Deploy your ideas on our infrastructure designed for gravity-defying speed and scale.
                        Starting at just <span className="text-white font-bold">$1.46/month</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                        <Link
                            href="#plans"
                            className="group bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            Start Building
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/domain-search"
                            className="px-8 py-4 rounded-full backdrop-blur-sm font-semibold border border-white/10 hover:bg-white/5 transition-colors text-center text-zinc-300 hover:text-white"
                        >
                            Find a Domain
                        </Link>
                    </div>

                    <div className="mt-12 flex flex-wrap font-semibold justify-center items-center gap-6 text-sm text-white">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-white" />
                            <span>99.99% Uptime</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-white rounded-full" />
                        <div className="flex items-center gap-2">
                            <MonitorPlay className="w-4 h-4 text-white" />
                            <span>24/7 Live Support</span>
                        </div>
                    </div>
                </motion.div>


            </div>
        </div>
    );
};

"use client";

import { motion, useTime, useTransform } from "framer-motion";
import { ArrowRight, Mail, Shield, UserCheck, Lock } from "lucide-react";

import Link from "next/link";

export const EmailHero = () => {
    const time = useTime();
    const rotate = useTransform(time, [0, 20000], [0, 360], { clamp: false });

    const glowColors = {
        indigo: "rgba(87, 87, 255, 1)",   // indigo-400
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
                    {/* Inner bloom - indigo tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 via-black to-transparent opacity-100" />
                </motion.div>

                {/* Satellite Orbit */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    transition={{
                        opacity: { duration: 1.2, delay: 1 },
                        rotate: { duration: 28, repeat: Infinity, ease: "linear" }
                    }}
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
                            <div className="w-4 h-1 bg-gradient-to-r from-indigo-400 to-zinc-600 rounded-sm opacity-90" />

                            <div className="w-2 h-2 rounded-sm bg-gradient-to-b from-white to-zinc-300 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

                            <div className="w-4 h-1 bg-gradient-to-l from-indigo-400 to-zinc-600 rounded-sm opacity-90" />
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
                    className="flex flex-col items-center mt-32 text-center mx-auto max-w-6xl"
                >

                    <h1 className="text-3xl md:text-[5rem] font-semibold tracking-tight leading-[1.1] mb-6 text-white text-shadow-lg">
                        Professional email
                        <br /><span className="text-transparent ml-2 md:ml-0 bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-indigo-400 animate-gradient-x">
                            for your brand.
                        </span>
                    </h1>

                    <p className="text-sm md:text-lg text-white font-normal md:font-semibold mt-5 mb-10 max-w-2xl mx-auto leading-relaxed text-center">
                        Secure, reliable, and ad-free email hosting.
                        <br />Build trust with every email you send. Starting at <span className="text-white font-bold">$1.00/month</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                        <Link
                            href="#plans"
                            className="group bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 rounded-full backdrop-blur-sm font-semibold border border-white/10 hover:bg-white/5 transition-colors text-center text-zinc-300 hover:text-white"
                        >
                            Contact Sales
                        </Link>
                    </div>


                    <div className="mt-12 flex flex-wrap font-semibold justify-center items-center gap-6 text-sm text-white">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-white" />
                            <span>Spam Protection</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-white rounded-full" />
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-white" />
                            <span>End-to-End Encryption</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 bg-white rounded-full" />
                        <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-white" />
                            <span>99.9% Uptime</span>
                        </div>
                    </div>


                </motion.div>
            </div>
        </div>
    );
};

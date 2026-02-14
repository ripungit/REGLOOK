"use client";

import { motion, useTime, useTransform } from "framer-motion";
import { Search, Globe, Server, Cpu, Zap, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Hero = () => {
    const time = useTime();
    const rotate = useTransform(time, [0, 20000], [0, 360], { clamp: false });
    const router = useRouter();
    const [query, setQuery] = useState("");

    const glowColors = {
        green: "rgb(255, 0, 0)",
    };

    const getBoxShadow = (color: string) => `
        inset 0 40px 80px ${color.replace("1)", "0.6)")},
        inset 0 40px 80px ${color.replace("1)", "0.6)")},
        inset 0 40px 80px ${color.replace("1)", "0.6)")},
        inset 0 90px 160px ${color.replace("1)", "0.6)")},
        inset 0 160px 300px ${color.replace("1)", "0.4)")},
        inset 0 260px 520px ${color.replace("1)", "0.2)")}
    `;

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/domain-search/?query=${encodeURIComponent(query.trim())}&tab=domains`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="relative w-full min-h-[85vh] md:min-h-screen bg-[#000] text-white flex items-center justify-center overflow-hidden pt-24 md:pt-5 pb-12">

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
                    {/* Inner bloom - green tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-800/30 via-black to-transparent opacity-100" />
                </motion.div>


            </div>


            <div className="w-full max-w-[1150px] mx-auto px-6 flex flex-col items-center justify-center relative z-10">

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center mt-12 md:mt-20 text-center mx-auto max-w-6xl w-full px-4 md:px-0"
                >
                    <div className="mt-4 md:mt-8 inline-flex border mb-6 md:mb-5 border-white/5 bg-transparent items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 rounded-none backdrop-blur-md transition-colors cursor-default">
                        <span className="text-white text-[10px] sm:text-xs mt-1 md:mt-0 font-semibold tracking-wider">Domain services, via</span>
                        <img src="/partner/hover.svg" alt="Hover" className="h-3 sm:h-4 opacity-100" />
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-[4.5rem] font-semibold tracking-tight leading-[1.1] mb-8 md:mb-6 text-white text-shadow-lg">
                        Fast, reliable hosting
                        <br /><span className="text-white animate-gradient-x">
                            that scales with you.
                        </span>
                    </h1>
                    <p className="text-sm md:text-lg text-white font-normal md:font-semibold mt-0 mb-0 max-w-2xl mx-auto leading-relaxed">
                        From managed app hosting to full virtual machines. <br className="hidden md:block" />Reglook gives you a private cloud on your own infrastructure.
                    </p>



                    {/* Search Bar / CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full max-w-[550px] mt-8 md:mt-15 flex flex-col items-stretch gap-4 mb-8 md:mb-6"
                    >
                        {/* Search */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Find your right domain..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full h-14 md:h-16 rounded-full bg-transparent font-normal md:font-semibold backdrop-blur-md border-2 border-white/10 px-5 md:px-6 pr-24 md:pr-28 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/20 text-base shadow-lg shadow-emerald-500/5 transition-all focus:shadow-emerald-500/20"
                            />

                            <button
                                onClick={handleSearch}
                                className="absolute right-1.5 mr-2 top-1/2 -translate-y-1/2 h-9 md:h-10 px-4 md:px-6 rounded-full bg-white text-black font-bold hover:bg-white/80 transition text-sm md:text-base"
                            >
                                Search
                            </button>

                        </div>


                    </motion.div>
                    {/* CTA Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
                        <Link
                            href="/hosting"
                            className="group h-12 md:h-14 w-full sm:w-auto px-8 text-white backdrop-blur-md font-semibold transition-all hover:text-white hover:bg-white/5 flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
                        >
                            Start hosting
                            <ArrowRight
                                size={18}
                                className="transition-transform mt-1 duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="/business-email"
                            className="group h-12 md:h-14 w-full sm:w-auto px-8 text-white backdrop-blur-md font-semibold transition-all hover:text-white hover:bg-white/5 flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
                        >
                            Get professional email
                            <ArrowRight
                                size={18}
                                className="transition-transform mt-1 duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default Hero;

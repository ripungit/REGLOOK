"use client";

import { motion, useTime, useTransform } from "framer-motion";
import { Search, Globe } from "lucide-react";
import Link from "next/link";

export const DomainsHero = () => {
    const time = useTime();
    const rotate = useTransform(time, [0, 20000], [0, 360], { clamp: false });

    const glowColors = {
        orange: "rgba(249, 115, 22, 1)",   // orange-500
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
        <div className="relative w-full min-h-screen bg-[#000] text-white flex items-center justify-center overflow-hidden pb-12">

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
                            getBoxShadow(glowColors.orange),
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
                    {/* Inner bloom - orange tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-black to-transparent opacity-100" />
                </motion.div>


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
                        Your perfect name
                        <br /><span className="text-transparent ml-2 md:ml-0 bg-clip-text bg-gradient-to-r from-orange-400 via-white to-orange-400 animate-gradient-x">
                            starts here.
                        </span>
                    </h1>

                    <p className="text-sm md:text-lg text-white font-normal md:font-semibold mt-5 mb-10 max-w-2xl mx-auto leading-relaxed text-center">
                        Search, register, and manage <br className="block md:hidden" />your domains with ease.
                        {/* Simple, private domain services via - {" "}
                        <span className="inline-flex items-center gap-2 align-middle opacity-100">
                            <img
                                src="/partner/hover.svg"
                                alt="Hover"
                                className="h-4 mb-1 w-auto relative top-[1px]"
                            />
                        </span> */}
                    </p>



                    {/* Domain Search + Hosting CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full max-w-[550px] flex flex-col lg:flex-row items-stretch gap-4 mb-6 mt-0 md:mt-0"
                    >
                        {/* Domain Search */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Find your perfect domain..."
                                // value={query}
                                // onChange={(e) => setQuery(e.target.value)}
                                // onKeyDown={handleKeyDown}
                                className="w-full h-14 md:h-14 rounded-full bg-transparent backdrop-blur-md border border-white/15 px-4 md:px-6 pr-28 md:pr-32 text-white placeholder:text-zinc-400 placeholder:text-semibold font-medium focus:outline-none focus:ring-2 focus:ring-white/20 text-sm md:text-base"
                            />
                            <button
                                // onClick={handleSearch}
                                className="absolute right-1.5 top-2.5 md:right-2 md:top-2 h-9 md:h-10 px-4 md:px-6 rounded-full bg-[#fff] cursor-pointer text-black font-semibold hover:bg-white/70 hover:text-black transition text-sm md:text-base"
                            >
                                Search
                            </button>
                        </div>
                    </motion.div>
                    <div className="mt-8 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-transparent backdrop-blur-md transition-colors cursor-default">
                        <span className="text-white text-xs font-semibold tracking-wider">Domain services, via</span>
                        <img src="/partner/hover.svg" alt="Hover" className="h-4 opacity-100" />
                    </div>
                </motion.div>
            </div>
        </div >
    );
};

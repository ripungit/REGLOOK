"use client";

import { motion, useTime, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const PricingHero = () => {
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
                    className="flex flex-col items-center mt-12 text-center mx-auto max-w-6xl"
                >

                    <h1 className="text-3xl md:text-[5rem] font-semibold tracking-tight leading-[1.1] mb-6 text-white text-shadow-lg">
                        Build Anything.
                        <br /><span className="text-transparent ml-2 md:ml-0 bg-clip-text bg-gradient-to-r from-orange-400 via-white to-orange-400 animate-gradient-x">
                            Know the Cost.
                        </span>
                    </h1>

                    <p className="text-sm md:text-lg text-white font-normal md:font-semibold mt-5 mb-10 max-w-2xl mx-auto leading-relaxed text-center">
                        Simple, transparent pricing for every <br className="block md:hidden" />stage of your journey.
                    </p>

                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: "smooth",
                    });
                }}
            >
                <span className="text-xs text-neutral-500 font-medium tracking-widest uppercase">
                    Your Stack
                </span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                    <ChevronDown className="w-5 h-5 text-neutral-500" />
                </motion.div>
            </motion.div>
        </div >
    );
};

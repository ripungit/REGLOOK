"use client"

import { motion } from "framer-motion"

export function SecuritySection() {
    return (
        <section className="relative w-full overflow-hidden bg-[#0022d6] min-h-[600px] flex items-center">
            {/* Background Gradient Effect - Simulating the studio lighting */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0022d6] via-[#1a3bf0] to-[#0022d6]" />
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#4a6aff]/20 to-transparent blur-3xl" />

            <div className="mx-auto max-w-[1200px] w-full px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="max-w-xl py-12 lg:py-0">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
                        >
                            Security as<br />standard
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed mb-10 max-w-lg"
                        >
                            Your domains, products, and data are safeguarded with built-in protection, so you can focus on growth, not risk.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#2b4eff] hover:bg-[#3d5eff] text-white px-8 py-3 rounded-full font-semibold text-sm transition-colors shadow-lg shadow-blue-900/20"
                        >
                            See measures
                        </motion.button>
                    </div>

                    {/* Right Animation */}
                    <div className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center">
                        {/* Abstract background glow */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-[300px] h-[300px] bg-blue-500/30 rounded-full blur-[100px]"
                            />
                        </div>

                        {/* Security Shield Animation Container */}
                        <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                            {/* Rotating Rings */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0  rounded-full"
                                    style={{ borderStyle: i % 2 === 0 ? "solid" : "dashed" }}
                                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                                    transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                                >

                                </motion.div>
                            ))}

                            {/* Center Shield/Lock */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="relative w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)] border border-white/20 transform rotate-45 backdrop-blur-md">
                                    <div className="absolute inset-0 bg-white/10 rounded-2xl" />

                                    {/* Inner Icon */}
                                    <motion.div
                                        className="-rotate-45 text-white"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="64"
                                            height="64"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="drop-shadow-lg"
                                        >
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </motion.div>


                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

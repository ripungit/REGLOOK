"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Mail, Lock, Server, Pause, Play, MousePointer2 } from "lucide-react"

const steps = [
    {
        id: 0,
        title: "Choose",
        description: "Select the extra products you need alongside your domain.",
        features: [
            { icon: Server, label: "Hosting" },
            { icon: Mail, label: "Email" },
            { icon: Lock, label: "SSL" }
        ]
    },
    {
        id: 1,
        title: "Connect",
        description: "Seamlessly link your domain to the services you use every day.",
        features: [
            { icon: Check, label: "DNS Setup" },
            { icon: Check, label: "Auto-Config" },
            { icon: Check, label: "Integration" }
        ]
    },
    {
        id: 2,
        title: "Configure",
        description: "Fine-tune your settings with our advanced yet simple control panel.",
        features: [
            { icon: Check, label: "Records" },
            { icon: Check, label: "Forwarding" },
            { icon: Check, label: "Security" }
        ]
    },
    {
        id: 3,
        title: "Create",
        description: "Start building your online presence immediately after purchase.",
        features: [
            { icon: Check, label: "Website" },
            { icon: Check, label: "Store" },
            { icon: Check, label: "Blog" }
        ]
    }
]

export function ProcessSteps() {
    const [activeStep, setActiveStep] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    // Auto-advance steps
    useEffect(() => {
        if (isPaused) return

        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [isPaused])

    return (
        <section className="bg-black py-16 lg:py-24 relative overflow-hidden">
            <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple Setup.</h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Get your domain up and running in minutes with our streamlined process.
                    </p>
                </div>

                <div className="flex flex-col gap-12 lg:gap-16">

                    {/* Mobile: Top Visual Section (Reordered for Mobile) */}
                    <div className="lg:hidden w-full flex flex-col items-center">
                        <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center mb-8">
                            {/* Mobile Visual Card */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative z-10 w-full"
                                >
                                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[300px] flex flex-col justify-center shadow-2xl">
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                                            <span className="text-lg font-medium text-white tracking-wide">mydomain.com</span>
                                        </div>

                                        <div className="space-y-4 relative pl-3">
                                            <div className="absolute left-[4px] top-2 bottom-4 w-[1px] bg-white/10" />
                                            {steps[activeStep].features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-4 h-[1px] bg-white/20" />
                                                    <feature.icon className="h-4 w-4 text-white" />
                                                    <span className="text-white/80 text-sm">{feature.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Mobile: Horizontal Indicators & Text */}
                        <div className="w-full max-w-[340px]">
                            <div className="flex gap-2 mb-6 justify-center">
                                {steps.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveStep(idx)}
                                        className={`h-1 rounded-full transition-all duration-300 ${activeStep === idx ? "w-8 bg-white" : "w-2 bg-white/20"
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="text-center">
                                <motion.h3
                                    key={`t-${activeStep}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-2xl font-bold text-white mb-2"
                                >
                                    {steps[activeStep].title}
                                </motion.h3>
                                <motion.p
                                    key={`d-${activeStep}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-white/60 text-base"
                                >
                                    {steps[activeStep].description}
                                </motion.p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop: New Layout matching Reference */}
                    <div className="hidden lg:flex w-full min-h-[600px] items-center">

                        {/* Centered Container for 2 Cols */}
                        <div className="w-full grid grid-cols-12 gap-0 items-center">

                            {/* Left: Vertically Stacked Steps */}
                            <div className="col-span-5 pl-12">
                                <div className="flex flex-col gap-12 relative pl-8 border-l border-white/10">
                                    {/* Active Indicator Line */}
                                    <motion.div
                                        className="absolute left-[-2px] top-0 w-[3px] bg-blue-500 rounded-full"
                                        animate={{ top: `${activeStep * 25}%`, height: '25%' }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />

                                    {steps.map((step, index) => (
                                        <div
                                            key={step.id}
                                            onClick={() => setActiveStep(index)}
                                            className="cursor-pointer group flex flex-col justify-center min-h-[80px] transition-opacity duration-500"
                                            style={{ opacity: activeStep === index ? 1 : 0.4 }}
                                        >
                                            <span className="text-xs font-bold text-white/40 mb-2 uppercase tracking-wide group-hover:text-white/60 transition-colors">
                                                Step 0{index + 1}
                                            </span>
                                            <h3 className={`text-3xl font-bold text-white mb-2 transition-transform duration-300 ${activeStep === index ? 'opacity-100 translate-x-0' : 'opacity-60 -translate-x-2'}`}>
                                                {step.title}
                                            </h3>
                                            <AnimatePresence>
                                                {activeStep === index && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="text-white/60 text-base leading-relaxed max-w-sm"
                                                    >
                                                        {step.description}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Floating Card Visual */}
                            <div className="col-span-7 flex justify-center items-center relative h-[450px]">
                                {/* Background Blue Glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeStep}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.05, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute z-10 p-1 rounded-[30px] bg-gradient-to-b from-blue-500/30 to-blue-600/10 backdrop-blur-xl border border-white/10 shadow-2xl"
                                    >
                                        <div className="bg-[#000] rounded-[28px] p-8 w-[350px] md:w-[400px] h-[350px] flex flex-col items-center justify-center relative overflow-hidden">
                                            {/* Inner ambient light */}

                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                                                <span className="text-white/80 font-medium text-sm">mydomain.com</span>
                                            </div>

                                            <div className="flex gap-4 mb-8">
                                                {steps[activeStep].features.map((feature, i) => (
                                                    <div key={i} className="flex flex-col items-center gap-2 group/icon">
                                                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/icon:bg-blue-500/20 group-hover/icon:border-blue-500/50 transition-all duration-300">
                                                            <feature.icon className="w-5 h-5 text-white/70 group-hover/icon:text-blue-400" />
                                                        </div>
                                                        <span className="text-[10px] text-white/40">{feature.label}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <button className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wide text-sm shadow-lg transform active:scale-95 transition-all">
                                                {steps[activeStep].title}
                                            </button>

                                            {/* Cursor Animation */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 20, y: 20 }}
                                                animate={{ opacity: 1, x: 0, y: 0 }}
                                                transition={{ delay: 0.5, duration: 0.5 }}
                                                className="absolute bottom-12 right-16 pointer-events-none"
                                            >
                                                <MousePointer2 className="h-6 w-6 text-white fill-white drop-shadow-lg" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Controls */}
                                <div className="absolute bottom-0 right-0">
                                    <button
                                        onClick={() => setIsPaused(!isPaused)}
                                        className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                                    >
                                        {isPaused ? <Play className="h-4 w-4" fill="currentColor" /> : <Pause className="h-4 w-4" fill="currentColor" />}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Paperclip, Minimize2, Brain, MessageCircleCode, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatWidget() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [view, setView] = React.useState<"form" | "chat">("form")
    const [formData, setFormData] = React.useState({ name: "", email: "" })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate "submitting details"
        if (formData.email) {
            setView("chat")
        }
    }

    // Reset view when closing
    React.useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => setView("form"), 300)
            return () => clearTimeout(t)
        }
    }, [isOpen])

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="w-[380px] h-[600px] bg-[#000]/20 backdrop-blur-xl border-2 border-white/5 rounded-3xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-5 flex justify-between items-center bg-[#000]/20 backdrop-blur-xl">
                            <div className="flex items-center gap-3">

                                <div>
                                    <h3 className="text-white font-bold text-xl tracking-wide">Via AI</h3>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 relative overflow-hidden bg-black/40">
                            <AnimatePresence mode="wait">
                                {view === "form" ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="p-8 h-full flex flex-col justify-center space-y-8"
                                    >
                                        <div className="text-center space-y-3-10">

                                            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">Your intelligent <br />support assistant.</h2>
                                            <p className="text-white/50 text-sm leading-relaxed max-w-[260px] mx-auto">
                                                Please provide your details to connect with Via AI support.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
                                            <div className="space-y-1.5">
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all text-sm"
                                                    placeholder="Name (Optional)"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all text-sm"
                                                    placeholder="Email address"
                                                />
                                            </div>
                                            <Button type="submit" className="w-full bg-white hover:bg-white/90 text-black font-semibold py-6 rounded-full border-t border-white/10">
                                                Start Conversation
                                            </Button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="chat"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex flex-col h-full"
                                    >
                                        {/* Messages Area */}
                                        <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
                                            <div className="flex justify-start">
                                                <div className="flex gap-3 max-w-[85%]">
                                                    <div className="space-y-1">
                                                        <div className="bg-indigo-700 border border-white/5 text-white/90 px-4 py-3 rounded-2xl rounded-tl-none text-sm leading-relaxed">
                                                            Hello {formData.name}, I am Via AI. How can I assist you with your domain or hosting today?
                                                        </div>
                                                        <span className="text-[10px] text-white/30 pl-1">Just now</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Input Area */}
                                        <div className="p-4 border-t border-white/5 bg-[#000]/20 backdrop-blur-xl">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Ask Via AI anything..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-14 py-3.5 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
                                                />
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                                    <button className="p-2 text-white/30 hover:text-white transition-colors">
                                                        <Paperclip size={18} />
                                                    </button>
                                                    <button className="p-2 bg-white hover:bg-white/80 rounded-full text-black transition-all">
                                                        <Send size={16} className="mr-0.5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2.5 text-center flex items-center justify-center gap-1.5 opacity-100">
                                                <p className="text-[10px] font-medium tracking-wide">To connect with a live agent say "speak to a live agent"</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-16 h-16 rounded-full bg-[#0B0C10] text-white flex items-center justify-center overflow-hidden"
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-indigo-700 group-hover:bg-indigo-700 transition-colors duration-500" />

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            <Minimize2 size={24} className="text-white/80" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            <MessageCircle size={28} className="text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}

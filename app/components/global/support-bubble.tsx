"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, X, Paperclip, Send, Hexagon, MessageCircleHeart, MessageCircleIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SupportBubble() {
    const [isOpen, setIsOpen] = useState(false);
    const [isChatStarted, setIsChatStarted] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-[#000]/30 backdrop-blur-sm md:hidden"
                            style={{ zIndex: -1 }}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="w-[calc(100vw-32px)] sm:w-[380px] h-[500px] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl"
                        >
                            {/* Conditional Rendering: Welcome Form vs Chat Interface */}
                            {!isChatStarted ? (
                                <div className="h-full flex flex-col">
                                    {/* Header */}
                                    <div className="relative bg-[#fff] p-6 pb-2">
                                        <div className="absolute right-4 top-4">
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="rounded-full p-1 text-black/70 hover:bg-black/5 hover:text-black"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="mb-4">
                                            <Link href="/" className="group relative flex items-center gap-2 overflow-hidden w-fit">
                                                <Image
                                                    src="/logo/reglook-logo.svg"
                                                    alt="Reglook Logo"
                                                    width={160}
                                                    height={50}
                                                    className="w-40 mb-2 h-auto invert"
                                                    priority
                                                />
                                            </Link>
                                        </div>

                                        <h2 className="text-2xl font-semibold text-black">Hello,</h2>

                                        <div className="mt-4 text-sm text-black/90">
                                            <p>Welcome to our live chat!</p>
                                            <p className="mt-1 mb-5">
                                                <span className="font-bold underline cursor-pointer hover:text-black">Log in</span> if you have an account, or<br />provide your details.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content / Form */}
                                    <div className="p-6 pt-2">
                                        <form className="space-y-4" onSubmit={(e) => {
                                            e.preventDefault();
                                            setIsChatStarted(true);
                                        }}>
                                            <div>
                                                <label className="mb-1.5 block text-sm font-medium text-black/80">
                                                    Name <span className="text-xs text-black/50">Optional</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your name here"
                                                    className="w-full rounded-lg border border-black/10 bg-gray-50 px-4 py-2.5 text-sm text-black placeholder-black/40 focus:border-black/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black/5"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-1.5 block text-sm font-medium text-white/80">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email here"
                                                    className="w-full rounded-lg border border-black/10 bg-gray-50 px-4 py-2.5 text-sm text-black placeholder-black/40 focus:border-black/20 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black/5"
                                                />
                                            </div>

                                            <div className="pt-2">
                                                <button
                                                    type="submit"
                                                    className="w-full rounded-full bg-black py-3 text-sm font-medium text-white shadow-lg shadow-black/20 transition-transform hover:scale-[1.02] hover:bg-gray-900 active:scale-[0.98]"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Footer Input (Disabled state visual) */}
                                    {/* <div className="border-t border-white/10 bg-black/20 p-4">
                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                readOnly
                                                placeholder="What can we help you with?"
                                                className="w-full bg-transparent pr-10 text-sm text-white placeholder-white/40 focus:outline-none cursor-default"
                                            />
                                            <div className="absolute right-0 flex items-center gap-2 text-white/50">
                                                <button className="hover:text-white cursor-default">
                                                    <Paperclip className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            ) : (
                                <div className="flex flex-col h-full">
                                    {/* Chat Header */}
                                    <div className="flex items-center justify-between border-b border-black/5 bg-white p-4">
                                        <div className="flex items-center gap-3">
                                            <Link href="/" className="group relative flex items-center gap-2 overflow-hidden w-fit">
                                                <Image
                                                    src="/logo/reglook-logo.svg"
                                                    alt="Reglook Logo"
                                                    width={140}
                                                    height={44}
                                                    className="w-36 h-auto invert"
                                                    priority
                                                />
                                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/60 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="rounded-full p-2 text-black hover:bg-black/5 hover:text-black transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>

                                    {/* Chat Messages Area */}
                                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent">
                                        <div className="flex gap-3">
                                            <div className="flex flex-col gap-1 max-w-[80%]">
                                                <span className="text-xs text-black/40 ml-1">Ripun • Just now</span>
                                                <div className="rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-black/90 border border-black/5 shadow-sm">
                                                    Hello! How can we help you today?
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chat Input Area */}
                                    <div className="border-t border-black/5 bg-white p-4">
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                // Handle message sending logic here
                                            }}
                                            className="relative flex items-center gap-2"
                                        >
                                            <button type="button" className="text-black/40 hover:text-black transition-colors">
                                                <Paperclip className="h-5 w-5" />
                                            </button>
                                            <input
                                                type="text"
                                                placeholder="Write a message..."
                                                className="flex-1 bg-transparent px-2 py-2 text-sm text-black placeholder-black/40 focus:outline-none"
                                                autoFocus
                                            />
                                            <button
                                                type="submit"
                                                className="rounded-full bg-black p-2 text-white shadow-lg shadow-black/20 hover:bg-gray-900 cursor-pointer transition-colors"
                                            >
                                                <Send className="h-4 w-4" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative backdrop-blur-sm flex h-16 min-w-[170px] items-center justify-between gap-4 rounded-[18px] px-4 transition-all hover:scale-[1.03] active:scale-95 focus:outline-none"
            >
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-[18px] ring-1 ring-white/10" />

                {/* Left Label */}
                <div className="relative z-10 flex flex-col text-left leading-tight">
                    {/* <span className="text-[11px] font-medium text-white">
                        24/7
                    </span> */}
                    <span className="text-sm font-medium text-white">
                        Live Support
                    </span>
                </div>

                {/* Right Icon */}
                <div className="relative z-10 text-white">
                    {isOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <MessageCircleIcon className="h-8 w-8 fill-white/5" />
                    )}
                </div>
            </button>





        </div>
    );
}


function SharpHexagon({ className = "" }) {
    return (
        <svg
            viewBox="0 0 100 100"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* Subtle inner gradient */}
                <radialGradient id="sharpGlow" cx="50%" cy="45%" r="60%">
                    <stop offset="0%" stopColor="rgba(20,20,20,0.95)" />
                    <stop offset="70%" stopColor="rgba(40,40,40,0.9)" />
                    <stop offset="100%" stopColor="rgba(180,180,180,0.35)" />
                </radialGradient>
            </defs>

            {/* Main hexagon */}
            <polygon
                points="50 4 92 26 92 74 50 96 8 74 8 26"
                fill="url(#sharpGlow)"
            />
        </svg>
    )
}

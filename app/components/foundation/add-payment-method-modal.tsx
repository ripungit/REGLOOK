"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Search, ArrowRight, Building } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader } from "@/components/global/loader"

interface AddPaymentMethodModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PAYMENT_OPTIONS = [
    {
        category: "Cards",
        items: [
            {
                id: "card",
                label: "Credit or Debit Card",
                description: "Visa, Mastercard, Amex",
                icon: "/icons/visa.svg",
            },
        ],
    },
    {
        category: "Wallets",
        items: [
            {
                id: "paypal",
                label: "PayPal",
                description: "Connect your PayPal account",
                icon: "/icons/paypal.svg",
            },
            {
                id: "apple",
                label: "Apple Pay",
                description: "Fast and secure checkout",
                icon: "/icons/applepay.svg",
            },
            {
                id: "google",
                label: "Google Pay",
                description: "Pay with Google",
                icon: "/icons/googlepay.svg",
            },
        ],
    },
    {
        category: "Bank",
        items: [
            {
                id: "bank",
                label: "Bank Account",
                description: "ACH or Wire transfer",
                icon: null,
            },
        ],
    },
]

export function AddPaymentMethodModal({ open, setOpen }: AddPaymentMethodModalProps) {
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "unset"
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [open])

    const filtered = PAYMENT_OPTIONS.map(section => ({
        ...section,
        items: section.items.filter(item =>
            item.label.toLowerCase().includes(query.toLowerCase())
        ),
    })).filter(section => section.items.length)

    const handleSelect = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setOpen(false)
        }, 1200)
    }

    if (!mounted) return null

    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex justify-center pt-[14vh] px-4">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => !isLoading && setOpen(false)}
                    />

                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader size="lg" />
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 260, damping: 24 }}
                            className="relative w-full max-w-[460px] h-[600px] rounded-3xl bg-[#000] border border-white/5 shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="px-6 pt-6 pb-4 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-white">
                                    Add payment method
                                </h2>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Search */}
                            <div className="px-6 pb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                    <input
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        placeholder="Search payment methods"
                                        className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10"
                                    />
                                </div>
                            </div>

                            {/* List */}
                            <div className="px-6 pb-6 flex-1 overflow-y-auto space-y-6">
                                {filtered.map(section => (
                                    <div key={section.category}>
                                        <p className="mb-2 text-[11px] uppercase tracking-wider text-white/40">
                                            {section.category}
                                        </p>

                                        <div className="space-y-2">
                                            {section.items.map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={handleSelect}
                                                    className="group w-full flex items-center gap-4 p-4 rounded-2xl bg-[#111] hover:bg-[#161616] transition"
                                                >
                                                    {/* Icon */}
                                                    <div className="h-11 w-11 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                                                        <span className="text-white font-bold text-lg">$</span>
                                                    </div>

                                                    {/* Text */}
                                                    <div className="flex-1 text-left">
                                                        <p className="text-sm font-medium text-white">
                                                            {item.label}
                                                        </p>
                                                        <p className="text-xs text-white/40">
                                                            {item.description}
                                                        </p>
                                                    </div>

                                                    {/* Arrow */}
                                                    <ArrowRight
                                                        size={16}
                                                        className="text-white/40 opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </AnimatePresence>,
        document.body
    )
}

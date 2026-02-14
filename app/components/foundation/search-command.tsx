"use client"

import React, { useState, useMemo, useEffect } from "react"
import { createPortal } from "react-dom"
import { Search, User, Shield, CreditCard, Bell, Cloud, Lock, FileText, Smartphone, RefreshCw, Key, BookOpen, Globe, Server, Mail, Activity, Podcast, TrendingUp, Eye, Users, Plug, Code, Receipt, KeyRound, FileLock, Clock, Workflow, Zap, Brain, BarChart, Star, Heart, LayoutGrid, ArrowRight, Ghost, BarChart3 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { Loader } from "../global/loader"

interface SearchCommandProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ROUTE_MAPPING: Record<string, string> = {
    "domain-manager": "/foundation/domain-manager",
    "dns-manager": "/foundation/dns-manager",
    "domain-transfers": "/foundation/transfers-and-renewals",
    "domain-portfolio": "/foundation/domain-portfolio",
    "whois-privacy": "/foundation/whois-and-privacy",
    "seller-console": "/foundation/seller-console",
    "domain-listings": "/foundation/listings-manager",
    "hosting-manager": "/foundation/hosting-manager",
    "xcloud-hosting": "/foundation/xcloud-hosting",
    "vm-balancer": "/foundation/virtual-machine-balancer",
    "ssl-manager": "/foundation/ssl-manager",
    "infra-metrics": "/foundation/performance-metrics",
    "search-domains": "/domain-search?query=&tab=domains",
    "premium-domains": "/domain-search?query=&tab=premium",
    "pricing": "/domain-search?query=&tab=pricing",
    "reglook-mail": "/foundation/mail",
    "via-ai": "/foundation/via-ai",
    "security-center": "/foundation/security-center",
    "session-manager": "/foundation/device-and-session-manager",
    "access-control": "/foundation/2FA-and-access-control",
    "audit-logs": "/foundation/audit-logs",
    "payment-methods": "/foundation/payment-methods",
    "orders": "/foundation/orders-and-transactions",
    "subscriptions": "/foundation/subscriptions",
    "invoices-tax": "/foundation/invoices-and-tax",
    "domain-analytics": "/foundation/domain-performance",
    "user-account": "/foundation/profile-and-preferences",
    "address-book": "/foundation/address-book",
    "webhooks": "/foundation/developers/webhooks",
    "developer-docs": "/foundation/developers/sdks-and-docs",
}

const DATA = [
    /* ================= FEATURED ================= */
    {
        category: "New & Featured",
        priority: "critical",
        items: [
            { icon: Mail, label: "Reglook Mail", value: "reglook-mail", highlight: true },
        ],
    },

    /* ================= DOMAINS (CORE) ================= */
    {
        category: "Domains",
        priority: "critical",
        items: [
            { icon: Globe, label: "Domain Manager", value: "domain-manager" },
            { icon: Activity, label: "DNS Manager", value: "dns-manager" },
            { icon: RefreshCw, label: "Transfers & Renewals", value: "domain-transfers" },
            { icon: FileText, label: "Domain Portfolio", value: "domain-portfolio" },
            { icon: Shield, label: "WHOIS & Privacy", value: "whois-privacy" },
        ],
    },

    /* ================= SELL & MONETIZE ================= */
    {
        category: "Sell & Monetize",
        priority: "critical",
        items: [
            { icon: Ghost, label: "Seller Console", value: "seller-console" },
            { icon: LayoutGrid, label: "Listings Manager", value: "domain-listings" },
        ],
    },

    /* ================= HOSTING & INFRA ================= */
    {
        category: "Hosting & Infrastructure",
        priority: "high",
        items: [
            { icon: Server, label: "Hosting Manager", value: "hosting-manager" },
            { icon: Cloud, label: "X-Cloud Hosting", value: "xcloud-hosting" },
            { icon: Zap, label: "VM Balancer", value: "vm-balancer" },
            { icon: Lock, label: "SSL Manager", value: "ssl-manager" },
            { icon: BarChart, label: "Performance Metrics", value: "infra-metrics" },
        ],
    },

    /* ================= MARKETPLACE ================= */
    {
        category: "Marketplace",
        priority: "high",
        items: [
            { icon: Search, label: "Search Domains", value: "search-domains" },
            { icon: Star, label: "Premium Domains", value: "premium-domains" },
            { icon: TrendingUp, label: "Pricing", value: "pricing" },
            { icon: Heart, label: "My Cart", value: "cart" },
        ],
    },

    /* ================= BUILD & AI ================= */
    {
        category: "Build & AI",
        priority: "high",
        items: [
            { icon: Podcast, label: "Via AI", value: "via-ai" },
        ],
    },

    /* ================= SECURITY & COMPLIANCE ================= */
    {
        category: "Security & Compliance",
        priority: "medium",
        items: [
            { icon: Shield, label: "Security Center", value: "security-center" },
            { icon: Smartphone, label: "Device & Session Manager", value: "session-manager" },
            { icon: KeyRound, label: "2FA & Access Control", value: "access-control" },
            { icon: FileLock, label: "Audit Logs", value: "audit-logs" },
        ],
    },

    /* ================= BILLING ================= */
    {
        category: "Billing & Finance",
        priority: "medium",
        items: [
            { icon: CreditCard, label: "Payment Methods", value: "payment-methods" },
            { icon: FileText, label: "Orders & Transactions", value: "orders" },
            { icon: RefreshCw, label: "Subscriptions", value: "subscriptions" },
            // { icon: Receipt, label: "Invoices & Tax", value: "invoices-tax" },
        ],
    },

    /* ================= ANALYTICS ================= */
    {
        category: "Insights & Analytics",
        priority: "medium",
        items: [
            { icon: BarChart3, label: "Domain Performance", value: "domain-analytics" },
        ],
    },

    /* ================= ACCOUNT ================= */
    {
        category: "Account",
        priority: "low",
        items: [
            { icon: User, label: "Profile & Preferences", value: "user-account" },
            { icon: BookOpen, label: "Address Book", value: "address-book" },
        ],
    },

    /* ================= DEVELOPER ================= */
    {
        category: "Developer & Integrations",
        priority: "low",
        items: [
            { icon: Key, label: "API Manager", value: "api-manager" },
            { icon: Plug, label: "Webhooks", value: "webhooks" },
            { icon: Code, label: "SDKs & Docs", value: "developer-docs" },
        ],
    },
]

export function SearchCommand({ open, setOpen }: SearchCommandProps) {
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent scrolling when open
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [open])

    // Reset state on path change
    useEffect(() => {
        setOpen(false)
        setIsLoading(false)
    }, [pathname, setOpen])

    // Filter data based on query
    const filteredData = useMemo(() => {
        if (!query) return DATA
        const lowerQuery = query.toLowerCase()
        return DATA.map(section => ({
            ...section,
            items: section.items.filter(item =>
                item.label.toLowerCase().includes(lowerQuery)
            )
        })).filter(section => section.items.length > 0)
    }, [query])

    const hasResults = filteredData.length > 0

    const handleNavigation = (value: string) => {
        const route = ROUTE_MAPPING[value] || "/foundation"

        setIsLoading(true)

        // Handle external links immediately
        if (route.startsWith('http')) {
            window.open(route, '_blank')
            setIsLoading(false)
            setOpen(false)
            return
        }

        // Handle navigation
        router.push(route)

        // Note: We don't manually close here.
        // We let the useEffect([pathname]) handle closing the modal
        // once navigation is complete.
    }

    if (!mounted) return null

    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[9999] flex items-center sm:items-start justify-center pt-0 sm:pt-[15vh] px-4 sm:px-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => !isLoading && setOpen(false)}
                        className={`fixed inset-0 backdrop-blur-sm transition-colors duration-300 ${isLoading ? 'bg-black/30' : 'bg-black/60'}`}
                    />

                    {isLoading ? (
                        <div className="fixed inset-0 flex items-center justify-center z-[110]">
                            <Loader size="lg" />
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="w-full max-w-[450px] h-[550px] max-h-[85dvh] relative z-10 overflow-hidden rounded-3xl border border-white/10 bg-[#000] shadow-2xl ring-1 ring-white/5 flex flex-col"
                        >
                            <div className="w-full h-full bg-transparent flex flex-col">
                                {/* Header / Brand */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#18181b]/30 shrink-0">
                                    <span className="text-xs font-semibold text-white/50 tracking-wide">
                                        Reglook Foundation™
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <kbd className="inline-flex h-5 items-center rounded bg-white/5 border border-white/10 px-1.5 font-mono text-[10px] text-white/50">
                                            Ctrl
                                        </kbd>
                                        <span className="text-white/30 text-[10px]">+</span>
                                        <kbd className="inline-flex h-5 items-center rounded bg-white/5 border border-white/10 px-1.5 font-mono text-[10px] text-white/50">
                                            Shift
                                        </kbd>
                                        <span className="text-white/30 text-[10px]">+</span>
                                        <kbd className="inline-flex h-5 items-center rounded bg-white/5 border border-white/10 px-1.5 font-mono text-[10px] text-white/50">
                                            V
                                        </kbd>
                                    </div>
                                </div>

                                {/* Search Input */}
                                <div className="flex items-center border-b border-white/5 px-4 h-14 shrink-0 bg-[#18181b]/50">
                                    <Search className="mr-3 h-5 w-5 shrink-0 text-white" />
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Find anything on Reglook.com"
                                        className="flex h-full w-full font-semibold placeholder:font-normal bg-transparent py-3 text-base outline-none placeholder:text-white/30 text-white disabled:cursor-not-allowed disabled:opacity-50 border-none focus:ring-0"
                                        autoFocus
                                    />
                                </div>

                                {/* VIA AI Showcase */}
                                <div className="shrink-0 p-4 bg-gradient-to-t from-[#000] to-indigo-600 relative overflow-hidden group">
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                                                <Podcast className="text-white" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold text-white">Ask Via AI</h3>
                                                <p className="text-xs text-white/50">Smart answers for your foundation.</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 rounded-full bg-white text-black text-xs cursor-pointer font-semibold hover:bg-gray-200 transition-colors shadow-lg shadow-white/5">
                                            Start
                                        </button>
                                    </div>
                                </div>

                                {/* List Results */}
                                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 overscroll-contain scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent space-y-6">
                                    {!hasResults ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                            <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                                                <Podcast className="h-5 w-5 text-indigo-400" />
                                            </div>
                                            <p className="text-white/40 text-sm mb-4">No matching commands found.</p>

                                            <div className="bg-white/5 rounded-2xl p-4 w-full max-w-[280px] border border-white/10">
                                                <p className="text-white text-sm font-medium mb-3">
                                                    Find <span className="text-indigo-400">"{query}"</span> with Via AI
                                                </p>
                                                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition-colors">
                                                    Continue
                                                    <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        filteredData.map((section, idx) => (
                                            <div key={section.category || idx} className="space-y-1">
                                                <h3 className="text-[10px] uppercase tracking-wider font-semibold text-white/30 px-2 mb-2">
                                                    {section.category}
                                                </h3>
                                                <div className={`grid grid-cols-1 ${section.category === 'New & Featured' ? '' : 'sm:grid-cols-2'} gap-2`}>
                                                    {section.items.map((item) => (
                                                        <Item
                                                            key={item.value}
                                                            icon={item.icon}
                                                            label={item.label}
                                                            highlight={(item as any).highlight}
                                                            onClick={() => handleNavigation(item.value)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </AnimatePresence>,
        document.body
    )
}

const Item = React.memo(({ icon: Icon, label, onClick, highlight }: { icon: any, label: string, onClick?: () => void, highlight?: boolean }) => {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-sm cursor-pointer transition-all group ${highlight
                ? "bg-indigo-500/10 border border-indigo-500/50 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                : "text-white/70 hover:text-white"
                }`}
        >
            <div className={`p-2 rounded-lg transition-colors ${highlight
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-gradient-to-b from-[#000] to-indigo-600 group-hover:text-white text-white"
                }`}>
                <Icon size={18} />
            </div>
            <span className={`flex-1 font-medium transition-colors ${highlight
                ? "text-white font-semibold"
                : "group-hover:text-white group-hover:font-semibold"
                }`}>
                {label}
            </span>
            {highlight && (
                <span className="text-[10px] font-bold bg-indigo-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                    NEW
                </span>
            )}
        </div>
    )
})

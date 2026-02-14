"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronRight, Search, Menu, ChevronDown, MailIcon, MailCheck, CloudCog, CloudDrizzle, CloudSync, Cloud, Lollipop, MapPinCheckInsideIcon, LucideWashingMachine, Server, Mail, Earth, Languages, AlertCircle, BellDot, Bell, CarrotIcon, PaintBucket, ShoppingCart, MoreVertical, User, LogOut, Moon, Book, CreditCard, ShieldCheck, Sun, Laptop, Podcast, Globe, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Loader } from "@/components/global/loader"
import { SearchCommand } from "@/components/foundation/search-command"
import { LoginModal } from "@/components/global/auth-modal"
import { api } from "@/lib/api"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { AnnouncementBar } from "@/components/main/announcement-bar"
import { ProductsDropdown } from "@/components/main/products-dropdown"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function Navbar({ hideAnnouncement = true, backgroundColor = "transparent" }: { hideAnnouncement?: boolean, backgroundColor?: string }) {
    const router = useRouter()
    const [selectedLanguage, setSelectedLanguage] = React.useState({ name: "English (US)", locale: "en-US" })
    const [selectedCurrency, setSelectedCurrency] = React.useState({ name: "Indian Rupee", symbol: "₹" })
    const [isSearchOpen, setIsSearchOpen] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false)
    const [isProductsOpen, setIsProductsOpen] = React.useState(false)

    // Auth state
    const [user, setUser] = React.useState<{ id: string; firstName: string; lastName: string; email: string; username: string } | null>(null)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

    const checkAuth = React.useCallback(async () => {
        try {
            const response = await api.auth.me()
            if (response && response.user) {
                setUser(response.user)
                setIsLoggedIn(true)
            }
        } catch (err) {
            // Not authenticated
            setIsLoggedIn(false)
            setUser(null)
        }
    }, [])

    // Check auth on mount
    React.useEffect(() => {
        checkAuth()
    }, [checkAuth])

    const handleLogout = async () => {
        try {
            await api.auth.logout()
            setIsLoggedIn(false)
            setUser(null)
            router.refresh()
        } catch (error) {
            console.error("Logout failed", error)
        }
    }

    // Search states
    const [languageSearch, setLanguageSearch] = React.useState("")
    const [currencySearch, setCurrencySearch] = React.useState("")

    // Popover open states
    const [isLanguageOpen, setIsLanguageOpen] = React.useState(false)
    const [isCurrencyOpen, setIsCurrencyOpen] = React.useState(false)
    const [isThemeOpen, setIsThemeOpen] = React.useState(false)
    const [theme, setTheme] = React.useState("dark")

    // Mobile specific states
    const [mobileLanguageOpen, setMobileLanguageOpen] = React.useState(false)
    const [mobileCurrencyOpen, setMobileCurrencyOpen] = React.useState(false)

    // Scroll state
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            setIsScrolled(offset > 30) // Threshold to hide announcement
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.code === "KeyV") {
                e.preventDefault()
                setIsSearchOpen((prev) => !prev)
            }
        }

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    const languages = [
        { name: "English (US)", locale: "en-US" },
        { name: "English (UK)", locale: "en-GB" },
        { name: "French", locale: "fr-FR" },
        { name: "German", locale: "de-DE" },
        { name: "Spanish", locale: "es-ES" },
        { name: "Italian", locale: "it-IT" },
        { name: "Portuguese", locale: "pt-PT" },
        { name: "Japanese", locale: "ja-JP" },
    ]

    const currencies = [
        { name: "Indian Rupee", symbol: "₹" },
        { name: "US Dollar", symbol: "$" },
        { name: "Euro", symbol: "€" },
        { name: "British Pound", symbol: "£" },
        { name: "Canadian Dollar", symbol: "$" },
        { name: "Australian Dollar", symbol: "$" },
        { name: "Singapore Dollar", symbol: "$" },
        { name: "Japanese Yen", symbol: "¥" },
    ]

    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
        lang.locale.toLowerCase().includes(languageSearch.toLowerCase())
    )

    const filteredCurrencies = currencies.filter(curr =>
        curr.name.toLowerCase().includes(currencySearch.toLowerCase()) ||
        curr.symbol.toLowerCase().includes(currencySearch.toLowerCase())
    )

    const getBackgroundClass = () => {
        if (backgroundColor === "indigo") return "bg-[#432dd7]"; // Indigo-700
        if (backgroundColor === "teal") return "bg-[#00695c]"; // Teal-800
        if (backgroundColor === "red") return "bg-[#5A0E24]"; // Maroon-900
        if (backgroundColor === "green") return "bg-[#004030]"; // Green-900
        if (backgroundColor === "portfolio") return "bg-[#B9375D]"; // Rose-Custom
        if (backgroundColor === "whois") return "bg-[#452829]"; // Dark Brown-Custom
        if (backgroundColor === "seller") return "bg-[#173d39]"; // Seller Console Theme
        if (backgroundColor === "listings") return "bg-[#222831]"; // Listings Manager Theme
        if (backgroundColor === "hosting") return "bg-[#005461]"; // Hosting Manager Theme
        if (backgroundColor === "xcloud") return "bg-[#4D2B8C]"; // xCloud Hosting Theme
        if (backgroundColor === "airnode") return "bg-[#0058E5]"; // Airnode Theme
        if (backgroundColor === "virtual-machine") return "bg-[#662222]"; // Virtual Machine Balancer Theme
        if (backgroundColor === "ssl-manager") return "bg-[#1C352D]"; // SSL Manager Theme
        if (backgroundColor === "performance-metrics") return "bg-[#5A0E24]"; // Performance Metrics Theme
        if (backgroundColor === "security-center") return "bg-[#5A0E24]"; // Security Center Theme
        if (backgroundColor === "device-and-session-manager") return "bg-[#3E0703]"; // Device & Session Manager Theme
        if (backgroundColor === "2FA-and-access-control") return "bg-[#1C352D]"; // 2FA & Access Control Theme
        if (backgroundColor === "audit-logs") return "bg-[#1A2A80]"; // Audit Logs Theme
        if (backgroundColor === "payment-methods") return "bg-[#004030]"; // Payment Methods Theme
        if (backgroundColor === "orders-and-transactions") return "bg-[#452829]"; // Orders & Transactions Theme-Custom
        if (backgroundColor === "subscriptions") return "bg-[#321E1E]"; // Subscriptions Theme-Custom
        if (backgroundColor === "invoices-and-tax") return "bg-[#4F0E0E]"; // Invoices & Tax Theme-Custom
        if (backgroundColor === "domain-performance") return "bg-[#4338ca]"; // Domain Performance Theme
        if (backgroundColor === "profile-and-preferences") return "bg-[#4338ca]"; // Profile & Preferences Theme
        if (backgroundColor === "address-book") return "bg-[#4338ca]"; // Address Book Theme
        if (backgroundColor === "api-manager") return "bg-[#4338ca]"; // API Manager Theme
        if (backgroundColor === "sdks-and-docs") return "bg-[#4338ca]"; // SDKs & Docs Theme
        if (backgroundColor === "webhooks") return "bg-[#4338ca]"; // Webhooks Theme
        if (backgroundColor === "mail") return "bg-[#5A0E24]"; // Mail Manager Theme
        if (backgroundColor === "domain-search") return "bg-[#4338ca]"; // Domain Search Theme (Indigo-600)
        if (backgroundColor === "transparent") return "bg-transparent backdrop-blur-sm";
        if (isScrolled) return "bg-[#000000]/20 backdrop-blur-md border-b border-white/5";
        return "bg-[#000000]/20 backdrop-blur-md";
    }

    return (
        <div className={cn(
            "w-full fixed top-0 left-0 z-50  font-sans transition-all duration-300",
            getBackgroundClass()
        )}>
            {!hideAnnouncement && (
                <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isScrolled ? "max-h-0 opacity-0" : "max-h-[60px] opacity-100"
                )}>
                    <AnnouncementBar />
                </div>
            )}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto flex h-[80px] md:h-[80px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-12"
            >
                <Link href="/" className="logo-shimmer shrink-0">
                    <Image
                        src="/logo/reglook-logo.svg"
                        alt="Reglook Logo"
                        width={140}
                        height={44}
                        className="w-32 md:w-40 h-auto"
                        priority
                    />
                </Link>



                {/* Right: Navigation & Actions */}
                <div className="flex items-center gap-2 sm:gap-4 md:gap-6">

                    {/* Divider */}
                    {/* <div className="h-6 w-px bg-white/20 hidden md:block" /> */}

                    {/* Feature Pills */}
                    <div className="hidden lg:flex items-center gap-3">

                        <Link
                            href="/domains"
                            className="flex items-center gap-2 rounded-full bg-transparent ring-1 ring-white/0  hover:bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors border border-white/0"
                        >
                            Domains
                        </Link>
                        <Link
                            href="business-email"
                            className="flex items-center gap-2 rounded-full bg-transparent ring-1 ring-white/0  hover:bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors border border-white/0"
                        >
                            Email
                        </Link>

                        <Link
                            href="/hosting"
                            className="flex items-center gap-2 rounded-full bg-transparent ring-1 ring-white/0  hover:bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors border border-white/0"
                        >
                            Hosting
                        </Link>
                        <Link
                            href="/xcloud-hosting"
                            className="flex items-center gap-2 rounded-full bg-transparent ring-1 ring-white/0  hover:bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors border border-white/0"
                        >
                            xCloud
                        </Link>
                        <Link
                            href="/pricing"
                            className="flex items-center gap-2 rounded-full bg-transparent ring-1 ring-white/0  hover:bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors border border-white/0"
                        >
                            Pricing
                        </Link>

                        <button
                            onClick={() => setIsProductsOpen(!isProductsOpen)}
                            className={cn(
                                "flex items-center gap-2 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all border border-transparent",
                                isProductsOpen
                                    ? "bg-white text-black"
                                    : "bg-transparent text-white hover:bg-white/5"
                            )}
                        >
                            Discover all
                            <ChevronDown
                                size={16}
                                className={cn(
                                    "transition-transform duration-200",
                                    isProductsOpen ? "rotate-180" : ""
                                )}
                            />
                        </button>


                    </div>

                    {/* Divider */}
                    <div className="h-6 w-px bg-white/20 hidden lg:block" />

                    {/* Icons */}
                    <div className="flex items-center gap-2 md:gap-5 text-white/90">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden md:block cursor-pointer rounded-full p-2 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95 group"
                        >
                            <Loader size="xs" className="opacity-70 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    aria-label="Language and currency"
                                    className="cursor-pointer rounded-full p-2 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95"
                                >
                                    <Languages
                                        size={20}
                                        strokeWidth={1.5}
                                        className="text-white/90"
                                    />
                                </button>
                            </PopoverTrigger>

                            <PopoverContent
                                align="end"
                                sideOffset={8}
                                className="w-[90vw] sm:w-[380px] rounded-2xl border border-white/10 bg-[#0f0f10] p-6 text-white shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
                            >
                                <PopoverArrow className="fill-[#0f0f10] relative left-1" width={16} height={10} />
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold tracking-tight">
                                        Language and currency
                                    </h3>
                                </div>

                                <div className="mb-6 space-y-3">
                                    <label className="text-sm font-medium text-white/90 ml-1">
                                        Language
                                    </label>

                                    <Popover open={isLanguageOpen} onOpenChange={setIsLanguageOpen}>
                                        <PopoverTrigger asChild>
                                            <button className="flex mt-2 h-14 w-full items-center justify-between rounded-xl border border-[#fff]/10 bg-[#0f0f10] px-4 text-white hover:bg-[#fff]/10 hover:border-[#fff]/20 transition-all group text-base">
                                                <span className="font-medium">{selectedLanguage.name}</span>
                                                <ChevronDown className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent
                                            align="start"
                                            className="mt-2 w-[330px] rounded-xl border border-white/10 bg-[#0f0f10] p-0 shadow-2xl animate-in slide-in-from-top-2 duration-200"
                                        >
                                            <PopoverArrow className="fill-[#0f0f10] relative left-4" width={14} height={8} />
                                            {/* Search */}
                                            <div className="flex items-center rounded-t-xl gap-3 border-b border-white/10 px-4 py-3 bg-white/5">
                                                <Search className="h-4 w-4 text-white/40" />
                                                <input
                                                    placeholder="Search language..."
                                                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                                                    autoFocus
                                                    value={languageSearch}
                                                    onChange={(e) => setLanguageSearch(e.target.value)}
                                                />
                                            </div>

                                            {/* List */}
                                            <div className="max-h-[280px] overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                                {filteredLanguages.map((lang) => (
                                                    <button
                                                        key={lang.locale}
                                                        onClick={() => {
                                                            setSelectedLanguage(lang)
                                                            setIsLanguageOpen(false)
                                                            setLanguageSearch("")
                                                        }}
                                                        className={cn(
                                                            "flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors group",
                                                            selectedLanguage.locale === lang.locale
                                                                ? "bg-white/10 text-white"
                                                                : "text-white/80 hover:bg-[#fff]/10 hover:text-white"
                                                        )}
                                                    >
                                                        <span>{lang.name}</span>
                                                        <span className="font-mono opacity-50 group-hover:opacity-100 text-xs uppercase">{lang.locale.split('-')[0]}</span>
                                                    </button>
                                                ))}
                                                {filteredLanguages.length === 0 && (
                                                    <div className="px-4 py-3 text-sm text-white/50 text-center">
                                                        No languages found
                                                    </div>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* CURRENCY */}
                                <div className="space-y-3">
                                    <label className="cursor-pointer text-sm font-medium text-white/90 ml-1">
                                        Currency
                                    </label>

                                    <Popover open={isCurrencyOpen} onOpenChange={setIsCurrencyOpen}>
                                        <PopoverTrigger asChild>
                                            <button className="flex mt-2 h-14 w-full items-center justify-between rounded-xl border border-[#fff]/10 bg-[#0f0f10] px-4 text-white hover:bg-[#fff]/10 hover:border-[#fff]/20 transition-all group text-base">
                                                <span className="font-medium">{selectedCurrency.name} ({selectedCurrency.symbol})</span>
                                                <ChevronDown className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent
                                            align="start"
                                            className="mt-2 w-[330px] rounded-xl border border-white/10 bg-[#0f0f10] p-0 shadow-2xl animate-in slide-in-from-top-2 duration-200"
                                        >
                                            <PopoverArrow className="fill-[#0f0f10] relative left-4" width={14} height={8} />
                                            {/* Search */}
                                            <div className="flex items-center rounded-t-xl gap-3 border-b border-white/10 px-4 py-3 bg-white/5">
                                                <Search className="h-4 w-4 text-white/40" />
                                                <input
                                                    placeholder="Search currency..."
                                                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                                                    autoFocus
                                                    value={currencySearch}
                                                    onChange={(e) => setCurrencySearch(e.target.value)}
                                                />
                                            </div>

                                            {/* List */}
                                            <div className="max-h-[280px] overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                                {filteredCurrencies.map((currency) => (
                                                    <button
                                                        key={currency.name}
                                                        onClick={() => {
                                                            setSelectedCurrency(currency)
                                                            setIsCurrencyOpen(false)
                                                            setCurrencySearch("")
                                                        }}
                                                        className={cn(
                                                            "flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors group",
                                                            selectedCurrency.name === currency.name
                                                                ? "bg-indigo-600 text-white"
                                                                : "text-white/80 hover:bg-indigo-600 hover:text-white"
                                                        )}
                                                    >
                                                        <span>{currency.name}</span>
                                                        <span className="font-mono opacity-50 group-hover:opacity-100">{currency.symbol}</span>
                                                    </button>
                                                ))}
                                                {filteredCurrencies.length === 0 && (
                                                    <div className="px-4 py-3 text-sm text-white/50 text-center">
                                                        No currencies found
                                                    </div>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </PopoverContent>
                        </Popover>


                        {/* <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    className="hidden md:block rounded-full p-2 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95 relative"
                                >
                                    <Bell
                                        size={20}
                                        strokeWidth={1.75}
                                        className="text-white"
                                    />
                                    <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-[#fff]" />
                                </button>
                            </PopoverTrigger>

                            <PopoverContent
                                align="end"
                                sideOffset={8}
                                className="w-[380px] p-0 rounded-xl border border-white/10 bg-[#0f0f10] text-white shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
                            >
                                <PopoverArrow className="fill-[#0f0f10] relative right-2" width={16} height={10} />

                                <div className="flex items-center justify-between px-5 pt-5 pb-4">
                                    <h3 className="text-lg font-bold tracking-tight">Notifications</h3>
                                    <button className="text-white/60 hover:text-white transition-colors">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>

                                <div className="flex gap-2 px-5 pb-5">
                                    <button className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors">
                                        Priority
                                    </button>
                                    <button className="rounded-full px-4 py-1.5 text-xs font-semibold text-white/40 hover:bg-white/5 hover:text-white transition-colors">
                                        Flagged
                                    </button>
                                    <button className="rounded-full px-4 py-1.5 text-xs font-semibold text-white/40 hover:bg-white/5 hover:text-white transition-colors">
                                        Unread
                                    </button>
                                </div>

                                <div className="px-5 py-3 pt-4">
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Earlier</span>
                                </div>

                                <div className="group relative border-l-[3px] border-blue-500 bg-[#16161e] p-5 hover:bg-[#1a1a24] transition-colors cursor-pointer">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 pt-0.5">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
                                                <div className="h-5 w-5 rounded-full border-[2.5px] border-current" />
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-1.5">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-[13px] text-white/90 leading-relaxed font-medium">
                                                    From December 9, new URL redirects will only work with Reglook DNS. Your pre-existing custom DNS redirects will stay active.
                                                </p>
                                                <button className="text-white/40 hover:text-white -mr-1">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>

                                            <p className="text-xs text-white font-medium">01-01-2026 at 10:18 PM</p>

                                            <div className="pt-3">
                                                <button className="rounded-full bg-blue-500/10 px-3 py-1.5 text-[10px] font-bold text-blue-400 hover:bg-blue-500/20 transition-colors">
                                                    + 8 MORE EVENTS
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 bg-[#161618] p-4 text-center">
                                    <button className="text-sm font-semibold text-white/90 hover:text-white transition-colors">
                                        See all communications
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover> */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="cursor-pointer hidden md:block rounded-full p-2 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95 relative">
                                    <ShoppingCart
                                        size={20}
                                        strokeWidth={1.75}
                                        className="text-white"
                                    />
                                    <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-[#fff]" />

                                </button>
                            </PopoverTrigger>
                            <PopoverContent
                                align="end"
                                sideOffset={8}
                                className="w-[380px] p-0 rounded-xl border border-white/10 bg-[#0f0f10] text-white shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
                            >
                                <PopoverArrow className="fill-[#0f0f10] relative right-2" width={16} height={10} />

                                {/* Header */}
                                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
                                    <h3 className="text-lg font-bold tracking-tight">Your Cart</h3>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 bg-white/5 px-2 py-1 rounded">2 Items</span>
                                </div>

                                {/* Scrollable List */}
                                <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                    {/* Item 1 */}
                                    <div className="p-5 border-b border-white/5 hover:bg-white/5 transition-colors group cursor-default">
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <h4 className="font-semibold text-white/90 text-sm">reglook.com</h4>
                                                <p className="text-xs text-white/50 mt-1">1 year registration</p>
                                            </div>
                                            <span className="font-medium text-sm">$12.99</span>
                                        </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="p-5 border-b border-white/5 hover:bg-white/5 transition-colors group cursor-default">
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <h4 className="font-semibold text-white/90 text-sm">design.io</h4>
                                                <p className="text-xs text-white/50 mt-1">2 years registration</p>
                                            </div>
                                            <span className="font-medium text-sm">$58.00</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-[#161618] p-5">
                                    <div className="space-y-3 mb-5">
                                        <div className="flex justify-between text-xs font-medium text-white/50">
                                            <span>Subtotal</span>
                                            <span>$70.99</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-medium text-white/50">
                                            <span>Taxes & Fees</span>
                                            <span>$8.40</span>
                                        </div>
                                        <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/5">
                                            <span>Total</span>
                                            <span>$79.39</span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/40">
                                        Checkout Now
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        {isLoggedIn ? (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="cursor-pointer hidden md:block rounded-full p-2 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95">
                                        <User
                                            size={20}
                                            strokeWidth={1.75}
                                            className="text-white"
                                        />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="end"
                                    sideOffset={8}
                                    className="w-[600px] p-0 rounded-3xl border border-white/10 bg-[#0f0f10] text-white shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
                                >
                                    <PopoverArrow className="fill-[#0f0f10]  relative right-2" width={16} height={10} />

                                    <div className="flex">
                                        {/* Left Panel - User Info & Settings */}
                                        <div className="w-[280px] p-6 border-r border-white/5 bg-[#161618]">
                                            {/* User Greeting */}
                                            <div className="flex items-start gap-3 mb-6">
                                                {/* <div className="p-1 rounded-full bg-white/10">
                                                    <User size={18} className="text-white" />
                                                </div> */}
                                                <div>
                                                    <h3 className="font-bold text-white text-sm">Hi, {user?.firstName} {user?.lastName}</h3>
                                                    <p className="text-xs font-medium text-white/50 mt-0.5">Username: {user?.username}</p>
                                                </div>
                                            </div>

                                            {/* Log Out */}
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center px-4 py-1 bg-red-800 hover:bg-red-900 cursor-pointer rounded-full gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors mb-6"
                                            >
                                                <span>Log Out</span>
                                            </button>

                                            <div className="h-px bg-white/5 mb-6" />

                                            {/* Appearance */}
                                            <div className="mb-6">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3 block">
                                                    Appearance
                                                </label>
                                                <Popover open={isThemeOpen} onOpenChange={setIsThemeOpen}>
                                                    <PopoverTrigger asChild>
                                                        <button className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#0f0f10] px-3 py-2.5 text-white hover:bg-white/5 transition-all outline-none focus:ring-2 focus:ring-white/10">
                                                            <div className="flex items-center gap-2">
                                                                {theme === 'light' && <Sun size={16} className="text-white/70" />}
                                                                {theme === 'dark' && <Moon size={16} className="text-white/70" />}
                                                                {theme === 'system' && <Laptop size={16} className="text-white/70" />}
                                                                <span className="text-sm font-medium capitalize">{theme}</span>
                                                            </div>
                                                            <ChevronDown size={14} className="text-white/50" />
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent align="start" className="w-[230px] p-1 rounded-xl border border-white/10 bg-[#1A1A1A] shadow-xl text-white mt-1 backdrop-blur-xl">
                                                        <PopoverArrow className="fill-[#1A1A1A] relative left-4" width={14} height={8} />
                                                        <div className="space-y-0.5">
                                                            {[
                                                                { name: "Light", value: "light", icon: Sun },
                                                                { name: "Dark", value: "dark", icon: Moon },
                                                                { name: "System", value: "system", icon: Laptop },
                                                            ].map((item) => (
                                                                <button
                                                                    key={item.value}
                                                                    onClick={() => {
                                                                        setTheme(item.value)
                                                                        setIsThemeOpen(false)
                                                                    }}
                                                                    className={cn(
                                                                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                                                        theme === item.value
                                                                            ? "bg-white/10 text-white font-medium"
                                                                            : "text-white/60 hover:bg-white/5 hover:text-white"
                                                                    )}
                                                                >
                                                                    <item.icon size={16} />
                                                                    <span>{item.name}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                            <div className="h-px bg-white/5 mb-6" />

                                            {/* Request Feature */}
                                            <button className="text-sm px-4 py-2 cursor-pointer hover:bg-white/5 rounded-full font-semibold text-white/90 hover:text-white transition-colors">
                                                Request New Feature
                                            </button>
                                        </div>

                                        {/* Right Panel - Account Navigation */}
                                        <div className="flex-1 p-6 bg-[#0f0f10]">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-4 block">
                                                Your Account
                                            </label>

                                            <div className="space-y-1">
                                                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-white/5 transition-colors group">
                                                    <User size={18} className="text-white/60 group-hover:text-white transition-colors" />
                                                    <span className="text-sm font-medium text-white/80 group-hover:text-white">User Account</span>
                                                </button>

                                                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-white/5 transition-colors group">
                                                    <Book size={18} className="text-white/60 group-hover:text-white transition-colors" />
                                                    <span className="text-sm font-medium text-white/80 group-hover:text-white">Address Book</span>
                                                </button>

                                                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-white/5 transition-colors group">
                                                    <CreditCard size={18} className="text-white/60 group-hover:text-white transition-colors" />
                                                    <span className="text-sm font-medium text-white/80 group-hover:text-white">Payment Methods</span>
                                                </button>

                                                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-white/5 transition-colors group">
                                                    <ShieldCheck size={18} className="text-white/60 group-hover:text-white transition-colors" />
                                                    <span className="text-sm font-medium text-white/80 group-hover:text-white">Security Center</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <button
                                onClick={() => setIsLoginModalOpen(true)}
                                className="hidden md:block rounded-full p-2 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95"
                            >
                                <User
                                    size={20}
                                    strokeWidth={1.75}
                                    className="text-white"
                                />
                            </button>
                        )}
                        <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} onLoginSuccess={checkAuth} />
                        {/* Mobile Menu Toggle */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <button className="md:hidden text-white ml-2 p-1">
                                    <Menu className="h-6 w-6" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] border-l border-white/10 bg-[#000] text-white p-0">
                                <SheetHeader className="px-6 py-5 border-b border-white/10 text-left">
                                    <SheetTitle className="text-white">Menu</SheetTitle>
                                </SheetHeader>
                                <div className="px-6 py-6 overflow-y-auto h-[calc(100vh-80px)]">


                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false)
                                                setIsSearchOpen(true)
                                            }}
                                            className="flex items-center gap-3 py-2 text-base font-medium text-white/80 hover:text-white transition-colors text-left"
                                        >
                                            <Loader size="sm" />
                                            Command Center
                                        </button>
                                    </div>

                                    <div className="border-white/10 border-b my-6"></div>
                                    {/* Main Links */}
                                    <div className="flex flex-col gap-2 mb-6">
                                        <Link
                                            href="/domains"
                                            className="flex items-center gap-3 py-2 text-base font-medium text-white/80 hover:text-white transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Globe size={20} />
                                            Domains
                                        </Link>
                                        <Link
                                            href="/business-email"
                                            className="flex items-center gap-3 py-2 text-base font-medium text-white/80 hover:text-white transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Mail size={20} />
                                            Email
                                        </Link>
                                        <Link
                                            href="/hosting"
                                            className="flex items-center gap-3 py-2 text-base font-medium text-white/80 hover:text-white transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Server size={20} />
                                            Hosting
                                        </Link>
                                        <Link
                                            href="/xcloud-hosting"
                                            className="flex items-center gap-3 py-2 text-base font-medium text-white/80 hover:text-white transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Cloud size={20} />
                                            xCloud
                                        </Link>
                                    </div>



                                    <Accordion type="single" collapsible className="w-full mb-6">
                                        <AccordionItem value="products" className="border-white/10">
                                            <AccordionTrigger className="text-white hover:no-underline hover:text-indigo-400">Discover all</AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="grid gap-2 py-2">
                                                    <ListItem title="Domain Search" href="/domain-search">
                                                        Search and find your ideal domain name.
                                                    </ListItem>
                                                    <ListItem title="Reglook Mail Login" href="/login">
                                                        Access your email account right here.
                                                    </ListItem>
                                                    <ListItem title="Domain Pricing" href="/pricing">
                                                        Check the latest and best domain prices.
                                                    </ListItem>
                                                    <ListItem title="Transfer Domains" href="/transfer">
                                                        Move your domains to Reglook.
                                                    </ListItem>
                                                    <ListItem title="Foundation™" href="/foundation">
                                                        Discover how everything comes together.
                                                    </ListItem>
                                                    <ListItem title="Web Hosting" href="/hosting">
                                                        Run apps and services on flexible, virtual cloud servers.
                                                    </ListItem>
                                                    <ListItem title="Virtual Machines" href="/vm">
                                                        Run apps and services on flexible, virtual cloud servers.
                                                    </ListItem>
                                                    <ListItem title="Request New Feature" href="/feedback">
                                                        Tell us how to make your life easier.
                                                    </ListItem>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>


                                        {/* Mobile Notifications */}
                                        <AccordionItem value="notifications" className="border-white/10">
                                            <AccordionTrigger className="text-white hover:no-underline hover:text-indigo-400 relative">
                                                <div className="flex items-center gap-2">
                                                    <span>Notifications</span>
                                                    <span className="flex h-2 w-2 rounded-full bg-red-500" />
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col gap-2 py-2">
                                                    <div className="rounded-lg bg-white/5 p-3">
                                                        <div className="flex gap-3">
                                                            <div className="flex-shrink-0">
                                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
                                                                    <div className="h-4 w-4 rounded-full border-[2px] border-current" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-white/90 leading-relaxed font-medium">
                                                                    From December 9, new URL redirects will only work with Reglook DNS.
                                                                </p>
                                                                <p className="text-[10px] text-white/50 mt-1">01-01-2026</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="w-full py-2 text-xs font-semibold text-white/60 hover:text-white transition-colors">
                                                        View all notifications
                                                    </button>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Mobile Cart */}
                                        <AccordionItem value="cart" className="border-white/10">
                                            <AccordionTrigger className="text-white hover:no-underline hover:text-indigo-400">
                                                <div className="flex items-center gap-2">
                                                    <span>Your Cart</span>
                                                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/70">2</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col gap-3 py-2">
                                                    <div className="flex justify-between items-center p-2 rounded bg-white/5">
                                                        <div>
                                                            <div className="text-sm font-medium text-white">reglook.com</div>
                                                            <div className="text-xs text-white/50">1 year</div>
                                                        </div>
                                                        <div className="text-sm font-medium text-white">$12.99</div>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 rounded bg-white/5">
                                                        <div>
                                                            <div className="text-sm font-medium text-white">design.io</div>
                                                            <div className="text-xs text-white/50">2 years</div>
                                                        </div>
                                                        <div className="text-sm font-medium text-white">$58.00</div>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                                        <span className="text-sm text-white/60">Total</span>
                                                        <span className="text-base font-bold text-white">$70.99</span>
                                                    </div>
                                                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-all mt-1">
                                                        Checkout
                                                    </button>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Mobile Profile */}
                                        {isLoggedIn ? (
                                            <AccordionItem value="profile" className="border-white/10">
                                                <AccordionTrigger className="text-white hover:no-underline hover:text-indigo-400">
                                                    <div className="flex items-center gap-2">
                                                        <span>My Profile</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="flex flex-col gap-4 py-2">
                                                        {/* User Info */}
                                                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                                                            <div className="p-2 rounded-full bg-white/10">
                                                                <User size={20} className="text-white" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-white text-sm">Ripun Basumatary</h3>
                                                                <p className="text-xs text-white/50">theripunbty</p>
                                                            </div>
                                                        </div>

                                                        {/* Navigation */}
                                                        <div className="space-y-1">
                                                            <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-white/5 transition-colors text-white/80 hover:text-white">
                                                                <User size={16} />
                                                                <span className="text-sm font-medium">User Account</span>
                                                            </button>
                                                            <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-white/5 transition-colors text-white/80 hover:text-white">
                                                                <Book size={16} />
                                                                <span className="text-sm font-medium">Address Book</span>
                                                            </button>
                                                            <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-white/5 transition-colors text-white/80 hover:text-white">
                                                                <CreditCard size={16} />
                                                                <span className="text-sm font-medium">Payment Methods</span>
                                                            </button>
                                                            <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-white/5 transition-colors text-white/80 hover:text-white">
                                                                <ShieldCheck size={16} />
                                                                <span className="text-sm font-medium">Security Center</span>
                                                            </button>
                                                        </div>

                                                        <div className="h-px bg-white/10" />

                                                        {/* Theme */}
                                                        <div>
                                                            <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2 block">
                                                                Appearance
                                                            </label>
                                                            <div className="grid grid-cols-3 gap-2">
                                                                {[
                                                                    { name: "Light", value: "light", icon: Sun },
                                                                    { name: "Dark", value: "dark", icon: Moon },
                                                                    { name: "System", value: "system", icon: Laptop },
                                                                ].map((item) => (
                                                                    <button
                                                                        key={item.value}
                                                                        onClick={() => setTheme(item.value)}
                                                                        className={cn(
                                                                            "flex flex-col items-center gap-1 rounded-lg p-2 text-xs transition-colors",
                                                                            theme === item.value
                                                                                ? "bg-white/10 text-white font-medium"
                                                                                : "text-white/60 hover:bg-white/5 hover:text-white"
                                                                        )}
                                                                    >
                                                                        <item.icon size={16} />
                                                                        <span>{item.name}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="h-px bg-white/10" />

                                                        <button
                                                            onClick={() => setIsLoggedIn(false)}
                                                            className="flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
                                                        >
                                                            <LogOut size={16} />
                                                            <span>Log Out</span>
                                                        </button>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ) : (
                                            <div className="py-2 border-t border-white/10">
                                                <button
                                                    onClick={() => {
                                                        setIsMobileMenuOpen(false)
                                                        setIsLoginModalOpen(true)
                                                    }}
                                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/20 mt-4 flex items-center justify-center gap-2"
                                                >
                                                    Log In
                                                </button>
                                            </div>
                                        )}
                                    </Accordion>

                                    {/* Promo Card */}
                                    <div className="mt-6 rounded-xl bg-gradient-to-t from-indigo-700 to-black p-4">
                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                                                New Infra
                                            </span>
                                        </div>
                                        <h4 className="mb-1 text-sm font-bold text-white">xCloud Serverless</h4>
                                        <p className="mb-3 text-xs leading-relaxed text-white/60">
                                            Build, host, and deploy containerized apps straight from GitHub without touching infrastructure.
                                        </p>
                                        <Link
                                            href="/xcloud-hosting"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-2 text-xs font-bold text-white hover:underline"
                                        >
                                            Get Started <ArrowRight size={12} />
                                        </Link>
                                    </div>

                                    <div className="pb-6" />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </motion.div >
            <SearchCommand open={isSearchOpen} setOpen={setIsSearchOpen} />
            <ProductsDropdown isOpen={isProductsOpen} onClose={() => setIsProductsOpen(false)} />
        </div >
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
    return (
        <li>
            <Link
                href={href as string}
                ref={ref}
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white",
                    className
                )}
                {...props}
            >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-white/50">
                    {children}
                </p>
            </Link>
        </li>
    )
})
ListItem.displayName = "ListItem"

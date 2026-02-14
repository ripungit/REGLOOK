"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    Search,
    ShoppingCart,
    Info,
    Tag,
    ShieldCheck,
    X,
    SlidersHorizontal,
    CarrotIcon,
    Diamond,
    Sparkles,
    Network,
    GlobeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

function DomainSearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get("query") || "";
    const initialTab = searchParams.get("tab");

    const [query, setQuery] = useState(initialQuery);
    const [activeTab, setActiveTab] = useState<string | null>(initialTab);

    useEffect(() => {
        if (!searchParams.get("tab")) {
            const params = new URLSearchParams(searchParams.toString());
            if (!params.get("query")) params.set("query", "");
            params.set("tab", "domains");
            router.replace(`?${params.toString()}`);
            setActiveTab("domains");
        }
    }, [searchParams, router]);

    // Update URL when query changes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (query !== (params.get("query") || "")) {
                params.set("query", query);
                router.replace(`?${params.toString()}`);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, router, searchParams]);

    // Update URL when tab changes
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", tab);
        router.push(`?${params.toString()}`);
    };

    // Scroll state for sticky search
    const [isStuck, setIsStuck] = useState(false);
    const searchRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (searchRef.current) {
                const rect = searchRef.current.getBoundingClientRect();
                // Check if the element is sticking (top is approx 80px)
                // We use 81 to catch slight sub-pixel differences or scroll bounce
                setIsStuck(rect.top <= 81);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const tabs = [
        { id: "domains", label: "Domains", icon: <CarrotIcon size={16} /> },
        { id: "pricing", label: "Pricing", icon: <Tag size={16} /> },
        { id: "premium", label: "Premium", icon: <Diamond size={16} /> },
        // { id: "ai", label: "Ask VIA AI", icon: <HelpCircle size={16} /> },
    ];

    return (
        <div className="w-full max-w-[1100px] mx-auto px-4 lg:px-0 pt-0 pb-12 animate-in fade-in duration-500 font-sans">

            {/* Header Section with Tabs */}
            <div className="mb-6">
                <div className="flex items-center gap-4 md:gap-8 border-b border-white/10 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={cn(
                                "flex items-center gap-2 pb-4 pt-2 text-sm font-semibold transition-all relative font-sans",
                                activeTab === tab.id
                                    ? "text-white"
                                    : "text-white/60 hover:text-white"
                            )}
                        >
                            {tab.icon}
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500 rounded-t-full"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sticky Search Bar Container */}
            <div
                ref={searchRef}
                className={cn(
                    "sticky top-[80px] z-40 transition-all duration-300 mb-8",
                    isStuck
                        ? "-mx-4 md:-mx-[calc((100vw-100%)/2)] py-4 bg-black/80 backdrop-blur-xl"
                        : "bg-transparent"
                )}
            >
                <div className={cn(
                    "relative group mx-auto transition-all duration-300",
                    isStuck ? "max-w-[1140px] px-4" : "w-full"
                )}>
                    <div className={cn(
                        "absolute inset-y-0 flex items-center pointer-events-none z-10 transition-all",
                        isStuck ? "left-8" : "left-4"
                    )}>
                        <Search className="h-4 w-4 text-white/50" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={cn(
                            "w-full bg-transparent py-4 text-[15px] text-white placeholder:text-white/70 focus:outline-none transition-all",
                            isStuck
                                ? "pl-12 pr-12 rounded-none border-b border-white/10 bg-white/5 focus:bg-white/10"
                                : "pl-12 pr-12 rounded-full border border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        )}
                        placeholder="Type a domain name..."
                    />
                    {query && (
                        <button
                            className={cn(
                                "absolute inset-y-0 flex items-center justify-center text-white/50 hover:text-white transition-all z-10",
                                isStuck ? "right-8" : "right-4"
                            )}
                            onClick={() => setQuery("")}
                        >
                            <div className="bg-transparent hover:bg-white/10 rounded-full p-1 transition-colors">
                                <X size={14} />
                            </div>
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {activeTab === "domains" && !query && (
                        <motion.div
                            key="empty-domains"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col items-center justify-center py-12 sm:py-24 text-center px-4"
                        >
                            <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6 relative group">
                                <GlobeIcon className="w-12 h-12 text-white relative z-10" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                                Find your digital identity
                            </h3>
                            <p className="text-white/40 max-w-md mx-auto text-base sm:text-lg leading-relaxed">
                                Enter a keyword or domain name above to explore possibilities for your next project.
                            </p>
                        </motion.div>
                    )}
                    {activeTab === "domains" && query && (
                        <motion.div
                            key="domains"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <DomainsContent query={query} />
                        </motion.div>
                    )}
                    {activeTab === "pricing" && (
                        <motion.div
                            key="pricing"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PricingContent query={query} />
                        </motion.div>
                    )}
                    {activeTab === "premium" && (
                        <motion.div
                            key="premium"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PremiumContent query={query} />
                        </motion.div>
                    )}
                    {/* {activeTab === "ai" && <div className="p-20 text-center text-white/50">AI Assistant Coming Soon</div>} */}
                </AnimatePresence>
            </div>
        </div>
    );
}

function PricingContent({ query }: { query?: string }) {
    const cleanedQuery = (query || "").toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "");
    const parts = cleanedQuery.split(".");
    const name = parts[0] || "example";
    const tld = parts.length > 1 ? parts.slice(1).join(".") : "com";
    const fullName = `${name}.${tld}`;

    const pricingData = [
        { tld: "com", register: "799.33", renew: "898.35", icann: "18.00", transfer: "853.34", privacy: true },
        { tld: "org", register: "583.30", renew: "882.14", icann: "18.00", transfer: "855.14", privacy: true },
        { tld: "net", register: "1,008.16", renew: "1,008.16", icann: "18.00", transfer: "1,008.16", privacy: true },
        { tld: "ai", register: "6,209.20", renew: "6,209.20", icann: "0.00", transfer: "6,209.20", privacy: true },
        { tld: "io", register: "2,878.66", renew: "4,192.87", icann: "0.00", transfer: "4,192.87", privacy: true },
        { tld: "xyz", register: "167.43", renew: "1,126.98", icann: "18.00", transfer: "1,126.98", privacy: true },
    ];

    return (
        <div className="space-y-6 fade-in animate-in">
            {query && (
                <div className="space-y-3">
                    <div className="bg-[#01cd8d]/40 border border-white/5 rounded-2xl md:rounded-full px-4 py-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="text-white shrink-0">
                                <ShoppingCart size={20} />
                            </div>
                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                <h2 className="text-lg md:text-xl font-bold text-white tracking-tight break-all">
                                    {fullName} <span className="font-medium text-white px-4 py-2 border border-white/10 rounded-full text-sm ml-1 whitespace-nowrap">is available</span>
                                </h2>
                                <span className="text-[10px] font-bold bg-white text-black px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                    +10.00%
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 md:gap-6 w-full md:w-auto">
                            <div className="flex flex-col items-end gap-0.5 text-right md:flex-row md:items-center md:gap-3">
                                <span className="text-sm text-white/30 line-through decoration-white/30">₹898.35/yr</span>
                                <span className="text-xl font-bold text-white">₹799.33</span>
                            </div>
                            <Button className="h-10 px-6 bg-[#fff] hover:bg-[#fff]/80 text-black border border-white/5 font-semibold rounded-lg flex items-center gap-2 transition-all">
                                <ShoppingCart size={16} />
                                View Cart
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search a TLD"
                        className="w-full bg-[#111] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-white/20"
                    />
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button variant="outline" size="sm" className="h-9 bg-[#111] text-white/70 border-white/10 hover:bg-[#1a1a1a] hover:text-white">
                        <SlidersHorizontal size={14} className="mr-2" />
                        Refine
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 bg-[#111] text-white/70 border-white/10 hover:bg-[#1a1a1a] hover:text-white">
                        Price Range
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left border-collapse">
                    <thead>
                        <tr className="border-b border-transparent">
                            <th className="py-4 pl-4 text-xs font-medium text-white/40 uppercase tracking-wider w-[20%]"></th>
                            <th className="py-4 text-xs font-medium text-white/40 uppercase tracking-wider w-[20%]">Register</th>
                            <th className="py-4 text-xs font-medium text-white/40 uppercase tracking-wider w-[20%]">Renew</th>
                            <th className="py-4 text-xs font-medium text-white/40 uppercase tracking-wider w-[20%]">ICANN fee</th>
                            <th className="py-4 text-xs font-medium text-white/40 uppercase tracking-wider w-[20%]">Transfer</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 border-t border-white/5">
                        {pricingData.map((item) => (
                            <tr key={item.tld} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="py-6 pl-4">
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <span className="text-xl font-bold text-white">.{item.tld}</span>
                                        </div>
                                        {item.privacy && (
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <ShieldCheck
                                                            size={14}
                                                            className="text-white/30 hover:text-white transition-colors cursor-help"
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="bg-white text-black font-semibold text-xs py-1.5 px-3 border-0 shadow-lg">
                                                        Free privacy protection
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white/40 mb-1">Register</span>
                                        <span className="text-sm font-bold text-white">₹{item.register} <span className="text-white/40 font-normal text-xs">/year</span></span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white/40 mb-1">Renew</span>
                                        <span className="text-sm font-bold text-white">₹{item.renew} <span className="text-white/40 font-normal text-xs">/year</span></span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white/40 mb-1">ICANN fee</span>
                                        <span className="text-sm font-bold text-white">₹{item.icann} <span className="text-white/40 font-normal text-xs">/year</span></span>
                                    </div>
                                </td>
                                <td className="py-4 pr-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white/40 mb-1">Transfer</span>
                                        <span className="text-sm font-bold text-white">₹{item.transfer} <span className="text-white/40 font-normal text-xs">/year</span></span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function DomainsContent({ query }: { query: string }) {
    const cleanedQuery = query.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "");
    const parts = cleanedQuery.split(".");
    const name = parts[0] || "example";
    const tld = parts.length > 1 ? parts.slice(1).join(".") : "com";
    const fullName = `${name}.${tld}`;

    return (
        <div className="space-y-8">
            {/* Exact Match Banner */}
            <div className="space-y-3">
                <div className="space-y-3">
                    <div className="bg-[#01cd8d]/40 border border-white/5 rounded-2xl md:rounded-full px-4 py-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="text-white shrink-0">
                                <ShoppingCart size={20} />
                            </div>
                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                <h2 className="text-lg md:text-xl font-bold text-white tracking-tight break-all">
                                    {fullName} <span className="font-medium text-white px-4 py-2 border border-white/10 rounded-full text-sm ml-1 whitespace-nowrap">is available</span>
                                </h2>
                                <span className="text-[10px] font-bold bg-white text-black px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                    +10.00%
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 md:gap-6 w-full md:w-auto">
                            <div className="flex flex-col items-end gap-0.5 text-right md:flex-row md:items-center md:gap-3">
                                <span className="text-sm text-white/30 line-through decoration-white/30">₹898.35/yr</span>
                                <span className="text-xl font-bold text-white">₹799.33</span>
                            </div>
                            <Button className="h-10 px-6 bg-[#fff] hover:bg-[#fff]/80 text-black border border-white/5 font-semibold rounded-lg flex items-center gap-2 transition-all">
                                <ShoppingCart size={16} />
                                View Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggested Section */}
            <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white/90 mb-4">Suggested</h3>

                <div className="divide-y divide-white/5 border-t border-white/5">
                    {/* Exact Match Repetition (as seen in image) */}
                    <ResultRow
                        name={name}
                        tld={tld}
                        price="799.33"
                        oldPrice="898.35"
                        badges={["+0.00%"]}
                        buttonType="view"
                        iconColor="text-emerald-400"
                    />

                    <ResultRow
                        name={name}
                        tld="org"
                        price="583.30"
                        oldPrice="882.14"
                        infoIcon
                        badges={["GET 27% OFF", "+0.00%"]}
                        badgeColors={{ "GET 27% OFF": "bg-emerald-400/10 text-emerald-400" }}
                    />

                    <ResultRow
                        name={name}
                        tld="net"
                        price="1,008.16"
                        badges={["+0.00%"]}
                    />

                    <ResultRow
                        name={name}
                        tld="ai"
                        price="6,209.20"
                        infoIcon
                        badges={["+0.00%"]}
                    />
                </div>
            </div>

            {/* All Results Section */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-sm font-bold text-white/90">All results</h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] rounded-full text-xs font-semibold text-white/70 transition-colors border border-white/5">
                        <SlidersHorizontal size={12} />
                        Refine
                    </button>
                </div>

                <div className="divide-y divide-white/5 border-t border-white/5">
                    <ResultRow
                        name={name}
                        tld="io"
                        price="2,878.66"
                        oldPrice="4,192.87"
                        badges={["+0.00%"]}
                    />
                    <ResultRow
                        name={name}
                        tld="xyz"
                        price="167.43"
                        oldPrice="1,126.98"
                        badges={["+0.00%"]}
                    />
                    <ResultRow
                        name="realook"
                        tld="tech"
                        price="450.00"
                        oldPrice="3500.00"
                        badges={["TAKEN"]}
                        isTaken
                    />
                </div>
            </div>
        </div>
    );
}

interface PremiumContentProps {
    query: string;
}

function PremiumContent({ query }: PremiumContentProps) {
    const cleanedQuery = (query || "").toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "");
    const parts = cleanedQuery.split(".");
    const name = parts[0] || "example";

    // Premium TLDs and their data
    const premiumData: { tld: string; price: string; badges: string[]; badgeColors: Record<string, string> }[] = [
        { tld: "com", price: "250,000.00", badges: ["PREMIUM", "POPULAR"], badgeColors: { "PREMIUM": "bg-indigo-500/20 text-indigo-400", "POPULAR": "bg-orange-500/20 text-orange-400" } },
        { tld: "ai", price: "15,000.00", badges: ["PREMIUM", "TRENDING"], badgeColors: { "PREMIUM": "bg-indigo-500/20 text-indigo-400", "TRENDING": "bg-red-500/20 text-red-400" } },
        { tld: "io", price: "8,500.00", badges: ["PREMIUM"], badgeColors: { "PREMIUM": "bg-indigo-500/20 text-indigo-400" } },
        { tld: "co", price: "3,200.00", badges: ["PREMIUM"], badgeColors: { "PREMIUM": "bg-indigo-500/20 text-indigo-400" } },
        { tld: "net", price: "5,000.00", badges: ["PREMIUM"], badgeColors: { "PREMIUM": "bg-indigo-500/20 text-indigo-400" } },
        { tld: "org", price: "4,500.00", badges: ["PREMIUM"], badgeColors: { "PREMIUM": "bg-indigo-500/20 text-indigo-400" } },
        { tld: "app", price: "2,100.00", badges: ["PREMIUM"], badgeColors: { "PREMIUM": "bg-indigo-500/20 text-indigo-400" } },
        { tld: "dev", price: "2,800.00", badges: ["PREMIUM"], badgeColors: { "PREMIUM": "bg-indigo-500/20 text-indigo-400" } },
    ];

    return (
        <div className="space-y-6 fade-in animate-in">
            <div className="bg-indigo-600 border border-indigo-500/10 rounded-2xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-3">
                        <Diamond className="text-white" size={24} />
                        Premium Domains
                    </h2>
                    <p className="text-white/60 text-sm max-w-lg">
                        Secure high-value keywords and brandable domains to jumpstart your business. These exclusive domains are highly sought after.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 h-11 shrink-0 w-full sm:w-auto">
                    Contact Broker
                </Button>
            </div>

            <div className="uppercase text-xs font-bold text-white/40 tracking-wider mb-4 pl-2">
                Featured Premium
            </div>

            <div className="divide-y divide-white/5 border-t border-white/5">
                {premiumData.map((item) => (
                    <ResultRow
                        key={item.tld}
                        name={name}
                        tld={item.tld}
                        price={item.price}
                        badges={item.badges}
                        badgeColors={item.badgeColors}
                        iconColor="text-indigo-500"
                    />
                ))}
            </div>

            <div className="uppercase text-xs font-bold text-white/40 tracking-wider mb-4 pl-2 mt-8">
                Taken / Unavailable
            </div>

            <div className="divide-y divide-white/5 border-t border-white/5">
                {[
                    { tld: "in", badges: ["TAKEN"] },
                    { tld: "co.in", badges: ["TAKEN"] },
                    { tld: "biz", badges: ["TAKEN"] },
                    { tld: "info", badges: ["TAKEN"] }
                ].map((item) => (
                    <ResultRow
                        key={item.tld}
                        name={name}
                        tld={item.tld}
                        price="0.00"
                        badges={item.badges}
                        isTaken={true}
                        buttonType="broker"
                    />
                ))}
            </div>
        </div>
    );
}

interface ResultRowProps {
    name: string;
    tld: string;
    price: string;
    oldPrice?: string | null;
    badges?: string[];
    badgeColors?: Record<string, string>;
    infoIcon?: boolean;
    buttonType?: "add" | "view" | "broker";
    iconColor?: string;
    isTaken?: boolean;
}

function ResultRow({
    name,
    tld,
    price,
    oldPrice,
    badges = [],
    badgeColors = {},
    infoIcon = false,
    buttonType = "add",
    iconColor = "text-[#02ba81]",
    isTaken = false
}: ResultRowProps) {
    return (
        <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 hover:bg-white/[0.02] transition-colors -mx-4 px-4 rounded-lg gap-4 sm:gap-0 border-b border-white/5 sm:border-none last:border-0">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center justify-center shrink-0">
                    <CarrotIcon size={20} className={cn("opacity-100", iconColor)} />
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className={cn("text-base md:text-lg font-medium text-white break-all", isTaken && "text-white/40")}>
                        {name}<span className={cn("text-white/60", isTaken && "text-white/30")}>.{tld}</span>
                    </span>

                    {badges.map(badge => {
                        const customColor = badgeColors[badge];
                        const defaultColor = "bg-blue-500/20 text-blue-400";
                        const takenColor = "bg-white/10 text-white/40";
                        const finalColor = badge === "TAKEN" ? takenColor : (customColor || defaultColor);

                        return (
                            <span
                                key={badge}
                                className={cn(
                                    "text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] whitespace-nowrap",
                                    finalColor
                                )}
                            >
                                {badge}
                            </span>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pl-9 sm:pl-0">
                <div className="text-right flex flex-col items-end justify-center md:flex-row md:items-center md:gap-3">
                    {oldPrice && <span className="text-xs font-medium text-white/30 line-through decoration-white/30 mb-0.5 md:mb-0">₹{oldPrice}/yr</span>}
                    <div className="flex items-center gap-2">
                        {infoIcon && <Info size={14} className="text-white/30" />}
                        <span className={cn("text-base md:text-[17px] font-bold tracking-normal", isTaken ? "text-white/30" : "text-white")}>
                            {isTaken ? "Taken" : `₹${price}`}
                        </span>
                    </div>
                </div>

                {isTaken && buttonType !== "broker" ? (
                    <Button disabled size="sm" className="h-9 px-4 bg-white/5 text-white/30 border border-white/5 font-semibold rounded-lg opacity-50 cursor-not-allowed shrink-0">
                        Taken
                    </Button>
                ) : buttonType === "broker" ? (
                    <Button className="h-9 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 font-semibold rounded-lg flex items-center gap-2 transition-all shrink-0">
                        Contact Broker
                    </Button>
                ) : buttonType === "view" ? (
                    <Button className="h-9 px-4 bg-transparent hover:bg-white/5 text-white border border-white/10 font-semibold rounded-lg flex items-center gap-2 transition-all shrink-0">
                        <ShoppingCart size={16} />
                        View Cart
                    </Button>
                ) : (
                    <Button className="h-9 px-4 bg-[#1a1a1a] hover:bg-[#252525] text-white border border-transparent hover:border-white/5 font-semibold rounded-lg flex items-center gap-2 transition-all shrink-0">
                        <ShoppingCart size={16} />
                        Add to cart
                    </Button>
                )}
            </div>
        </div>
    );
}

export default function DomainSearchPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <DomainSearchContent />
        </React.Suspense>
    );
}


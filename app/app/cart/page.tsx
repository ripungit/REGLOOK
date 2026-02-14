"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShieldCheck, Zap, Lock, CreditCard, ArrowRight, Tag, Globe, Server, Info, ChevronDown, Check, Cloud, AppWindow, Podcast, Mail, MapPin, Pencil, Calendar, RefreshCw, X, Loader2, LayoutGrid, Cpu } from "lucide-react";
import PaymentInterface from "@/components/global/PaymentInterface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

interface CartItem {
    id: string;
    name: string;
    type: string;
    period: string; // This is now used as initial value
    price: number;
    basePrice: number;
    billingCycle: "monthly" | "yearly";
    originalPrice?: number;
    renewalPrice?: number;
    badge?: string;
    serverLocation?: string; // New field for hosting
    autoRenewal?: boolean;
    details?: {
        label: string;
        value: string;
        icon?: React.ElementType;
    }[];
}

const initialCartItems: CartItem[] = [
    {
        id: "1",
        name: "reglook.com",
        type: "Domain",
        period: "1 Year",
        price: 2878.66,
        basePrice: 2878.66,
        billingCycle: "yearly",
        originalPrice: 4192.87,
        renewalPrice: 3499.00,
        badge: "HOT",
        autoRenewal: true,
        details: [
            { label: "Registration Length", value: "1 Year", icon: Calendar },
            { label: "Privacy Protection", value: "Enabled", icon: ShieldCheck },
            { label: "Auto-Renewal", value: "On", icon: RefreshCw },
            { label: "Domain Lock", value: "Active", icon: Lock },
        ]
    }
];

const essentialsOptions = [
    {
        id: "web-hosting",
        name: "Web Hosting",
        description: "Reliable hosting for your new domain.",
        highlight: "Built to perform.",
        price: 199,
        type: "Hosting",
        icon: Server,
        color: "indigo",
        gradient: "from-[#000] to-indigo-600",
        iconBg: "bg-indigo-500/40",
        renderVisual: () => (
            <div className="absolute right-0 top-0 p-6 opacity-100 transition-opacity">
                <div className="flex gap-2">
                    <div className="w-1.5 h-12 bg-white rounded-full" />
                    <div className="w-1.5 h-12 bg-white rounded-full" />
                    <div className="w-1.5 h-12 bg-red-500 rounded-full animate-pulse" />
                </div>
            </div>
        )
    },
    {
        id: "reglook-mail",
        name: "Reglook Mail",
        description: "Professional email @yourdomain.",
        highlight: "Email, sans noise.",
        price: 79,
        type: "Email",
        icon: Mail,
        color: "pink",
        gradient: "from-[#000] to-pink-600",
        iconBg: "bg-pink-500/10",
    },
    {
        id: "vm-balancer",
        name: "VM Balancer",
        description: "Scale compute instantly on demand.",
        highlight: "Balanced power.",
        price: 499,
        type: "Compute",
        icon: Zap,
        color: "teal",
        gradient: "from-[#000] to-teal-600",
        iconBg: "bg-teal-500/10",
    },
    {
        id: "xcloud",
        name: "xCloud",
        description: "Global instances deployed in seconds.",
        highlight: "Scale no limits.",
        price: 899,
        type: "Cloud",
        icon: Cloud,
        color: "blue",
        gradient: "from-[#000] to-blue-600",
        iconBg: "bg-blue-500/10",
        renderVisual: () => (
            <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-10 transition-opacity transform duration-500">
                <Cloud size={80} fill="currentColor" />
            </div>
        )
    },
    {
        id: "loop-sync",
        name: "LoopSync Pro",
        description: "Marketplace for your apps, websites & more.",
        highlight: "Build & Grow.",
        price: 0,
        type: "App",
        icon: AppWindow,
        color: "red",
        gradient: "from-[#000] to-red-600",
        iconBg: "bg-red-500/10",
    },
    {
        id: "via-ai",
        name: "Via AI",
        description: "Build your website with AI.",
        highlight: "Modern website builder.",
        price: 299,
        type: "AI",
        icon: Podcast,
        color: "purple",
        gradient: "from-[#000] to-purple-600",
        iconBg: "bg-purple-500/10",
    }
];

const SERVER_LOCATIONS = [
    { value: "us", label: "United States", infra: "US-East + US-West", flag: "🇺🇸" },
    { value: "eu", label: "Europe (EU)", infra: "Frankfurt + Amsterdam", flag: "🇪🇺" },
    { value: "uk", label: "United Kingdom", infra: "London", flag: "🇬🇧" },
    { value: "asia", label: "Asia-Pacific", infra: "Singapore", flag: "🇸🇬" },
    { value: "in", label: "India", infra: "Mumbai", flag: "🇮🇳" },
    { value: "auto", label: "Auto", infra: "Smart geo-routing", flag: "🌍" } // All
];

function CartContent() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [promoCode, setPromoCode] = useState("");
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get("flow") === "checkout") {
            setIsDrawerOpen(true);
        } else {
            setIsDrawerOpen(false);
        }
    }, [searchParams]);

    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isDrawerOpen]);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            setIsCheckingOut(false);
            router.push('/cart?flow=checkout&intent=purchase');
        }, 2000);
    };

    const closeDrawer = () => {
        router.push('/cart');
    };

    const calculatePrice = (basePrice: number, cycle: "monthly" | "yearly", period: string) => {
        if (period === "Lifetime") return 0;

        const value = parseInt(period.split(" ")[0]);
        const unit = period.includes("Year") ? "year" : "month";

        if (cycle === "yearly") {
            // Base price is per year
            if (unit === "year") return basePrice * value;
            return basePrice / 12 * value;
        } else {
            // Base price is per month
            if (unit === "month") return basePrice * value;
            return basePrice * 12 * value;
        }
    };

    const addToCart = (option: typeof essentialsOptions[0]) => {
        const isHosting = option.type === "Hosting";
        let initialPeriod: string;
        let billingCycle: "monthly" | "yearly" = "monthly"; // Essentials are monthly base price

        // Specialized defaults for each type
        switch (option.type) {
            case "Hosting":
            case "Compute":
            case "Cloud":
                initialPeriod = "1 Year";
                break;
            case "App": // LoopSync Pro
                initialPeriod = "Lifetime";
                break;
            case "Email":
            case "AI":
            default:
                initialPeriod = "1 Month";
                break;
        }

        const newItem: CartItem = {
            id: option.id,
            name: option.name,
            type: option.type,
            period: initialPeriod,
            basePrice: option.price,
            billingCycle: billingCycle,
            price: calculatePrice(option.price, billingCycle, initialPeriod),
            badge: "NEW",
            serverLocation: isHosting ? "in" : undefined, // Default to India for Hosting
            details: [
                { label: "Service Type", value: option.type, icon: Tag },
                { label: "Billing Cycle", value: initialPeriod === "Lifetime" ? "One-time" : (initialPeriod.includes("Year") ? "Yearly" : "Monthly"), icon: Calendar },
            ]
        };
        setCartItems(prev => [...prev, newItem]);
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const taxes = subtotal * 0.18; // 18% GST assumption
    const total = subtotal + taxes;

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const toggleExpand = (id: string) => {
        setExpandedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const updatePeriod = (id: string, newPeriod: string) => {
        setCartItems(prev => prev.map(item => {
            if (item.id !== id) return item;

            const newPrice = calculatePrice(item.basePrice, item.billingCycle, newPeriod);

            return {
                ...item,
                period: newPeriod,
                price: newPrice,
                details: item.details?.map(d => {
                    if (d.label === "Billing Cycle") {
                        return { ...d, value: newPeriod === "Lifetime" ? "One-time" : (newPeriod.includes("Year") ? "Yearly" : "Monthly") };
                    }
                    if (d.label === "Registration Length") {
                        return { ...d, value: newPeriod };
                    }
                    return d;
                })
            };
        }));
    };

    const updateAutoRenewal = (id: string, enabled: boolean) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? {
                ...item, autoRenewal: enabled, details: item.details?.map(d =>
                    d.label === "Auto-Renewal" ? { ...d, value: enabled ? "On" : "Off" } : d
                )
            } : item
        ));
    };

    const updateLocation = (id: string, location: string) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, serverLocation: location } : item
        ));
    };

    const getCartItemIcon = (type: string) => {
        switch (type) {
            case "Domain": return <Globe className="text-white/80" size={20} />;
            case "Hosting": return <Server className="text-white/80" size={20} />;
            case "Email": return <Mail className="text-white/80" size={20} />;
            case "Compute": return <Zap className="text-white/80" size={20} />;
            case "Cloud": return <Cloud className="text-white/80" size={20} />;
            case "App": return <AppWindow className="text-white/80" size={20} />;
            case "AI": return <Podcast className="text-white/80" size={20} />;
            default: return <ShieldCheck className="text-white/80" size={20} />;
        }
    };

    const getPeriodOptions = (type: string) => {
        switch (type) {
            case "Hosting":
            case "Email":
            case "Compute":
            case "Cloud":
            case "AI":
                return ["1 Month", "1 Year", "2 Years"];
            case "App": // LoopSync
                return ["Lifetime"];
            case "Domain":
                return ["1 Year", "2 Years", "3 Years", "5 Years", "10 Years"];
            default:
                return ["1 Year", "2 Years"];
        }
    };

    // Filter available essentials
    const availableEssentials = essentialsOptions.filter(
        opt => !cartItems.some(item => item.id === opt.id)
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[1160px] mx-auto px-6 lg:px-8 font-sans pb-24"
        >
            <div className="mb-12 space-y-3 mt-24">
                <h1 className="text-4xl md:text-4xl font-bold text-white tracking-tight">Your Cart</h1>
                <p className="text-white/60 text-lg">Review your selected items before proceeding to checkout.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
                {/* Left Column: Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#131313] border border-white/[0.08] rounded-3xl overflow-hidden">
                        <AnimatePresence mode="popLayout">
                            {cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={cn(
                                            "group relative p-6 md:p-8 transition-colors",
                                            index !== cartItems.length - 1 && "border-b border-white/[0.08]"
                                        )}
                                    >
                                        <div className="flex flex-col md:flex-row items-start md:items-start gap-6">

                                            {/* Icon/Type */}
                                            <div className="shrink-0 pt-1">
                                                <div className="h-12 w-12 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/[0.05]">
                                                    {getCartItemIcon(item.type)}
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0 space-y-3">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="text-xl font-bold text-white truncate tracking-tight">{item.name}</h3>
                                                            {item.badge && (
                                                                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-[5px] border border-indigo-500/10 uppercase tracking-wide">
                                                                    {item.badge}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-white flex items-center gap-2">
                                                            {item.type}
                                                            <span className="w-1 h-1 rounded-full bg-white/10" />
                                                            <span className="text-white px-4 py-1 border border-white/10 rounded-full flex items-center gap-1">
                                                                {item.serverLocation ? (
                                                                    <>
                                                                        <span className="mr-1">{SERVER_LOCATIONS.find(l => l.value === item.serverLocation)?.flag}</span>
                                                                        {SERVER_LOCATIONS.find(l => l.value === item.serverLocation)?.label || "Auto"}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Lock size={10} /> Privacy Included
                                                                    </>
                                                                )}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    {/* Price - Desktop Right */}
                                                    <div className="text-left sm:text-right">
                                                        {item.originalPrice && (
                                                            <div className="text-xs font-medium text-white/30 line-through decoration-white/30 mb-0.5">
                                                                ₹{item.originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </div>
                                                        )}
                                                        <div className="text-xl font-bold text-white tracking-tight">
                                                            ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </div>
                                                        {item.renewalPrice && (
                                                            <div className="text-[10px] font-medium text-white/40 mt-1">
                                                                Renews at ₹{item.renewalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                                    {/* Period Selector */}
                                                    <Select defaultValue={item.period} onValueChange={(val) => updatePeriod(item.id, val)}>
                                                        <SelectTrigger className="w-[140px] h-9 bg-white/[0.03] border-white/10 text-white/70 text-xs font-medium rounded-lg">
                                                            <SelectValue placeholder="Period" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                                                            {getPeriodOptions(item.type).map(period => (
                                                                <SelectItem key={period} value={period} className="text-xs focus:bg-white/10 focus:text-white">
                                                                    {period}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                    <button
                                                        onClick={() => toggleExpand(item.id)}
                                                        className="h-9 px-4 text-xs font-medium text-white/50 hover:text-white bg-transparent hover:bg-white/[0.03] rounded-lg transition-colors flex items-center gap-2"
                                                    >
                                                        View Details
                                                        <ChevronDown
                                                            size={14}
                                                            className={cn("transition-transform duration-300", expandedItems.includes(item.id) ? "rotate-180" : "")}
                                                        />
                                                    </button>

                                                    <div className="flex-1" />

                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="h-9 w-9 flex items-center justify-center text-white/20 hover:text-red-400 bg-transparent hover:bg-red-500/10 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expandable Details */}
                                        <AnimatePresence>
                                            {expandedItems.includes(item.id) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                    animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                                                        {item.type === "Hosting" ? (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                <div className="space-y-4">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                                                            <Server size={16} />
                                                                        </div>
                                                                        <h4 className="font-semibold text-white text-sm">Server Configuration</h4>
                                                                    </div>

                                                                    <div className="space-y-3">
                                                                        <div className="space-y-1.5">
                                                                            <label className="text-xs text-white/40 font-medium ml-1">Location</label>
                                                                            <Select
                                                                                defaultValue={item.serverLocation}
                                                                                onValueChange={(val) => updateLocation(item.id, val)}
                                                                            >
                                                                                <SelectTrigger className="w-full bg-white/[0.03] border-white/10 text-white h-10 rounded-lg">
                                                                                    <SelectValue />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                                                                                    {SERVER_LOCATIONS.map(loc => (
                                                                                        <SelectItem key={loc.value} value={loc.value} className="text-xs focus:bg-white/10 focus:text-white">
                                                                                            <span className="flex items-center justify-between w-full gap-4">
                                                                                                <span><span className="mr-2 text-base">{loc.flag}</span>{loc.label}</span>
                                                                                                <span className="text-white/30 text-[10px] hidden sm:inline-block">{loc.infra}</span>
                                                                                            </span>
                                                                                        </SelectItem>
                                                                                    ))}
                                                                                </SelectContent>
                                                                            </Select>
                                                                            <p className="text-[10px] text-white/30 pl-1">
                                                                                {SERVER_LOCATIONS.find(l => l.value === item.serverLocation)?.infra}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center justify-center p-6 bg-white/[0.02] rounded-xl border border-white/5">
                                                                    <div className="text-center">
                                                                        <div className="text-6xl mb-4 transform transition-transform hover:scale-110 duration-300 select-none drop-shadow-2xl grayscale-[0.2] hover:grayscale-0">
                                                                            {SERVER_LOCATIONS.find(l => l.value === (item.serverLocation || "auto"))?.flag}
                                                                        </div>
                                                                        <div className="text-sm font-medium text-white/80">
                                                                            {SERVER_LOCATIONS.find(l => l.value === (item.serverLocation || "auto"))?.infra}
                                                                        </div>
                                                                        <div className="text-[10px] text-white/30 mt-1 uppercase tracking-wider font-bold">
                                                                            Data Center
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                {item.details?.map((detail, i) => (
                                                                    <div key={i} className="flex items-center justify-between text-sm border-b border-white/5 last:border-0 pb-2 last:pb-0">
                                                                        <span className="text-white/40 flex items-center gap-2">
                                                                            {detail.icon && <detail.icon size={14} className="text-white/20" />}
                                                                            {detail.label}
                                                                        </span>
                                                                        <div className="text-white/80 font-medium">
                                                                            {detail.label === "Auto-Renewal" ? (
                                                                                <Switch
                                                                                    checked={item.autoRenewal}
                                                                                    onCheckedChange={(checked) => updateAutoRenewal(item.id, checked)}
                                                                                    className="data-[state=checked]:bg-indigo-600 h-5 w-9"
                                                                                />
                                                                            ) : (
                                                                                detail.value
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {item.type === "Domain" && (
                                                                    <div className="sm:col-span-2 pt-4 mt-2">
                                                                        <div className="flex items-start justify-between">
                                                                            <div className="space-y-1">
                                                                                <div className="flex items-center gap-2 text-white/80 font-medium text-sm">
                                                                                    <MapPin size={14} className="text-indigo-400" />
                                                                                    Domain Contacts
                                                                                </div>
                                                                                <p className="text-xs text-white/40 pl-6 leading-relaxed max-w-lg">
                                                                                    <span className="text-white/60 font-medium">RIPUN</span> for all domain contacts.<br />
                                                                                    Your Registrant Company Name will be listed as the Registered Name Holder.
                                                                                </p>
                                                                            </div>
                                                                            <Button variant="ghost" size="sm" className="h-7 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 -mt-1">
                                                                                <Pencil size={12} className="mr-1.5" />
                                                                                Edit
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                        <div className="mt-4 pt-3 border-t border-white/5">
                                                            <p className="text-xs text-white/30 leading-relaxed">
                                                                * Renewal price may vary. {item.type === "Hosting" ? "99.9% Uptime SLA Guarantee." : "Domain privacy protection is included free of charge forever."}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-24 px-6"
                                >
                                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.03] mb-6">
                                        <CreditCard className="text-white/20" size={36} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
                                    <p className="text-white/40 text-base mb-8 max-w-sm mx-auto">Looks like you haven't added any items yet. Start searching for your perfect domain.</p>
                                    <Link href="/domain-search">
                                        <Button className="bg-white text-black hover:bg-white/90 font-bold px-8 h-11 rounded-xl">
                                            Browse Domains
                                        </Button>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Essentials Grid */}
                    <AnimatePresence>
                        {availableEssentials.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4 pt-4"
                            >
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    Essentials
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {availableEssentials.map((opt) => (
                                        <motion.div
                                            key={opt.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-t ${opt.gradient} p-6 h-[220px] flex flex-col justify-between transition-all`}
                                        >
                                            {opt.renderVisual && opt.renderVisual()}

                                            <div className="relative z-10">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className={`p-1.5 rounded-lg text-white ${opt.iconBg}`}>
                                                        <opt.icon size={14} />
                                                    </div>
                                                    <span className="text-[11px] font-bold tracking-widest text-white uppercase">{opt.name}</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-white leading-tight mb-1">{opt.highlight}</h3>
                                                <p className="text-sm text-white/40">{opt.description}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-white font-bold">₹{opt.price}<span className="text-xs font-normal text-white/40">/mo</span></span>
                                                <Button
                                                    onClick={() => addToCart(opt)}
                                                    size="sm"
                                                    className="h-8 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black transition-colors font-medium border border-white/5"
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 space-y-6">
                        <div className="bg-[#131313] border border-white/10 rounded-3xl p-7">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                Order Summary
                                <span className="text-xs font-normal text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
                                    {cartItems.length} items
                                </span>
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-[15px]">
                                    <span className="text-white/60">Subtotal</span>
                                    <span className="text-white font-medium">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex items-center justify-between text-[15px]">
                                    <span className="text-white/60">Tax & Fees (18%)</span>
                                    <span className="text-white font-medium">₹{taxes.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>

                                <Separator className="bg-white/10 my-5" />

                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-white">Total</span>
                                    <div className="text-right">
                                        <span className="block text-xl font-bold text-white tracking-tight">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-8 space-y-4">
                                <Button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full h-14 bg-indigo-600 text-white hover:bg-indigo-700 font-semibold text-lg rounded-xl transition-all active:scale-[0.98] relative overflow-hidden"
                                >
                                    {isCheckingOut ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="animate-spin" size={20} />
                                        </div>
                                    ) : (
                                        <>
                                            Checkout
                                            <ArrowRight size={20} className="ml-2" />
                                        </>
                                    )}
                                </Button>

                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="bg-[#131313] border border-white/10 rounded-3xl p-6">
                            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <Tag size={14} className="text-white/60" />
                                Promo Code
                            </h4>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter code"
                                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-white/5 h-10 rounded-xl"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <Button variant="outline" className="border-white/10 hover:bg-white/90 text-black hover:text-black shrink-0 h-10 rounded-xl font-medium">
                                    Apply
                                </Button>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="px-2 flex items-start gap-3">
                            <Info className="text-white/20 shrink-0 mt-0.5" size={14} />
                            <p className="text-xs text-white/30 leading-relaxed font-medium">
                                By proceeding, you agree to our Terms of Service. Domain transfers usually take 5-7 days.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Checkout Drawer Overlay & Sidebar */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity cursor-not-allowed"
                        onClick={closeDrawer}
                    />
                )}

                {isDrawerOpen && (
                    <motion.div
                        key="drawer"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0f0f10] border-l border-white/[0.08] z-[100] shadow-2xl"
                    >
                        <PaymentInterface onClose={closeDrawer} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function CartPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <CartContent />
        </React.Suspense>
    );
}


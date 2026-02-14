"use client";

import React, { useState } from "react";
import {
    X,
    CreditCard,
    MapPin,
    ChevronDown,
    Lock,
    Wallet,
    Globe,
    Landmark,
    Smartphone,
    Loader2
} from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 24
        }
    }
};
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface PaymentMethod {
    id: string;
    type: "Card" | "UPI" | "NetBanking" | "Wallet";
    title: string;
    subtitle: string;
    icon: React.ElementType;
}

const paymentMethods: PaymentMethod[] = [
    { id: "1", type: "Card", title: "**** 1478 · Ripun Basumatary", subtitle: "Visa · Default", icon: CreditCard },
    { id: "2", type: "Card", title: "**** 8821 · Ripun Basumatary", subtitle: "Mastercard", icon: CreditCard },
    { id: "3", type: "Wallet", title: "Apple Pay", subtitle: "Digital Wallet", icon: Wallet },
];

interface Address {
    id: string;
    address: string;
    label: string;
}

const addresses: Address[] = [
    { id: "1", address: "Ripun Khaniram Boro Pathghy, Garchuk", label: "Home" },
    { id: "2", address: "Ganeshguri, Guwahati, Assam 781006", label: "Office" },
];

export default function PaymentInterface({ onClose }: { onClose: () => void }) {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(paymentMethods[0]);
    const [selectedAddress, setSelectedAddress] = useState<Address>(addresses[0]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            onClose();
        }, 2000);
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="h-full bg-[#000] text-white flex flex-col relative z-50"
        >
            {/* HEADER */}
            <motion.div variants={itemVariants} className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#000]/80 backdrop-blur-xl sticky top-0 z-20">
                <h1 className="text-lg font-semibold tracking-tight">Checkout</h1>
                <button
                    onClick={onClose}
                    className="p-2 -mr-2 text-white/40 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                >
                    <X size={20} />
                </button>
            </motion.div>

            {/* SCROLL CONTENT */}
            <motion.div variants={itemVariants} className="flex-1 overflow-y-auto custom-scrollbar">
                {/* ITEM */}
                <div className="px-6 py-6 border-b border-white/5 space-y-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="font-semibold text-base mb-0.5">reglook.com</p>
                            <p className="text-sm text-white/40">
                                Domain registration · 1 year
                            </p>
                        </div>
                        <p className="font-semibold text-lg">₹2,878.66</p>
                    </div>
                    <p className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded inline-block font-medium border border-indigo-500/10">
                        Renewal price ₹3,499.00
                    </p>
                </div>


                {/* PAYMENT METHOD */}
                <div className="px-6 py-6 space-y-3">
                    <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">
                        Payment method
                    </p>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="w-full rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-black transition-all px-4 py-4 flex items-center justify-between group outline-none">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform">
                                    <selectedMethod.icon size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-white/90">
                                        {selectedMethod.title}
                                    </p>
                                    <p className="text-xs text-white/40 font-medium">
                                        {selectedMethod.subtitle}
                                    </p>
                                </div>
                            </div>
                            <ChevronDown size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[380px] bg-[#000] border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/40 z-[200]"
                            align="start"
                        >
                            {/* SAVED */}
                            <Section label="Saved payment methods">
                                {paymentMethods
                                    .filter(m => m.type === "Card")
                                    .map(method => (
                                        <MethodRow
                                            key={method.id}
                                            method={method}
                                            selected={selectedMethod.id === method.id}
                                            onSelect={() => setSelectedMethod(method)}
                                        />
                                    ))}
                            </Section>

                            {/* ADD NEW */}
                            <DropdownMenuItem
                                className="mt-10 rounded-xl p-3 text-sm font-semibold justify-center
               bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                            >
                                + Add new payment method
                            </DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenu>

                    {/* Supported methods badges */}
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                        {["Visa", "Mastercard", "Amex", "Apple Pay", "UPI"].map((m) => (
                            <span key={m} className="text-[10px] text-white/40 bg-white/[0.02] border border-white/5 px-2 py-1 rounded-md">{m}</span>
                        ))}
                    </div>
                </div>

                {/* INVOICE ADDRESS */}
                <div className="px-6 py-6 space-y-3 border-t border-white/5">
                    <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">
                        Invoice address <span className="opacity-50 lowercase font-normal">(optional)</span>
                    </p>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="w-full rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-black transition-all px-4 py-4 flex items-center justify-between group outline-none">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform">
                                    <MapPin size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-white/90 truncate w-56">
                                        {selectedAddress.address}
                                    </p>
                                    <p className="text-xs text-white/40 font-medium">
                                        {selectedAddress.label}
                                    </p>
                                </div>
                            </div>
                            <ChevronDown size={16} className="text-white/30 group-hover:text-white/60 transition-colors" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[380px] bg-[#000] border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/40 z-[200]"
                            align="start"
                        >
                            <Section label="Saved addresses">
                                {addresses.map((address) => (
                                    <AddressRow
                                        key={address.id}
                                        address={address}
                                        selected={selectedAddress.id === address.id}
                                        onSelect={() => setSelectedAddress(address)}
                                    />
                                ))}
                            </Section>

                            <DropdownMenuItem
                                className="mt-4 rounded-xl p-3 text-sm font-semibold justify-center
                                bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                            >
                                + Add new address
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </motion.div>

            {/* PRICE SUMMARY Footer */}
            <motion.div variants={itemVariants} className="mt-auto px-6 py-6 border-t border-white/5 space-y-4 bg-[#0f0f10] z-20">
                <div className="space-y-2 text-xs font-medium text-white/40">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹2,878.66</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax & Fees (18%)</span>
                        <span>₹518.16</span>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <span className="text-lg font-semibold tracking-tight">Total due</span>
                    <div className="text-right">
                        <span className="text-2xl font-bold tracking-tight text-white">
                            ₹3,396.82
                        </span>
                    </div>
                </div>

                <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full h-12 rounded-full bg-white text-black hover:bg-white/90 font-bold text-lg shadow-lg shadow-white/5 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isProcessing ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="animate-spin" size={20} />
                            <span>Processing...</span>
                        </div>
                    ) : (
                        "Pay now"
                    )}
                </Button>

                <p className="text-[11px] text-white/30 flex items-center justify-center gap-1.5 font-medium">
                    <Lock size={10} />
                    Payments are secure and encrypted
                </p>
            </motion.div>
        </motion.div>
    );
}


function Section({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="px-1">
            <p className="px-3 py-2 text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                {label}
            </p>
            <div className="space-y-1">{children}</div>
        </div>
    );
}



function MethodRow({
    method,
    selected,
    onSelect,
}: {
    method: PaymentMethod;
    selected: boolean;
    onSelect: () => void;
}) {
    const Icon = method.icon;

    return (
        <DropdownMenuItem
            onClick={onSelect}
            className={cn(
                "group flex items-center justify-between rounded-2xl px-4 py-3.5 cursor-pointer transition-colors",
                "focus:outline-none data-[highlighted]:bg-[#1a1a1a] data-[highlighted]:text-white",
                selected
                    ? "bg-[#1a1a1a] text-white"
                    : "bg-transparent hover:bg-[#1a1a1a]/70 text-white/85"
            )}

        >
            {/* Left */}
            <div className="flex items-center gap-4">
                <div
                    className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center transition-colors",
                        selected
                            ? "bg-white/10 text-white"
                            : "bg-white/5 text-white/50 group-hover:text-white/70"
                    )}
                >
                    <Icon size={16} />
                </div>

                <div className="flex flex-col leading-tight">
                    <span className="text-sm font-medium tracking-tight">
                        {method.title}
                    </span>
                    <span
                        className={cn(
                            "text-[11px]",
                            selected ? "text-white/50" : "text-white/35"
                        )}
                    >
                        {method.subtitle}
                    </span>
                </div>
            </div>
        </DropdownMenuItem>
    );
}

function AddressRow({
    address,
    selected,
    onSelect,
}: {
    address: Address;
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <DropdownMenuItem
            onClick={onSelect}
            className={cn(
                "group flex items-center justify-between rounded-2xl px-4 py-3.5 cursor-pointer transition-colors",
                "focus:outline-none data-[highlighted]:bg-[#1a1a1a] data-[highlighted]:text-white",
                selected
                    ? "bg-[#1a1a1a] text-white"
                    : "bg-transparent hover:bg-[#1a1a1a]/70 text-white/85"
            )}
        >
            {/* Left */}
            <div className="flex items-center gap-4">
                <div
                    className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center transition-colors",
                        selected
                            ? "bg-white/10 text-white"
                            : "bg-white/5 text-white/50 group-hover:text-white/70"
                    )}
                >
                    <MapPin size={16} />
                </div>

                <div className="flex flex-col leading-tight">
                    <span className="text-sm font-medium tracking-tight truncate w-64">
                        {address.address}
                    </span>
                    <span
                        className={cn(
                            "text-[11px]",
                            selected ? "text-white/50" : "text-white/35"
                        )}
                    >
                        {address.label}
                    </span>
                </div>
            </div>
        </DropdownMenuItem>
    );
}


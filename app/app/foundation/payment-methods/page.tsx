"use client";

import React from "react";
import Image from "next/image";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    CreditCard,
    Plus,
    Calendar,
    ChevronDown,
    User,
    MailCheck,
    ShieldCheck,
    Lock,
    Settings,
    Trash2,
    Star,
    AlertCircle,
    MoreHorizontal,
    ExternalLink,
    Banknote,
    FileText,
    Download,
    X,
    Loader2
} from "lucide-react";
import { AddPaymentMethodModal } from "@/components/foundation/add-payment-method-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function RemovalRequestModal({ isOpen, onClose, onSubmit, isSubmitting }: { isOpen: boolean; onClose: () => void; onSubmit: (reason: string) => void; isSubmitting: boolean }) {
    const [reason, setReason] = React.useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#18181b] border border-zinc-800 w-full max-w-md p-6 rounded-xl shadow-2xl"
            >
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white">Request Payment Method Removal</h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                <p className="text-sm text-zinc-400 mb-4">
                    For security and billing integrity, we manually review payment method removal requests. Please tell us why you want to remove this method.
                </p>
                <div className="mb-6">
                    <label className="text-xs font-semibold text-zinc-300 mb-2 block">Reason for removal</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="e.g., Card expired, Changed banks, etc."
                        className="w-full bg-[#0f0f10] border border-zinc-700 rounded-lg p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500/50 min-h-[100px]"
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onSubmit(reason)}
                        disabled={!reason.trim() || isSubmitting}
                        className="bg-red-900 hover:bg-red-900/50 font-semibold cursor-pointer text-white"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

function VerificationNoticeModal({ isOpen, onClose, onConfirm, isLoading }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; isLoading: boolean }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#18181b] border border-zinc-800 w-full max-w-md p-6 rounded-3xl shadow-2xl"
            >
                <div className="flex items-start gap-4 mb-4">

                    <div>
                        <h3 className="text-lg font-bold text-white">Before you continue</h3>
                    </div>
                    <button onClick={onClose} className="ml-auto text-zinc-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4 mb-6">
                    <p className="text-sm text-zinc-300">
                        To verify your payment method, we'll place a temporary <br /><span className="text-white font-bold">$1 USD authorization</span> on your payment method.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-zinc-400">
                            <ShieldCheck size={16} className="text-emerald-500 mt-0.5" />
                            <span>This is not a charge</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-zinc-400">
                            <ShieldCheck size={16} className="text-emerald-500 mt-0.5" />
                            <span>The amount is not captured</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-zinc-400">
                            <ShieldCheck size={16} className="text-emerald-500 mt-0.5" />
                            <span>It will automatically disappear from your statement</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-zinc-400">
                            <ShieldCheck size={16} className="text-emerald-500 mt-0.5" />
                            <span>Reglook never receives this money</span>
                        </li>
                    </ul>
                    <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                        <p className="text-xs text-zinc-500">
                            If you'd prefer to avoid the verification step, you can also add a payment method by purchasing one of our services and ticking “Save payment method” during checkout.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="bg-emerald-900 hover:bg-emerald-900/50 cursor-pointer text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
                        {isLoading ? "Initiating..." : "I Understand, Continue"}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}

function PaymentMethodsContent() {
    const [paymentMethods, setPaymentMethods] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState("saved");
    const [expandedMethods, setExpandedMethods] = React.useState<string[]>([]);
    const [removalModal, setRemovalModal] = React.useState<{ isOpen: boolean; methodId: string | null; isSubmitting: boolean }>({ isOpen: false, methodId: null, isSubmitting: false });
    const [verificationModalOpen, setVerificationModalOpen] = React.useState(false);
    const [isVerificationLoading, setIsVerificationLoading] = React.useState(false);
    const { api } = require("@/lib/api");
    const { initializePaddle } = require("@paddle/paddle-js");

    // Fetch Payment Methods
    React.useEffect(() => {
        if (activeTab === "saved") {
            setLoading(true);
            api.billing.getPaymentMethods()
                .then((data: any) => setPaymentMethods(data))
                .catch((err: any) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [activeTab]);

    const handleSubmitRemoval = async (reason: string) => {
        if (!removalModal.methodId) return;
        setRemovalModal(prev => ({ ...prev, isSubmitting: true }));
        try {
            await api.billing.requestPaymentMethodRemoval(removalModal.methodId, reason);
            // Refresh
            setLoading(true);
            api.billing.getPaymentMethods()
                .then((data: any) => setPaymentMethods(data))
                .finally(() => setLoading(false));

            setRemovalModal({ isOpen: false, methodId: null, isSubmitting: false });
        } catch (e: any) {
            alert(e.message);
            setRemovalModal(prev => ({ ...prev, isSubmitting: false }));
        }
    };

    const handleAddPaymentMethod = () => {
        setVerificationModalOpen(true);
    };

    const confirmAddPaymentMethod = async () => {
        setIsVerificationLoading(true);
        try {
            // 1. Get auth token
            const { customerAuthToken } = await api.billing.getCustomerAuthToken();

            // 2. Create setup transaction
            const { transactionId } = await api.billing.createPaymentMethodSetupCheckout();

            // 3. Initialize Paddle
            const paddle = await initializePaddle({
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'test_6945f1e1edbcfc7b8a9885e117e',
                environment: 'sandbox',
                eventCallback: (event: any) => {
                    if (event.name === 'checkout.closed') {
                        // Refetch
                        setLoading(true);
                        api.billing.getPaymentMethods()
                            .then((data: any) => setPaymentMethods(data))
                            .catch(console.error)
                            .finally(() => setLoading(false));
                    }
                }
            });

            if (paddle) {
                setVerificationModalOpen(false);
                paddle.Checkout.open({
                    transactionId,
                    customerAuthToken,
                    settings: {
                        variant: 'one-page',
                        allowLogout: false,
                        showAddDiscounts: false,
                        showAddTaxId: false,
                        theme: 'dark',
                        allowedPaymentMethods: ["saved_payment_methods", "card", "paypal"],
                    },
                });
            }
        } catch (e) {
            console.error(e);
            alert("Failed to initialize verification checkout");
        } finally {
            setIsVerificationLoading(false);
        }
    };

    // Mock Invoices Data
    const invoices = [
        { id: "inv-2024-001", date: "Jan 01, 2024", amount: "$14.00", status: "Paid", description: "Pro Plan Subscription" },
        { id: "inv-2023-012", date: "Dec 01, 2023", amount: "$14.00", status: "Paid", description: "Pro Plan Subscription" },
        { id: "inv-2023-011", date: "Nov 01, 2023", amount: "$14.00", status: "Paid", description: "Pro Plan Subscription" },
    ];

    const toggleExpand = (id: string) => {
        setExpandedMethods(prev =>
            prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
        );
    };

    const ThemeColor = "#004030"; // Dark Green Theme (as requested)

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip (Always Visible) - Theme Color #004030 */}
            <div className={`w-full bg-[${ThemeColor}] py-6 shadow-md z-10 transition-colors duration-300`}>
                <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-4">
                            <Link href="/foundation">
                                <Button className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-10 w-10">
                                    <ArrowLeft size={22} />
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                                    <CreditCard className="text-white" size={22} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Payment Methods</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            {/* <Button className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">Billing History</span>
                                <ExternalLink size={16} />
                            </Button> */}
                            <Button className="text-white/80 bg-white/10 hover:text-white hover:bg-white/10 rounded-full h-10 w-10">
                                <HelpCircle size={22} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-8 flex-1">
                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 w-full">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                            <Input
                                placeholder="Search payment methods..."
                                className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all shadow-sm"
                            />
                        </div>
                    </div>
                    {/* Add New Button */}
                    <div className="flex justify-end">
                        <Button
                            onClick={handleAddPaymentMethod}
                            className="bg-[#1c1c1f] hover:bg-[#27272a] text-white border border-zinc-800 flex items-center gap-2 cursor-pointer"
                        >
                            <Plus size={16} /> Add Payment Method
                        </Button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "saved" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Saved Methods
                    </button>
                    {/* <button
                        onClick={() => setActiveTab("billing")}
                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "billing" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Billing Invoices
                    </button> */}
                </div>

                {/* Content Area Based on Tab */}
                {activeTab === "saved" ? (
                    <div className="w-full">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <span className="text-zinc-500">Loading payment methods...</span>
                            </div>
                        ) : paymentMethods.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-zinc-800 rounded-xl bg-[#1c1c1f]/30 gap-4 text-center p-8">
                                <CreditCard size={48} className="text-zinc-600 mb-2" />
                                <h3 className="text-lg font-semibold text-white">No saved payment methods</h3>
                                <p className="text-sm text-zinc-500 max-w-sm">
                                    To prevent abuse, we verify payment methods with a small one-time charge.
                                </p>
                                <Button
                                    onClick={handleAddPaymentMethod}
                                    className="mt-2 bg-[#1c1c1f] hover:bg-[#27272a] text-white border border-zinc-800 flex items-center gap-2 cursor-pointer"
                                >
                                    <Plus size={16} /> Add Payment Method
                                </Button>
                            </div>
                        ) : (
                            <div className="w-full">
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                                    <div className="col-span-4 text-sm font-semibold text-zinc-400">Card / Method</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400">Expires</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400">Type</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400 text-right">Actions</div>
                                </div>

                                {/* Table Rows */}
                                <div className="space-y-2">
                                    {paymentMethods.map((method, index) => (
                                        <React.Fragment key={method.id}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={() => toggleExpand(method.id)}
                                                className={`grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 cursor-pointer ${expandedMethods.includes(method.id) ? "bg-[#1c1c1f] border-zinc-800" : "bg-[#1c1c1f]/30"}`}
                                            >
                                                <div className="col-span-4 flex items-center gap-4">
                                                    <div className="w-12 h-8 rounded-none flex items-center justify-center overflow-hidden relative">
                                                        {(() => {
                                                            const brand = method.brand?.toLowerCase();
                                                            const brandMap: Record<string, string> = {
                                                                visa: "visa",
                                                                mastercard: "mastercard",
                                                                amex: "american-express",
                                                                american_express: "american-express",
                                                                paypal: "paypal",
                                                                apple_pay: "apple-pay",
                                                                google_pay: "google-pay",
                                                            };

                                                            const iconName = brandMap[brand];

                                                            return iconName ? (
                                                                <Image
                                                                    src={`/pay/${iconName}.svg`}
                                                                    alt={method.brand}
                                                                    width={50}
                                                                    height={34}
                                                                    className="w-full h-full object-contain p-1"
                                                                />
                                                            ) : (
                                                                <span className="text-zinc-400 font-bold text-xs">{method.brand}</span>
                                                            );
                                                        })()}
                                                    </div>
                                                    <div>
                                                        <span className="text-white font-bold text-sm block">{method.label}</span>
                                                        <span className="text-zinc-500 text-xs capitalize">{method.type}</span>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-zinc-300 text-sm font-medium">
                                                    {method.expiryMonth && method.expiryYear ? `${method.expiryMonth}/${method.expiryYear}` : '-'}
                                                </div>
                                                <div className="col-span-2">
                                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] font-bold">
                                                        SAVED
                                                    </Badge>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-zinc-400 text-xs">Reusable</span>
                                                </div>
                                                <div className="col-span-2 flex items-center justify-end z-10">
                                                    <Button variant="ghost" className={`h-8 w-8 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white p-0 flex items-center justify-center transition-transform ${expandedMethods.includes(method.id) ? "rotate-180" : ""}`}>
                                                        <ChevronDown size={16} />
                                                    </Button>
                                                </div>
                                            </motion.div>

                                            {expandedMethods.includes(method.id) && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden bg-[#161618] border-x border-b border-zinc-800 rounded-b-xl -mt-2 mb-2 mx-2 p-6"
                                                >
                                                    <div className="grid grid-cols-3 gap-8">
                                                        <div className="col-span-2 space-y-4">
                                                            <p className="text-white font-semibold text-sm">
                                                                A temporary $1 authorization was placed to verify your payment method. This is not a charge and the amount will automatically disappear from your statement. We never receive this money.
                                                            </p>
                                                        </div>
                                                        <div className="col-span-1 border-l border-zinc-800 pl-8 flex flex-col justify-center space-y-2">
                                                            {/* Status Badge of request */}
                                                            {method.removalRequestStatus === 'pending' ? (
                                                                <div className="w-full p-2 bg-[#004030] rounded-sm mb-2 text-center cursor-not-allowed">

                                                                    <div className="text-white text-xs font-semibold">
                                                                        Removal Pending
                                                                    </div>



                                                                </div>
                                                            ) : null}


                                                            <Button
                                                                onClick={() => setRemovalModal({ isOpen: true, methodId: method.id, isSubmitting: false })}
                                                                disabled={method.removalRequestStatus === 'pending'}
                                                                className={`w-full justify-center font-semibold cursor-pointer text-xs h-8 ${method.removalRequestStatus === 'pending' ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-red-900 hover:bg-red-900/50 text-white hover:text-white'}`}
                                                            >
                                                                <Trash2 size={14} className="mr-2" /> Request Removal
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Billing Info Tab */
                    <div className="w-full">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                            <div className="col-span-4 text-sm font-semibold text-zinc-400">Description</div>
                            <div className="col-span-2 text-sm font-semibold text-zinc-400">Date</div>
                            <div className="col-span-2 text-sm font-semibold text-zinc-400">Amount</div>
                            <div className="col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                            <div className="col-span-2 text-sm font-semibold text-zinc-400 text-right">Invoice</div>
                        </div>

                        {/* Table Rows */}
                        <div className="space-y-1">
                            {invoices.map((invoice, index) => (
                                <motion.div
                                    key={invoice.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 bg-[#1c1c1f]/30"
                                >
                                    <div className="col-span-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-[#004030]/20 flex items-center justify-center text-[#004030]">
                                            <FileText size={16} className="text-[#00c996]" />
                                        </div>
                                        <div>
                                            <span className="text-white font-bold text-sm block">{invoice.description}</span>
                                            <span className="text-zinc-500 text-[10px] uppercase tracking-wider">{invoice.id}</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-zinc-300 text-sm font-medium">
                                        {invoice.date}
                                    </div>
                                    <div className="col-span-2 text-white font-bold text-sm">
                                        {invoice.amount}
                                    </div>
                                    <div className="col-span-2">
                                        <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] font-bold">
                                            {invoice.status.toUpperCase()}
                                        </Badge>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-end">
                                        <Button variant="ghost" className="h-8 w-8 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white p-0 flex items-center justify-center">
                                            <Download size={16} />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>


            {/* Removal Request Modal */}
            <AnimatePresence>
                {removalModal.isOpen && (
                    <RemovalRequestModal
                        isOpen={removalModal.isOpen}
                        onClose={() => setRemovalModal({ isOpen: false, methodId: null, isSubmitting: false })}
                        onSubmit={handleSubmitRemoval}
                        isSubmitting={removalModal.isSubmitting}
                    />
                )}
            </AnimatePresence>
            {/* Verification Notice Modal */}
            <AnimatePresence>
                {verificationModalOpen && (
                    <VerificationNoticeModal
                        isOpen={verificationModalOpen}
                        onClose={() => setVerificationModalOpen(false)}
                        onConfirm={confirmAddPaymentMethod}
                        isLoading={isVerificationLoading}
                    />
                )}
            </AnimatePresence>
        </div >
    );
}

export default function PaymentMethodsPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <PaymentMethodsContent />
        </React.Suspense>
    );
}


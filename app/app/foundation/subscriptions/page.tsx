"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    RefreshCw,
    Filter,
    ChevronDown,
    Zap,
    Download,
    ExternalLink,
    Calendar,
    CreditCard,
    AlertCircle,
    CheckCircle2,
    PlayCircle,
    MoreHorizontal,
    PauseCircle,
    Loader2,
    Box
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader } from "@/components/global/loader";

export default function SubscriptionsPage() {
    // Real Subscriptions Data
    const [subscriptions, setSubscriptions] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState("active");
    const [expandedSubs, setExpandedSubs] = React.useState<string[]>([]);
    const { api } = require("@/lib/api");

    const STATUS_LABELS: Record<string, string> = {
        trialing: 'Trial',
        active: 'Active',
        past_due: 'Payment Issue',
        paused: 'Paused',
        cancelled: 'Cancelled',
        unknown: 'Unknown',
    };

    const loadSubscriptions = React.useCallback(async (isBackground = false) => {
        if (!isBackground) setLoading(true);
        try {
            const data = await api.billing.getSubscriptions();
            setSubscriptions(data);
        } catch (error) {
            console.error(error);
        } finally {
            if (!isBackground) setLoading(false);
        }
    }, [api]);

    React.useEffect(() => {
        loadSubscriptions();
    }, [loadSubscriptions]);

    const [processingAction, setProcessingAction] = React.useState<string | null>(null);

    const pollForUpdates = async () => {
        // Poll for 4 seconds to catch webhook updates, silent refresh
        for (let i = 0; i < 4; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await loadSubscriptions(true);
        }
    };

    const handlePause = async (id: string) => {
        setProcessingAction(`${id}-pause`);
        try {
            await api.billing.pauseSubscription(id);
            await pollForUpdates();
        } catch (e) {
            console.error(e);
            alert("Failed to pause subscription");
        } finally {
            setProcessingAction(null);
        }
    };

    const handleResume = async (id: string) => {
        setProcessingAction(`${id}-resume`);
        try {
            await api.billing.resumeSubscription(id);
            await pollForUpdates();
        } catch (e) {
            console.error(e);
            alert("Failed to resume subscription");
        } finally {
            setProcessingAction(null);
        }
    };

    const handleCancel = async (id: string) => {
        setProcessingAction(`${id}-cancel`);
        try {
            await api.billing.cancelSubscription(id);
            await pollForUpdates();
        } catch (e) {
            console.error(e);
            alert("Failed to cancel subscription");
        } finally {
            setProcessingAction(null);
        }
    };

    const handleUndo = async (id: string) => {
        setProcessingAction(`${id}-undo`);
        try {
            await api.billing.undoScheduledChange(id);
            await pollForUpdates();
        } catch (e) {
            console.error(e);
            alert("Failed to undo scheduled change");
        } finally {
            setProcessingAction(null);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedSubs(prev =>
            prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
        );
    };

    const ThemeColor = "#321E1E"; // Dark Red/Brown Theme

    const filteredSubscriptions = (activeTab === "active"
        ? subscriptions.filter(s => s.status !== "cancelled")
        : subscriptions.filter(s => s.status === "cancelled")
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">
            {/* ... Header ... */}
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
                                    <RefreshCw className="text-white" size={22} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Subscriptions</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Button className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">Billing History</span>
                                <ExternalLink size={16} />
                            </Button>
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
                                placeholder="Search subscriptions..."
                                className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-[320px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-rose-900 focus-visible:border-rose-900 transition-all shadow-sm"
                            />
                        </div>
                        <Button variant="outline" className="bg-[#1c1c1f] border-zinc-800 text-zinc-400 hover:text-white hover:bg-[#27272a] h-10 px-3">
                            <Filter size={16} className="mr-2" /> Filter
                        </Button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("active")}
                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "active" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Active Subscriptions
                    </button>
                    <button
                        onClick={() => setActiveTab("canceled")}
                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "canceled" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Canceled / Expired
                    </button>
                </div>

                {/* Content Area Based on Tab */}
                <div className="w-full">
                    {loading ? (
                        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                            <Loader size="lg" />
                        </div>
                    ) : subscriptions.length === 0 ? (
                        <div className="w-full h-64 flex items-center justify-center text-zinc-500">
                            No subscriptions found.
                        </div>
                    ) : (
                        <>
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                                <div className="col-span-4 text-sm font-semibold text-zinc-400">Service & Plan</div>
                                <div className="col-span-2 text-sm font-semibold text-zinc-400">Next Billing</div>
                                <div className="col-span-2 text-sm font-semibold text-zinc-400">Price</div>
                                <div className="col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                                <div className="col-span-2 text-sm font-semibold text-zinc-400 text-right">Actions</div>
                            </div>

                            {/* Table Rows */}
                            <div className="space-y-2">
                                {filteredSubscriptions.map((sub, index) => {
                                    const isScheduledForCancel = sub.isScheduledForCancel;
                                    const isScheduledForPause = sub.isScheduledForPause;
                                    const hasScheduledChange = isScheduledForCancel || isScheduledForPause;

                                    // Use currentPeriodEnd usually for scheduled date if not explicitly separated,
                                    // but we can assume 'effective' date is currentPeriodEnd for cancellation/pause at period end.
                                    // Presenter passes currentPeriodEnd.
                                    const scheduledDate = sub.currentPeriodEnd;
                                    const formattedScheduledDate = scheduledDate ? new Date(scheduledDate).toLocaleDateString() : 'End of period';

                                    let statusLabel = STATUS_LABELS[sub.status]?.toUpperCase() || sub.status.toUpperCase();
                                    let badgeClass = 'bg-zinc-500/10 text-zinc-500';

                                    if (isScheduledForCancel) {
                                        statusLabel = `CANCELLING ON ${formattedScheduledDate}`;
                                        badgeClass = 'bg-red-900 text-white';
                                    } else if (isScheduledForPause) {
                                        statusLabel = `PAUSING ON ${formattedScheduledDate}`;
                                        badgeClass = 'bg-amber-900 text-white';
                                    } else if (sub.isTrial) {
                                        statusLabel = 'TRIAL ACTIVE';
                                        badgeClass = 'bg-zinc-500/10 text-white';
                                    } else if (sub.status === 'active') {
                                        badgeClass = 'bg-emerald-900 text-white';
                                    } else if (sub.status === 'past_due') {
                                        badgeClass = 'bg-red-900 text-white';
                                    }

                                    return (
                                        <React.Fragment key={sub.id}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={() => toggleExpand(sub.id)}
                                                className={`grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 cursor-pointer ${expandedSubs.includes(sub.id) ? "bg-[#1c1c1f] border-zinc-800" : "bg-[#1c1c1f]/30"}`}
                                            >
                                                <div className="col-span-4 flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded bg-[#1c1c1f]/70 flex items-center justify-center text-[#d19d9d] border border-[#1c1c1f]`}>
                                                        <Box size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="text-white font-bold text-sm block">{sub.service === 'xcloud' ? 'xCloud Hosting' : sub.service}</span>
                                                        <span className="text-zinc-500 text-xs">{sub.plan}</span>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-zinc-300 text-sm font-medium">
                                                    {sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString() : '-'}
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-white font-bold text-sm block">
                                                        {sub.price ? (
                                                            <>
                                                                {sub.price.currency === 'USD' ? '$' : sub.price.currency}
                                                                {(parseFloat(sub.price.amount) / 100).toFixed(2)}
                                                            </>
                                                        ) : '—'}
                                                    </span>
                                                    <span className="text-zinc-500 text-xs text-zinc-500/70 uppercase">
                                                        {sub.price ? (
                                                            `/${sub.price.interval === 'month' ? 'MONTHLY' : sub.price.interval}`
                                                        ) : '/MONTHLY'}
                                                    </span>
                                                </div>
                                                <div className="col-span-2">
                                                    <Badge className={`${badgeClass} border-0 text-[10px] font-bold relative overflow-hidden`}>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
                                                        <span className="relative z-10">{statusLabel}</span>
                                                    </Badge>
                                                </div>
                                                <div className="col-span-2 flex items-center justify-end z-10 gap-2">
                                                    {sub.isActive && !isScheduledForCancel && !isScheduledForPause && (
                                                        <Button variant="ghost" className="h-8 w-8 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white p-0">
                                                            <MoreHorizontal size={16} />
                                                        </Button>
                                                    )}
                                                    <Button variant="ghost" className={`h-8 w-8 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white p-0 flex items-center justify-center transition-transform ${expandedSubs.includes(sub.id) ? "rotate-180" : ""}`}>
                                                        <ChevronDown size={16} />
                                                    </Button>
                                                </div>
                                            </motion.div>

                                            {expandedSubs.includes(sub.id) && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden bg-[#161618] border-x border-b border-zinc-800 rounded-b-xl -mt-2 mb-2 mx-2 p-6"
                                                >
                                                    <div className="flex flex-col gap-6">
                                                        {hasScheduledChange && (
                                                            <div className="bg-red-900/50 border border-red-900 rounded-lg p-4 flex items-start gap-3">
                                                                <AlertCircle size={20} className="text-[#fff] mt-0.5" />
                                                                <div>
                                                                    <h4 className="text-[#fff] font-semibold text-sm">Scheduled Change Pending</h4>
                                                                    <p className="text-[#fff]/80 text-xs mt-1">
                                                                        This subscription is scheduled to be {isScheduledForCancel ? 'canceled' : 'paused'} on {formattedScheduledDate}. You can undo this before the effective date.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {sub.isTrial && !hasScheduledChange && (
                                                            <div className="bg-[#321e1e] border border-[#321e1e]/20 rounded-lg p-4 flex items-start gap-3">
                                                                <CheckCircle2 size={20} className="text-[#fff] mt-0.5" />
                                                                <div>
                                                                    <h4 className="text-[#fff] font-semibold text-sm">Trial in progress</h4>
                                                                    <p className="text-[#fff]/80 text-xs mt-1">
                                                                        This subscription will activate automatically on {new Date(sub.currentPeriodEnd).toLocaleDateString()}. Pausing is not available during trial.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="grid grid-cols-3 gap-8">
                                                            <div className="col-span-2 space-y-4">
                                                                <div className="grid grid-cols-2 gap-6">
                                                                    <div>
                                                                        <h4 className="text-zinc-500 text-xs font-semibold mb-1">Subscription ID</h4>
                                                                        <p className="text-white text-sm font-medium">{sub.id}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="text-zinc-500 text-xs font-semibold mb-1">Status Check</h4>
                                                                        <div className="flex items-center gap-2">
                                                                            <div className={`h-2 w-2 rounded-full ${sub.isTrial ? 'bg-white' : sub.status === 'active' ? 'bg-white' : sub.status === 'paused' ? 'bg-white' : 'bg-white'}`} />
                                                                            <p className="text-white text-sm font-medium">
                                                                                {sub.isTrial ? "Trial Active" : sub.status === 'active' ? "Active" : sub.status === 'paused' ? "Paused" : "Inactive"}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-zinc-500 text-xs font-semibold mb-1">Payment Method</h4>
                                                                    <div className="flex items-center gap-2 text-white text-sm">
                                                                        {(() => {
                                                                            const pm = sub.paymentMethod || '';
                                                                            const lowerPm = pm.toLowerCase();
                                                                            let logoSrc = null;

                                                                            if (lowerPm.includes('visa')) logoSrc = '/pay/visa.svg';
                                                                            else if (lowerPm.includes('mastercard')) logoSrc = '/pay/mastercard.svg';
                                                                            else if (lowerPm.includes('american express') || lowerPm.includes('amex')) logoSrc = '/pay/american-express.svg';
                                                                            else if (lowerPm.includes('paypal')) logoSrc = '/pay/paypal.svg';
                                                                            else if (lowerPm.includes('apple pay')) logoSrc = '/pay/apple-pay.svg';
                                                                            else if (lowerPm.includes('google pay')) logoSrc = '/pay/google-pay.svg';

                                                                            if (logoSrc) {
                                                                                return <img src={logoSrc} alt="Payment Method" width={24} height={16} className="h-4 w-auto object-contain" />;
                                                                            }
                                                                            return <CreditCard size={14} className="text-zinc-400" />;
                                                                        })()}
                                                                        <span>{sub.paymentMethod}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-1 border-l border-zinc-800 pl-8 flex flex-col justify-center space-y-2">
                                                                {/* Helper to check if processing */}


                                                                {isScheduledForCancel ? (
                                                                    <Button
                                                                        onClick={() => handleUndo(sub.id)}
                                                                        disabled={processingAction === `${sub.id}-undo`}
                                                                        className="w-full justify-center font-semibold text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        {processingAction === `${sub.id}-undo` ? <Loader2 size={14} className="mr-2 animate-spin" /> : <RefreshCw size={14} className="mr-2" />}
                                                                        Undo Cancellation
                                                                    </Button>
                                                                ) : isScheduledForPause ? (
                                                                    <Button
                                                                        onClick={() => handleUndo(sub.id)}
                                                                        disabled={processingAction === `${sub.id}-undo`}
                                                                        className="w-full justify-center font-semibold text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        {processingAction === `${sub.id}-undo` ? <Loader2 size={14} className="mr-2 animate-spin" /> : <RefreshCw size={14} className="mr-2" />}
                                                                        Undo Pause
                                                                    </Button>
                                                                ) : sub.isPaused ? (
                                                                    <Button
                                                                        onClick={() => handleResume(sub.id)}
                                                                        disabled={processingAction === `${sub.id}-resume`}
                                                                        className="w-full justify-center font-semibold cursor-pointer text-xs h-8 bg-emerald-900/20 hover:bg-emerald-900/40 text-emerald-500 hover:text-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        {processingAction === `${sub.id}-resume` ? <Loader2 size={14} className="mr-2 animate-spin" /> : <PlayCircle size={14} className="mr-2" />}
                                                                        Resume Subscription
                                                                    </Button>
                                                                ) : sub.status === 'active' || sub.isTrial ? ( // Active (including trial)
                                                                    <>
                                                                        {/* Pause Button - Disabled during Trial */}
                                                                        <Button
                                                                            onClick={() => handlePause(sub.id)}
                                                                            disabled={sub.isTrial || processingAction === `${sub.id}-pause`}
                                                                            title={sub.isTrial ? 'Pausing is not available during trial' : undefined}
                                                                            className="w-full justify-center font-semibold cursor-pointer text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                                                        >
                                                                            {processingAction === `${sub.id}-pause` ? <Loader2 size={14} className="mr-2 animate-spin" /> : <PauseCircle size={14} className="mr-2" />}
                                                                            Pause Subscription
                                                                        </Button>

                                                                        {/* Cancel Button - Always available for active subs */}
                                                                        <Button
                                                                            onClick={() => handleCancel(sub.id)}
                                                                            disabled={processingAction === `${sub.id}-cancel`}
                                                                            className="w-full justify-center font-semibold cursor-pointer text-xs h-8 bg-red-900/20 hover:bg-red-900/40 text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                        >
                                                                            {processingAction === `${sub.id}-cancel` ? <Loader2 size={14} className="mr-2 animate-spin" /> : <AlertCircle size={14} className="mr-2" />}
                                                                            Cancel Subscription
                                                                        </Button>
                                                                    </>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>

                        </>
                    )}
                </div >
            </div >
        </div >
    );
}

"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    Receipt,
    Filter,
    ChevronDown,
    FileText,
    Download,
    ExternalLink,
    ShoppingBag,
    RefreshCw,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OrdersAndTransactionsPage() {
    const [activeTab, setActiveTab] = React.useState("orders");
    const [expandedOrders, setExpandedOrders] = React.useState<string[]>([]);
    const [data, setData] = React.useState<{ orders: any[], transactions: any[] } | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await import("@/lib/api").then(m => m.api.billing.getOrdersAndTransactions());
                setData(res);
            } catch (err) {
                console.error(err);
                setError("Failed to load orders and transactions.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleExpand = (id: string) => {
        setExpandedOrders(prev =>
            prev.includes(id) ? prev.filter(orderId => orderId !== id) : [...prev, id]
        );
    };

    const ThemeColor = "#452829"; // Dark Brown Theme

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">
                <RefreshCw className="animate-spin mr-2" /> Loading financial data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0f0f10] flex items-center justify-center text-red-400">
                {error}
            </div>
        );
    }

    const orders = data?.orders || [];
    const transactions = data?.transactions || [];

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip - Theme Color #452829 */}
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
                                    <Receipt className="text-white" size={22} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Orders & Transactions</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            {/* <Button className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">Export CSV</span>
                                <Download size={16} />
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
                                placeholder="Search orders, IDs, or items..."
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
                        onClick={() => setActiveTab("orders")}
                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "orders" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Order History
                    </button>
                    <button
                        onClick={() => setActiveTab("transactions")}
                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "transactions" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Transactions
                    </button>
                </div>

                {/* Content Area Based on Tab */}
                {activeTab === "orders" ? (
                    <div className="w-full">
                        {orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="p-4 bg-zinc-900 rounded-full mb-4">
                                    <ShoppingBag size={32} className="text-zinc-500" />
                                </div>
                                <h3 className="text-white text-lg font-bold">No orders yet</h3>
                                <p className="text-zinc-500 max-w-sm mt-2">When you purchase services or subscriptions, your orders will appear here.</p>
                            </div>
                        ) : (
                            <>
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                                    <div className="col-span-4 text-sm font-semibold text-zinc-400">Order ID & Items</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400">Date</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400">Total</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400 text-right">Details</div>
                                </div>

                                {/* Table Rows */}
                                <div className="space-y-1">
                                    {orders.map((order: any, index: number) => (
                                        <React.Fragment key={order.id}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={() => toggleExpand(order.id)}
                                                className={`grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 cursor-pointer ${expandedOrders.includes(order.id) ? "bg-[#1c1c1f] border-zinc-800" : "bg-[#1c1c1f]/30"}`}
                                            >
                                                <div className="col-span-4 flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded bg-[#452829]/30 flex items-center justify-center text-[#ff8f8f] border border-[#452829]">
                                                        <ShoppingBag size={18} />
                                                    </div>
                                                    <div>
                                                        <span className="text-white font-bold text-sm block">{order.id}</span>
                                                        <span className="text-zinc-500 text-xs truncate max-w-[200px] block">
                                                            {order.items && order.items.length > 0 ? (
                                                                <>
                                                                    {order.items[0].name} {order.items.length > 1 && `+ ${order.items.length - 1} more`}
                                                                </>
                                                            ) : "No items"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-zinc-300 text-sm font-medium">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="col-span-2 text-white font-bold text-sm">
                                                    {order.total}
                                                </div>
                                                <div className="col-span-2">
                                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] font-bold">
                                                        {order.status.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <div className="col-span-2 flex items-center justify-end z-10">
                                                    <Button variant="ghost" className={`h-8 w-8 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white p-0 flex items-center justify-center transition-transform ${expandedOrders.includes(order.id) ? "rotate-180" : ""}`}>
                                                        <ChevronDown size={16} />
                                                    </Button>
                                                </div>
                                            </motion.div>

                                            {expandedOrders.includes(order.id) && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden bg-[#161618] border-x border-b border-zinc-800 rounded-b-xl -mt-2 mb-2 mx-2 p-6"
                                                >
                                                    <div className="grid grid-cols-3 gap-8">
                                                        <div className="col-span-2 space-y-4">
                                                            <div>
                                                                <h4 className="text-zinc-500 text-xs font-bold mb-2">Order Items</h4>
                                                                <ul className="space-y-2">
                                                                    {order.items.map((item: any, i: number) => (
                                                                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                                                                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                                                                            {item.name} <span className="text-zinc-500 text-xs ml-auto">x{item.quantity}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div className="pt-2">
                                                                <h4 className="text-zinc-500 text-xs font-bold mb-1">Payment Method</h4>
                                                                <p className="text-white text-sm font-medium">{order.paymentMethodLabel}</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1 border-l border-zinc-800 pl-8 flex flex-col justify-center space-y-2">
                                                            {order.invoiceUrl && (
                                                                <Link href={order.invoiceUrl} target="_blank" className="w-full">
                                                                    <Button className="w-full justify-start text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white">
                                                                        <FileText size={14} className="mr-2" /> View Invoice
                                                                    </Button>
                                                                </Link>
                                                            )}
                                                            <Button className="w-full justify-start text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white">
                                                                <ExternalLink size={14} className="mr-2" /> Order Details
                                                            </Button>
                                                            <Button className="w-full justify-start text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white">
                                                                <RefreshCw size={14} className="mr-2" /> Buy Again
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    /* Transactions Tab */
                    <div className="w-full">
                        {transactions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="p-4 bg-zinc-900 rounded-full mb-4">
                                    <Receipt size={32} className="text-zinc-500" />
                                </div>
                                <h3 className="text-white text-lg font-bold">No transactions found</h3>
                                <p className="text-zinc-500 max-w-sm mt-2">Financial movements like payments and refunds will appear here.</p>
                            </div>
                        ) : (
                            <>
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                                    <div className="col-span-4 text-sm font-semibold text-zinc-400">Transaction Details</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400">Date</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400">Method</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400">Amount</div>
                                    <div className="col-span-2 text-sm font-semibold text-zinc-400 text-right">Receipt</div>
                                </div>

                                {/* Table Rows */}
                                <div className="space-y-1">
                                    {transactions.map((txn: any, index: number) => (
                                        <motion.div
                                            key={txn.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 bg-[#1c1c1f]/30"
                                        >
                                            <div className="col-span-4 flex items-center gap-3">
                                                <div className="w-9 h-9 rounded bg-[#452829]/20 flex items-center justify-center text-[#ff8f8f]">
                                                    {txn.amount.startsWith('+') ? <Clock size={16} /> : <Receipt size={16} />}
                                                </div>
                                                <div>
                                                    <span className="text-white font-bold text-sm block">{txn.description}</span>
                                                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider">{txn.id}</span>
                                                </div>
                                            </div>
                                            <div className="col-span-2 text-zinc-300 text-sm font-medium">
                                                {new Date(txn.createdAt).toLocaleDateString()}
                                            </div>
                                            <div className="col-span-2 text-zinc-300 text-sm">
                                                {txn.paymentMethodLabel}
                                            </div>
                                            <div className={`col-span-2 font-bold text-sm ${txn.amount.startsWith('+') ? 'text-emerald-500' : 'text-white'}`}>
                                                {txn.amount}
                                            </div>
                                            <div className="col-span-2 flex items-center justify-end">
                                                {txn.receiptUrl ? (
                                                    <Link href={txn.receiptUrl} target="_blank">
                                                        <Button variant="ghost" className="h-8 w-8 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white p-0 flex items-center justify-center">
                                                            <Download size={16} />
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <div className="w-8" />
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    FileText,
    Filter,
    ChevronDown,
    Download,
    Printer,
    DollarSign,
    Calendar,
    Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

export default function InvoicesAndTaxPage() {
    // Mock Invoices Data
    const invoices = [
        {
            id: "INV-2024-001",
            date: "Jan 01, 2024",
            amount: "$29.00",
            status: "Paid",
            description: "Monthly Hosting Subscription",
            items: ["Reglook Pro Hosting (Business Plan)"]
        },
        {
            id: "INV-2023-156",
            date: "Dec 01, 2023",
            amount: "$150.00",
            status: "Paid",
            description: "Annual SSL Renewal",
            items: ["SSL Wildcard Certificate (1 Year)"]
        },
        {
            id: "INV-2023-142",
            date: "Nov 01, 2023",
            amount: "$12.00",
            status: "Paid",
            description: "Domain Privacy",
            items: ["Domain Privacy Guard (Annual)"]
        },
        {
            id: "INV-2023-128",
            date: "Oct 01, 2023",
            amount: "$29.00",
            status: "One-off",
            description: "Domain Registration",
            items: ["newstartups.io Registration"]
        }
    ];

    // Mock Tax Documents Data
    const taxDocuments = [
        {
            id: "TAX-2023-GST",
            year: "2023",
            type: "GST Invoice Summary",
            dateIssued: "Jan 10, 2024",
            description: "Consolidated GST Statement for FY 2023-24"
        },
        {
            id: "TAX-2023-1099",
            year: "2023",
            type: "Form 1099-K",
            dateIssued: "Jan 25, 2024",
            description: "Payment Card and Third Party Network Transactions"
        }
    ];

    const [activeTab, setActiveTab] = React.useState("invoices");
    const [expandedIds, setExpandedIds] = React.useState<string[]>([]);

    const toggleExpand = (id: string) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const ThemeColor = "#4F0E0E"; // Dark Red/Maroon Theme

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip - Theme Color #4F0E0E */}
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
                                    <FileText className="text-white" size={22} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Invoices & Tax</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Button className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">Export All</span>
                                <Download size={16} />
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
                                placeholder={activeTab === 'invoices' ? "Search invoices..." : "Search tax documents..."}
                                className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-[320px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-red-900 focus-visible:border-red-900 transition-all shadow-sm"
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
                        onClick={() => setActiveTab("invoices")}
                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "invoices" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Invoices
                    </button>
                    <button
                        onClick={() => setActiveTab("tax")}
                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "tax" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Tax Documents
                    </button>
                </div>

                {/* Content Area Based on Tab */}
                {activeTab === "invoices" ? (
                    <div className="w-full">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                            <div className="col-span-4 text-sm font-semibold text-zinc-400">Description</div>
                            <div className="col-span-2 text-sm font-semibold text-zinc-400">Date</div>
                            <div className="col-span-2 text-sm font-semibold text-zinc-400">Amount</div>
                            <div className="col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                            <div className="col-span-2 text-sm font-semibold text-zinc-400 text-right">Actions</div>
                        </div>

                        {/* Table Rows */}
                        <div className="space-y-1">
                            {invoices.map((inv, index) => (
                                <React.Fragment key={inv.id}>
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => toggleExpand(inv.id)}
                                        className={`grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 cursor-pointer ${expandedIds.includes(inv.id) ? "bg-[#1c1c1f] border-zinc-800" : "bg-[#1c1c1f]/30"}`}
                                    >
                                        <div className="col-span-4 flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded bg-[#1c1c1f]/70 flex items-center justify-center text-[#ff9e9e] border border-[#1c1c1f]`}>
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <span className="text-white font-bold text-sm block">{inv.description}</span>
                                                <span className="text-zinc-500 text-xs">{inv.id}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2 text-zinc-300 text-sm font-medium">
                                            {inv.date}
                                        </div>
                                        <div className="col-span-2 text-white font-bold text-sm">
                                            {inv.amount}
                                        </div>
                                        <div className="col-span-2">
                                            <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] font-bold">
                                                {inv.status.toUpperCase()}
                                            </Badge>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-end z-10 gap-2">
                                            <Button variant="ghost" className="h-8 w-8 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white p-0 flex items-center justify-center">
                                                <Download size={16} />
                                            </Button>
                                            <Button variant="ghost" className={`h-8 w-8 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white p-0 flex items-center justify-center transition-transform ${expandedIds.includes(inv.id) ? "rotate-180" : ""}`}>
                                                <ChevronDown size={16} />
                                            </Button>
                                        </div>
                                    </motion.div>

                                    {expandedIds.includes(inv.id) && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden bg-[#161618] border-x border-b border-zinc-800 rounded-b-xl -mt-2 mb-2 mx-2 p-6"
                                        >
                                            <div className="grid grid-cols-3 gap-8">
                                                <div className="col-span-2 space-y-4">
                                                    <div>
                                                        <h4 className="text-zinc-500 text-xs font-bold mb-2">Line Items</h4>
                                                        <ul className="space-y-1">
                                                            {inv.items.map((item, i) => (
                                                                <li key={i} className="text-sm text-zinc-300 flex items-center gap-2">
                                                                    <div className="h-1 w-1 rounded-full bg-zinc-600" />
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-span-1 border-l border-zinc-800 pl-8 flex flex-col justify-center space-y-2">
                                                    <Button className="w-full justify-start text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white">
                                                        <Printer size={14} className="mr-2" /> Print Invoice
                                                    </Button>
                                                    <Button className="w-full justify-start text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white">
                                                        <Download size={14} className="mr-2" /> Download PDF
                                                    </Button>
                                                    <Button className="w-full justify-start text-xs h-8 bg-zinc-800 hover:bg-zinc-700 text-white">
                                                        <DollarSign size={14} className="mr-2" /> View Refund Policy
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Tax Documents Tab */
                    <div className="w-full">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                            <div className="col-span-5 text-sm font-semibold text-zinc-400">Document Type</div>
                            <div className="col-span-3 text-sm font-semibold text-zinc-400">Tax Year</div>
                            <div className="col-span-2 text-sm font-semibold text-zinc-400">Date Issued</div>
                            <div className="col-span-2 text-sm font-semibold text-zinc-400 text-right">Download</div>
                        </div>

                        {/* Table Rows */}
                        <div className="space-y-1">
                            {taxDocuments.map((doc, index) => (
                                <motion.div
                                    key={doc.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="grid grid-cols-12 gap-4 items-center px-4 py-4 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 bg-[#1c1c1f]/30"
                                >
                                    <div className="col-span-5 flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded bg-[#1c1c1f]/70 flex items-center justify-center text-[#ff9e9e] border border-[#1c1c1f]`}>
                                            <Briefcase size={18} />
                                        </div>
                                        <div>
                                            <span className="text-white font-bold text-sm block">{doc.type}</span>
                                            <span className="text-zinc-500 text-xs">{doc.description}</span>
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <Badge className="bg-zinc-800 text-zinc-300 border-0 text-[10px] font-bold">
                                            {doc.year}
                                        </Badge>
                                    </div>
                                    <div className="col-span-2 text-zinc-300 text-sm font-medium">
                                        {doc.dateIssued}
                                    </div>
                                    <div className="col-span-2 flex items-center justify-end">
                                        <Button className="h-8 px-3 bg-[#4F0E0E]/20 hover:bg-[#4F0E0E]/40 text-[#ff9e9e] border border-[#4F0E0E]/50 text-xs rounded-lg">
                                            Download PDF
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

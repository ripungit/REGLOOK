"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Check,
    ChevronRight,
    Copy,
    Globe,
    HelpCircle,
    Mail,
    RefreshCw,
    Shield,
    ShieldCheck,
    AlertTriangle,
    Loader2,
    CheckCircle2,
    Server,
    Play,
    SlidersHorizontal,
    ExternalLink,
    XCircle,
    Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader } from "@/components/global/loader";

// --- Types & Constants ---

type SetupStep =
    | "CONFIRMATION"
    | "METHOD_SELECTION"
    | "AUTO_CONFIG_RUNNING"
    | "MANUAL_RECORDS"
    | "VERIFICATION_LOOP"
    | "SUCCESS";

// Mock Data Generation based on domain
const getDomainInfo = (domain: string | null) => {
    const d = domain || "example.com";
    const isReglook = d.includes("reglook");

    return {
        name: d,
        registrar: isReglook ? "Reglook" : "GoDaddy", // Auto-detected simulation
        dnsProvider: isReglook ? "Reglook DNS" : "Cloudflare", // Auto-detected simulation
        isInternal: isReglook
    };
};

const REQUIRED_RECORDS = [
    { type: "MX", host: "@", value: "mx1.reglook.com", priority: 10, help: "Primary mail server." },
    { type: "MX", host: "@", value: "mx2.reglook.com", priority: 20, help: "Backup mail server." },
    { type: "MX", host: "@", value: "mx3.reglook.com", priority: 50, help: "Backup mail server." },
    { type: "TXT", host: "@", value: "v=spf1 include:reglook.com ~all", priority: null, help: "Prevents spammers from sending email on your behalf (SPF)." },
    { type: "TXT", host: "default._domainkey", value: "k=rsa; p=MIGfMA0GCSqGSIb3DQEBA...", priority: null, help: "Adds a digital signature to verify sender identity (DKIM)." },
    { type: "TXT", host: "_dmarc", value: "v=DMARC1; p=none; rua=mailto:dmarc@reglook.com", priority: null, help: "Tells receivers what to do if SPF/DKIM fail (DMARC)." },
];

function MailSetupContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const domainParam = searchParams.get("domain");

    const [step, setStep] = useState<SetupStep>("CONFIRMATION");
    const [domainInfo, setDomainInfo] = useState(getDomainInfo(domainParam));
    const [verificationProgress, setVerificationProgress] = useState(0);
    const [records, setRecords] = useState(REQUIRED_RECORDS.map(r => ({ ...r, status: "pending" })));

    // Update info if URL changes
    useEffect(() => {
        setDomainInfo(getDomainInfo(domainParam));
    }, [domainParam]);

    // --- Actions ---

    const handleContinueFromConfirmation = () => {
        // Decide path based on "Internal" vs "External"
        if (domainInfo.isInternal) {
            // Internal -> Show Auto-Config prompt (Method Selection for Internal is effectively "Click to Auto-Verify")
            // But per specs: "Case 1: User sees We can set everything up automatically". 
            // We'll treat this as immediate Method Selection UI specialized for internal.
            setStep("METHOD_SELECTION");
        } else {
            // External -> Show "Your domain is managed outside..."
            setStep("METHOD_SELECTION");
        }
    };

    const handleAutoConfigure = () => {
        setStep("AUTO_CONFIG_RUNNING");
        // Simulate auto-config checklist
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            if (progress >= 100) {
                clearInterval(interval);
                setStep("SUCCESS"); // Jump straight to success for auto-config as per "User never touches DNS" flow
            }
        }, 800);
    };

    const handleManualSetup = () => {
        setStep("MANUAL_RECORDS");
    };

    const startVerification = () => {
        setStep("VERIFICATION_LOOP");
        simulateVerification();
    };

    const simulateVerification = () => {
        // Simulate checking records over time
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setVerificationProgress(progress);

            // Randomly "verify" records
            setRecords(prev => prev.map(r => ({
                ...r,
                status: Math.random() > 0.4 || progress > 80 ? "verified" : r.status
            })));

            if (progress >= 100) {
                clearInterval(interval);
                setStep("SUCCESS");
            }
        }, 800);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    // --- Renderers ---

    return (
        <div className="min-h-screen bg-[#0f0f10] text-zinc-200 font-sans selection:bg-[#5a0e24] selection:text-white">

            {/* 1. Header Strip */}
            <div className="w-full bg-[#5A0E24] py-6 shadow-xl z-10 transition-colors duration-300 relative overflow-hidden">
                <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-10 w-10 transition-all active:scale-95"
                                onClick={() => router.push('/foundation/mail')}
                            >
                                <ArrowLeft size={22} />
                            </Button>
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/10 shadow-inner">
                                    <Mail className="text-white" size={22} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white tracking-tight leading-none">Mail Manager</h1>
                                    <p className="text-xs text-white font-medium mt-0.5 tracking-wide">SETUP WIZARD </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 text-xs font-semibold text-white/80 border border-white/10">
                                <Globe size={12} />
                                {domainInfo.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="w-full px-4 md:px-6 max-w-[1000px] mx-auto py-12 flex flex-col items-center justify-center min-h-[600px]">
                <AnimatePresence mode="wait">

                    {/* VIEW 1: CONFIRMATION (Domain Detection) */}
                    {step === "CONFIRMATION" && (
                        <motion.div
                            key="confirmation"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                            className="w-full max-w-2xl text-center"
                        >
                            <div className="mb-12">
                                <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Set up email for your domain</h2>
                                <p className="text-lg text-zinc-400">We've automatically detected your configuration.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative">

                                {/* Domain Info */}
                                <div className="relative z-10 flex flex-col items-center gap-4 group">
                                    <div className="w-16 h-16 rounded-2xl bg-[#1c1c1f] border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-500 group-hover:border-zinc-500/50 transition-all shadow-xl">
                                        <Globe size={32} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">DOMAIN</p>
                                        <p className="text-xl font-bold text-white tracking-tight">{domainInfo.name}</p>
                                    </div>
                                </div>

                                {/* DNS Provider */}
                                <div className="relative z-10 flex flex-col items-center gap-4 group">
                                    <div className="w-16 h-16 rounded-2xl bg-[#1c1c1f] border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-500 group-hover:border-zinc-500/50 transition-all shadow-xl">
                                        <Server size={32} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">DNS PROVIDER</p>
                                        <p className="text-xl font-bold text-white tracking-tight">{domainInfo.dnsProvider}</p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="relative z-10 flex flex-col items-center gap-4 group">
                                    <div className="w-16 h-16 rounded-2xl bg-[#1c1c1f] border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-500 group-hover:border-zinc-500/50 transition-all shadow-xl">
                                        <AlertTriangle size={32} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">STATUS</p>
                                        <p className="text-xl font-bold text-white tracking-tight mb-2">Mail Not Active</p>
                                        <Badge variant="outline" className="border-zinc-500/20 bg-zinc-500/10 text-white uppercase text-[10px] tracking-wider px-4 py-2 h-auto font-bold mb-3">
                                            Setup Required
                                        </Badge>

                                        <div className="flex flex-col gap-1.5 items-center">
                                            <span className="flex items-center gap-1.5 text-[11px] font-medium text-white bg-zinc-500/5 px-2 py-0.5 rounded border border-zinc-500/5">
                                                <XCircle size={12} className="text-white" /> No MX Records
                                            </span>
                                            <span className="flex items-center gap-1.5 text-[11px] font-medium text-white bg-zinc-500/5 px-2 py-0.5 rounded border border-zinc-500/5">
                                                <XCircle size={12} className="text-white" /> No SPF Record
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleContinueFromConfirmation}
                                className="p-0 h-14 px-10 text-lg font-semibold bg-white text-black hover:bg-zinc-200 rounded-full cursor-pointer hover:scale-105 transition-all"
                            >
                                Continue Setup
                            </Button>
                        </motion.div>
                    )}

                    {/* VIEW 2: METHOD SELECTION (Split Path) */}
                    {step === "METHOD_SELECTION" && (
                        <motion.div
                            key="method-selection"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full max-w-2xl"
                        >
                            {domainInfo.isInternal ? (
                                // CASE 1: INTERNAL (REGLOOK)
                                <div className="text-center">
                                    <div className="mb-8 relative inline-block">
                                        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                                        <div className="relative bg-[#1c1c1f] border border-emerald-500/30 p-8 rounded-3xl shadow-2xl max-w-md mx-auto">
                                            <div className="bg-emerald-500/10 p-4 rounded-2xl mb-6 inline-flex">
                                                <ShieldCheck size={48} className="text-emerald-500" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white mb-2">Internal Domain Detected</h2>
                                            <p className="text-zinc-400 mb-6">
                                                Since you bought <strong>{domainInfo.name}</strong> on Reglook, we can configure everything automatically.
                                            </p>

                                            <Button
                                                onClick={handleAutoConfigure}
                                                className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-full shadow-lg shadow-emerald-500/20"
                                            >
                                                Auto-Configure Mail
                                            </Button>

                                            <div className="mt-6 space-y-2 text-left">
                                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                                    <CheckCircle2 size={16} className="text-emerald-500" /> MX Records
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                                    <CheckCircle2 size={16} className="text-emerald-500" /> SPF Validation
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                                    <CheckCircle2 size={16} className="text-emerald-500" /> DKIM Keys
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                                    <CheckCircle2 size={16} className="text-emerald-500" /> DMARC Policy
                                                </div>
                                            </div>
                                            <p className="text-xs text-zinc-500 mt-6 font-medium">This usually takes a few seconds.</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // CASE 2: EXTERNAL (GUIDED)
                                <div>
                                    <div className="text-center mb-10">
                                        <h2 className="text-3xl font-bold text-white mb-3">Your domain is managed outside Reglook</h2>
                                        <p className="text-zinc-400">
                                            We'll guide you step by step to configure DNS records on <strong>{domainInfo.dnsProvider}</strong>.
                                        </p>
                                    </div>

                                    <div className="flex justify-center">
                                        <Button
                                            onClick={handleManualSetup}
                                            className="h-14 px-8 text-lg font-bold bg-[#5A0E24] hover:bg-[#7a1230] text-white rounded-full transition-all hover:scale-105 cursor-pointer"
                                        >
                                            Show DNS Records
                                        </Button>
                                    </div>
                                    <p className="text-center text-zinc-500 text-sm mt-6">Don't worry, we'll check your work automatically.</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* VIEW 3: AUTO CONFIG RUNNING (Internal Only) */}
                    {step === "AUTO_CONFIG_RUNNING" && (
                        <motion.div
                            key="auto-config"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full max-w-lg text-center bg-[#1c1c1f] p-8 rounded-3xl border border-zinc-800 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Configuring DNS...</h2>
                            <div className="space-y-4 text-left">
                                {['Setting MX Records...', 'Adding SPF Record...', 'Generating DKIM Keys...', 'Applying DMARC Policy...'].map((task, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.4 }}
                                        className="flex items-center gap-3"
                                    >
                                        <Loader2 size={18} className="text-emerald-500 animate-spin" />
                                        <span className="text-zinc-300 font-medium">{task}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* VIEW 4: MANUAL RECORDS TABLE (External) */}
                    {step === "MANUAL_RECORDS" && (
                        <motion.div
                            key="manual-records"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full max-w-5xl"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-2">Update your DNS Records</h2>
                                    <p className="text-zinc-400">Log in to <strong>{domainInfo.dnsProvider}</strong> and add the following records.</p>
                                </div>
                                <div className="flex gap-3">
                                    <Button className="text-zinc-400 hover:text-white">
                                        <Video className="mr-2" size={16} /> Video Instructions
                                    </Button>
                                    <Button
                                        onClick={startVerification}
                                        className="bg-[#5A0E24] hover:bg-[#7a1230] text-white font-bold h-10 px-6 rounded-lg shadow-lg"
                                    >
                                        I've Added Records, Verify
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-[#161618] border border-zinc-800 rounded-xl overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-[#1c1c1f] hover:bg-[#1c1c1f]">
                                        <TableRow className="border-zinc-800 hover:bg-[#1c1c1f]">
                                            <TableHead className="text-zinc-400 font-bold">Type</TableHead>
                                            <TableHead className="text-zinc-400 font-bold">Host / Name</TableHead>
                                            <TableHead className="text-zinc-400 font-bold">Value</TableHead>
                                            <TableHead className="text-zinc-400 font-bold">Priority</TableHead>
                                            <TableHead className="text-zinc-400 font-bold text-right">Status</TableHead>
                                            <TableHead className="text-zinc-400 font-bold text-right"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {records.map((record, index) => (
                                            <TableRow key={index} className="border-zinc-800/50 hover:bg-[#1c1c1f]">
                                                <TableCell className="font-bold text-white">{record.type}</TableCell>
                                                <TableCell className="font-mono text-zinc-300">{record.host}</TableCell>
                                                <TableCell className="max-w-[400px]">
                                                    <div className="font-mono text-zinc-300 truncate text-xs p-1 bg-black/20 rounded border border-white/5" title={record.value}>
                                                        {record.value}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-zinc-400">{record.priority ?? "—"}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2 text-white font-semibold text-[10px] animate-pulse">
                                                        <span>Fetching status...</span>
                                                        <Loader2 size={12} className="animate-spin" />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => copyToClipboard(record.value)}
                                                        className="hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                                    >
                                                        Copy <Copy size={14} className="ml-2" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="mt-6 bg-[#1c1c1f] border border-zinc-800 rounded-xl p-4 flex gap-4 items-start text-left">
                                <div className="p-2 bg-zinc-500/10 rounded-lg text-zinc-500 shrink-0">
                                    <HelpCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Most changes update instantly</h4>
                                    <p className="text-zinc-400 text-sm mt-1">However, some providers can take up to 24 hours to propagate global DNS changes. We'll keep checking the status automatically.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* VIEW 5: VERIFICATION LOOP (External) */}
                    {step === "VERIFICATION_LOOP" && (
                        <motion.div
                            key="verification"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full max-w-2xl text-center"
                        >
                            <div className="relative h-48 mt-18 w-48 mx-auto mb-8 flex items-center justify-center">
                                {/* Pulse circles */}
                                <div className="absolute inset-0 rounded-full bg-[#5A0E24]/20 animate-ping duration-[3000ms]" />
                                <div className="absolute inset-4 rounded-full bg-[#5A0E24]/30 animate-pulse duration-[2000ms]" />
                                <div className="relative z-10 bg-[#161618] rounded-full p-4 border-4 border-[#5A0E24]">
                                    <div className="bg-[#5A0E24] rounded-full p-6 text-white shadow-[0_0_30px_#5A0E24]">
                                        <Loader2 size={48} className="animate-spin" />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-4">Verifying Records...</h2>
                            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                                We're confirming your DNS configuration with global servers. This might take a moment.
                            </p>

                            {/* Progress Checklist */}
                            <div className="bg-[#161618] border border-zinc-800 rounded-xl p-6 max-w-md mx-auto text-left space-y-4 shadow-xl">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-300 font-medium">MX Records ({records.find(r => r.type === 'MX')?.status === 'verified' ? 'Found' : 'Searching'})</span>
                                    {records.find(r => r.type === 'MX')?.status === 'verified' ?
                                        <CheckCircle2 size={18} className="text-emerald-500" /> :
                                        <Loader2 size={16} className="text-zinc-600 animate-spin" />
                                    }
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-300 font-medium">SPF Configuration</span>
                                    {records.find(r => r.type === 'TXT' && r.value.includes('spf'))?.status === 'verified' ?
                                        <CheckCircle2 size={18} className="text-emerald-500" /> :
                                        <Loader2 size={16} className="text-zinc-600 animate-spin" />
                                    }
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-300 font-medium">DKIM & DMARC</span>
                                    {records.find(r => r.type === 'TXT' && r.value.includes('DKIM'))?.status === 'verified' ?
                                        <CheckCircle2 size={18} className="text-emerald-500" /> :
                                        <Loader2 size={16} className="text-zinc-600 animate-spin" />
                                    }
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* VIEW 6: SUCCESS */}
                    {step === "SUCCESS" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-2xl text-center"
                        >
                            <div className="mb-8 p-4 inline-flex rounded-full bg-transparent">
                                <ShieldCheck size={64} className="text-white" />
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                                Mail Verified & Active
                            </h1>
                            <p className="text-lg text-zinc-400 mb-10 max-w-lg mx-auto">
                                You are all set! Your domain <strong className="text-white">{domainInfo.name}</strong> can now send and receive emails securely.
                            </p>

                            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                                <div className="bg-[#161618] p-4 rounded-xl border border-zinc-800">
                                    <div className="text-emerald-500 font-bold text-2xl mb-1">98/100</div>
                                    <div className="text-xs text-zinc-500 uppercase font-bold">Deliverability Score</div>
                                </div>
                                <div className="bg-[#161618] p-4 rounded-xl border border-zinc-800">
                                    <div className="text-emerald-500 font-bold text-2xl mb-1">Active</div>
                                    <div className="text-xs text-zinc-500 uppercase font-bold">Spam Protection</div>
                                </div>
                                <div className="bg-[#161618] p-4 rounded-xl border border-zinc-800">
                                    <div className="text-white font-bold text-2xl mb-1">TLS</div>
                                    <div className="text-xs text-zinc-500 uppercase font-bold">Encryption</div>
                                </div>
                            </div> */}

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    className="h-12 px-8 bg-[#5A0E24] hover:bg-[#5A0E24]/80 text-white font-semibold rounded-full"
                                    onClick={() => router.push('/foundation/mail')}
                                >
                                    Create First Mailbox
                                </Button>
                                <Button

                                    className="h-12 px-8 border-zinc-700 font-semibold text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-full"
                                    onClick={() => router.push('/foundation/mail')}
                                >
                                    Go to Mail Manager
                                </Button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

export default function MailSetupPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <MailSetupContent />
        </React.Suspense>
    );
}


"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    SlidersHorizontal,
    Shield,
    CheckCircle2,
    AlertTriangle,
    Clock,
    Plus,
    Lock,
    Globe,
    FileText,
    Download,
    RefreshCw,
    XCircle,
    ExternalLink,
    ChevronRight,
    MoreHorizontal,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function SSLManagerContent() {
    // Mock data for SSL certificates
    const [certificates, setCertificates] = React.useState([
        {
            id: 1,
            domain: "reglook.com",
            type: "Wildcard SSL",
            issuer: "Reglook Global CA",
            status: "ACTIVE",
            statusColor: "text-emerald-500",
            expiry: "2026-10-24",
            daysRemaining: 291,
            autoRenew: true
        },
        {
            id: 2,
            domain: "api.reglook.com",
            type: "Standard SSL",
            issuer: "Let's Encrypt",
            status: "EXPIRING_SOON",
            statusColor: "text-amber-500",
            expiry: "2026-02-15",
            daysRemaining: 40,
            autoRenew: true
        },
        {
            id: 3,
            domain: "staging.reglook.com",
            type: "Standard SSL",
            issuer: "Let's Encrypt",
            status: "EXPIRED",
            statusColor: "text-red-500",
            expiry: "2025-12-31",
            daysRemaining: -6,
            autoRenew: false
        }
    ]);

    const [selectedCert, setSelectedCert] = React.useState<typeof certificates[0] | null>(null);
    const [activeTab, setActiveTab] = React.useState("overview");
    const [isCreating, setIsCreating] = React.useState(false);
    const [createStep, setCreateStep] = React.useState(1);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Sync URL param 'manage' with selectedCert state
    React.useEffect(() => {
        const manageCert = searchParams.get("manage");
        if (manageCert) {
            const cert = certificates.find(c => c.domain === manageCert);
            if (cert) {
                setSelectedCert(cert);
            } else {
                setSelectedCert(null);
            }
        } else {
            setSelectedCert(null);
        }
    }, [searchParams, certificates]);

    const handleCertSelect = (cert: typeof certificates[0]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("manage", cert.domain);
        router.push(pathname + "?" + params.toString());
    };

    // Sync isCreating with URL
    React.useEffect(() => {
        setIsCreating(searchParams.get("new-certificate") === "true");
    }, [searchParams]);

    const handleStartCreate = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("new-certificate", "true");
        setCreateStep(1);
        router.push(pathname + "?" + params.toString());
    }

    const handleCancelCreate = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("new-certificate");
        setCreateStep(1);
        router.push(pathname + "?" + params.toString());
    }

    const handleClearSelection = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("manage");
        router.push(pathname + "?" + params.toString());
    };

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip (Color #1C352D) */}
            <div className="w-full bg-[#1C352D] py-6 shadow-md z-10 transition-colors duration-300">
                <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-4">
                            <Link href="/foundation">
                                <Button variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-10 w-10">
                                    <ArrowLeft size={22} />
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex p-2 bg-white/10 rounded-full backdrop-blur-sm">
                                    <Shield className="text-white" size={22} />
                                </div>
                                <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">SSL Manager</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleStartCreate}
                                className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all">
                                <span className="hidden sm:inline">New Certificate</span>
                                <Plus size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full h-10 w-10">
                                <HelpCircle size={22} className="md:w-[22px] md:h-[22px] w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-8 flex-1">
                {isCreating && (
                    // CREATE VIEW - ENHANCED UI
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-[1200px] mx-auto"
                    >
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                            <Button
                                onClick={() => createStep === 1 ? handleCancelCreate() : setCreateStep(1)}
                                variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full h-12 w-12 border border-zinc-800 shrink-0">
                                <ArrowLeft size={24} />
                            </Button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none">Issue New Certificate</h1>
                                <p className="text-zinc-400 text-sm md:text-base mt-2">Secure your domains with enterprise-grade encryption.</p>
                            </div>
                        </div>

                        {/* Enhanced Form Container */}
                        <div className="bg-[#161618] border border-zinc-800 rounded-3xl overflow-hidden">
                            {/* Progress Header */}
                            {/* Progress Header */}
                            <div className="bg-[#111111] px-8 py-4 border-b border-zinc-800 grid grid-cols-2 gap-4">
                                <div className={`flex items-center gap-3 font-bold text-sm ${createStep >= 1 ? 'text-[#1C352D]' : 'text-zinc-600'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${createStep >= 1 ? 'bg-[#1C352D] text-white shadow-lg shadow-[#1C352D]/20' : 'bg-zinc-800 text-zinc-500'}`}>1</div>
                                    <span className={createStep >= 1 ? 'text-white' : ''}>Configuration</span>
                                </div>
                                <div className={`flex items-center gap-3 font-bold text-sm ${createStep >= 2 ? 'text-[#1C352D]' : 'text-zinc-600'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${createStep >= 2 ? 'bg-[#1C352D] text-white shadow-lg shadow-[#1C352D]/20' : 'bg-zinc-800 text-zinc-500'}`}>2</div>
                                    <span className={createStep >= 2 ? 'text-white' : ''}>Review & Payment</span>
                                </div>
                            </div>

                            {/* STEP 1: CONFIGURATION */}
                            {createStep === 1 && (
                                <>
                                    <div className="p-8 space-y-8">
                                        {/* Section 1: Domain Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                <Globe size={18} className="text-[#fff]" /> Domain Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-[#0f0f10] border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Primary Domain</label>
                                                    <div className="relative">
                                                        <Input
                                                            placeholder="example.com"
                                                            className="pl-10 mt-2 bg-[#161618] border-zinc-700 text-white font-mono placeholder:text-zinc-600 focus:ring-2 focus:ring-[#1C352D] focus:border-[#1C352D]"
                                                        />
                                                        <Globe size={16} className="mt-1 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                                                    </div>
                                                    <p className="text-[10px] text-zinc-500">The main domain this certificate will protect.</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Certificate Type</label>
                                                    <div className="relative">
                                                        <select className="w-full mt-2 h-10 px-3 pl-10 rounded-md bg-[#161618] border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C352D] focus:border-[#1C352D]">
                                                            <option>Single Domain Validation (DV)</option>
                                                            <option>Wildcard (*.example.com)</option>
                                                            <option>Organization Validation (OV)</option>
                                                            <option>Extended Validation (EV)</option>
                                                        </select>
                                                        <Shield size={16} className="absolute mt-1 left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                                                    </div>
                                                    <p className="text-[10px] text-zinc-500">Choose the level of validation required.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 2: Validation Method */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                <CheckCircle2 size={18} className="text-[#fff]" /> Validation Method
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="group p-6 rounded-2xl border-2 border-[#1C352D] bg-[#1C352D]/5 cursor-pointer relative transition-all hover:bg-[#1C352D]/10 hover:shadow-lg hover:shadow-[#1C352D]/5 flex flex-col justify-between min-h-[160px]">
                                                    <div className="absolute top-5 right-5 text-[#fff]">
                                                        <CheckCircle2 size={24} fill="#fff" className="text-[#fff]" />
                                                    </div>
                                                    <div>
                                                        <div className="w-12 h-12 rounded-full bg-[#1C352D]/20 flex items-center justify-center mb-5 text-[#fff]">
                                                            <Globe size={24} />
                                                        </div>
                                                        <h4 className="font-bold text-white text-lg">DNS Validation</h4>
                                                        <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                                                            Add a CNAME record to your DNS configuration.
                                                        </p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Badge className="bg-[#1C352D] hover:bg-[#1C352D] text-white border-0 text-[10px] uppercase font-bold tracking-wider px-2 py-1">Recommended</Badge>
                                                    </div>
                                                </div>

                                                <div className="group p-6 rounded-2xl border-2 border-zinc-800 bg-[#111111] cursor-pointer relative transition-all hover:border-zinc-600 hover:bg-[#161618] flex flex-col justify-between min-h-[160px]">
                                                    <div className="absolute top-5 right-5 w-6 h-6 rounded-full border-2 border-zinc-600"></div>
                                                    <div>
                                                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-5 text-zinc-400 group-hover:text-zinc-200">
                                                            <FileText size={24} />
                                                        </div>
                                                        <h4 className="font-bold text-zinc-300 group-hover:text-white text-lg">HTTP File Upload</h4>
                                                        <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                                                            Upload a verification file to your server's root directory.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Actions Step 1 */}
                                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 px-8 py-6 bg-[#111111] border-t border-zinc-800">
                                        <div className="text-xs text-zinc-500 w-full sm:w-auto text-center sm:text-left">
                                            Estimated Issuance: <span className="text-zinc-300 font-medium">~5 minutes</span>
                                        </div>
                                        <div className="flex items-center gap-3 w-full sm:w-auto">
                                            <Button
                                                onClick={handleCancelCreate}
                                                variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800 flex-1 sm:flex-none">
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() => setCreateStep(2)}
                                                className="bg-[#1C352D] hover:bg-[#1C352D]/80 text-white font-bold px-8 shadow-lg shadow-[#1C352D]/20 flex-1 sm:flex-none">
                                                Continue <span className="hidden sm:inline ml-1">to Review</span> <ChevronRight size={16} className="ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* STEP 2: REVIEW & PAYMENT */}
                            {createStep === 2 && (
                                <div className="p-8 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {/* Left: Summary */}
                                        <div className="md:col-span-2 space-y-6">
                                            <div className="bg-[#0f0f10] border border-zinc-800 rounded-2xl p-6">
                                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                                    <FileText size={18} className="text-[#1C352D]" /> Order Summary
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                                                        <span className="text-zinc-400 text-sm">Primary Domain</span>
                                                        <span className="text-white font-mono font-medium">example.com</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                                                        <span className="text-zinc-400 text-sm">Certificate Type</span>
                                                        <Badge className="text-white px-4 py-1">Single Domain (DV)</Badge>
                                                    </div>
                                                    <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                                                        <span className="text-zinc-400 text-sm">Validation Method</span>
                                                        <div className="flex items-center gap-2 text-white text-sm">
                                                            <Globe size={14} className="text-[#1C352D]" /> DNS Validation
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center py-3 border-b border-zinc-800/50">
                                                        <span className="text-zinc-400 text-sm">Validity Period</span>
                                                        <span className="text-white text-sm">1 Year</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-[#0f0f10] border border-zinc-800 rounded-2xl p-6">
                                                <h3 className="text-lg font-bold text-white mb-4">Terms & Conditions</h3>
                                                <div className="flex items-start gap-3">
                                                    <Checkbox id="terms" className="mt-1 border-zinc-600 data-[state=checked]:bg-[#1C352D] data-[state=checked]:border-[#1C352D]" />
                                                    <label htmlFor="terms" className="text-sm text-zinc-400 leading-relaxed cursor-pointer select-none">
                                                        I agree to the <span className="text-white underline decoration-zinc-600 hover:decoration-white transition-colors">Subscriber Agreement</span> and certify that I am authorized to request this certificate for the domain(s) listed above.
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: Payment */}
                                        <div className="md:col-span-1">
                                            <div className="bg-[#1C352D] border border-[#1C352D]/20 rounded-3xl p-6 sticky top-8">
                                                <h3 className="text-lg font-bold text-white mb-6">Total Due</h3>

                                                <div className="space-y-3 mb-6">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-zinc-400">Subtotal</span>
                                                        <span className="text-white">$0.00</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-zinc-400">Issuance Fee</span>
                                                        <span className="text-white">$0.00</span>
                                                    </div>
                                                    <div className="h-px bg-zinc-800/50 my-2"></div>
                                                    <div className="flex justify-between text-xl font-bold">
                                                        <span className="text-white">Total</span>
                                                        <span className="text-[#fff] font-mono">$0.00</span>
                                                    </div>
                                                </div>

                                                <p className="text-xs text-zinc-500 mb-6 text-center">
                                                    This is a free certificate issued via Let's Encrypt.
                                                </p>

                                                <Button
                                                    onClick={handleCancelCreate}
                                                    className="w-full bg-[#fff] hover:bg-[#fff]/80 cursor-pointer text-[#000] hover:text-[#000] font-bold h-12 shadow-lg shadow-[#1C352D]/20">
                                                    Issue Certificate <CheckCircle2 size={18} className="ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Actions Step 2 */}
                                    <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                                        <Button
                                            onClick={() => setCreateStep(1)}
                                            variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                                            <ArrowLeft size={16} className="mr-2" /> Back to Configuration
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
                {!isCreating && !selectedCert && (
                    /* LIST VIEW */
                    <>
                        {/* Controls Bar */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 w-full">
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                <div className="relative group w-full sm:w-auto">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                                    <Input
                                        placeholder="Search certificates..."
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-full sm:w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#1C352D] focus-visible:border-[#1C352D] transition-all shadow-sm"
                                    />
                                </div>
                                <div className="bg-[#1c1c1f] border border-zinc-800 rounded-lg flex items-center p-1 gap-1 shadow-sm w-full sm:w-auto">
                                    <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 px-3 text-xs font-semibold rounded-md w-full sm:w-auto justify-center">
                                        <SlidersHorizontal size={14} /> Filter
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* List */}
                        <div className="w-full">
                            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 mb-2">
                                <div className="col-span-5 md:col-span-4 flex items-center gap-6">
                                    <Checkbox className="border-zinc-700 data-[state=checked]:bg-[#1C352D] data-[state=checked]:border-[#1C352D] rounded-[4px] h-4 w-4" />
                                    <span className="text-sm font-semibold text-zinc-400">Common Name</span>
                                </div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Type</div>
                                <div className="hidden md:block col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                                <div className="hidden md:block col-span-3 text-sm font-semibold text-zinc-400">Expiry</div>
                            </div>

                            <div className="space-y-1">
                                {certificates.map((cert, index) => (
                                    <motion.div
                                        key={cert.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleCertSelect(cert)}
                                        className="group flex flex-col md:grid md:grid-cols-12 gap-4 items-start px-4 py-6 rounded-xl hover:bg-[#1c1c1f] transition-all border border-transparent hover:border-zinc-800 cursor-pointer bg-[#1c1c1f]/30"
                                    >
                                        <div className="w-full md:col-span-4 flex flex-col gap-2">
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center justify-center">
                                                    <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-[#1C352D] data-[state=checked]:border-[#1C352D] rounded-[4px] h-4 w-4 transition-all opacity-40 group-hover:opacity-100" />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-[#1C352D] flex items-center justify-center text-white group-hover:bg-[#1C352D]/70 transition-colors shrink-0">
                                                        <Lock size={16} />
                                                    </div>
                                                    <div>
                                                        <span className="text-white font-bold text-[15px] tracking-tight block break-all">{cert.domain}</span>
                                                        <span className="text-zinc-500 text-xs">{cert.issuer}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:col-span-3 flex flex-col gap-1 pl-[70px] md:pl-0 -mt-2 md:mt-0">
                                            <span className="md:hidden text-xs font-bold text-zinc-500 uppercase">Type</span>
                                            <span className="text-zinc-400 text-sm font-medium">{cert.type}</span>
                                        </div>

                                        <div className="w-full md:col-span-2 pl-[70px] md:pl-0">
                                            <span className="md:hidden text-xs font-bold text-zinc-500 uppercase block mb-1">Status</span>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${cert.status === 'ACTIVE' ? 'bg-emerald-500' : cert.status === 'EXPIRING_SOON' ? 'bg-amber-500' : 'bg-red-500'}`} />
                                                <span className={`${cert.status === 'ACTIVE' ? 'text-emerald-500' : cert.status === 'EXPIRING_SOON' ? 'text-amber-500' : 'text-red-500'} font-bold text-xs tracking-wide`}>
                                                    {cert.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full md:col-span-3 flex items-center justify-between pl-[70px] md:pl-0 mt-2 md:mt-0">
                                            <div className="flex items-center gap-2">
                                                <span className="md:hidden text-xs font-bold text-zinc-500 uppercase mr-2">Expiry</span>
                                                <span className="text-zinc-300 text-sm font-medium">{cert.expiry}</span>
                                                {cert.daysRemaining < 30 && cert.daysRemaining > 0 && (
                                                    <Badge variant="outline" className="border-amber-500/20 text-amber-500 text-[10px] bg-amber-500/10 h-5">Expiring</Badge>
                                                )}
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white">
                                                <ArrowRight size={16} />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </>

                )}
                {!isCreating && selectedCert && (
                    /* DETAIL VIEW */
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#1C352D] flex items-center justify-center text-white shrink-0">
                                    <Lock size={20} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight break-all">{selectedCert.domain}</h1>
                                {selectedCert.status === 'ACTIVE' && <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">Secure</Badge>}
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Button
                                    onClick={handleClearSelection}
                                    variant="secondary"
                                    className="bg-[#1c1c1f] hover:bg-[#27272a] text-white border border-zinc-800 rounded-full h-9 text-xs font-semibold px-4 flex items-center gap-2 w-full md:w-auto justify-center"
                                >
                                    <ArrowLeft size={14} /> Back to List
                                </Button>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "overview" ? "text-white border-b-4 border-[#1C352D]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab("installation")}
                                className={`text-sm font-bold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "installation" ? "text-white border-b-4 border-[#1C352D]" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                Installation
                            </button>
                        </div>

                        {/* OVERVIEW TAB */}
                        {activeTab === "overview" && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-[#161618] border border-zinc-800 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <FileText size={18} className="text-zinc-400" /> Certificate Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-zinc-500 uppercase">Common Name</p>
                                                <p className="text-white text-sm font-mono">{selectedCert.domain}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-zinc-500 uppercase">Issuer</p>
                                                <p className="text-white text-sm">{selectedCert.issuer}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-zinc-500 uppercase">Valid From</p>
                                                <p className="text-zinc-300 text-sm">2025-10-24</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-zinc-500 uppercase">Expires On</p>
                                                <p className={`text-sm font-bold ${selectedCert.daysRemaining < 30 ? 'text-amber-500' : 'text-emerald-500'}`}>
                                                    {selectedCert.expiry} ({selectedCert.daysRemaining > 0 ? `${selectedCert.daysRemaining} days left` : 'Expired'})
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-zinc-500 uppercase">Signature Algorithm</p>
                                                <p className="text-zinc-300 text-sm">SHA-256 with RSA Encryption</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-zinc-500 uppercase">Key Size</p>
                                                <p className="text-zinc-300 text-sm">2048 bits</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#161618] border border-zinc-800 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <RefreshCw size={18} className="text-zinc-400" /> Lifecycle Management
                                        </h3>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#1c1c1f] rounded-lg border border-zinc-800/50 mb-4 gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500">
                                                    <CheckCircle2 size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-sm">Auto-Renewal is {selectedCert.autoRenew ? 'ON' : 'OFF'}</p>
                                                    <p className="text-zinc-500 text-xs">We will attempt to renew this certificate 30 days before expiration.</p>
                                                </div>
                                            </div>
                                            <Button className="bg-[#1C352D] hover:bg-[#1C352D]/80 text-white text-xs font-bold">Configure</Button>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center gap-3">
                                            <Button className="bg-[#1C352D] hover:bg-[#1C352D]/80 text-white text-xs font-bold w-full sm:flex-1">Renew Now</Button>
                                            <Button className="bg-[#1C352D] hover:bg-[#1C352D]/80 text-white text-xs font-bold w-full sm:flex-1">Revoke Certificate</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-[#161618] border border-zinc-800 rounded-xl p-6">
                                        <h3 className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wider">Downloads</h3>
                                        <div className="space-y-2">
                                            <Button variant="ghost" className="w-full justify-between text-zinc-300 hover:text-white hover:bg-zinc-800 h-10 px-3">
                                                <span className="flex items-center gap-2 text-sm"><FileText size={14} /> Certificate (PEM)</span>
                                                <Download size={14} />
                                            </Button>
                                            <Button variant="ghost" className="w-full justify-between text-zinc-300 hover:text-white hover:bg-zinc-800 h-10 px-3">
                                                <span className="flex items-center gap-2 text-sm"><FileText size={14} /> Private Key (KEY)</span>
                                                <Download size={14} />
                                            </Button>
                                            <Button variant="ghost" className="w-full justify-between text-zinc-300 hover:text-white hover:bg-zinc-800 h-10 px-3">
                                                <span className="flex items-center gap-2 text-sm"><FileText size={14} /> CA Bundle (CRT)</span>
                                                <Download size={14} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* INSTALLATION TAB */}
                        {activeTab === "installation" && (
                            <div className="w-full">
                                <h2 className="text-xl font-bold text-white mb-2">Installation Instructions</h2>
                                <p className="text-zinc-400 text-sm mb-6">
                                    How to install this certificate on your server.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['Nginx', 'Apache', 'IIS', 'AWS ELB'].map((server) => (
                                        <div key={server} className="p-4 bg-[#161618] border border-zinc-800 rounded-xl cursor-pointer hover:border-[#1C352D] transition-colors group">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-bold text-white">{server}</h3>
                                                <ExternalLink size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
                                            </div>
                                            <p className="text-zinc-500 text-xs mt-2">View guide for {server}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
}

export default function SSLManagerPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <SSLManagerContent />
        </React.Suspense>
    );
}


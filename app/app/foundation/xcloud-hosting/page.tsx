"use client";

import React from "react";
import Lottie from "lottie-react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    Cloud,
    Github,
    GitBranch,
    CheckCircle2,
    Clock,
    MoreVertical,
    Terminal,
    ArrowRight,
    FileUp,
    LayoutTemplate,
    ExternalLink,
    Plus,
    MousePointer2,
    RefreshCw,
    AlertCircle,
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    Settings,
    Activity,
    Shield,
    Lock,
    ScrollText,
    Bell,
    Globe,
    Variable,
    FileCode,
    Cpu,
    Radio,
    Github as GithubIcon
} from "lucide-react";
import {
    siNextdotjs,
    siVuedotjs,
    siAngular,
    siVite,
    siReact,
    siSvelte
} from "simple-icons/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AccessControl } from "@/components/xcloud/hosting/access-control";
import { BuildSettings } from "@/components/xcloud/hosting/build-settings";
import { CustomDomains } from "@/components/xcloud/hosting/custom-domains";
import { EnvironmentVariables } from "@/components/xcloud/hosting/environment-variables";
import { Previews } from "@/components/xcloud/hosting/previews";
import { BuildNotifications, CustomHeaders, Firewall, RewritesRedirects, Secrets } from "@/components/xcloud/hosting/generic-hosting";
import { Overview } from "@/components/xcloud/overview";
import { AccessLogs, Alarms, HostingComputeLogs, Metrics } from "@/components/xcloud/monitoring";
import { BranchSettings, GeneralSettings, UserRoles } from "@/components/xcloud/app-settings";

function XCloudHostingContent() {
    // Real Data State
    const [apps, setApps] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const API_URL = "http://localhost:9000";

    // Initial Fetch & Polling
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/xcloud/instances`, { credentials: 'include' });
                if (!res.ok) throw new Error('Failed to fetch apps');
                const data = await res.json();

                // Map backend instances to UI "App" format
                const mappedApps = data.map((inst: any) => ({
                    id: inst.id,
                    name: inst.name,
                    domain: inst.publicIp || 'Pending IP...',
                    // repo deleted
                    branch: "main",
                    framework: inst.image || "Custom",
                    status: mapStatusToUi(inst.status),
                    lastDeployed: new Date(inst.updatedAt).toLocaleTimeString(), // Simple format
                    thumbnail: "bg-indigo-500", // Random or hashed color
                    rawStatus: inst.status, // Keep real status for logic
                    publicIp: inst.publicIp
                }));

                setApps(mappedApps);
                setError(null);
            } catch (err) {
                console.error(err);
                // setError('Failed to load apps'); // Suppress for now to keep UI clean if backend offline
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    const mapStatusToUi = (status: string) => {
        switch (status) {
            case 'running': return 'DEPLOYED';
            case 'provisioning':
            case 'pending':
            case 'initializing':
            case 'starting':
                return 'BUILDING';
            case 'stopped': return 'STOPPED';
            case 'error': return 'ERROR';
            default: return 'BUILDING';
        }
    };

    // URL & Router
    const router = useRouter();
    const searchParams = useSearchParams();
    const showNewAppFlow = searchParams.get("new-app") === "true";


    const manageAppName = searchParams.get("manage-app");

    // New App Flow State
    const [currentStep, setCurrentStep] = React.useState(1);
    const [selectedFramework, setSelectedFramework] = React.useState("Next.js");
    const [appName, setAppName] = React.useState("");
    const [deployError, setDeployError] = React.useState<string | null>(null);
    const [isDeploying, setIsDeploying] = React.useState(false);
    const [createdInstanceId, setCreatedInstanceId] = React.useState<string | null>(null);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentStep]);





    // Build Settings State
    const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = React.useState(false);

    // Animation State
    const [animationData, setAnimationData] = React.useState<any>(null);

    React.useEffect(() => {
        fetch("/animation/ani-bg.json")
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Failed to load animation:", err));
    }, []);

    const steps = [
        { number: 1, title: "Configure Build", description: "Framework & settings" },
        { number: 2, title: "Review", description: "Confirm deployment" },
        { number: 3, title: "Deploy", description: "Sit back & relax" }
    ];

    const popularFrameworks = [
        { name: "Next.js", icon: siNextdotjs, color: "#000000" },
        { name: "Vue", icon: siVuedotjs, color: "#4FC08D" },
        { name: "Angular", icon: siAngular, color: "#DD0031" },
        { name: "Vite", icon: siVite, color: "#646CFF" },
        { name: "React", icon: siReact, color: "#61DAFB" },
        { name: "Svelte", icon: siSvelte, color: "#FF3E00" },
    ];

    const SimpleIcon = ({ icon, className, size = 24 }: { icon: any, className?: string, size?: number }) => (
        <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width={size}
            height={size}
            fill="currentColor"
        >
            <path d={icon.path} />
        </svg>
    );

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip (Theme Color: #4D2B8C) */}
            <div className="w-full bg-[#4D2B8C] py-4 md:py-6 shadow-md z-20 sticky top-0 transition-colors duration-300">
                <div className="w-full px-4 md:px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-2 md:gap-4">
                            {showNewAppFlow || manageAppName ? (
                                <Button onClick={() => router.push("/foundation/xcloud-hosting")} variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-8 w-8 md:h-10 md:w-10">
                                    <ArrowLeft size={18} className="md:w-[22px] md:h-[22px]" />
                                </Button>
                            ) : (
                                <Link href="/foundation">
                                    <Button variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-8 w-8 md:h-10 md:w-10">
                                        <ArrowLeft size={18} className="md:w-[22px] md:h-[22px]" />
                                    </Button>
                                </Link>
                            )}
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="hidden md:flex p-1.5 md:p-2 bg-white/10 rounded-full backdrop-blur-sm items-center justify-center">
                                    <Cloud className="text-white w-4 h-4 md:w-[22px] md:h-[22px]" />
                                </div>
                                <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight">xCloud Hosting</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <Button variant="ghost" size="sm" className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-3 md:px-5 h-8 md:h-10 flex items-center gap-2 transition-all text-xs md:text-sm">
                                <span className="hidden sm:inline">Docs</span>
                                <ExternalLink size={14} className="md:w-[16px] md:h-[16px]" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full h-8 w-8 md:h-10 md:w-10">
                                <HelpCircle size={18} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className={`w-full max-w-[1200px] px-6 lg:px-10 py-8 flex-1 transition-all duration-300`}>

                {manageAppName ? (
                    <AppDashboard appName={manageAppName} />
                ) : !showNewAppFlow ? (
                    <>
                        {/* Controls Bar */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-8 w-full">
                            {/* Search & Filters */}
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="relative group w-full md:w-auto">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                                    <Input
                                        placeholder="Search apps..."
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-full md:w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#4D2B8C] focus-visible:border-[#4D2B8C] transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* New App Button */}
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Button onClick={() => router.push("/foundation/xcloud-hosting?new-app=true")} className="h-10 w-full md:w-auto bg-[#4D2B8C] hover:bg-[#3D2270] text-white font-bold px-6 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20">
                                    <Plus size={18} /> New app
                                </Button>

                            </div>
                        </div>

                        {/* Apps Grid/List */}
                        <div className="w-full space-y-4">
                            <h2 className="text-xl font-bold text-white mb-4">All apps</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {apps.map((app, index) => (
                                    <motion.div
                                        key={app.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={() => router.push(`/foundation/xcloud-hosting?manage-app=${app.name}`)}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-[#1c1c1f] border border-zinc-800 hover:border-zinc-600 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:shadow-black/20 flex flex-col h-[280px]"
                                    >
                                        {/* App Preview / Thumbnail Area */}
                                        <div className={`h-32 w-full ${app.thumbnail} relative flex items-center justify-center overflow-hidden`}>
                                            {/* Mock Terminal/Browser Look */}
                                            <div className="w-[80%] h-[80%] bg-[#0f0f10] relative top-4 rounded-t-lg shadow-2xl translate-y-4 border border-zinc-800 p-2 opacity-90 group-hover:translate-y-2 transition-transform duration-500">
                                                <div className="flex gap-1.5 mb-2">
                                                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <div className="h-1.5 w-1/3 bg-zinc-800 rounded-full"></div>
                                                    <div className="h-1.5 w-2/3 bg-zinc-800 rounded-full"></div>
                                                    <div className="h-1.5 w-1/2 bg-zinc-800 rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 right-3">
                                                <Badge className="bg-black/40 backdrop-blur-md border-0 text-white hover:bg-black/60 font-semibold">{app.framework}</Badge>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col justify-between flex-1">
                                            <div>
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{app.name}</h3>
                                                    <div className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors">
                                                        <MoreVertical size={16} />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium mb-4">
                                                    <Github size={12} />
                                                    <span>{app.repo}</span>
                                                    <span className="text-zinc-600">•</span>
                                                    <GitBranch size={12} />
                                                    <span>{app.branch}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-xs">
                                                    {app.status === "DEPLOYED" ? (
                                                        <CheckCircle2 size={14} className="text-green-500" />
                                                    ) : (
                                                        <div className="h-3.5 w-3.5 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                                                    )}
                                                    <span className={app.status === "DEPLOYED" ? "text-zinc-300 font-medium" : "text-amber-500 font-bold"}>
                                                        {app.status === "DEPLOYED" ? "Deployed" : "Building..."}
                                                    </span>
                                                    <span className="text-zinc-600 ml-auto flex items-center gap-1">
                                                        <Clock size={12} /> {app.lastDeployed}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-zinc-500 truncate hover:text-purple-400 transition-colors flex items-center gap-1">
                                                    <ExternalLink size={10} />
                                                    {app.domain}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Empty / Add New Card */}
                                <motion.div
                                    onClick={() => router.push("/foundation/xcloud-hosting?new-app=true")}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="border-2 border-dashed border-zinc-800 hover:border-zinc-600 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-zinc-900/30 transition-all h-[280px] group"
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#1c1c1f] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-zinc-800">
                                        <Plus size={32} className="text-zinc-500 group-hover:text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-400 group-hover:text-white transition-colors">Host a web app</h3>
                                    <p className="text-sm text-zinc-600 mt-2 text-center max-w-[200px]">Deploy your application in seconds.</p>
                                </motion.div>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Creating New App Flow */
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="static lg:sticky top-28 space-y-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-4 lg:gap-1">
                                {steps.map((step) => (
                                    <div
                                        key={step.number}
                                        className={`flex items-start gap-4 p-4 rounded-xl transition-colors min-w-[200px] lg:min-w-0 ${currentStep === step.number ? "bg-[#1c1c1f] border border-zinc-800" : "opacity-40"}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${currentStep === step.number ? "bg-[#4D2B8C] text-white" : "bg-zinc-800 text-zinc-400"}`}>
                                            {currentStep > step.number ? <CheckCircle2 size={18} /> : step.number}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-sm ${currentStep === step.number ? "text-white" : "text-zinc-300"}`}>{step.title}</h3>
                                            <p className="text-xs text-zinc-500 mt-1">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={currentStep}
                                className={`bg-[#1c1c1f] border border-zinc-800 rounded-3xl min-h-[500px] ${currentStep === 4 ? "p-0 overflow-hidden relative" : "p-8"}`}
                            >


                                {currentStep === 1 && (
                                    <div className="space-y-8">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-2">Configure Build Settings</h2>
                                            <p className="text-zinc-400 text-sm">We've detected a Next.js app. Verify your settings below.</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-zinc-300">App Name</label>
                                                <div className="flex items-center mt-3">
                                                    <Input
                                                        value={appName}
                                                        onChange={(e) => setAppName(e.target.value)}
                                                        className="bg-black/20 border-zinc-700 text-zinc-200"
                                                        placeholder="my-awesome-app"
                                                    />
                                                    <span className="ml-2 text-white/60 text-sm font-semibold">.xcloud.reglook.com</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-zinc-300">Framework Preset</label>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-3">
                                                    {popularFrameworks.map((fw) => (
                                                        <button
                                                            key={fw.name}
                                                            onClick={() => setSelectedFramework(fw.name)}
                                                            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all h-28 group ${selectedFramework === fw.name ? "bg-[#4D2B8C]/10 border-[#4D2B8C] ring-1 ring-[#4D2B8C]" : "bg-[#151518] border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900"}`}
                                                        >
                                                            <div className={`transition-transform duration-300 ${selectedFramework === fw.name ? "scale-110" : "group-hover:scale-110"}`}>
                                                                <SimpleIcon
                                                                    icon={fw.icon}
                                                                    className={selectedFramework === fw.name ? "text-white" : "text-zinc-500 group-hover:text-white"}
                                                                    size={32}
                                                                />
                                                            </div>
                                                            <span className={`text-xs font-bold ${selectedFramework === fw.name ? "text-white" : "text-zinc-500 group-hover:text-white"}`}>{fw.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-zinc-300">Root Directory</label>
                                                    <Input className="bg-black/20 border-zinc-700 text-zinc-200 mt-3" placeholder="./" defaultValue="./" />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-semibold text-zinc-300">Build Command</label>
                                                        <Input className="bg-black/20 border-zinc-700 text-zinc-200 mt-3" placeholder="npm run build" defaultValue="npm run build" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-semibold text-zinc-300">Output Directory</label>
                                                        <Input className="bg-black/20 border-zinc-700 text-zinc-200 mt-3" placeholder=".next" defaultValue=".next" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border border-zinc-800 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setIsAdvancedSettingsOpen(!isAdvancedSettingsOpen)}
                                                className="w-full flex items-center justify-between p-4 bg-[#151518] hover:bg-zinc-900 transition-colors"
                                            >
                                                <span className="font-semibold text-zinc-300">Advanced settings</span>
                                                <ChevronDown size={20} className={`text-zinc-500 transition-transform duration-300 ${isAdvancedSettingsOpen ? "rotate-180" : ""}`} />
                                            </button>

                                            <motion.div
                                                initial={false}
                                                animate={{ height: isAdvancedSettingsOpen ? "auto" : 0 }}
                                                className="overflow-hidden bg-[#151518] border-t border-zinc-800"
                                            >
                                                <div className="p-6 grid gap-6">
                                                    <div className="space-y-3">
                                                        <label className="text-sm font-semibold text-zinc-300">Build instance type</label>
                                                        <div className="p-4 border border-zinc-700 bg-black/20 rounded-lg mt-3">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="font-bold text-white">Standard</span>
                                                                <Badge variant="outline" className="text-zinc-400 border-zinc-700">Default</Badge>
                                                            </div>
                                                            <p className="text-xs text-zinc-500">8 GiB Memory | 4 vCPUs | 128 GB Disk Space</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <label className="text-sm font-semibold text-zinc-300">Build image</label>
                                                        <Select defaultValue="default">
                                                            <SelectTrigger className="bg-black/20 border-zinc-700 text-zinc-200 mt-3">
                                                                <SelectValue placeholder="Select build image" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-[#1c1c1f] border-zinc-700 text-zinc-200">
                                                                <SelectItem value="default">Using default image</SelectItem>
                                                                <SelectItem value="legacy">Legacy (Node 14)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <label className="text-sm font-semibold text-zinc-300">Keep cookies in cache key</label>
                                                        <div className="p-3 border border-zinc-700 bg-black/20 rounded-lg text-sm text-zinc-400 mt-3">
                                                            Not enabled
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between p-3 border border-zinc-700 bg-black/20 rounded-lg">
                                                        <label className="text-sm font-semibold text-zinc-300">Live package updates</label>
                                                        <Checkbox className="border-zinc-600 data-[state=checked]:bg-[#4D2B8C] data-[state=checked]:border-[#4D2B8C]" />
                                                    </div>

                                                    <div className="space-y-3">
                                                        <label className="text-sm font-semibold text-zinc-300">Environment variables</label>
                                                        <div className="p-4 border border-dashed border-zinc-700 bg-black/20 rounded-lg text-center mt-3">
                                                            <p className="text-sm text-zinc-500 mb-2">None</p>
                                                            <Button className="border-zinc-600 text-zinc-300 hover:text-white hover:border-zinc-500">
                                                                <Plus size={14} className="mr-2" /> Add Variable
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        <div className="pt-4 flex items-center justify-between">
                                            <div className="pt-4 flex items-center justify-between">
                                                <Button onClick={() => router.push("/foundation/xcloud-hosting")} className="text-zinc-400 hover:text-white">Cancel</Button>
                                                <Button onClick={() => setCurrentStep(2)} className="bg-[#4D2B8C] hover:bg-[#3D2270] text-white font-bold px-8">Next: Review</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-8">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-2">Review Deployment</h2>
                                            <p className="text-zinc-400 text-sm">Review your settings before deploying.</p>
                                        </div>

                                        <div className="bg-[#151518] border border-zinc-800 rounded-xl p-6 space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-bold text-white mb-1 truncate">{appName || "reglook-app"}</h3>
                                                    <div className="flex items-center gap-2 text-zinc-500 text-sm mb-2">
                                                        <ExternalLink size={12} className="shrink-0" />
                                                        <span className="break-all">{appName ? `${appName}.xcloud.reglook.com` : "reglook-app.xcloud.reglook.com"}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 pt-6 border-t border-zinc-700/50">
                                                <div>
                                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">Framework</label>
                                                    <div className="flex items-center gap-2 text-zinc-200 font-medium">
                                                        <SimpleIcon
                                                            icon={popularFrameworks.find(f => f.name === selectedFramework)?.icon || siNextdotjs}
                                                            className="text-white"
                                                            size={16}
                                                        />
                                                        {selectedFramework}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">Root Directory</label>
                                                    <div className="flex items-center gap-2 text-zinc-200 font-medium">
                                                        <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-xs">{"./"}</code>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">Build Command</label>
                                                    <code className="text-zinc-300 bg-zinc-800 px-2 py-1 rounded text-xs">npm run build</code>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">Output Directory</label>
                                                    <code className="text-zinc-300 bg-zinc-800 px-2 py-1 rounded text-xs">.next</code>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-[#151518] border border-zinc-800 rounded-xl p-6 space-y-6">
                                            <h3 className="font-bold text-white">Advanced Settings</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
                                                <div>
                                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">Build instance type</label>
                                                    <div className="flex flex-col">
                                                        <span className="text-zinc-200 font-medium">Standard</span>
                                                        <span className="text-[10px] text-zinc-500">8 GiB Memory | 4 vCPUs | 128 GB Disk Space</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">Build image</label>
                                                    <span className="text-zinc-200 font-medium">Default</span>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">Keep cookies in cache key</label>
                                                    <span className="text-zinc-400 font-medium">Not enabled</span>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">Live package updates</label>
                                                    <span className="text-zinc-400 font-medium">Disabled</span>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-1.5">Environment variables</label>
                                                    <span className="text-zinc-400 font-medium">None</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex items-center justify-between">
                                            <Button onClick={() => setCurrentStep(1)} className="text-zinc-400 hover:text-white">Back</Button>
                                            <Button
                                                onClick={handleDeploy}
                                                disabled={isDeploying}
                                                className="bg-[#4D2B8C] hover:bg-[#3D2270] text-white font-bold px-8"
                                            >
                                                {isDeploying ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                        Starting...
                                                    </div>
                                                ) : "Deploy Now"}
                                            </Button>
                                        </div>
                                        {deployError && (
                                            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-200">
                                                <AlertCircle size={20} />
                                                <p className="text-sm">{deployError}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {currentStep === 3 && <DeploymentStatusStep
                                    animationData={animationData}
                                    instanceId={createdInstanceId || undefined}
                                    onComplete={() => {
                                        router.push("/foundation/xcloud-hosting");
                                        setTimeout(() => setCurrentStep(1), 500);
                                    }}
                                />}
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );

    async function handleDeploy() {
        if (!appName) {
            setDeployError("App name is required");
            return;
        }
        setIsDeploying(true);
        setDeployError(null);

        try {
            // 1. Create Project with Git Binding
            const API_URL = "http://localhost:9000";

            let projectId;

            const projectBody: any = { name: appName };


            const projectRes = await fetch(`${API_URL}/xcloud/projects`, {
                method: 'POST',
                body: JSON.stringify(projectBody),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (!projectRes.ok) {
                const err = await projectRes.json();
                if (projectRes.status === 409) {
                    // "This repository + branch is already deployed."
                    throw new Error(err.message || "This repository + branch is already deployed.");
                }
                // Handle generic failure (e.g. project name taken) by checking if we made it? 
                // If we fail here, we stop.
                throw new Error(err.message || "Project creation failed");
            }

            const project = await projectRes.json();
            projectId = project.id;

            // 2. Create Instance
            // Note: If using Git, the backend might auto-trigger a build/deploy via webhook or initial build?
            // User says "Once repo is bound to project, push = deploy."
            // Does creating the project trigger the FIRST build?
            // Usually yes, or we trigger it explicitly.
            // The user didn't ask to change Instance creation logic, but "Frontend thinks: Create project → create instance → later connect git". "That’s backwards".
            // Correct model: Project is bound to repo. Instance is infra.
            // So we still need an Instance to run it.

            const instanceRes = await fetch(`${API_URL}/xcloud/instances`, {
                method: 'POST',
                body: JSON.stringify({
                    projectId,
                    name: appName,
                    region: 'nbg1',
                    provider: 'hetzner',
                    vcpu: 2,
                    ramMb: 4096,
                    diskGb: 40,
                    image: 'ubuntu-20.04',
                }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (!instanceRes.ok) {
                const error = await instanceRes.json();
                if (instanceRes.status === 429) throw new Error("Rate limit exceeded. Please try again in 1 minute.");
                throw new Error(error.message || "Failed to create instance");
            }

            const instance = await instanceRes.json();
            setCreatedInstanceId(instance.id);
            setCurrentStep(4);

        } catch (err: any) {
            setDeployError(err.message);
        } finally {
            setIsDeploying(false);
        }
    }
}

function DeploymentStatusStep({ animationData, instanceId, onComplete }: { animationData: any, instanceId?: string, onComplete: () => void }) {
    const [status, setStatus] = React.useState<"deploying" | "success" | "error">("deploying");
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        if (!instanceId) {
            // Mock mode if no ID (shouldn't happen in real flow)
            const timer = setTimeout(() => setStatus("success"), 4000);
            return () => clearTimeout(timer);
        }

        const API_URL = "http://localhost:9000";

        const poll = async () => {
            try {
                const res = await fetch(`${API_URL}/xcloud/instances`, { credentials: 'include' });
                const data = await res.json();
                const instance = data.find((i: any) => i.id === instanceId);

                if (instance) {
                    if (instance.status === 'running') {
                        setStatus("success");
                    } else if (instance.status === 'error') {
                        setStatus("error");
                        setErrorMessage("Provisioning failed. Check logs.");
                    }
                    // else stay deploying
                }
            } catch (err) {
                console.error("Polling error", err);
            }
        };

        const interval = setInterval(poll, 3000);
        return () => clearInterval(interval);
    }, [instanceId]);

    React.useEffect(() => {
        if (status === "success") {
            const timer = setTimeout(() => {
                onComplete();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [status, onComplete]);

    if (status === "error") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] w-full text-center space-y-6">
                <div className="text-red-500"><AlertCircle size={48} /></div>
                <h2 className="text-2xl font-bold text-white">Deployment Failed</h2>
                <p className="text-zinc-400">{errorMessage}</p>
                <Button onClick={onComplete} className="border-zinc-700 bg-zinc-700 cursor-pointer font-semibold text-white">Return to Dashboard</Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] w-full text-center space-y-6 relative overflow-hidden rounded-3xl">
            {/* Background Animation */}
            {animationData && (
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        className="w-full h-full scale-[1.2]"
                        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                    />
                </div>
            )}

            <AnimatePresence mode="wait">
                {status === "deploying" ? (
                    <motion.div
                        key="deploying"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                        className="z-10 flex flex-col items-center"
                    >
                        <div className="relative z-10 flex items-center justify-center h-24 w-24 mb-4">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-[#fff]/40 rounded-full blur-2xl animate-pulse" />

                            {/* Outer Spinner */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-t-2 border-white border-r-2 border-r-transparent border-b-2 border-b-white/20 border-l-2 border-l-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Inner Spinner */}
                            <motion.div
                                className="absolute inset-3 rounded-full border-b-2 border-[#fff] border-l-2 border-l-transparent border-t-2 border-t-transparent border-r-2 border-r-transparent"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Icon */}
                            <Cloud className="text-white fill-white/10" size={32} />
                        </div>
                        <div className="z-10 relative">
                            <h2 className="text-2xl font-bold text-white mb-2">Deploying your app</h2>
                            <p className="text-zinc-300 text-sm">Please wait while we provision resources and build your project.</p>
                        </div>

                        <Button className="border-zinc-700 mt-10 font-semibold cursor-pointer text-zinc-400 hover:text-white hover:border-white z-10 bg-black/50 backdrop-blur-sm">Cancel Deployment</Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="z-10 flex flex-col items-center"
                    >
                        <div className="relative z-10 flex items-center justify-center h-24 w-24 mb-4">
                            <div className="absolute inset-0 bg-green-500/40 rounded-full blur-2xl" />
                            <div className="bg-green-500 rounded-full p-4 shadow-lg shadow-green-500/20">
                                <CheckCircle2 size={48} className="text-white" />
                            </div>
                        </div>
                        <div className="z-10 relative">
                            <h2 className="text-3xl font-bold text-white mb-2">Deployment Successful!</h2>
                            <p className="text-zinc-300 text-sm mb-8">Your app is now live and ready to soar.</p>

                            <Button className="bg-[#4D2B8C] hover:bg-[#3D2270] text-white font-bold px-8 shadow-lg shadow-purple-900/30">
                                Visit Deployed URL <ExternalLink size={16} className="ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function AppDashboard({ appName }: { appName: string }) {
    const [openSections, setOpenSections] = React.useState<string[]>(["Hosting", "Monitoring", "App settings"]);
    const [activeItem, setActiveItem] = React.useState("Overview");

    const toggleSection = (title: string) => {
        setOpenSections(prev =>
            prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
        );
    };

    const navItems = [
        {
            title: "Overview",
            icon: LayoutDashboard,
            items: []
        },
        {
            title: "Hosting",
            icon: Cloud,
            items: [
                "Access control",
                "Build notifications",
                "Build settings",
                "Custom domains",
                "Custom headers and cache",
                "Environment variables",
                "Firewall",
                "Previews",
                "Rewrites and redirects",
                "Secrets"
            ]
        },
        {
            title: "Monitoring",
            icon: Activity,
            items: [
                "Access logs",
                "Alarms",
                "Hosting compute logs",
                "Metrics"
            ]
        },
        {
            title: "App settings",
            icon: Settings,
            items: [
                "General settings",
                "Branch settings",
                "User roles"
            ]
        }
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start min-h-screen lg:h-[calc(100vh-8rem)]">
            {/* Sidebar */}
            <div className="w-full lg:w-[280px] shrink-0 space-y-4 lg:h-full lg:overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="w-full bg-[#151518] border border-zinc-800 rounded-lg overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-10 backdrop-blur-md">
                        <h2 className="text-base font-bold text-white break-all">{appName}</h2>
                        <div className="flex items-center gap-2 text-zinc-500 text-xs mt-1">
                            <CheckCircle2 size={12} className="text-green-500" />
                            <span>Production</span>
                        </div>
                    </div>
                    {navItems.map((section, index) => (
                        <div key={section.title} className={`flex flex-col ${index !== navItems.length - 1 ? 'border-b border-zinc-800' : ''}`}>
                            {section.items.length === 0 ? (
                                // Single Item (Overview)
                                <button
                                    onClick={() => setActiveItem(section.title)}
                                    className={`w-full flex items-center gap-3 p-4 hover:bg-zinc-800/50 transition-colors text-left font-medium ${activeItem === section.title ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
                                >
                                    <section.icon size={16} className={activeItem === section.title ? "text-white" : "text-zinc-500"} />
                                    <span className="text-sm">{section.title}</span>
                                </button>
                            ) : (
                                // Collapsible Section
                                <div>
                                    <button
                                        onClick={() => toggleSection(section.title)}
                                        className={`w-full flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors text-left ${openSections.includes(section.title) ? "bg-zinc-900/50 text-zinc-200" : "text-zinc-400"}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <section.icon size={16} className={openSections.includes(section.title) ? "text-zinc-300" : "text-zinc-500"} />
                                            <span className="font-medium text-sm">{section.title}</span>
                                        </div>
                                        <ChevronDown
                                            size={14}
                                            className={`text-zinc-500 transition-transform duration-300 ${openSections.includes(section.title) ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    <motion.div
                                        initial={false}
                                        animate={{ height: openSections.includes(section.title) ? "auto" : 0 }}
                                        className="overflow-hidden bg-[#0f0f10]/50"
                                    >
                                        <div className="flex flex-col border-t border-zinc-800/50">
                                            {section.items.map(item => (
                                                <button
                                                    key={item}
                                                    onClick={() => setActiveItem(item)}
                                                    className={`w-full text-left py-2.5 px-10 text-xs font-medium transition-colors border-l-2 ${activeItem === item ? "border-white bg-zinc-800/50 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30"}`}
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Pane */}
            <div className="flex-1 w-full bg-[#1c1c1f] border border-zinc-800 rounded-2xl md:rounded-3xl min-h-[600px] lg:min-h-0 lg:h-full lg:overflow-y-auto p-4 md:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="border-b border-zinc-800 pb-6 mb-6">
                    <h1 className="text-2xl font-bold text-white">{activeItem}</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage your application's {activeItem.toLowerCase()}.</p>
                </div>

                <div className="min-h-[400px]">
                    {activeItem === "Overview" && <Overview appName={appName} />}
                    {activeItem === "Access control" && <AccessControl />}
                    {activeItem === "Build notifications" && <BuildNotifications />}
                    {activeItem === "Build settings" && <BuildSettings />}
                    {activeItem === "Custom domains" && <CustomDomains />}
                    {activeItem === "Custom headers and cache" && <CustomHeaders />}
                    {activeItem === "Environment variables" && <EnvironmentVariables />}
                    {activeItem === "Firewall" && <Firewall />}
                    {activeItem === "Previews" && <Previews />}
                    {activeItem === "Rewrites and redirects" && <RewritesRedirects />}
                    {activeItem === "Secrets" && <Secrets />}

                    {/* Monitoring */}
                    {activeItem === "Access logs" && <AccessLogs />}
                    {activeItem === "Alarms" && <Alarms />}
                    {activeItem === "Hosting compute logs" && <HostingComputeLogs />}
                    {activeItem === "Metrics" && <Metrics />}

                    {/* App Settings */}
                    {activeItem === "General settings" && <GeneralSettings />}
                    {activeItem === "Branch settings" && <BranchSettings />}
                    {activeItem === "User roles" && <UserRoles />}
                </div>
            </div>
        </div>
    );
}

export default function XCloudHostingPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <XCloudHostingContent />
        </React.Suspense>
    );
}


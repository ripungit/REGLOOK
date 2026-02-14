"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    Eye,
    Grid2X2Check,
    Globe,
    Server,
    ExternalLink,
    Plus,
    ArrowUp,
    ChevronUp,
    ChevronRight,
    MoreHorizontal,
    Pencil,
    Copy,
    ChevronDown,
    Database,
    HardDrive,
    Settings,
    Activity,
    Shield,
    TerminalSquare,
    Cpu,
    Microchip,
    Clock,
    PlayCircle,
    PauseCircle,
    RefreshCw,
    DownloadCloud,
    LayoutDashboard,
    Folder,
    Terminal,
    Rocket,
    Box,
    Code2,
    Layers,
    ShoppingBag,
    Maximize2,
    Minimize2,
    X,
    Minus,
    GripVertical,
    Loader2,
    AlertCircle,
    TerminalSquareIcon,
    GitBranch,
    CheckCircle2,
    InfoIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from "recharts";
import {
    siWordpress,
    siNextdotjs,
    siNodedotjs,
    siDocker,
    siWoocommerce,
    siGhost,
    siDrupal,
    siJoomla,
    siPrestashop,
    siLaravel,
    siDjango,
    siStrapi,
    siGithub,
    siGitlab,
    siBitbucket
} from "simple-icons/icons";

// --- Mock Data ---
interface ServerType {
    id: number;
    name: string;
    ipv4: string;
    location: string;
    locationFlag: string;
    status: "RUNNING" | "STOPPED" | "MAINTENANCE";
    statusColor: string;
    type: "VPS" | "Dedicated";
    specs: {
        cpu: string;
        ram: string;
        disk: string;
    };
    usage: {
        cpu: number;
        ram: number;
        disk: number;
    };
    os: string;
    uptime: string;
}

const chartData = {
    cpu: [
        { v: 10 }, { v: 25 }, { v: 15 }, { v: 40 }, { v: 30 }, { v: 60 }, { v: 50 }, { v: 80 }
    ],
    memory: [
        { v: 30 }, { v: 35 }, { v: 45 }, { v: 40 }, { v: 60 }, { v: 55 }, { v: 70 }, { v: 65 }
    ],
    netIn: [
        { v: 10 }, { v: 40 }, { v: 20 }, { v: 50 }, { v: 30 }, { v: 70 }, { v: 40 }, { v: 60 }
    ],
    netOut: [
        { v: 25 }, { v: 20 }, { v: 40 }, { v: 25 }, { v: 50 }, { v: 35 }, { v: 45 }, { v: 30 }
    ]
};
const CHART_COLOR = "#00a8c2";

// Wrapper for Simple Icons to behave like Lucide Icons
const SimpleIconWrapper = (icon: any) => ({ size = 24, className = "" }: { size?: number | string, className?: string }) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={`fill-current ${className}`}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d={icon.path} />
    </svg>
);

const SERVERS: ServerType[] = [
    {
        id: 1,
        name: "s1.reglook-node.com",
        ipv4: "192.168.1.101",
        location: "New York, USA",
        locationFlag: "🇺🇸",
        status: "RUNNING",
        statusColor: "text-emerald-500",
        type: "VPS",
        specs: { cpu: "2 vCPU", ram: "4 GB", disk: "80 GB SSD" },
        usage: { cpu: 12, ram: 45, disk: 32 },
        os: "Ubuntu 24.04 LTS",
        uptime: "14d 2h 12m"
    },
    {
        id: 2,
        name: "db-primary.reglook.net",
        ipv4: "10.0.0.52",
        location: "Frankfurt, DE",
        locationFlag: "🇩🇪",
        status: "RUNNING",
        statusColor: "text-emerald-500",
        type: "Dedicated",
        specs: { cpu: "8 Core", ram: "32 GB", disk: "1 TB NVMe" },
        usage: { cpu: 45, ram: 60, disk: 55 },
        os: "Debian 12",
        uptime: "92d 11h 05m"
    },
    {
        id: 3,
        name: "dev-env-01",
        ipv4: "192.168.1.205",
        location: "Singapore, SG",
        locationFlag: "🇸🇬",
        status: "STOPPED",
        statusColor: "text-red-500",
        type: "VPS",
        specs: { cpu: "1 vCPU", ram: "2 GB", disk: "40 GB SSD" },
        usage: { cpu: 0, ram: 0, disk: 12 },
        os: "CentOS 9 Stream",
        uptime: "0m"
    },
    {
        id: 4,
        name: "backup-s2.reglook.net",
        ipv4: "10.0.0.99",
        location: "London, UK",
        locationFlag: "🇬🇧",
        status: "RUNNING",
        statusColor: "text-emerald-500",
        type: "VPS",
        specs: { cpu: "4 vCPU", ram: "8 GB", disk: "500 GB HDD" },
        usage: { cpu: 5, ram: 20, disk: 85 },
        os: "Ubuntu 22.04 LTS",
        uptime: "120d 4h 12m"
    },
    {
        id: 5,
        name: "staging-api.reglook.io",
        ipv4: "192.168.1.210",
        location: "Toronto, CA",
        locationFlag: "🇨🇦",
        status: "MAINTENANCE",
        statusColor: "text-amber-500",
        type: "VPS",
        specs: { cpu: "2 vCPU", ram: "4 GB", disk: "80 GB NVMe" },
        usage: { cpu: 0, ram: 0, disk: 0 },
        os: "Debian 11",
        uptime: "0m"
    },
    {
        id: 6,
        name: "redis-cache-01",
        ipv4: "10.0.2.15",
        location: "Frankfurt, DE",
        locationFlag: "🇩🇪",
        status: "RUNNING",
        statusColor: "text-emerald-500",
        type: "Dedicated",
        specs: { cpu: "16 Core", ram: "64 GB", disk: "2 TB NVMe" },
        usage: { cpu: 15, ram: 75, disk: 40 },
        os: "Alpine Linux",
        uptime: "45d 12h 30m"
    }
];

function HostingManagerContent() {
    const [selectedServer, setSelectedServer] = React.useState<ServerType | null>(null);
    const [activeTab, setActiveTab] = React.useState("Overview");
    const [guideOs, setGuideOs] = React.useState<"unix" | "win">("unix");
    const [showPassword, setShowPassword] = React.useState(false);
    const [isEditingPassword, setIsEditingPassword] = React.useState(false);
    const [deployApp, setDeployApp] = React.useState<any>(null);
    const [isDeploying, setIsDeploying] = React.useState(false);
    const [deployStep, setDeployStep] = React.useState(1);
    const [pipelineStatus, setPipelineStatus] = React.useState<"IDLE" | "PROVISIONING" | "BUILDING" | "DEPLOYING" | "VERIFYING" | "COMPLETE">("IDLE");
    const tabsRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (tabsRef.current) {
            const tabBtn = document.getElementById(`tab-${activeTab}`);
            if (tabBtn) {
                const container = tabsRef.current;
                // Calculate position to center the tab
                const scrollLeft = tabBtn.offsetLeft - (container.clientWidth / 2) + (tabBtn.clientWidth / 2);
                container.scrollTo({
                    left: scrollLeft,
                    behavior: "smooth"
                });
            }
        }
    }, [activeTab]);

    // Router/Path hooks
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Effect to sync URL with selection
    React.useEffect(() => {
        const manageServer = searchParams.get("manage");
        if (manageServer) {
            const server = SERVERS.find(s => s.name === manageServer);
            if (server) setSelectedServer(server);
            else setSelectedServer(null);
        } else {
            setSelectedServer(null);
        }
    }, [searchParams]);

    const handleServerSelect = (server: ServerType) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("manage", server.name);
        router.push(pathname + "?" + params.toString());
    };

    const handleClearSelection = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("manage");
        router.push(pathname + "?" + params.toString());
    };

    const handleWebConsole = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("terminal", "open");
        router.push(pathname + "?" + params.toString());
    };

    // --- Web Console Logic ---
    const isTerminalOpen = searchParams.get("terminal") === "open";
    const [history, setHistory] = React.useState<string[]>([]);
    const [terminalInput, setTerminalInput] = React.useState("");
    const [isFullScreen, setIsFullScreen] = React.useState(false);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [terminalTarget, setTerminalTarget] = React.useState<ServerType | null>(null);
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [isConnecting, setIsConnecting] = React.useState(false);
    const [dropError, setDropError] = React.useState<string | null>(null);


    const inputRef = React.useRef<HTMLInputElement>(null);
    const bodyRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (isTerminalOpen) {
            // New logic: Don't auto-connect. Wait for terminalTarget.
            if (!terminalTarget) {
                // We are in selection mode, so clear history
                setHistory([]);
                setTerminalInput("");
                return;
            }

            // Connected sequence
            setHistory([]);
            setTerminalInput("");
            const sequence = [
                { text: `Connecting to ${terminalTarget.name}...`, delay: 500 },
                { text: "Establishing secure SSH connection...", delay: 1200 },
                { text: "Verifying host key fingerprint...", delay: 2000 },
                { text: "Authenticated with public key.", delay: 2800 },
                { text: `Last login: ${new Date().toUTCString()} from 192.168.1.50`, delay: 3500 },
                { text: "READY", delay: 3600 } // Special marker
            ];

            let timeouts: NodeJS.Timeout[] = [];

            sequence.forEach(({ text, delay }) => {
                const timeout = setTimeout(() => {
                    setHistory(prev => [...prev, text]);
                }, delay);
                timeouts.push(timeout);
            });

            return () => timeouts.forEach(clearTimeout);
        } else {
            // Reset when closed
            setTerminalTarget(null);
            setIsConnecting(false);
            setIsMinimized(false);
        }
    }, [isTerminalOpen, terminalTarget]);

    React.useEffect(() => {
        const manageParam = searchParams.get("manage");
        const termParam = searchParams.get("terminal");

        // Only run automation if terminal is open, we have a target in URL, 
        // no current connection.
        if (termParam === "open" && manageParam && !terminalTarget && !isConnecting && !dropError) {
            const server = SERVERS.find(s => s.name === manageParam);
            if (server) {
                // Direct Connect logic
                if (server.status === "STOPPED") {
                    setDropError(`Cannot connect to ${server.name} because it is STOPPED.`);
                    setTimeout(() => setDropError(null), 5000);
                    return;
                }

                setIsConnecting(true);
                setDropError(null);
                // Simulate connection delay
                setTimeout(() => {
                    setTerminalTarget(server);
                    setIsConnecting(false);
                }, 1500);
            }
        }
    }, [searchParams, terminalTarget, isConnecting, dropError]);

    // Auto-scroll to bottom
    React.useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history]);

    // Lock body scroll when terminal is open (and not minimized)
    React.useEffect(() => {
        if (isTerminalOpen && !isMinimized) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isTerminalOpen, isMinimized]);

    // Focus input on click
    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.trim();
            const newHistory = [...history];
            // Add user command
            newHistory.push(`root@${terminalTarget?.name?.split('.')[0] || "s1"}:~# ${cmd}`);

            // Simulate response
            if (cmd === 'clear') { // clear command
                setHistory([]);
                setTerminalInput("");
                return;
            } else if (cmd === 'help') {
                newHistory.push("Available commands: help, clear, exit, reboot, status");
            } else if (cmd === 'exit') {
                handleCloseTerminal();
                return;
            } else if (cmd !== "") {
                newHistory.push(`bash: ${cmd}: command not found`);
            }

            setHistory(newHistory);
            setTerminalInput("");
        }
    };

    const handleCloseTerminal = () => {
        setIsMinimized(false);
        setTerminalTarget(null);
        setIsConnecting(false);
        setDropError(null);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("terminal");
        router.push(pathname + "?" + params.toString());
    };

    // --- DnD Handlers ---
    const handleDragStart = (e: React.DragEvent, server: ServerType) => {
        e.dataTransfer.setData("serverId", server.id.toString());
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const serverId = e.dataTransfer.getData("serverId");
        const server = SERVERS.find(s => s.id.toString() === serverId);

        if (server) {
            if (server.status === "STOPPED") {
                setDropError(`Cannot connect to ${server.name} because it is STOPPED.`);
                setTimeout(() => setDropError(null), 5000);
                return;
            }

            setIsConnecting(true);
            setDropError(null);
            // Simulate connection delay
            setTimeout(() => {
                setTerminalTarget(server);
                setIsConnecting(false);
            }, 1500);
        }
    };

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* TERMINAL OVERLAY */}
            <AnimatePresence>
                {/* 1. SELECTION MODAL (Drag & Drop) */}
                {isTerminalOpen && !terminalTarget && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300 p-0 md:p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-4xl h-full md:h-[500px] bg-[#0c0c0c] rounded-none md:rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
                        >
                            {/* Left: Server List */}
                            <div className="bg-[#000] p-8 border-r border-[#1a1a1a] flex flex-col h-full overflow-hidden">
                                <div className="mb-6 flex-shrink-0">
                                    <h3 className="text-zinc-100 font-bold mb-2 flex items-center gap-2 text-lg">
                                        Select Server
                                    </h3>
                                    <p className="text-zinc-500 text-sm">Drag or click a hosted server to connect via SSH.</p>
                                </div>

                                <div className="space-y-3 overflow-y-auto flex-1 min-h-0 pr-2 pb-2 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    <style jsx>{`
                                        .scrollbar-none::-webkit-scrollbar {
                                            display: none;
                                        }
                                    `}</style>
                                    {SERVERS.map(server => (
                                        <div
                                            key={server.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, server)}
                                            onClick={() => {
                                                if (server.status === "STOPPED") {
                                                    setDropError(`Cannot connect to ${server.name} because it is STOPPED.`);
                                                    setTimeout(() => setDropError(null), 5000);
                                                    return;
                                                }
                                                setIsConnecting(true);
                                                setDropError(null);
                                                setTimeout(() => {
                                                    setTerminalTarget(server);
                                                    setIsConnecting(false);
                                                }, 1500);
                                            }}
                                            className="bg-[#000] hover:bg-[#000] p-4 rounded-xl border border-white/5 hover:border-white/10 cursor-pointer active:scale-95 group transition-all duration-300 relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-2">
                                                <div className={`w-2 h-2 rounded-full ${server.status === "RUNNING" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-red-500"}`} />
                                            </div>
                                            <div className="flex items-center gap-4 pointer-events-none">
                                                <div className="h-10 w-10 rounded-lg bg-[#000] flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                                                    <Server size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-zinc-200 text-sm font-semibold tracking-wide">{server.name}</p>
                                                    <p className="text-zinc-600 text-xs font-mono mt-0.5">{server.ipv4}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Drop Zone */}
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`relative p-6 flex flex-col items-center justify-center transition-all bg-[#000]
                                    ${isDragOver ? "bg-emerald-500/5" : ""}
                                `}
                            >
                                {isConnecting ? (
                                    <div className="flex flex-col items-center animate-in fade-in duration-300">
                                        <div className="relative mb-4">
                                            <Loader2 size={40} className="text-emerald-500 animate-spin" />
                                        </div>
                                        <h3 className="text-white font-bold">Initializing Connection...</h3>
                                        <p className="text-zinc-500 text-sm mt-1">Authenticating secure handshake</p>
                                    </div>
                                ) : dropError ? (
                                    <div className="flex flex-col items-center animate-in fade-in duration-300">
                                        <div className="relative mb-4">
                                            <AlertCircle size={40} className="text-red-500" />
                                        </div>
                                        <h3 className="text-white font-bold">Connection Failed</h3>
                                        <p className="text-zinc-500 text-sm mt-1 text-center max-w-[250px]">{dropError}</p>
                                    </div>
                                ) : (
                                    <div className={`
                                        rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 w-full h-full
                                        ${isDragOver ? "border-emerald-500 bg-emerald-500/10 scale-[0.98]" : "border-zinc-800/50 hover:border-zinc-700"}
                                    `}>
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragOver ? "bg-emerald-500/20 text-emerald-500" : "bg-zinc-900 text-zinc-600"}`}>
                                            <TerminalSquare size={32} />
                                        </div>
                                        <h3 className={`font-bold mb-2 transition-colors ${isDragOver ? "text-emerald-500" : "text-zinc-400"}`}>
                                            {isDragOver ? "Drop to Connect" : "Launch Terminal"}
                                        </h3>
                                        <p className="text-zinc-600 text-sm max-w-[200px]">
                                            Drag your target server from the list or click to connect.
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={handleCloseTerminal}
                                    className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>



                        </motion.div>
                    </div>
                )}

                {/* 2. LIVE TERMINAL (Connected) */}
                {isTerminalOpen && terminalTarget && !isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-8"
                    >
                        <div
                            className={`${isFullScreen
                                ? "w-full h-full rounded-none"
                                : "w-full max-w-4xl h-[600px] rounded-xl shadow-2xl"
                                } bg-[#000] flex flex-col font-mono overflow-hidden transition-all duration-300`}
                        >
                            {/* Terminal Header */}
                            <div className="bg-[#111111] px-4 py-2 flex items-center justify-between relative select-none border-b border-[#111]">
                                {/* Title */}
                                <div className="flex h-7 items-center gap-2 text-xs text-zinc-400">
                                    <TerminalSquareIcon size={14} className="text-zinc-500" />
                                    <span className="text-zinc-200 font-medium">Cockpit Terminal</span>
                                    <span className="text-zinc-500 hidden md:inline">root — bash</span>
                                    <span className="text-zinc-600 hidden md:inline">({terminalTarget.name})</span>
                                </div>

                                {/* Window Controls */}
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setIsMinimized(true)}
                                        className="h-8 w-10 flex items-center justify-center text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
                                        aria-label="Minimize"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <button
                                        onClick={() => setIsFullScreen(!isFullScreen)}
                                        className="h-8 w-10 flex items-center justify-center text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
                                        aria-label="Maximize"
                                    >
                                        {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                                    </button>
                                    <button
                                        onClick={handleCloseTerminal}
                                        className="h-8 w-10 flex items-center justify-center text-zinc-400 hover:bg-red-500 hover:text-white transition-colors"
                                        aria-label="Close"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Terminal Body */}
                            <div
                                ref={bodyRef}
                                onClick={handleTerminalClick}
                                className="flex-1 p-3 overflow-y-auto text-md font-mono cursor-text"
                                style={{
                                    fontFamily: "Menlo, Monaco, 'Courier New', monospace",
                                    lineHeight: "1.5"
                                }}
                            >
                                {/* History */}
                                {history.filter(line => line !== "READY").map((line, i) => (
                                    <div key={i} className="break-words whitespace-pre-wrap text-zinc-300">
                                        {line.startsWith("root@") ? (
                                            <span>
                                                {line}
                                            </span>
                                        ) : (
                                            <span className={line.startsWith("bash:") ? "text-red-400" : "text-zinc-300"}>
                                                {line}
                                            </span>
                                        )}
                                    </div>
                                ))}

                                {/* Active Input Line */}
                                {history.includes("READY") && (
                                    <div className="flex text-zinc-300">
                                        <span className="mr-2 font-bold whitespace-nowrap">
                                            root@{terminalTarget?.name?.split('.')[0] || "s1"}:~#
                                        </span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={terminalInput}
                                            onChange={(e) => setTerminalInput(e.target.value)}
                                            onKeyDown={handleCommandSubmit}
                                            className="flex-1 bg-transparent border-none outline-none text-zinc-300 p-0 font-inherit caret-zinc-400"
                                            autoFocus
                                            spellCheck={false}
                                            autoComplete="off"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MINIMIZED CHAT BUBBLE */}
            <AnimatePresence>
                {isTerminalOpen && isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-6 left-6 z-[101]"
                    >
                        <button
                            onClick={() => setIsMinimized(false)}
                            className="
        bg-indigo-700
        border border-white/5
        px-4 py-2
        rounded-full
        inline-flex items-center gap-3
        cursor-pointer

        hover:bg-indigo-600
        transition-all
        group
        w-fit
    "
                        >
                            <div className="relative">
                                <TerminalSquare
                                    size={20}
                                    className="text-zinc-300 group-hover:text-white transition-colors"
                                />
                                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-100"></span>
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"></span>
                                </span>
                            </div>

                            <div className="flex flex-col items-start leading-tight">
                                <span className="font-mono text-xs font-bold text-white">
                                    root@{terminalTarget?.name?.split(".")[0] || "s1"}
                                </span>
                                <span className="text-[10px] text-zinc-300 font-semibold">
                                    Session Active
                                </span>
                            </div>
                        </button>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* 1. Header Strip (Theme: #005461) */}
            <div className="w-full bg-[#005461] py-4 md:py-6 shadow-md z-10 transition-colors duration-300">
                <div className="w-full px-4 md:px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-2 md:gap-4">
                            <Link href="/foundation">
                                <Button variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-8 w-8 md:h-10 md:w-10">
                                    <ArrowLeft size={18} className="md:w-[22px] md:h-[22px]" />
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="hidden md:flex p-1.5 md:p-2 bg-white/10 rounded-full backdrop-blur-sm items-center justify-center">
                                    <Server className="text-white w-4 h-4 md:w-[22px] md:h-[22px]" />
                                </div>
                                <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight">Hosting Manager</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <Button
                                onClick={handleWebConsole}
                                className="bg-white/10 hover:bg-white/20 text-white border-0 font-semibold rounded-full px-3 md:px-5 h-8 md:h-10 flex items-center gap-2 transition-all text-xs md:text-sm"
                            >
                                <TerminalSquare size={16} /> <span className="hidden sm:inline">Web Console</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full h-8 w-8 md:h-10 md:w-10">
                                <HelpCircle size={20} className="md:w-[22px] md:h-[22px]" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-8 flex-1">
                {!selectedServer ? (
                    // --- LIST VIEW ---
                    <>
                        {/* Controls Bar */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5 mb-6 md:mb-10 w-full">
                            {/* Search & Filters */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                                <div className="relative group w-full sm:w-auto">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={16} />
                                    <Input
                                        placeholder="Search servers..."
                                        className="pl-10 bg-[#1c1c1f] border-zinc-800 font-semibold text-zinc-200 placeholder:text-zinc-500 rounded-lg w-full sm:w-[280px] h-10 ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#005461] focus-visible:border-[#005461] transition-all shadow-sm"
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="ghost" className="flex-1 sm:flex-none h-10 bg-[#1c1c1f] border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 gap-2 px-4 text-xs font-semibold rounded-md">
                                        <SlidersHorizontal size={14} /> Filters
                                    </Button>
                                    <Button variant="ghost" className="flex-1 sm:flex-none h-10 bg-[#1c1c1f] border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 gap-2 px-4 text-xs font-semibold rounded-md">
                                        <ArrowUpDown size={14} /> Sort
                                    </Button>
                                </div>
                            </div>

                            {/* Right Actions */}
                            <div className="flex items-center gap-3 w-full sm:w-auto mt-2 md:mt-0">
                                <Button className="w-full sm:w-auto h-10 bg-[#005461] hover:bg-[#00414d] text-white font-bold text-sm px-6 rounded-full flex items-center justify-center gap-2 transition-all">
                                    <Plus size={16} /> Deploy New Server
                                </Button>
                            </div>
                        </div>

                        {/* Servers List */}
                        <div className="w-full">
                            {/* Header Row */}
                            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800 mb-2 hidden md:grid">
                                <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                                    <Checkbox className="border-zinc-700 data-[state=checked]:bg-[#005461] data-[state=checked]:border-[#005461] rounded-[4px]" />
                                    <span className="text-sm font-semibold text-zinc-400">Server ({SERVERS.length})</span>
                                </div>
                                <div className="hidden md:block md:col-span-3 text-sm font-semibold text-zinc-400">IP Address & Location</div>
                                <div className="hidden md:block md:col-span-2 text-sm font-semibold text-zinc-400">Status</div>
                                <div className="hidden md:block md:col-span-2 text-sm font-semibold text-zinc-400">Specs</div>
                                <div className="hidden md:block md:col-span-1 text-sm font-semibold text-zinc-400 text-right">Actions</div>
                            </div>
                            <div className="md:hidden px-4 py-2 border-b border-zinc-800 mb-2">
                                <span className="text-sm font-semibold text-zinc-400">Servers ({SERVERS.length})</span>
                            </div>

                            {/* Rows */}
                            <div className="space-y-1">
                                {SERVERS.map((server, i) => (
                                    <motion.div
                                        key={server.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => handleServerSelect(server)}
                                        className="group grid grid-cols-12 gap-y-4 md:gap-4 items-center px-4 py-5 hover:bg-[#1c1c1f] transition-all border-b border-zinc-800/40 last:border-0 cursor-pointer rounded-lg relative"
                                    >
                                        <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                                            <Checkbox onClick={(e) => e.stopPropagation()} className="border-zinc-700 data-[state=checked]:bg-[#005461] data-[state=checked]:border-[#005461] rounded-[4px] opacity-100 md:opacity-40 md:group-hover:opacity-100" />
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-[#005461]/20 flex items-center justify-center text-[#00a8c2] border border-[#005461]/50 shrink-0">
                                                    <Server size={20} />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-white font-bold text-sm tracking-tight group-hover:text-[#00a8c2] transition-colors truncate pr-2">{server.name}</span>
                                                    <span className="text-xs text-zinc-500 font-medium truncate">{server.os}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-6 md:col-span-3 flex flex-col justify-center pl-10 md:pl-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-white font-semibold px-2 md:px-4 py-1 rounded-[6px] border border-zinc-800 text-[10px] md:text-xs">{server.ipv4}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-white font-semibold mt-1">
                                                <span>{server.locationFlag}</span> <span className="text-zinc-400 font-normal">{server.location.split(',')[0]}</span>
                                            </div>
                                        </div>

                                        <div className="col-span-6 md:col-span-2 flex items-center justify-end md:justify-start">
                                            <Badge variant="outline" className={`border ${server.status === "RUNNING" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-red-500/10 border-red-500/20 text-red-500"} text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 flex items-center gap-1.5`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${server.status === "RUNNING" ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500"}`} />
                                                {server.status}
                                            </Badge>
                                        </div>

                                        <div className="hidden md:flex md:col-span-2 flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                                <Cpu size={12} /> {server.specs.cpu}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                                <HardDrive size={12} /> {server.specs.disk}
                                            </div>
                                        </div>

                                        <div className="absolute top-4 right-4 md:static col-span-12 md:col-span-1 flex items-center justify-end">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full">
                                                <MoreHorizontal size={18} />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    // --- DETAIL VIEW ---
                    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Detail Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#005461]/20 flex items-center justify-center text-[#00a8c2] border border-[#005461]/30 shrink-0">
                                    <Server size={24} />
                                </div>
                                <div className="min-w-0">
                                    <h1 className="text-lg md:text-2xl font-bold text-white tracking-tight truncate pr-2">{selectedServer.name}</h1>
                                    <div className="flex items-center flex-wrap gap-2 md:gap-3 mt-1 text-xs font-medium text-zinc-400">
                                        <span className="flex items-center gap-1"><Globe size={10} /> {selectedServer.ipv4}</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-700 hidden md:block" />
                                        <span>{selectedServer.uptime} uptime</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Button
                                    onClick={handleClearSelection}
                                    variant="secondary"
                                    className="bg-[#1c1c1f] hover:bg-[#27272a] text-white border border-zinc-800 rounded-full h-9 text-xs font-semibold px-4 flex items-center gap-2 w-full md:w-auto justify-center"
                                >
                                    <ArrowLeft size={14} /> Back to Servers
                                </Button>
                            </div>
                        </div>

                        {/* Status & Quick Actions Stripe */}
                        <div className="w-full bg-[#161618] border border-zinc-800/60 rounded-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-6 mb-8 items-center">
                            {/* Status Section */}
                            <div className="md:col-span-4 flex items-center gap-5 md:border-r border-zinc-800 md:pr-6">
                                <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-4 ${selectedServer.status === "RUNNING" ? "border-[#00a8c2]/20 bg-[#00a8c2]/10" : "border-red-500/20 bg-red-500/10"}`}>
                                    <div className={`w-3 h-3 rounded-full ${selectedServer.status === "RUNNING" ? "bg-[#fff] animate-pulse" : "bg-red-500"}`} />
                                </div>
                                <div>
                                    <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Current Status</h3>
                                    <p className="text-xl font-bold text-white tracking-tight">{selectedServer.status}</p>
                                </div>
                            </div>

                            {/* Metrics/Health (Middle) */}
                            <div className="md:col-span-3 flex flex-col gap-1 md:pl-2">
                                <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                                    <span>System Health</span>
                                    <span className={selectedServer.status === "RUNNING" ? "text-[#00a8c2]" : "text-amber-500"}>
                                        {selectedServer.status === "RUNNING" ? "Good" : "Attention"}
                                    </span>
                                </div>
                                <div className="w-full bg-zinc-800/50 h-1.5 rounded-full overflow-hidden mb-1">
                                    <div className={`h-full rounded-full w-full transition-all duration-500 ${selectedServer.status === "RUNNING" ? "bg-[#00a8c2]" : "bg-amber-500"}`} />
                                </div>
                                <span className="text-[10px] text-zinc-500">Last heartbeat: 24ms ago</span>
                            </div>

                            {/* Actions (Right) */}
                            <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-3 overflow-x-auto no-scrollbar">
                                <div className="flex items-center bg-transparent rounded-lg p-1 border border-zinc-800">
                                    <Button className="h-8 px-3 bg-transparent hover:bg-transparent hover:text-white/60 cursor-pointer rounded-md text-white text-xs font-bold gap-2">
                                        <PlayCircle size={14} /> Start
                                    </Button>
                                    <div className="w-px h-4 bg-zinc-800 mx-1" />
                                    <Button className="h-8 px-3 bg-transparent hover:bg-transparent hover:text-white/60 cursor-pointer rounded-md text-white text-xs font-bold gap-2">
                                        <RefreshCw size={14} /> Reboot
                                    </Button>
                                    <div className="w-px h-4 bg-zinc-800 mx-1" />
                                    <Button className="h-8 px-3 bg-transparent hover:bg-transparent hover:text-white/60 cursor-pointer rounded-md text-white text-xs font-bold gap-2">
                                        <PauseCircle size={14} /> Stop
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div ref={tabsRef} className="w-full border-b border-zinc-800 mb-8 overflow-x-auto no-scrollbar px-6 md:mx-0 md:px-0 scroll-smooth">
                            <div className="flex items-center gap-6 md:gap-8 min-w-full justify-between md:justify-start">
                                {["Overview", "Connect", "Deploy", "Settings", "Databases", "File Manager", "Backups"].map((tab) => (
                                    <button
                                        key={tab}
                                        id={`tab-${tab}`}
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === tab ? "text-white border-b-4 border-[#005461]" : "text-zinc-500 hover:text-zinc-300"}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- TAB CONTENT: OVERVIEW --- */}
                        {activeTab === "Overview" && (
                            <div className="flex flex-col gap-6">
                                {/* Detailed Metrics Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                                    {/* CPU Usage - Line Chart */}
                                    <div className="bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800/60 flex flex-col justify-between h-[140px]">
                                        <div className="flex items-center justify-between group cursor-pointer">
                                            <span className="text-zinc-400 text-xs font-medium flex items-center gap-1 group-hover:text-white transition-colors">CPU usage <ChevronRight size={12} /></span>
                                        </div>
                                        <div className="flex items-end justify-between mt-2 h-full">
                                            <span className="text-3xl font-bold text-white mb-1">{selectedServer.usage.cpu}%</span>
                                            <div className="h-[60px] w-[120px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={chartData.cpu}>
                                                        <defs>
                                                            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.3} />
                                                                <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <Area type="monotone" dataKey="v" stroke={CHART_COLOR} strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Memory Usage - Area Chart */}
                                    <div className="bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800/60 flex flex-col justify-between h-[140px]">
                                        <div className="flex items-center justify-between group cursor-pointer">
                                            <span className="text-zinc-400 text-xs font-medium flex items-center gap-1 group-hover:text-white transition-colors">Memory usage <ChevronRight size={12} /></span>
                                        </div>
                                        <div className="flex items-end justify-between mt-2 h-full">
                                            <span className="text-3xl font-bold text-white mb-1">{selectedServer.usage.ram}%</span>
                                            <div className="h-[60px] w-[120px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={chartData.memory}>
                                                        <defs>
                                                            <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.3} />
                                                                <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <Area type="monotone" dataKey="v" stroke={CHART_COLOR} strokeWidth={2} fillOpacity={1} fill="url(#colorMem)" />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Disk Usage - Pie Chart */}
                                    <div className="bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800/60 flex flex-col justify-between h-[140px]">
                                        <div className="flex items-center justify-between group cursor-pointer">
                                            <span className="text-zinc-400 text-xs font-medium flex items-center gap-1 group-hover:text-white transition-colors">Disk usage <ChevronRight size={12} /></span>
                                        </div>
                                        <div className="flex items-end justify-between mt-2 h-full">
                                            <span className="text-xl font-bold text-white mb-2">3 GB <span className="text-zinc-500 text-sm font-normal">/ 100 GB</span></span>
                                            <div className="h-[60px] w-[60px] relative">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={[{ value: 3 }, { value: 97 }]}
                                                            innerRadius={20}
                                                            outerRadius={28}
                                                            startAngle={90}
                                                            endAngle={-270}
                                                            dataKey="value"
                                                            stroke="none"
                                                        >
                                                            <Cell fill={CHART_COLOR} />
                                                            <Cell fill="#27272a" />
                                                        </Pie>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Incoming Traffic - Line Chart */}
                                    <div className="bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800/60 flex flex-col justify-between h-[140px]">
                                        <div className="flex items-center justify-between group cursor-pointer">
                                            <span className="text-zinc-400 text-xs font-medium flex items-center gap-1 group-hover:text-white transition-colors">Incoming traffic <ChevronRight size={12} /></span>
                                        </div>
                                        <div className="flex items-end justify-between mt-2 h-full">
                                            <span className="text-3xl font-bold text-white mb-1">0.7 MB</span>
                                            <div className="h-[60px] w-[120px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={chartData.netIn}>
                                                        <defs>
                                                            <linearGradient id="colorNetIn" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.3} />
                                                                <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <Area type="monotone" dataKey="v" stroke={CHART_COLOR} strokeWidth={2} fillOpacity={1} fill="url(#colorNetIn)" />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Outgoing Traffic - Area Chart */}
                                    <div className="bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800/60 flex flex-col justify-between h-[140px]">
                                        <div className="flex items-center justify-between group cursor-pointer">
                                            <span className="text-zinc-400 text-xs font-medium flex items-center gap-1 group-hover:text-white transition-colors">Outgoing traffic <ChevronRight size={12} /></span>
                                        </div>
                                        <div className="flex items-end justify-between mt-2 h-full">
                                            <span className="text-3xl font-bold text-white mb-1">0.2 MB</span>
                                            <div className="h-[60px] w-[120px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={chartData.netOut}>
                                                        <defs>
                                                            <linearGradient id="colorNetOut" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.3} />
                                                                <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <Area type="monotone" dataKey="v" stroke={CHART_COLOR} strokeWidth={2} fillOpacity={1} fill="url(#colorNetOut)" />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bandwidth - Pie Chart */}
                                    <div className="bg-[#1c1c1f] p-5 rounded-xl border border-zinc-800/60 flex flex-col justify-between h-[140px]">
                                        <div className="flex items-center justify-between group cursor-pointer">
                                            <span className="text-zinc-400 text-xs font-medium flex items-center gap-1 group-hover:text-white transition-colors">Bandwidth <ChevronRight size={12} /></span>
                                        </div>
                                        <div className="flex items-end justify-between mt-2 h-full">
                                            <span className="text-xl font-bold text-white mb-2">0 TB <span className="text-zinc-500 text-sm font-normal">/ 8 TB</span></span>
                                            <div className="h-[60px] w-[60px] relative">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={[{ value: 0 }, { value: 100 }]}
                                                            innerRadius={20}
                                                            outerRadius={28}
                                                            startAngle={90}
                                                            endAngle={-270}
                                                            dataKey="value"
                                                            stroke="none"
                                                        >
                                                            <Cell fill={CHART_COLOR} />
                                                            <Cell fill="#27272a" />
                                                        </Pie>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Server Config & Plan Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                                    {/* Left Column: Server Configuration */}
                                    <div className="bg-[#1c1c1f] rounded-xl border border-zinc-800/60 overflow-hidden">
                                        <div className="divide-y divide-zinc-800/50">
                                            {[
                                                { label: "Server location", value: `${selectedServer.location}`, icon: "edit" },
                                                { label: "OS", value: selectedServer.os, icon: "edit" },
                                                { label: "Hostname", value: "srv807634.hstgr.cloud", icon: "edit" },
                                                { label: "VPS uptime", value: selectedServer.uptime, icon: null },
                                                { label: "SSH username", value: "root", icon: "copy" },
                                                { label: "IPv4", value: selectedServer.ipv4, icon: "copy" },
                                            ].map((item, i) => (
                                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-zinc-800/20 transition-colors group gap-2 sm:gap-0">
                                                    <span className="text-zinc-500 text-sm font-medium">{item.label}</span>
                                                    <div className="flex items-center gap-3 self-end sm:self-auto">
                                                        <span className="text-white text-sm font-medium break-all">{item.value}</span>
                                                        {item.icon === "edit" && (
                                                            <button className="text-[#00a8c2] opacity-80 hover:opacity-100 transition-opacity"><Pencil size={14} /></button>
                                                        )}
                                                        {item.icon === "copy" && (
                                                            <button className="text-[#00a8c2] opacity-80 hover:opacity-100 transition-opacity"><Copy size={14} /></button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right Column: Plan & Specs */}
                                    <div className="bg-[#1c1c1f] rounded-xl border border-zinc-800/60 overflow-hidden">
                                        <div className="divide-y divide-zinc-800/50">
                                            {/* Plan items with actions */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-zinc-800/20 transition-colors group gap-2 sm:gap-0">
                                                <span className="text-zinc-500 text-sm font-medium">Current plan</span>
                                                <div className="flex items-center gap-3 self-end sm:self-auto">
                                                    <span className="text-white text-sm font-medium">KVM 2</span>
                                                    <button className="text-[#00a8c2] text-xs font-bold hover:underline">Upgrade</button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-zinc-800/20 transition-colors group gap-2 sm:gap-0">
                                                <span className="text-zinc-500 text-sm font-medium">Expiration date</span>
                                                <div className="flex items-center gap-3 self-end sm:self-auto">
                                                    <span className="text-white text-sm font-medium">2026-04-28</span>
                                                    <button className="text-[#00a8c2] text-xs font-bold hover:underline">Renew</button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-zinc-800/20 transition-colors group gap-2 sm:gap-0">
                                                <span className="text-zinc-500 text-sm font-medium">Auto-renewal</span>
                                                <button className="text-[#00a8c2] text-xs font-bold hover:underline self-end sm:self-auto">Turn on</button>
                                            </div>

                                            {/* Resource Specs */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-zinc-800/20 transition-colors group gap-2 sm:gap-0">
                                                <span className="text-zinc-500 text-sm font-medium">CPU core</span>
                                                <span className="text-white text-sm font-medium self-end sm:self-auto">{selectedServer.specs.cpu}</span>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-zinc-800/20 transition-colors group gap-2 sm:gap-0">
                                                <span className="text-zinc-500 text-sm font-medium">Memory</span>
                                                <span className="text-white text-sm font-medium self-end sm:self-auto">{selectedServer.specs.ram}</span>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-zinc-800/20 transition-colors group gap-2 sm:gap-0">
                                                <span className="text-zinc-500 text-sm font-medium">Disk space</span>
                                                <span className="text-white text-sm font-medium self-end sm:self-auto">{selectedServer.specs.disk}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* --- TAB CONTENT: CONNECT --- */}
                        {activeTab === "Connect" && (
                            <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in duration-500">

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Connection Details Table */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                <Terminal size={20} className="text-[#00a8c2]" /> Connection Details
                                            </h3>
                                            <p className="text-zinc-400 text-sm mt-1">Everything you need to access your server.</p>
                                        </div>

                                        <div className="bg-transparent rounded-xl border border-zinc-800/60 overflow-hidden">
                                            {/* Table Header - Hidden on small screens */}
                                            <div className="hidden md:grid grid-cols-12 border-b border-zinc-800/60 bg-[#161618] px-6 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                                <div className="col-span-4">Method</div>
                                                <div className="col-span-6">Address / Command</div>
                                                <div className="col-span-2 text-right">Action</div>
                                            </div>

                                            <div className="divide-y divide-zinc-800/40">
                                                {/* SSH Row */}
                                                <div className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center px-6 py-4 hover:bg-zinc-800/20 transition-colors gap-3 md:gap-0">
                                                    <div className="w-full md:col-span-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-zinc-800 rounded-lg">
                                                                <TerminalSquare size={18} className="text-white" />
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-semibold text-sm">SSH</p>
                                                                <p className="text-zinc-500 text-xs">Secure Shell</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full md:col-span-6">
                                                        <code className="bg-[#111] border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 font-mono block w-full md:w-fit break-all">
                                                            ssh root@{selectedServer.ipv4}
                                                        </code>
                                                    </div>
                                                    <div className="w-full md:col-span-2 flex justify-end">
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md">
                                                            <Copy size={16} />
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* VNC Row */}
                                                <div className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center px-6 py-4 hover:bg-zinc-800/20 transition-colors gap-3 md:gap-0">
                                                    <div className="w-full md:col-span-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-zinc-800 rounded-lg">
                                                                <Globe size={18} className="text-white" />
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-semibold text-sm">VNC</p>
                                                                <p className="text-zinc-500 text-xs">Remote Desktop</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full md:col-span-6 flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-zinc-500 text-xs font-mono">Host:</span>
                                                            <span className="text-zinc-300 text-xs font-mono break-all">{selectedServer.ipv4}:5901</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-full md:col-span-2 flex justify-end">
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md">
                                                            <Copy size={16} />
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Web Console Row */}
                                                <div className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center px-6 py-4 hover:bg-zinc-800/20 transition-colors gap-3 md:gap-0">
                                                    <div className="w-full md:col-span-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-zinc-800 rounded-lg">
                                                                <LayoutDashboard size={18} className="text-white" />
                                                            </div>
                                                            <div>
                                                                <p className="text-white font-semibold text-sm">Web Console</p>
                                                                <p className="text-zinc-500 text-xs">Browser Access</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full md:col-span-6">
                                                        <p className="text-zinc-400 text-xs">Direct browser-based terminal access.</p>
                                                    </div>
                                                    <div className="w-full md:col-span-2 flex justify-end">
                                                        <Button size="sm" className="h-8 bg-[#005461] hover:bg-[#00414d] text-white text-xs font-bold rounded-md px-3 w-full md:w-auto">
                                                            Launch
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Credentials Block */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-[#1c1c1f] p-4 rounded-xl border border-zinc-800/60">
                                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Username</p>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-white font-mono text-sm">root</p>
                                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-transparent text-zinc-500 hover:text-white"><Copy size={12} /></Button>
                                                </div>
                                            </div>
                                            <div className="bg-[#1c1c1f] p-4 rounded-xl border border-zinc-800/60">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Root Password</p>
                                                    {!isEditingPassword && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setIsEditingPassword(true)}
                                                            className="h-4 px-1 text-[14px] text-white font-semibold hover:text-[#00a8c2] hover:bg-transparent"
                                                        >
                                                            Edit
                                                        </Button>
                                                    )}
                                                </div>

                                                {isEditingPassword ? (
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            className="h-7 bg-[#111] border-zinc-700 text-xs font-mono text-white px-2 focus-visible:ring-1 focus-visible:ring-[#005461]"
                                                            defaultValue="secure_p@ssw0rd!"
                                                        />
                                                        <Button
                                                            size="sm"
                                                            className="h-7 px-3 bg-[#005461] hover:bg-[#00414d] text-white text-xs font-bold"
                                                            onClick={() => setIsEditingPassword(false)}
                                                        >
                                                            Save
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-white font-mono text-sm tracking-widest leading-none pt-1">
                                                                {showPassword ? "secure_p@ssw0rd!" : "••••••••••"}
                                                            </p>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className={`h-5 w-5 p-0 hover:bg-transparent ${showPassword ? "text-[#00a8c2]" : "text-zinc-500"} hover:text-white`}
                                                            >
                                                                <Eye size={14} />
                                                            </Button>
                                                        </div>
                                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-transparent text-zinc-500 hover:text-white"><Copy size={14} /></Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guide / Helper Side */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Quick Guide</h3>
                                            <p className="text-zinc-400 text-sm mt-1">Steps to connect from your local machine.</p>
                                        </div>

                                        <div className="bg-[#1c1c1f] rounded-xl border border-zinc-800/60 overflow-hidden">
                                            <div className="flex border-b border-zinc-800/60">
                                                <button
                                                    onClick={() => setGuideOs("unix")}
                                                    className={`flex-1 py-3 text-xs font-bold transition-colors ${guideOs === "unix" ? "text-white bg-[#161618] border-b-2 border-[#00a8c2]" : "text-zinc-500 hover:text-zinc-300"}`}
                                                >
                                                    Linux / Mac
                                                </button>
                                                <button
                                                    onClick={() => setGuideOs("win")}
                                                    className={`flex-1 py-3 text-xs font-bold transition-colors ${guideOs === "win" ? "text-white bg-[#161618] border-b-2 border-[#00a8c2]" : "text-zinc-500 hover:text-zinc-300"}`}
                                                >
                                                    Windows
                                                </button>
                                            </div>
                                            <div className="p-6 space-y-6 relative">
                                                <div className="absolute left-9 top-8 bottom-8 w-0.5 bg-zinc-800" />

                                                {guideOs === "unix" ? (
                                                    <>
                                                        <div className="relative flex gap-4">
                                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#005461] border-2 border-[#1c1c1f] text-white flex items-center justify-center text-[10px] font-bold z-10">1</div>
                                                            <div>
                                                                <p className="text-white text-sm font-semibold">Open Terminal</p>
                                                                <p className="text-zinc-500 text-xs mt-0.5">Press <code>Cmd + Space</code> and type "Terminal".</p>
                                                            </div>
                                                        </div>
                                                        <div className="relative flex gap-4">
                                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#005461] border-2 border-[#1c1c1f] text-white flex items-center justify-center text-[10px] font-bold z-10">2</div>
                                                            <div>
                                                                <p className="text-white text-sm font-semibold">Run SSH Command</p>
                                                                <code className="block mt-1 bg-black/30 px-2 py-1 rounded text-[10px] text-zinc-400 font-mono break-all">ssh root@{selectedServer.ipv4}</code>
                                                            </div>
                                                        </div>
                                                        <div className="relative flex gap-4">
                                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#005461] border-2 border-[#1c1c1f] text-white flex items-center justify-center text-[10px] font-bold z-10">3</div>
                                                            <div>
                                                                <p className="text-white text-sm font-semibold">Enter Password</p>
                                                                <p className="text-zinc-500 text-xs mt-0.5">Type 'yes' to confirm host key, then paste password.</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="relative flex gap-4">
                                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#005461] border-2 border-[#1c1c1f] text-white flex items-center justify-center text-[10px] font-bold z-10">1</div>
                                                            <div>
                                                                <p className="text-white text-sm font-semibold">Open PowerShell</p>
                                                                <p className="text-zinc-500 text-xs mt-0.5">Press <code>Win + X</code> and select "Windows Terminal".</p>
                                                            </div>
                                                        </div>
                                                        <div className="relative flex gap-4">
                                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#005461] border-2 border-[#1c1c1f] text-white flex items-center justify-center text-[10px] font-bold z-10">2</div>
                                                            <div>
                                                                <p className="text-white text-sm font-semibold">Run SSH Command</p>
                                                                <code className="block mt-1 bg-black/30 px-2 py-1 rounded text-[10px] text-zinc-400 font-mono break-all">ssh root@{selectedServer.ipv4}</code>
                                                            </div>
                                                        </div>
                                                        <div className="relative flex gap-4">
                                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#005461] border-2 border-[#1c1c1f] text-white flex items-center justify-center text-[10px] font-bold z-10">3</div>
                                                            <div>
                                                                <p className="text-white text-sm font-semibold">Enter Password</p>
                                                                <p className="text-zinc-500 text-xs mt-0.5">Paste password (right-click) when prompted.</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- TAB CONTENT: DEPLOY --- */}
                        {activeTab === "Deploy" && (
                            <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in duration-500">
                                {!deployApp ? (
                                    <>
                                        <div>
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                <Rocket size={20} className="text-[#00a8c2]" /> One-Click Deployments
                                            </h3>
                                            <p className="text-zinc-400 text-sm mt-1">Instantly deploy popular applications and frameworks.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {[
                                                { name: "WordPress", desc: "The world's most popular CMS.", icon: SimpleIconWrapper(siWordpress), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                                { name: "Next.js", desc: "The React Framework for the Web.", icon: SimpleIconWrapper(siNextdotjs), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                                { name: "Node.js", desc: "JavaScript runtime built on Chrome's V8.", icon: SimpleIconWrapper(siNodedotjs), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                                { name: "Docker", desc: "Empowering App Development.", icon: SimpleIconWrapper(siDocker), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                                { name: "WooCommerce", desc: "Flexible open-source eCommerce.", icon: SimpleIconWrapper(siWoocommerce), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                                { name: "Ghost", desc: "Professional publishing platform.", icon: SimpleIconWrapper(siGhost), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                                { name: "Drupal", desc: "Robust content management system.", icon: SimpleIconWrapper(siDrupal), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                                { name: "Joomla", desc: "Mobile-ready and user-friendly CMS.", icon: SimpleIconWrapper(siJoomla), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                                { name: "PrestaShop", desc: "Flexible eCommerce platform.", icon: SimpleIconWrapper(siPrestashop), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                                { name: "Laravel", desc: "The PHP Framework for Web Artisans.", icon: SimpleIconWrapper(siLaravel), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                                { name: "Django", desc: "The Web framework for perfectionists.", icon: SimpleIconWrapper(siDjango), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                                { name: "Strapi", desc: "The leading open-source headless CMS.", icon: SimpleIconWrapper(siStrapi), color: "text-[#fff]", bg: "bg-[#fff]/10 border-[#fff]/20" },
                                            ].map((app, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => setDeployApp(app)}
                                                    className="group bg-transparent hover:bg-transparent border border-zinc-800/60 p-5 rounded-xl transition-all cursor-pointer flex flex-col gap-4 relative overflow-hidden"
                                                >
                                                    {/* Hover Border Effect override */}
                                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-zinc-700/50 rounded-xl pointer-events-none transition-all" />

                                                    <div className={`absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity z-10`}>
                                                        <Button size="sm" className="h-7 bg-[#005461] hover:bg-[#00414d] text-white text-[10px] font-bold rounded px-3">Deploy</Button>
                                                    </div>
                                                    <div className={`w-12 h-12 rounded-lg border ${app.bg} flex items-center justify-center`}>
                                                        <app.icon size={24} className={app.color} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-bold text-sm">{app.name}</h4>
                                                        <p className="text-zinc-500 text-xs mt-1">{app.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="p-4 rounded-lg bg-[#005461]/10 border border-[#005461]/20 flex items-center gap-4">
                                            <div className="p-2 bg-[#005461] rounded-full text-white">
                                                <TerminalSquare size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm">Need a custom stack?</h4>
                                                <p className="text-zinc-400 text-xs">Use the <span className="text-[#00a8c2] cursor-pointer hover:underline" onClick={() => setActiveTab("Connect")}>Connect tab</span> to access your server via SSH and install any software you need.</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // --- DEPLOYMENT WIZARD (AWS AMPLIFY STYLE) ---
                                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                                        {/* Header / Nav */}
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                                            <div className="flex items-center gap-4">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => { setDeployApp(null); setDeployStep(1); setPipelineStatus("IDLE"); }}
                                                    className="rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
                                                >
                                                    <ArrowLeft size={20} />
                                                </Button>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg border ${deployApp.bg} flex items-center justify-center`}>
                                                        <deployApp.icon size={20} className={deployApp.color} />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-xl font-bold text-white">Deploy {deployApp.name}</h2>
                                                        <p className="text-zinc-500 text-xs">New App Deployment</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Progress Stepper (Only show if not deploying yet) */}
                                            {pipelineStatus === "IDLE" && (
                                                <div className="flex flex-wrap justify-center md:items-center gap-2">
                                                    {[
                                                        { step: 1, label: "Source" },
                                                        { step: 2, label: "Build Settings" },
                                                        { step: 3, label: "Review" }
                                                    ].map((s, i) => (
                                                        <div key={s.step} className="flex items-center gap-2">
                                                            <div className={`
                                                                flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors
                                                                ${deployStep === s.step ? "bg-[#005461] text-white" : deployStep > s.step ? "bg-[#005461] text-[#fff]" : "bg-zinc-800 text-zinc-500"}
                                                            `}>
                                                                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${deployStep === s.step ? "bg-white text-[#005461]" : deployStep > s.step ? "bg-[#005461] text-white" : "bg-zinc-600 text-zinc-300"}`}>
                                                                    {deployStep > s.step ? <Grid2X2Check size={10} /> : s.step}
                                                                </span>
                                                                {s.label}
                                                            </div>
                                                            {i < 2 && <div className="w-4 h-px bg-zinc-800" />}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* CONTENT AREA */}
                                        <div className="w-full">
                                            {pipelineStatus !== "IDLE" ? (
                                                // --- PIPELINE STATUS VIEW (TERMINAL STYLE) ---
                                                <div className="max-w-3xl mx-auto py-10">
                                                    <div className="bg-[#0c0c0c] rounded-lg border border-zinc-800 shadow-2xl overflow-hidden font-mono text-sm shadow-[#005461]/20">
                                                        {/* Terminal Header */}
                                                        <div className="bg-[#1c1c1f] px-4 py-2 flex items-center gap-2 border-b border-zinc-800 select-none">
                                                            <div className="flex gap-1.5">
                                                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                                                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                                                            </div>
                                                            <div className="flex-1 text-center text-zinc-500 text-xs font-medium">deploy-pipeline.sh — {deployApp.name.toLowerCase()}</div>
                                                        </div>

                                                        {/* Terminal Content */}
                                                        <div className="p-6 text-zinc-300 space-y-6 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                                                            {/* Intro Log */}
                                                            <div className="text-zinc-500 mb-4">
                                                                Last login: {new Date().toUTCString()} on ttys001
                                                            </div>

                                                            {[
                                                                { id: "PROVISIONING", label: "provision", desc: "Setting up compute resources..." },
                                                                { id: "BUILDING", label: "build", desc: "Compiling application assets..." },
                                                                { id: "DEPLOYING", label: "deploy", desc: "Propagating to edge locations..." },
                                                                { id: "VERIFYING", label: "verify", desc: "Running health checks..." }
                                                            ].map((step, i) => {
                                                                const stepsArr = ["PROVISIONING", "BUILDING", "DEPLOYING", "VERIFYING", "COMPLETE"];
                                                                const currentIndex = stepsArr.indexOf(pipelineStatus);
                                                                const stepIndex = i;

                                                                // Logic: 
                                                                // If current index > step index, it's done. 
                                                                // If current index == step index, it's processing.
                                                                // If pipelineStatus is COMPLETE, all are done.

                                                                let status = "PENDING";
                                                                if (pipelineStatus === "COMPLETE") status = "DONE";
                                                                else if (currentIndex > stepIndex) status = "DONE";
                                                                else if (currentIndex === stepIndex) status = "PROCESSING";

                                                                if (status === "PENDING") return null; // Don't show future steps yet? Or show them grayed out. Let's show them gray.

                                                                return (
                                                                    <div key={step.id} className={`${status === "PENDING" ? "opacity-30" : "opacity-100"} transition-opacity duration-500`}>
                                                                        <div className="flex gap-3 items-center">
                                                                            <span className="text-zinc-600 select-none">$</span>
                                                                            <span className="text-yellow-400">run-phase</span>
                                                                            <span className="text-emerald-400">--name={step.label}</span>
                                                                        </div>

                                                                        {status === "PROCESSING" && (
                                                                            <div className="pl-5 pt-1">
                                                                                <div className="text-zinc-400 mb-1">{step.desc}</div>
                                                                                <div className="text-[#00a8c2] flex items-center gap-2">
                                                                                    <span className="animate-pulse">▶</span> Processing...
                                                                                </div>
                                                                                {/* Fake detailed logs for effect */}
                                                                                <div className="mt-2 pl-2 border-l-2 border-zinc-800 text-xs text-zinc-500 space-y-0.5 font-mono">
                                                                                    <div>&gt; allocation_id: var-{Math.floor(Math.random() * 9000) + 1000}</div>
                                                                                    <div>&gt; region: us-east-1</div>
                                                                                    <div>&gt; worker_pool: standard-v2</div>
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                        {status === "DONE" && (
                                                                            <div className="pl-5 pt-1">
                                                                                <div className="text-zinc-400">{step.desc}</div>
                                                                                <div className="text-emerald-500 flex items-center gap-2">
                                                                                    <span>✓</span> Phase completed successfully.
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                        {status === "PENDING" && (
                                                                            <div className="pl-5 pt-1 text-zinc-600">
                                                                                Waiting to start...
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}

                                                            {pipelineStatus === "COMPLETE" && (
                                                                <div className="mt-8 border-t border-zinc-800 pt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                                                    <div className="text-emerald-400 font-bold text-lg mb-2">DEPLOYMENT SUCCESSFUL</div>
                                                                    <div className="text-zinc-400 mb-6">
                                                                        App is live at <a href="#" className="underline text-emerald-400 hover:text-emerald-300">https://{deployApp.name.toLowerCase()}.reglook.net</a>
                                                                    </div>

                                                                    <div className="flex gap-4">
                                                                        <button className="bg-[#005461] hover:bg-[#00414d] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2">
                                                                            Visit App <ExternalLink size={12} />
                                                                        </button>
                                                                        <button
                                                                            className="border border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors"
                                                                            onClick={() => { setDeployApp(null); setDeployStep(1); setPipelineStatus("IDLE"); }}
                                                                        >
                                                                            Back to Dashboard
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Cursor at the bottom if processing */}
                                                            {pipelineStatus !== "COMPLETE" && (
                                                                <div className="pt-4 animate-pulse">
                                                                    <span className="inline-block w-2.5 h-5 bg-zinc-500 align-middle" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="max-w-4xl mx-auto">
                                                    {/* --- STEP 1: SOURCE --- */}
                                                    {deployStep === 1 && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                                            className="space-y-6"
                                                        >
                                                            <div className="text-center mb-10">
                                                                <h3 className="text-2xl font-bold text-white mb-2">Connect your code</h3>
                                                                <p className="text-zinc-400">Select a repository provider to connect your project.</p>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                                {[
                                                                    { name: "GitHub", icon: SimpleIconWrapper(siGithub) },
                                                                    { name: "GitLab", icon: SimpleIconWrapper(siGitlab) },
                                                                    { name: "Bitbucket", icon: SimpleIconWrapper(siBitbucket) }
                                                                ].map((provider) => (
                                                                    <div key={provider.name} className="bg-[#1c1c1f] hover:bg-[#27272a] border border-zinc-800 p-6 rounded-xl cursor-pointer transition-all hover:border-zinc-600 flex flex-col items-center gap-4 group">
                                                                        <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-white/20 transition-colors">
                                                                            <provider.icon size={24} className="text-white" />
                                                                        </div>
                                                                        <span className="font-bold text-white">{provider.name}</span>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="relative">
                                                                <div className="absolute inset-0 flex items-center">
                                                                    <span className="w-full border-t border-zinc-800" />
                                                                </div>
                                                                <div className="relative flex justify-center text-xs uppercase">
                                                                    <span className="bg-[#0f0f10] px-2 text-zinc-500 font-bold">Or deploy from template</span>
                                                                </div>
                                                            </div>

                                                            <div className="bg-[#1c1c1f] border border-zinc-800/60 p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 cursor-pointer transition-all" onClick={() => setDeployStep(2)}>
                                                                <div className="w-full sm:w-12 h-12 bg-[#005461] text-[#fff] rounded-lg flex items-center justify-center shrink-0">
                                                                    <Box size={24} />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h4 className="text-white font-semibold">Start with {deployApp.name} Template</h4>
                                                                    <p className="text-zinc-500 text-xs mt-1">Deploy a new instance using our official pre-configured template.</p>
                                                                </div>
                                                                <Button className="w-full sm:w-auto bg-[#005461] font-semibold hover:bg-[#00414d] text-white">Select</Button>
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* --- STEP 2: BUILD SETTINGS --- */}
                                                    {deployStep === 2 && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                                            className="space-y-6"
                                                        >
                                                            <div className="mb-6">
                                                                <h3 className="text-xl font-bold text-white">App Configurations</h3>
                                                                <p className="text-zinc-400 text-sm">Configure your build settings and environment variables.</p>
                                                            </div>

                                                            <div className="bg-[#1c1c1f] border border-zinc-800/60 p-6 rounded-xl space-y-6">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                    <div className="space-y-2">
                                                                        <label className="text-xs font-bold text-zinc-400 uppercase">App Name</label>
                                                                        <Input defaultValue={`my-${deployApp.name.toLowerCase()}-app`} className="mt-2 bg-[#111] border-zinc-700 text-white" />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <label className="text-xs font-bold text-zinc-400 uppercase">Framework</label>
                                                                        <div className="mt-2 h-10 px-3 flex items-center bg-[#111] border border-zinc-700 text-zinc-400 rounded-md text-sm">
                                                                            {deployApp.name} (Auto-detected)
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <label className="text-xs font-bold text-zinc-400 uppercase">Build Command</label>
                                                                    <div className="mt-2 flex bg-[#111] border border-zinc-700 rounded-md font-mono text-sm overflow-hidden">
                                                                        <div className="bg-[#111] px-3 py-2 text-zinc-500 border-r border-zinc-700 select-none">$</div>
                                                                        <input className="bg-[#111] border-none text-white px-3 py-2 w-full focus:outline-none" defaultValue="npm run build" />
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <label className="text-xs font-bold text-zinc-400 uppercase">Output Directory</label>
                                                                    <div className="mt-2 flex bg-[#111] border border-zinc-700 rounded-md font-mono text-sm overflow-hidden">
                                                                        <div className="bg-[#111] px-3 py-2 text-zinc-500 border-r border-zinc-700 select-none">/</div>
                                                                        <input className="bg-[#111] border-none text-white px-3 py-2 w-full focus:outline-none" defaultValue=".next" />
                                                                    </div>
                                                                </div>

                                                                {/* Env Vars Toggle */}
                                                                <div className="pt-4 border-t border-zinc-800">
                                                                    <Button className="font-semibold w-full justify-between bg-[#161618] border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                                                                        <span>Environment Variables</span>
                                                                        <Plus size={16} />
                                                                    </Button>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-end gap-3">
                                                                <Button variant="ghost" onClick={() => setDeployStep(1)} className="text-zinc-400 hover:text-white">Back</Button>
                                                                <Button onClick={() => setDeployStep(3)} className="bg-[#005461] hover:bg-[#00414d] text-white font-bold px-6">Next</Button>
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* --- STEP 3: REVIEW --- */}
                                                    {deployStep === 3 && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                                            className="space-y-6"
                                                        >
                                                            <div className="mb-6">
                                                                <h3 className="text-xl font-bold text-white">Review</h3>
                                                                <p className="text-zinc-400 text-sm">Review your settings before deploying.</p>
                                                            </div>

                                                            <div className="bg-[#1c1c1f] border border-zinc-800/60 rounded-xl overflow-hidden">
                                                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                                                    <div>
                                                                        <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Repository / Source</p>
                                                                        <p className="text-white font-medium flex items-center gap-2"><Box size={16} className="text-[#00a8c2]" /> {deployApp.name} Template</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Framework</p>
                                                                        <p className="text-white font-medium">{deployApp.name}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Region</p>
                                                                        <p className="text-white font-medium flex items-center gap-2">🇺🇸 us-east-1 (N. Virginia)</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Compute Plan</p>
                                                                        <p className="text-white font-medium">Serverless Standard ($0.05/hr)</p>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-[#161618] px-6 py-4 border-t border-zinc-800 flex items-center gap-3">
                                                                    <InfoIcon size={16} className="text-[#00a8c2]" />
                                                                    <p className="text-xs text-zinc-400">Continuous deployment will be enabled for the main branch.</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-end gap-3 pt-4">
                                                                <Button variant="ghost" onClick={() => setDeployStep(2)} className="text-zinc-400 hover:text-white">Back</Button>
                                                                <Button
                                                                    onClick={() => {
                                                                        setPipelineStatus("PROVISIONING");
                                                                        // Simulate Progress
                                                                        setTimeout(() => setPipelineStatus("BUILDING"), 2500);
                                                                        setTimeout(() => setPipelineStatus("DEPLOYING"), 5500);
                                                                        setTimeout(() => setPipelineStatus("VERIFYING"), 8500);
                                                                        setTimeout(() => setPipelineStatus("COMPLETE"), 10500);
                                                                    }}
                                                                    className="bg-[#005461] hover:bg-[#00414d] text-white font-bold px-8 h-12 rounded-lg text-md shadow-lg shadow-[#005461]/20"
                                                                >
                                                                    Save and Deploy
                                                                </Button>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                )}
                            </div>
                        )}

                        {/* --- TAB CONTENT: SETTINGS --- */}
                        {activeTab === "Settings" && (
                            <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in duration-500">
                                {/* General Settings */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Settings size={18} className="text-[#00a8c2]" /> General Configuration
                                    </h3>
                                    <div className="bg-[#1c1c1f] rounded-xl border border-zinc-800/60 p-6 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Server Name</label>
                                                <Input
                                                    defaultValue={selectedServer.name}
                                                    className="bg-[#111] border-zinc-700 text-white focus-visible:ring-[#005461]"
                                                />
                                                <p className="text-[10px] text-zinc-500">Internal identifier for this instance.</p>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Reverse DNS (PTR)</label>
                                                <Input
                                                    defaultValue={selectedServer.name}
                                                    className="bg-[#111] border-zinc-700 text-white focus-visible:ring-[#005461]"
                                                />
                                                <p className="text-[10px] text-zinc-500">Hostname for IP address resolution.</p>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-zinc-800/50 flex justify-end">
                                            <Button className="bg-[#005461] hover:bg-[#00414d] text-white font-bold h-9">
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Security */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Shield size={18} className="text-[#00a8c2]" /> Security Access
                                    </h3>
                                    <div className="bg-[#1c1c1f] rounded-xl border border-zinc-800/60 divide-y divide-zinc-800/60">
                                        <div className="p-5 flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-semibold text-sm">SSH Password Authentication</p>
                                                <p className="text-zinc-500 text-xs mt-1">Allow logging in via SSH using a password. Key-based auth is recommended.</p>
                                            </div>
                                            <Switch className="data-[state=checked]:bg-[#005461]" />
                                        </div>
                                        <div className="p-5 flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-semibold text-sm">Root User Login</p>
                                                <p className="text-zinc-500 text-xs mt-1">Permit direct login as root user over SSH.</p>
                                            </div>
                                            <Switch className="data-[state=checked]:bg-[#005461]" defaultChecked />
                                        </div>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-red-500 flex items-center gap-2">
                                        Danger Zone
                                    </h3>
                                    <div className="bg-red-500/5 rounded-xl border border-red-500/20 p-6 space-y-6">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div>
                                                <p className="text-white font-bold text-sm">Rebuild Server</p>
                                                <p className="text-zinc-500 text-xs mt-1">Reinstall the operating surface. All data will be permanently lost.</p>
                                            </div>
                                            <Button variant="outline" className="w-full sm:w-auto border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400 font-bold h-9 bg-transparent">
                                                Rebuild
                                            </Button>
                                        </div>
                                        <div className="w-full h-px bg-red-500/10" />
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div>
                                                <p className="text-white font-bold text-sm">Delete Server</p>
                                                <p className="text-zinc-500 text-xs mt-1">Permanently remove this server and all associated backups.</p>
                                            </div>
                                            <Button variant="destructive" className="w-full sm:w-auto bg-red-800 hover:bg-red-700 font-bold h-9">
                                                Delete Server
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- TAB CONTENT: PLACEHOLDERS --- */}
                        {activeTab === "Databases" && (
                            <div className="flex flex-col items-center justify-center py-20 text-center bg-[#1c1c1f] rounded-xl border border-zinc-800 border-dashed">
                                <div className="p-4 rounded-full bg-zinc-800/50 mb-4 text-[#005461]">
                                    <Database size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white">No active databases</h3>
                                <p className="text-zinc-500 text-sm mt-2 mb-6">Create a database to start storing application data.</p>
                                <Button className="bg-[#005461] hover:bg-[#00414d] text-white font-bold rounded-full">
                                    Create Database
                                </Button>
                            </div>
                        )}

                        {activeTab === "File Manager" && (
                            <div className="flex flex-col items-center justify-center py-20 text-center bg-[#1c1c1f] rounded-xl border border-zinc-800 border-dashed">
                                <div className="p-4 rounded-full bg-zinc-800/50 mb-4 text-[#005461]">
                                    <Folder size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Access Files</h3>
                                <p className="text-zinc-500 text-sm mt-2 mb-6">Use the web terminal or SFTP to manage your server files.</p>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <Button className="bg-[#005461] hover:bg-[#00414d] text-white font-bold rounded-full">
                                        Access via SFTP
                                    </Button>
                                    <Button className="bg-[#005461] hover:bg-[#00414d] text-white font-bold rounded-full">
                                        Open Web File Manager
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === "Backups" && (
                            <div className="max-w-[1200px] mx-auto space-y-6 animate-in fade-in duration-500">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Server Backups</h3>
                                        <p className="text-zinc-400 text-sm mt-1">Manage scheduled backups and manual snapshots.</p>
                                    </div>
                                    <Button className="bg-[#005461] hover:bg-[#00414d] text-white font-bold rounded-lg gap-2">
                                        <Plus size={16} /> Create Snapshot
                                    </Button>
                                </div>

                                <div className="bg-transparent rounded-xl border border-zinc-800/60 overflow-hidden">
                                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-zinc-800/60 bg-[#161618] text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                        <div className="col-span-4">Name / Date</div>
                                        <div className="col-span-2">Type</div>
                                        <div className="col-span-2">Size</div>
                                        <div className="col-span-2">Status</div>
                                        <div className="col-span-2 text-right">Actions</div>
                                    </div>

                                    <div className="divide-y divide-zinc-800/40">
                                        {[
                                            { id: 1, name: "Automated Daily Backup", date: "Today, 03:00 AM", type: "Automated", size: "8.2 GB", status: "Available" },
                                            { id: 2, name: "Pre-Update Snapshot", date: "Jan 4, 2026 04:15 PM", type: "Snapshot", size: "8.1 GB", status: "Available" },
                                            { id: 3, name: "Weekly Backup", date: "Jan 1, 2026 03:00 AM", type: "Automated", size: "8.0 GB", status: "Available" },
                                        ].map((backup) => (
                                            <div key={backup.id} className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 px-4 md:px-6 py-4 items-start md:items-center hover:bg-zinc-800/20 transition-colors">
                                                <div className="w-full md:col-span-4">
                                                    <p className="text-white font-semibold text-sm">{backup.name}</p>
                                                    <p className="text-zinc-500 text-xs mt-0.5">{backup.date}</p>
                                                </div>
                                                <div className="w-full md:col-span-2 grid grid-cols-2 md:block gap-4">
                                                    <span className="text-xs text-zinc-500 font-bold uppercase md:hidden">Type</span>
                                                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 border-0 text-[10px] uppercase w-fit">{backup.type}</Badge>
                                                </div>
                                                <div className="w-full md:col-span-2 grid grid-cols-2 md:block gap-4">
                                                    <span className="text-xs text-zinc-500 font-bold uppercase md:hidden">Size</span>
                                                    <div className="text-zinc-400 text-sm font-mono">{backup.size}</div>
                                                </div>
                                                <div className="w-full md:col-span-2 grid grid-cols-2 md:block gap-4">
                                                    <span className="text-xs text-zinc-500 font-bold uppercase md:hidden">Status</span>
                                                    <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                        {backup.status}
                                                    </div>
                                                </div>
                                                <div className="w-full md:col-span-2 flex justify-end gap-2 mt-2 md:mt-0 border-t border-zinc-800/50 md:border-0 pt-2 md:pt-0">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md" title="Restore">
                                                        <RefreshCw size={14} />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-md" title="Download">
                                                        <DownloadCloud size={14} />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#1c1c1f]/50 border border-zinc-800/40 rounded-lg p-4 flex items-start gap-3">
                                    <div className="mt-1 p-1 bg-zinc-800 rounded-md">
                                        <Clock size={16} className="text-zinc-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-white">Automated Schedule</h4>
                                        <p className="text-xs text-zinc-500 mt-1">
                                            Automated backups are configured to run <strong>Daily at 03:00 AM</strong>.
                                            Retaining the last 7 daily and 4 weekly backups.
                                        </p>
                                        <Button variant="link" className="text-[#00a8c2] p-0 h-auto text-xs font-semibold mt-2">Configure Schedule</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function HostingManagerPage() {
    return (
        <React.Suspense fallback={<div className="w-full h-screen bg-[#0f0f10] flex items-center justify-center text-zinc-500">Loading...</div>}>
            <HostingManagerContent />
        </React.Suspense>
    );
}


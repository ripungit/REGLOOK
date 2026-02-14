"use client";

import React from "react";
import {
    ArrowLeft,
    Plus,
    Search,
    Cloud,
    Github,
    ExternalLink,
    CheckCircle2,
    Clock,
    MoreVertical,
    Activity,
    Settings,
    Shield,
    Globe,
    Zap,
    GitBranch,
    Terminal,
    RefreshCw,
    AlertCircle,
    ChevronRight,
    MousePointer2,
    Layers,
    Cpu,
    Radio
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { toast } from "sonner";
import Lottie from "lottie-react";

// --- Components ---

// Real-time Build Log Viewer
function BuildLogViewer({ buildId }: { buildId: string }) {
    const [logs, setLogs] = React.useState<any[]>([]);
    const [status, setStatus] = React.useState("");
    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!buildId) return;

        const fetchLogs = async () => {
            try {
                const res = await api.airnode.getBuildStatus(buildId);
                setLogs(res.logs || []);
                setStatus(res.status);
            } catch (err) {
                console.error("Log fetch error", err);
            }
        };

        const interval = setInterval(() => {
            if (status !== "success" && status !== "failed") {
                fetchLogs();
            }
        }, 3000);

        fetchLogs();
        return () => clearInterval(interval);
    }, [buildId, status]);

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="bg-[#0c0c0e] border border-white/5 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[400px]">
            <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-blue-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 font-mono">Build Console</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className={status === "building" ? "animate-pulse" : ""}>
                        <Badge variant="outline" className={`text-[10px] uppercase ${status === "success" ? "border-green-500/50 text-green-400" : status === "failed" ? "border-red-500/50 text-red-400" : "border-blue-500/50 text-blue-400"}`}>
                            {status}
                        </Badge>
                    </div>
                </div>
            </div>
            <div ref={scrollRef} className="p-4 overflow-y-auto font-mono text-xs space-y-1.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {logs.length === 0 && <span className="text-zinc-600 italic">Initializing build queue...</span>}
                {logs.map((log, idx) => (
                    <div key={log.id || idx} className="flex gap-3 leading-relaxed">
                        <span className="text-zinc-700 shrink-0 select-none">[{new Date(log.createdAt).toLocaleTimeString([], { hour12: false })}]</span>
                        <span className="text-zinc-300 break-all">{log.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Main Page ---

export default function AirnodePageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [apps, setApps] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [activeApp, setActiveApp] = React.useState<any>(null);
    const [view, setView] = React.useState<"list" | "detail" | "create">("list");

    // Manage state via URL
    const manageAppId = searchParams.get("appId");
    const showCreate = searchParams.get("action") === "create";

    // Data Fetching
    const refreshApps = async () => {
        try {
            const data = await api.airnode.listApps();
            setApps(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        refreshApps();
        const interval = setInterval(refreshApps, 10000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        if (manageAppId) {
            const app = apps.find(a => a.id === manageAppId);
            if (app) {
                setActiveApp(app);
                setView("detail");
            } else if (!loading) {
                // If ID check fails, fetch specific app
                api.airnode.getApp(manageAppId).then(app => {
                    setActiveApp(app);
                    setView("detail");
                }).catch(() => setView("list"));
            }
        } else if (showCreate) {
            setView("create");
        } else {
            setView("list");
            setActiveApp(null);
        }
    }, [manageAppId, showCreate, apps, loading]);

    return (
        <div className="min-h-screen bg-[#0f0f10] text-white">
            {/* Header */}
            <div className="w-full bg-[#0058E5] sticky top-0 z-50 overflow-hidden">


                <div className="max-w-[1150px] mx-auto px-6 h-20 md:h-24 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => {
                                if (view !== "list") router.push("/foundation/airnode");
                                else router.push("/foundation");
                            }}
                            variant="ghost"
                            size="icon"
                            className="bg-white/10 hover:bg-white/20 text-white rounded-full h-10 w-10 md:h-12 md:w-12 transition-all active:scale-95"
                        >
                            <ArrowLeft size={20} />
                        </Button>
                        <div className="h-8 w-px bg-white/20" />
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                                <Radio className="w-5 h-5 md:w-6 md:h-6 text-white animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white">AIRNODE</h1>
                                <p className="text-[10px] md:text-xs font-bold text-white/60 tracking-[0.2em] uppercase">Cloud Infrastructure</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" className="hidden sm:flex text-white font-bold text-sm bg-white/10 hover:bg-white/20 rounded-full px-6 gap-2">
                            <Globe size={14} /> Global Status
                        </Button>
                        <Button className="bg-white text-blue-600 hover:bg-white/90 font-black px-6 rounded-full shadow-xl shadow-blue-950/20 active:scale-95 transition-all h-10 md:h-12 flex items-center gap-2">
                            <Plus size={18} /> <span className="hidden md:inline">Launch App</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Layout Area */}
            <div className="max-w-[1150px] mx-auto px-6 py-10">
                <AnimatePresence mode="wait">
                    {view === "list" && (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-10"
                        >
                            {/* Hero / Stats Row */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="md:col-span-2 relative p-8 rounded-[2rem] bg-gradient-to-br from-blue-600/20 to-indigo-600/10 border border-blue-500/20 shadow-2xl overflow-hidden group">
                                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
                                    <div className="relative z-10 h-full flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">Welcome to the<br />Next Generation.</h2>
                                            <p className="text-zinc-400 text-sm font-medium max-w-[240px]">Deploy massive applications to the edge in under 60 seconds.</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-8">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f0f10] bg-zinc-800 flex items-center justify-center text-[10px] font-bold">U{i}</div>)}
                                            </div>
                                            <span className="text-[11px] font-bold text-zinc-500">+1.2k DEPLOYS TODAY</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 rounded-[2rem] bg-[#161618] border border-white/5 flex flex-col justify-between group hover:border-blue-500/30 transition-all">
                                    <div className="bg-blue-500/10 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                                        <Activity size={24} />
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-1">Active Projects</p>
                                        <h3 className="text-4xl font-black tabular-nums">{apps.length}</h3>
                                    </div>
                                </div>

                                <div className="p-8 rounded-[2rem] bg-[#161618] border border-white/5 flex flex-col justify-between group hover:border-emerald-500/30 transition-all">
                                    <div className="bg-emerald-500/10 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-1">Total Builds</p>
                                        <h3 className="text-4xl font-black tabular-nums">{apps.reduce((acc, app) => acc + (app._count?.builds || 0), 0)}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Search & Actions */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-2">
                                <div className="relative group w-full md:w-[400px]">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-400 transition-colors" size={18} />
                                    <Input
                                        placeholder="Search for applications..."
                                        className="pl-12 bg-[#161618] border-white/5 h-14 rounded-full font-bold focus:ring-[#0062FF] focus:border-[#0062FF] text-white placeholder:text-zinc-600 transition-all shadow-inner"
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" className="rounded-full border-white/5 bg-[#161618] font-bold h-12 px-6 hover:bg-zinc-800 transition-all">Sort: Latest Activity</Button>
                                </div>
                            </div>

                            {/* Project Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {apps.map((app, idx) => (
                                    <AppCard key={app.id} app={app} index={idx} onClick={() => router.push(`/foundation/airnode?appId=${app.id}`)} />
                                ))}

                                {/* Empty State Card */}
                                <motion.div
                                    onClick={() => router.push("/foundation/airnode?action=create")}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="border-4 border-dashed border-zinc-800 hover:border-blue-500/40 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-6 cursor-pointer group transition-all h-[360px]"
                                >
                                    <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 shadow-2xl">
                                        <Plus size={40} className="text-zinc-500 group-hover:text-white" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-black mb-2">Connect New Project</h3>
                                        <p className="text-zinc-500 text-sm font-medium px-4">Start your journey with a fresh deployment from GitHub.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {view === "detail" && activeApp && (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <AppDetailView app={activeApp} refresh={refreshApps} />
                        </motion.div>
                    )}

                    {view === "create" && (
                        <motion.div
                            key="create"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <CreateAppWizard />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// --- List View Components ---

function AppCard({ app, index, onClick }: { app: any, index: number, onClick: () => void }) {
    const latestBuild = app.latestBuild || (app.builds && app.builds[0]);
    const isBuilding = latestBuild?.status === "queued" || latestBuild?.status === "building";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={onClick}
            className="group bg-[#161618] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col cursor-pointer hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 relative h-[360px]"
        >
            {/* High-end Preview Area */}
            <div className="h-44 w-full bg-gradient-to-br from-zinc-800/80 to-zinc-900 relative p-6 flex flex-col justify-end">
                {/* Abstract Glass Card inside */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#0062FF22,_transparent)]" />
                <div className="absolute top-6 left-6 right-6 bottom-0 translate-y-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-t-2xl shadow-2xl p-4 group-hover:translate-y-8 transition-transform duration-700">
                    <div className="flex gap-2 mb-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/30" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-[40%] bg-white/10 rounded-full" />
                        <div className="h-2 w-[70%] bg-white/10 rounded-full" />
                        <div className="h-2 w-[55%] bg-white/10 rounded-full" />
                    </div>
                </div>

                <Badge className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border-white/5 px-4 py-1.5 font-bold rounded-full">{app.framework || 'STATIC'}</Badge>

                {isBuilding && (
                    <div className="absolute inset-0 bg-blue-600/30 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            <span className="text-xs font-black tracking-widest uppercase text-white shadow-sm">Building...</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-black group-hover:text-blue-400 transition-colors uppercase tracking-tight">{app.slug}</h3>
                    <div className="text-zinc-600 hover:text-white p-1">
                        <MoreVertical size={18} />
                    </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 mb-6">
                    <div className="flex items-center gap-1.5"><Github size={12} /> {app.gitRepo?.split('/')[1] || app.slug}</div>
                    <div className="flex items-center gap-1.5"><GitBranch size={12} /> {app.gitBranch || 'main'}</div>
                </div>

                <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${latestBuild?.status === 'success' ? 'bg-green-500' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                {latestBuild?.status === 'success' ? 'Ready' : latestBuild?.status || 'Inactive'}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-600 font-bold text-[10px]">
                            <Clock size={12} /> 2MIN AGO
                        </div>
                    </div>
                    <div className="text-[11px] font-bold text-blue-500 flex items-center gap-1 hover:text-blue-400 transition-colors truncate">
                        <ExternalLink size={12} /> {app.slug}.airnode.reglook.com
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// --- Detail View Component ---

function AppDetailView({ app, refresh }: { app: any, refresh: () => void }) {
    const latestBuild = app.builds?.[0];
    const [tab, setTab] = React.useState<"overview" | "deployments" | "settings">("overview");
    const [isTriggering, setIsTriggering] = React.useState(false);

    const onRedeploy = async () => {
        setIsTriggering(true);
        try {
            await api.airnode.triggerBuild(app.id);
            toast.success("Build job queued!");
            refresh();
        } catch (err) {
            toast.error("Build trigger failed");
        } finally {
            setIsTriggering(false);
        }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Detail Header Strip */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#161618] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-full bg-blue-500/5 -skew-x-12 translate-x-1/2" />

                <div className="flex items-start gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/20 shrink-0">
                        <Layers size={32} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-3xl font-black uppercase tracking-tight">{app.slug}</h2>
                            <Badge className="bg-green-500/10 text-green-400 border-green-500/20 font-bold">PRODUCTION</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                            <a href={`http://${app.slug}.airnode.reglook.com:9000`} target="_blank" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 underline decoration-zinc-800 underline-offset-4">
                                <Globe size={14} /> {app.slug}.airnode.reglook.com
                            </a>
                            <span className="bg-zinc-800 h-1 w-1 rounded-full shrink-0" />
                            <div className="flex items-center gap-1.5"><Github size={14} /> {app.gitRepo}</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                    <Button
                        onClick={onRedeploy}
                        disabled={isTriggering}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold h-12 px-6 rounded-2xl flex items-center gap-2"
                    >
                        {isTriggering ? <RefreshCw size={18} className="animate-spin" /> : <RefreshCw size={18} />} Redeploy
                    </Button>
                    <Button className="bg-white text-black hover:bg-white/90 font-black h-12 px-8 rounded-2xl shadow-lg">Visit Site</Button>
                </div>
            </div>

            {/* Content & Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left: Component Area */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Navigation Tabs */}
                    <div className="flex p-1.5 bg-[#161618] border border-white/5 rounded-2xl w-fit">
                        {[
                            { id: "overview", label: "Overview", icon: Activity },
                            { id: "deployments", label: "Deployments", icon: Clock },
                            { id: "settings", label: "Settings", icon: Settings },
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id as any)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${tab === t.id ? "bg-blue-600 text-white shadow-xl" : "text-zinc-500 hover:text-white hover:bg-white/5"}`}
                            >
                                <t.icon size={16} /> {t.label}
                            </button>
                        ))}
                    </div>

                    {tab === "overview" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 bg-[#161618] border border-white/5 rounded-[2rem] space-y-4">
                                    <h4 className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Active Deployment</h4>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400">
                                            <ExternalLink size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg mb-0.5">{latestBuild?.gitCommit?.substring(0, 7) || 'N/A'}</p>
                                            <p className="text-zinc-500 text-xs font-medium italic">Latest commit on {app.gitBranch || 'main'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 bg-[#161618] border border-white/5 rounded-[2rem] space-y-4">
                                    <h4 className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Build Performance</h4>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg mb-0.5">42 Seconds</p>
                                            <p className="text-zinc-500 text-xs font-medium">Average build speed for this app</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Latest Build Logs Preview */}
                            {latestBuild && <BuildLogViewer buildId={latestBuild.id} />}
                        </div>
                    )}

                    {tab === "deployments" && (
                        <div className="space-y-4 animate-in fade-in duration-500">
                            {app.builds?.map((b: any) => (
                                <div key={b.id} className="group flex items-center justify-between p-6 bg-[#161618] hover:bg-zinc-800/50 border border-white/5 hover:border-white/10 rounded-2xl transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className={`w-3 h-3 rounded-full ${b.status === 'success' ? 'bg-green-500' : b.status === 'failed' ? 'bg-red-500' : 'bg-blue-500 animate-pulse'}`} />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold uppercase tracking-tight">{b.gitCommit?.substring(0, 8) || 'Manual'}</span>
                                                <Badge variant="outline" className="text-[9px] h-4 uppercase">{b.status}</Badge>
                                            </div>
                                            <p className="text-zinc-500 text-xs font-medium">Deployed by git push • 2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="sm" className="font-bold text-[10px] uppercase tracking-widest h-8 px-4 rounded-full bg-white/5">View Logs</Button>
                                        <Button variant="ghost" size="sm" className="font-bold text-[10px] uppercase tracking-widest h-8 px-4 rounded-full text-blue-400">Rollback</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Sidebar Stats */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="p-8 bg-gradient-to-br from-[#161618] to-[#0c0c0e] border border-white/5 rounded-[2.5rem] space-y-8">
                        <div>
                            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Cpu size={18} className="text-blue-500" /> Infrastructure
                            </h4>
                            <div className="space-y-6">
                                <StatItem label="Region" value="Berlin (EU-West)" icon={Globe} />
                                <StatItem label="Hardware" value="AirNode Tier-1 (Shared)" icon={Layers} />
                                <StatItem label="IP Address" value="76.76.21.21" icon={Radio} />
                            </div>
                        </div>

                        <div className="h-px bg-white/5" />

                        <div>
                            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Shield size={18} className="text-emerald-500" /> Security
                            </h4>
                            <div className="space-y-6">
                                <StatItem label="Status" value="Live & Encrypted" icon={Shield} />
                                <StatItem label="SSL" value="Automatic (Managed)" icon={LockIcon} />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-blue-600 rounded-[2.5rem] space-y-4 shadow-2xl shadow-blue-600/20">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-xl"><Zap className="text-white fill-white" /></div>
                            <h4 className="text-white font-black text-lg">Go Real-time.</h4>
                        </div>
                        <p className="text-blue-100 text-sm font-medium leading-relaxed">Upgrade to AirNode Pro for dedicated isolates, unlimited domains, and 0ms global latency.</p>
                        <Button className="w-full bg-black text-white hover:bg-zinc-900 border-0 font-black h-12 rounded-2xl mt-4">Upgrade Now</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatItem({ label, value, icon: Icon }: any) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="text-zinc-600"><Icon size={16} /></div>
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{label}</span>
            </div>
            <span className="text-zinc-200 text-xs font-black">{value}</span>
        </div>
    )
}

function LockIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    )
}

// --- Create Flow ---

function CreateAppWizard() {
    const router = useRouter();
    const [step, setStep] = React.useState(1);
    const [appName, setAppName] = React.useState("");
    const [repo, setRepo] = React.useState("");
    const [isCreating, setIsCreating] = React.useState(false);

    // GitHub State
    const [repos, setRepos] = React.useState<any[]>([]);
    const [loadingRepos, setLoadingRepos] = React.useState(true);
    const [githubConnected, setGithubConnected] = React.useState(false);

    React.useEffect(() => {
        const fetchRepos = async () => {
            try {
                const data = await api.auth.listGithubRepos();
                setRepos(data);
                setGithubConnected(true);
            } catch (err) {
                // Assuming error means not connected or auth failed
                setGithubConnected(false);
            } finally {
                setLoadingRepos(false);
            }
        };
        fetchRepos();
    }, []);

    const handleCreate = async () => {
        if (!appName) return toast.error("App name required");
        if (!repo) return toast.error("Repository required");

        setIsCreating(true);
        try {
            const res = await api.airnode.createApp({ name: appName, slug: appName.toLowerCase().replace(/ /g, '-') });
            toast.success("Project identity created!");

            // Move to Step 2: Git Connect
            setStep(2);

            // Connect Git
            if (repo) {
                await api.airnode.connectGit(res.id, {
                    provider: 'github',
                    repository: repo,
                    branch: 'main' // Default to main
                });
                toast.success("GitHub repository linked!");

                // Trigger First Build
                await api.airnode.triggerBuild(res.id);
                toast.success("Initial build started!");

                // Redirect to Dashboard
                router.push(`/foundation/airnode?appId=${res.id}`);
            }
        } catch (err: any) {
            toast.error(err.message || "Launch failed");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="max-w-[700px] mx-auto pt-20 pb-40">
            <div className="bg-[#161618] border border-white/5 rounded-[3rem] p-12 space-y-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />

                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black tracking-tight leading-none uppercase italic">Project Launchpad</h2>
                    <p className="text-zinc-500 font-medium max-w-sm mx-auto">Configure your application's identity and connection source below.</p>
                </div>

                <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 ml-4">Deployment Identity</label>
                        <div className="relative group">
                            <Input
                                value={appName}
                                onChange={(e) => setAppName(e.target.value)}
                                className="h-16 px-8 bg-black/40 border-white/5 rounded-3xl font-black text-xl focus:ring-blue-600 focus:border-blue-600 transition-all placeholder:text-zinc-800 shadow-inner"
                                placeholder="eg. My Creative Studio"
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <Badge className="bg-zinc-800 text-zinc-500 border-0">.airnode.reglook.com</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">GitHub Repository</label>

                        {!loadingRepos && !githubConnected && (
                            <div className="flex flex-col items-center justify-center p-8 bg-black/20 border border-white/5 rounded-3xl gap-4">
                                <p className="text-zinc-400 text-sm font-bold">Connect GitHub to see your repositories</p>
                                <Button
                                    onClick={() => window.location.href = `http://localhost:9000/auth/github/connect`}
                                    className="bg-[#24292e] hover:bg-[#2b3137] text-white font-bold h-12 px-6 rounded-2xl gap-2"
                                >
                                    <Github size={18} /> Connect GitHub
                                </Button>
                            </div>
                        )}

                        {!loadingRepos && githubConnected && (
                            <div className="relative">
                                <select
                                    value={repo}
                                    onChange={(e) => setRepo(e.target.value)}
                                    className="w-full h-16 px-8 bg-black/40 border border-white/5 rounded-3xl font-bold text-lg text-white appearance-none focus:outline-none focus:border-blue-500/50 transition-all"
                                >
                                    <option value="" disabled>Select a repository...</option>
                                    {repos.map((r) => (
                                        <option key={r.id} value={r.full_name} className="bg-zinc-900 text-white">
                                            {r.full_name} ({r.private ? 'Private' : 'Public'})
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                    <ChevronRight className="rotate-90" size={20} />
                                </div>
                            </div>
                        )}

                        {loadingRepos && (
                            <div className="h-16 flex items-center justify-center bg-black/40 border border-white/5 rounded-3xl">
                                <span className="text-zinc-500 text-sm font-bold animate-pulse">Loading repositories...</span>
                            </div>
                        )}

                        <p className="text-[10px] text-zinc-600 ml-4 flex items-center gap-1.5 font-bold uppercase"><Shield size={10} /> Public or Tokenized Repos Only in v1</p>
                    </div>

                    <div className="pt-6 flex items-center gap-4">
                        <Button
                            onClick={handleCreate}
                            disabled={isCreating || !repo || !appName}
                            className="flex-1 h-16 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-[2rem] shadow-2xl shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCreating ? <RefreshCw className="animate-spin mr-3" /> : "Deploy App"}
                            {!isCreating && <ChevronRight className="ml-2" />}
                        </Button>
                        <Button
                            onClick={() => router.push("/foundation/airnode")}
                            variant="ghost"
                            className="h-16 px-8 bg-white/5 hover:bg-white/10 text-white font-bold rounded-[2rem] transition-all"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
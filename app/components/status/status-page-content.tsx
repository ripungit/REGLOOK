"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, AlertTriangle, XCircle, Activity, Server, Globe, Mail, Shield, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

type Status = "operational" | "degraded" | "outage" | "maintenance"

interface Service {
    id: string
    name: string
    status: Status
    uptime?: string
}

interface ServiceGroup {
    id: string
    name: string
    icon: React.ElementType
    services: Service[]
}

const serviceGroups: ServiceGroup[] = [
    {
        id: "core",
        name: "Core Platform",
        icon: Globe,
        services: [
            { id: "www", name: "www.reglook.com", status: "operational", uptime: "99.99%" },
            { id: "api", name: "Reglook API", status: "operational", uptime: "99.98%" },
            { id: "dashboard", name: "User Dashboard", status: "operational", uptime: "100%" },
            { id: "auth", name: "Authentication & SSO", status: "operational", uptime: "100%" },
        ]
    },
    {
        id: "domains",
        name: "Domain Services",
        icon: Server,
        services: [
            { id: "registration", name: "Domain Registration", status: "operational", uptime: "100%" },
            { id: "dns", name: "DNS Management", status: "operational", uptime: "100%" },
            { id: "transfers", name: "Domain Transfers", status: "operational" },
            { id: "whois", name: "Whois Lookup", status: "operational" },
        ]
    },
    {
        id: "hosting",
        name: "Compute & Hosting",
        icon: Activity,
        services: [
            { id: "shared", name: "Shared Hosting", status: "operational", uptime: "99.95%" },
            { id: "xcloud", name: "xCloud Serverless", status: "degraded", uptime: "98.50%" },
            { id: "cdn", name: "Global CDN", status: "operational", uptime: "100%" },
        ]
    },
    {
        id: "email",
        name: "Email Services",
        icon: Mail,
        services: [
            { id: "imap", name: "IMAP/POP3", status: "operational", uptime: "99.99%" },
            { id: "smtp", name: "SMTP Relay", status: "operational", uptime: "99.99%" },
            { id: "webmail", name: "Webmail Interface", status: "operational" },
        ]
    },
    {
        id: "support",
        name: "Support Systems",
        icon: Shield,
        services: [
            { id: "tickets", name: "Ticketing System", status: "operational" },
            { id: "chat", name: "Live Chat", status: "operational" },
            { id: "kb", name: "Knowledge Base", status: "operational" },
        ]
    },
]

const incidents = [
    {
        id: 1,
        title: "xCloud Performance Degradation",
        status: "monitoring",
        date: "Today, 10:23 AM",
        updates: [
            { time: "11:45 AM", message: "We have identified the root cause and are implementing a fix. Performance is returning to normal levels." },
            { time: "10:23 AM", message: "We are currently investigating reports of increased latency on xCloud instances in the US-East region." }
        ]
    },
    {
        id: 2,
        title: "Scheduled Maintenance: Billing System",
        status: "completed",
        date: "Jan 10, 2026",
        updates: [
            { time: "Jan 10, 04:00 AM", message: "Maintenance completed successfully." },
            { time: "Jan 10, 02:00 AM", message: "Scheduled maintenance started." }
        ]
    }
]

export function StatusPageContent() {
    // Calculate overall status
    const allServices = serviceGroups.flatMap(g => g.services)
    const outageCount = allServices.filter(s => s.status === "outage").length
    const degradedCount = allServices.filter(s => s.status === "degraded").length

    let overallStatus: Status = "operational"
    if (outageCount > 0) overallStatus = "outage"
    else if (degradedCount > 0) overallStatus = "degraded"

    return (
        <section className="relative min-h-screen pt-32 pb-20 overflow-hidden z-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <div className="container mx-auto px-6 max-w-[1000px] relative z-20">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 mb-6"
                    >
                        <div className={cn(
                            "w-3 h-3 rounded-full animate-pulse",
                            overallStatus === "operational" ? "bg-green-500" :
                                overallStatus === "degraded" ? "bg-yellow-500" : "bg-red-500"
                        )} />
                        <span className={cn(
                            "text-sm font-bold tracking-wider uppercase",
                            overallStatus === "operational" ? "text-green-500" :
                                overallStatus === "degraded" ? "text-yellow-500" : "text-red-500"
                        )}>
                            {overallStatus === "operational" ? "All Systems Operational" :
                                overallStatus === "degraded" ? "Partial System Outage" : "Major System Outage"}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        System Status
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg"
                    >
                        Current status of Reglook products and services. <br />
                        Updates are posted in real-time.
                    </motion.p>
                </div>

                {/* Main Status Board */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-8"
                >
                    {serviceGroups.map((group) => (
                        <div key={group.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                            <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <group.icon className="w-5 h-5 text-white/70" />
                                    <h3 className="font-semibold text-lg">{group.name}</h3>
                                </div>
                            </div>
                            <div className="divide-y divide-white/5">
                                {group.services.map((service) => (
                                    <div key={service.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium text-white/90">{service.name}</span>
                                            {service.uptime && (
                                                <span className="text-xs font-mono text-white/30 hidden sm:inline-block bg-white/5 px-2 py-0.5 rounded">
                                                    {service.uptime} uptime
                                                </span>
                                            )}
                                        </div>
                                        <StatusBadge status={service.status} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Incident History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-20"
                >
                    <h2 className="text-2xl font-bold mb-8">Recent Incidents</h2>
                    <div className="space-y-6">
                        {incidents.map((incident) => (
                            <div key={incident.id} className="relative pl-8 pb-8 border-l border-white/10 last:pb-0 last:border-0">
                                <div className="absolute top-0 left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#000] border-2 border-white/20 flex items-center justify-center">
                                    <div className={cn("w-1.5 h-1.5 rounded-full",
                                        incident.status === "monitoring" ? "bg-yellow-500" : "bg-green-500"
                                    )} />
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">{incident.title}</h3>
                                            <p className="text-white/50 text-sm">{incident.date}</p>
                                        </div>
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide self-start sm:self-center",
                                            incident.status === "monitoring" ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" :
                                                "bg-green-500/10 text-green-500 border border-green-500/20"
                                        )}>
                                            {incident.status === "monitoring" ? "Monitoring" : "Resolved"}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        {incident.updates.map((update, idx) => (
                                            <div key={idx} className="text-sm">
                                                <span className="text-white/40 font-mono text-xs block mb-1">{update.time}</span>
                                                <p className="text-white/80 leading-relaxed">{update.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    )
}

function StatusBadge({ status }: { status: Status }) {
    if (status === "operational") {
        return (
            <div className="flex items-center gap-2 text-green-500">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline-block">Operational</span>
            </div>
        )
    }
    if (status === "degraded") {
        return (
            <div className="flex items-center gap-2 text-yellow-500">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline-block">Degraded Performance</span>
            </div>
        )
    }
    if (status === "outage") {
        return (
            <div className="flex items-center gap-2 text-red-500">
                <XCircle className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline-block">Major Outage</span>
            </div>
        )
    }
    return (
        <div className="flex items-center gap-2 text-blue-400">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline-block">Maintenance</span>
        </div>
    )
}

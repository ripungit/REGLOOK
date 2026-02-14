"use client";

import React from "react";
import {
    AlertTriangle,
    CheckCircle2,
    Bell,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function Alarms() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium text-white">Alarms</h3>
                    <p className="text-sm text-zinc-400">Configure alerts for metrics and errors.</p>
                </div>
                <Button className="bg-[#4D2B8C] hover:bg-[#3D2270] text-white">
                    <Plus size={16} className="mr-2" /> Create Alarm
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {[
                    { name: "High Error Rate", metric: "5xx Errors > 5%", status: "OK", lastStateChange: "2 days ago" },
                    { name: "CPU Utilization", metric: "CPU > 90% for 5m", status: "OK", lastStateChange: "5 days ago" },
                    { name: "Memory Usage", metric: "Memory > 85%", status: "ALARM", lastStateChange: "10 mins ago" },
                ].map((alarm, i) => (
                    <Card key={i} className="bg-[#151518] border-zinc-800">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg border ${alarm.status === "OK" ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-red-500/10 border-red-500/20 text-red-500"}`}>
                                    {alarm.status === "OK" ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">{alarm.name}</h4>
                                    <p className="text-xs text-zinc-500">{alarm.metric}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-xs text-zinc-500">Status</p>
                                    <p className={`text-sm font-bold ${alarm.status === "OK" ? "text-green-500" : "text-red-500"}`}>{alarm.status}</p>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs text-zinc-500">Last change</p>
                                    <p className="text-sm text-zinc-300">{alarm.lastStateChange}</p>
                                </div>
                                <Switch checked={true} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 flex gap-3">
                <Bell className="text-blue-400 shrink-0" size={20} />
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-blue-400">Notification Channels</h4>
                    <p className="text-xs text-blue-300/80">
                        Alarms will be sent to the <strong>Default Email Group</strong>. You can configure more channels in the project settings.
                    </p>
                </div>
            </div>
        </div>
    );
}

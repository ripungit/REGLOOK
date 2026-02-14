"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign, ArrowRight, Loader2, Check, Mail, ArrowBigUpDash, ChevronRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CreateAliasDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    domain: string;
}

const AVAILABLE_MAILBOXES = [
    { name: "Admin", id: "admin" },
    { name: "Support Team", id: "support" },
    { name: "Sales Department", id: "sales" },
    { name: "Human Resources", id: "hr" },
    { name: "Engineering", id: "engineering" },
];

export function CreateAliasDialog({ open, onOpenChange, domain }: CreateAliasDialogProps) {
    const [step, setStep] = useState<"form" | "select-target" | "success">("form");
    const [loading, setLoading] = useState(false);
    const [alias, setAlias] = useState("");
    const [target, setTarget] = useState(`admin@${domain}`);

    const fullEmail = `${alias || "alias"}@${domain}`;

    const handleCreate = () => {
        if (!alias) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep("success");
        }, 1000);
    };

    const reset = () => {
        setStep("form");
        setAlias("");
        setLoading(false);
        onOpenChange(false);
    };

    const handleTargetSelect = (mailboxId: string) => {
        setTarget(`${mailboxId}@${domain}`);
        setStep("form");
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && reset()}>
            <DialogContent
                overlayClassName="backdrop-blur-md bg-black/40"
                className="sm:max-w-[520px] bg-[#0b0b0d] rounded-3xl border border-white/5 text-zinc-100 p-0 overflow-hidden"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {step === "form" ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Header */}
                            <DialogHeader className="px-6 pt-6 pb-4">
                                <DialogTitle className="text-xl font-semibold text-white">
                                    Create alias
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    Forward emails from a virtual address to another inbox.
                                </DialogDescription>
                            </DialogHeader>

                            {/* Body */}
                            <div className="px-6 py-6 space-y-6">
                                {/* Alias Address */}
                                <div>
                                    <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                                        Alias address
                                    </Label>
                                    <div className="flex">
                                        <div className="relative flex-1">
                                            <AtSign
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                                            />
                                            <Input
                                                value={alias}
                                                onChange={(e) => setAlias(e.target.value)}
                                                placeholder="contact"
                                                className="pl-9 h-11 font-semibold rounded-r-none bg-transparent border border-white/5"
                                            />
                                        </div>
                                        <div className="h-11 px-4 flex items-center bg-white/5 border border-l-0 border-white/5 rounded-r-sm text-sm text-white font-semibold">
                                            @{domain}
                                        </div>
                                    </div>
                                </div>

                                {/* Divider Arrow */}
                                <div className="flex justify-center text-zinc-600">
                                    <ArrowBigUpDash className="h-16 w-16 rotate-180 sm:rotate-180 text-zinc-700" strokeWidth={1} />
                                </div>

                                {/* Forwards To */}
                                <div>
                                    <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                                        Forwards to
                                    </Label>
                                    <div className="flex items-center gap-3 p-3 bg-transparent border border-white/5 rounded-xl">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                            <Mail size={14} className="text-zinc-300" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">
                                                {target}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                Primary mailbox
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setStep("select-target")}
                                            className="h-8 text-xs font-semibold hover:bg-white/10 text-white hover:text-white"
                                        >
                                            Change
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <DialogFooter className="px-6 py-4 bg-white/5 border-t border-white/5 flex justify-between">
                                <Button
                                    onClick={handleCreate}
                                    disabled={!alias || loading}
                                    className="w-full sm:w-auto h-11 px-6 rounded-full bg-white text-black hover:bg-zinc-200 font-semibold ml-auto"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : "Create alias"}
                                </Button>
                            </DialogFooter>
                        </motion.div>
                    ) : step === "select-target" ? (
                        <motion.div
                            key="select-target"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col h-full"
                        >
                            <div className="px-6 pt-6 pb-2 border-b border-white/5">
                                <h2 className="text-lg font-bold text-white mb-1">Select Mailbox</h2>
                                <p className="text-zinc-400 text-sm">Choose a destination for forwarded emails.</p>
                            </div>

                            <div className="p-4 space-y-2 overflow-y-auto max-h-[400px]">
                                {AVAILABLE_MAILBOXES
                                    .filter(mb => `${mb.id}@${domain}` !== target)
                                    .map((mailbox) => (
                                        <div
                                            key={mailbox.id}
                                            onClick={() => handleTargetSelect(mailbox.id)}
                                            className="group p-3 flex items-center gap-4 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-white border border-white/5 group-hover:border-white/10 transition-all">
                                                <User size={18} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-white font-bold text-sm">{mailbox.name}</h3>
                                                </div>
                                                <p className="text-zinc-500 text-xs">{mailbox.id}@{domain}</p>
                                            </div>
                                            <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400" />
                                        </div>
                                    ))}
                            </div>

                            <div className="p-4 border-t border-white/5 mt-auto">
                                <Button
                                    onClick={() => setStep("form")}
                                    className="w-full text-zinc-400 hover:text-white hover:bg-white/10"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        /* Success */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-10 text-center"
                        >
                            {/* Centered icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                                    <Check size={32} className="text-white" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-semibold text-white mb-2">
                                Alias created
                            </h2>

                            <p className="text-zinc-400 mb-8 px-4">
                                Emails sent to <span className="text-white font-semibold">{fullEmail}</span> will be forwarded to <span className="text-white font-semibold">{target}</span>.
                            </p>

                            <div className="space-y-3 max-w-sm mx-auto">
                                <Button
                                    onClick={reset}
                                    className="w-full h-11 bg-white text-black hover:bg-zinc-200 font-semibold"
                                >
                                    Done
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}

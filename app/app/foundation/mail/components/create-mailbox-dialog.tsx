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
import {
    Check,
    User,
    Users,
    Lock,
    ArrowRight,
    Loader2,
    Link as LinkIcon,
    Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CreateMailboxDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    domain: string;
}

type MailboxType = "personal" | "team";

export function CreateMailboxDialog({
    open,
    onOpenChange,
    domain,
}: CreateMailboxDialogProps) {
    const [step, setStep] = useState<"form" | "success">("form");
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [type, setType] = useState<MailboxType>("personal");
    const [password, setPassword] = useState("");
    const [resetOnLogin, setResetOnLogin] = useState(true);

    const fullEmail = `${username || "username"}@${domain}`;
    const inviteLink = `https://mail.reglook.com/invite/${username || "user"}`;

    const handleCreate = () => {
        if (!password) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep("success");
        }, 1500);
    };

    const reset = () => {
        setStep("form");
        setUsername("");
        setDisplayName("");
        setType("personal");
        setPassword("");
        setResetOnLogin(true);
        setLoading(false);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && reset()}>
            <DialogContent
                overlayClassName="backdrop-blur-md bg-black/40"
                className="sm:max-w-[520px] bg-[#0b0b0d] rounded-3xl border border-white/5 text-zinc-100 p-0 overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {step === "form" ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                        >
                            {/* Header */}
                            <DialogHeader className="px-6 pt-6 pb-4">
                                <DialogTitle className="text-xl font-semibold text-white">
                                    Create mailbox
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    Add a new inbox for a person or team.
                                </DialogDescription>
                            </DialogHeader>

                            {/* Body */}
                            <div className="px-6 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
                                {/* Email */}
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                                            Email address
                                        </Label>
                                        <div className="flex">
                                            <div className="relative flex-1">
                                                <User
                                                    size={16}
                                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                                                />
                                                <Input
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="pl-9 h-11 font-semibold rounded-r-none bg-transparent border border-white/5"
                                                />
                                            </div>
                                            <div className="h-11 px-4 flex items-center bg-white/5 border border-l-0 border-white/5 rounded-r-sm text-sm text-white font-semibold">
                                                @{domain}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                                            Display name
                                        </Label>
                                        <Input
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="h-11 bg-transparent font-semibold border border-white/5 rounded-md"
                                        />
                                    </div>
                                </div>

                                {/* Mailbox Type */}
                                <div className="space-y-3">
                                    <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                        Mailbox type
                                    </Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { id: "personal", label: "Personal", icon: User },
                                            { id: "team", label: "Team", icon: Users },
                                        ].map(({ id, label, icon: Icon }) => (
                                            <div
                                                key={id}
                                                onClick={() => setType(id as MailboxType)}
                                                className={cn(
                                                    "cursor-pointer p-4 rounded-xl border transition-all",
                                                    type === id
                                                        ? "border-white/20 ring-1 ring-white/10"
                                                        : "border-white/5 hover:border-white/20"
                                                )}
                                            >
                                                <div className="mb-3 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                                                    <Icon size={16} className="text-white" />
                                                </div>
                                                <p className="font-semibold text-sm text-white">{label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Password (MANDATORY) */}
                                <div className="space-y-3">
                                    <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                        Mailbox password
                                    </Label>

                                    <div className="relative">
                                        <Lock
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                                        />
                                        <Input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-9 h-11 bg-transparent font-bold border border-white/5 rounded-md"
                                        />
                                    </div>

                                    {/* Improved reset UI */}
                                    <div
                                        onClick={() => setResetOnLogin(!resetOnLogin)}
                                        className={cn(
                                            "flex items-center justify-between rounded-lg cursor-pointer transition",
                                            resetOnLogin
                                                ? "bg-transparent"
                                                : "bg-transparent"
                                        )}
                                    >
                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                Force password reset
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                User must change password on first login
                                            </p>
                                        </div>
                                        <div
                                            className={cn(
                                                "w-9 h-5 rounded-full relative transition",
                                                resetOnLogin ? "bg-white" : "bg-white/20"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "absolute top-0.5 w-4 h-4 bg-black rounded-full transition",
                                                    resetOnLogin ? "right-0.5" : "left-0.5"
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Team Invite (ONLY for team) */}
                                {type === "team" && (
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                            Invite link
                                        </Label>
                                        <div className="flex items-center gap-2 bg-transparent border border-white/5 rounded-lg px-3 h-11">
                                            <LinkIcon size={14} className="text-zinc-400" />
                                            <span className="text-xs text-zinc-300 truncate flex-1">
                                                {inviteLink}
                                            </span>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(inviteLink)}
                                                className="text-zinc-400 hover:text-white"
                                            >
                                                <Copy size={14} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <DialogFooter className="px-6 py-4 bg-white/5 border-t border-white/5 flex justify-between">

                                <Button
                                    onClick={handleCreate}
                                    disabled={!username || !password || loading}
                                    className="h-11 px-6 rounded-full bg-white text-black hover:bg-zinc-200 font-semibold"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : "Create mailbox"}
                                </Button>
                            </DialogFooter>
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
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center
                    shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                                    <Check size={32} className="text-white" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-semibold text-white mb-2">
                                Mailbox created
                            </h2>

                            <p className="text-zinc-400 mb-8">
                                <span className="text-white font-semibold">{fullEmail}</span> is ready to use.
                            </p>

                            <div className="space-y-3 max-w-sm mx-auto">
                                <Button className="w-full h-11 bg-white text-black hover:bg-zinc-200 font-semibold">
                                    Go to inbox <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </div>
                        </motion.div>

                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}

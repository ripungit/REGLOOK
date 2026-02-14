"use client"

import * as React from "react"
import { Eye, EyeOff, Key, Loader2, ChevronRight, Lock, Fingerprint, Info } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { startRegistration, startAuthentication } from "@simplewebauthn/browser"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"

interface LoginModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onLoginSuccess?: () => void
}

export function LoginModal({ open, onOpenChange, onLoginSuccess }: LoginModalProps) {
    const router = useRouter()
    const [view, setView] = React.useState<'login' | 'login-passkey' | 'signup-details' | 'signup-method'>('login')
    const [showPassword, setShowPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    // Login Data
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: ""
    })

    // Signup Data
    const [signupData, setSignupData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        marketingOptIn: false,
        authMethod: "password" as "password" | "passkey",
        password: ""
    })
    const [checkingUsername, setCheckingUsername] = React.useState(false)

    // Reset view when modal closes/opens
    React.useEffect(() => {
        if (open) {
            setView('login')
            setSignupData({
                firstName: "",
                lastName: "",
                email: "",
                username: "",
                marketingOptIn: false,
                authMethod: "password",
                password: ""
            })
            setLoginData({
                username: "",
                password: ""
            })
            setShowPassword(false)
            setLoading(false)
        }
    }, [open])

    // Mock username check
    React.useEffect(() => {
        if (signupData.username) {
            setCheckingUsername(true)
            const timer = setTimeout(() => setCheckingUsername(false), 800)
            return () => clearTimeout(timer)
        }
    }, [signupData.username])

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    }

    const handleLoginPassword = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (!loginData.username || !loginData.password) {
            toast.error("Please enter username and password")
            return
        }

        setLoading(true)
        try {
            await api.auth.loginPassword({
                username: loginData.username,
                password: loginData.password
            })
            toast.success("Welcome back!")
            onOpenChange(false)
            router.refresh()
            onLoginSuccess?.()
        } catch (err: any) {
            toast.error(err.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    const handleLoginPasskey = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (!loginData.username) {
            toast.error("Please enter your username")
            return
        }

        setLoading(true)
        try {
            const options = await api.auth.loginPasskeyStart({ username: loginData.username })
            const authResp = await startAuthentication(options)
            await api.auth.loginPasskeyFinish({ username: loginData.username, data: authResp })

            toast.success("Welcome back!")
            onOpenChange(false)
            router.refresh()
            onLoginSuccess?.()
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Passkey login failed")
        } finally {
            setLoading(false)
        }
    }

    const handleSignupNext = (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.username) {
            toast.error("Please fill in all fields")
            return
        }
        setView('signup-method')
    }

    const handleSignupSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        setLoading(true)
        try {
            // 1. Start Signup (Create User)
            const startRes = await api.auth.signupStart({
                firstName: signupData.firstName,
                lastName: signupData.lastName,
                email: signupData.email,
                username: signupData.username,
                marketingOptIn: signupData.marketingOptIn
            })

            const userId = startRes.userId

            // 2. Finish Auth Method
            if (signupData.authMethod === 'password') {
                if (!signupData.password) {
                    throw new Error("Password is required")
                }
                await api.auth.signupPassword({
                    userId,
                    password: signupData.password
                })
            } else {
                // Passkey
                const options = await api.auth.signupPasskeyStart({ userId })
                const attResp = await startRegistration(options)
                await api.auth.signupPasskeyFinish({ userId, data: attResp })
            }

            toast.success("Account created successfully!")
            onOpenChange(false)
            router.refresh()
            onLoginSuccess?.()

        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Signup failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                overlayClassName="backdrop-blur-sm"
                className="
          sm:max-w-[480px]
          bg-[#121214]
          text-neutral-100
          p-0
          gap-0
          overflow-hidden
          rounded-3xl
          border border-white/5
          shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        "
            >
                <AnimatePresence mode="wait" initial={false}>
                    {view === 'login' && (
                        <motion.div
                            key="login"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={containerVariants}
                            transition={{ duration: 0.2 }}
                            className="bg-[#121214]"
                        >
                            {/* Header */}
                            <DialogHeader className="px-8 pt-8 pb-4">
                                <DialogTitle className="text-[22px] font-semibold tracking-tight text-white">
                                    Sign in to Reglook
                                </DialogTitle>
                                <p className="text-sm text-white/60 mt-1">
                                    Use your account credentials to continue
                                </p>
                            </DialogHeader>

                            {/* Body */}
                            <form onSubmit={handleLoginPassword} className="px-8 pb-8 space-y-5">
                                {/* Username */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">
                                        Username
                                    </label>
                                    <Input
                                        placeholder=""
                                        value={loginData.username}
                                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                        className="
                                h-11
                                mt-2
                                rounded-full
                                bg-[#1A1A1D]
                                border-white/10
                                font-bold
                                text-white
                                placeholder:text-white/30
                                focus-visible:ring-1
                                focus-visible:ring-white/40
                                focus-visible:border-white/40
                            "
                                    />
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder=""
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            className="
                                h-11
                                mt-2
                                rounded-full
                                bg-[#1A1A1D]
                                border-white/10
                                font-bold
                                text-white
                                placeholder:text-white/30
                                focus-visible:ring-1
                                focus-visible:ring-white/40
                                focus-visible:border-white/40
                                pr-10
                            "
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="
                                absolute right-3 mt-1 top-1/2 -translate-y-1/2
                                text-white/40
                                hover:text-white/70
                                transition
                            "
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Primary CTA */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="
                            w-full
                            h-11
                            mt-2
                            rounded-full
                            bg-blue-600
                            hover:bg-blue-700
                            cursor-pointer
                            text-white
                            font-semibold
                            transition-all
                            active:scale-[0.98]
                            "
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : "Continue"}
                                </Button>

                                {/* Divider */}
                                <div className="relative py-3">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-white/10" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-[#121214] px-3 text-white/40 font-medium">
                                            Or
                                        </span>
                                    </div>
                                </div>

                                {/* Passkey */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setView('login-passkey')}
                                    disabled={loading}
                                    className="
              w-full
              h-11
              rounded-full
              border-white/10
              bg-[#141416]
              hover:bg-[#1C1C20]
              text-white/90
              font-semibold
              hover:text-white
              cursor-pointer
            "
                                >
                                    <Key className="mr-2 h-4 w-4 text-white/60" />
                                    Sign in with Passkey
                                </Button>

                                {/* Footer */}
                                <div className="flex items-center justify-between text-sm pt-4">
                                    <span className="text-white/60">
                                        New here?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setView('signup-details')}
                                            className="text-white hover:text-white hover:underline font-semibold"
                                        >
                                            Create account
                                        </button>
                                    </span>

                                    <Link
                                        href="/forgot-password"
                                        className="text-white hover:text-white hover:underline font-semibold"
                                    >
                                        Need help?
                                    </Link>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {view === 'login-passkey' && (
                        <motion.div
                            key="login-passkey"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={containerVariants}
                            transition={{ duration: 0.2 }}
                            className="bg-[#121214]"
                        >
                            <DialogHeader className="px-8 pt-8 pb-4">
                                <DialogTitle className="text-[22px] font-semibold tracking-tight text-white">
                                    Sign in with Passkey
                                </DialogTitle>
                                <p className="text-sm text-white/60 mt-1">
                                    Enter your username to continue
                                </p>
                            </DialogHeader>

                            <form onSubmit={handleLoginPasskey} className="px-8 pb-8 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">
                                        Username
                                    </label>
                                    <Input
                                        placeholder=""
                                        value={loginData.username}
                                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                        className="
                                h-11
                                mt-2
                                rounded-full
                                bg-[#1A1A1D]
                                border-white/10
                                font-bold
                                text-white
                                placeholder:text-white/30
                                focus-visible:ring-1
                                focus-visible:ring-white/40
                                focus-visible:border-white/40
                            "
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="
                            w-full
                            h-11
                            mt-2
                            rounded-full
                            bg-blue-600
                            hover:bg-blue-700
                            cursor-pointer
                            text-white
                            font-semibold
                            transition-all
                            active:scale-[0.98]
                            "
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : "Continue"}
                                </Button>

                                <div className="text-center pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setView('login')}
                                        className="text-sm text-white/60 hover:text-white font-medium transition"
                                    >
                                        Back to password login
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {view === 'signup-details' && (
                        <motion.div
                            key="signup-details"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={containerVariants}
                            transition={{ duration: 0.2 }}
                            className="bg-[#121214]"
                        >
                            <DialogHeader className="px-8 pt-8 pb-4">
                                <DialogTitle className="text-[22px] font-semibold tracking-tight text-white">
                                    Create your account
                                </DialogTitle>
                                <p className="text-sm text-white/60 mt-0">
                                    Join us to manage your domains and more
                                </p>
                            </DialogHeader>

                            <form onSubmit={handleSignupNext} className="px-8 pb-8 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/80">First name</label>
                                        <Input
                                            value={signupData.firstName}
                                            onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                                            className="h-11 mt-2 rounded-md font-bold bg-[#1A1A1D] border-white/10 text-white focus-visible:ring-1 focus-visible:ring-white/40 border-transparent focus-visible:border-white/40"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/80">Last name</label>
                                        <Input
                                            value={signupData.lastName}
                                            onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                                            className="h-11 mt-2 rounded-md bg-[#1A1A1D] font-bold border-white/10 text-white focus-visible:ring-1 focus-visible:ring-white/40 border-transparent focus-visible:border-white/40"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Email</label>
                                    <Input
                                        value={signupData.email}
                                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                        className="h-11 mt-2 rounded-md font-bold bg-[#1A1A1D] border-white/10 text-white focus-visible:ring-1 focus-visible:ring-white/40 border-transparent focus-visible:border-white/40"
                                    />
                                    <p className="text-[11px] text-white/40 leading-tight">
                                        Please use a valid email and proceed with email verification promptly to avoid account issues.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Username</label>
                                    <div className="relative">
                                        <Input
                                            value={signupData.username}
                                            onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                                            className="h-11 mt-2 rounded-md font-bold bg-[#1A1A1D] border-white/10 text-white focus-visible:ring-1 focus-visible:ring-white/40 border-transparent focus-visible:border-white/40 pr-10"
                                        />
                                        {checkingUsername && (
                                            <div className="absolute right-3 mt-1 top-1/2 -translate-y-1/2">
                                                <Loader2 className="h-4 w-4 animate-spin text-white/40" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-white/40 leading-tight">
                                        Your username must contain only letters (a-z) and numbers (0-9).
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11 mt-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all active:scale-[0.98]"
                                >
                                    Next
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>

                                <div className="text-center pt-2">
                                    <span className="text-sm text-white/60">
                                        Already have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setView('login')}
                                            className="text-white hover:text-white hover:underline font-semibold"
                                        >
                                            Log in
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {view === 'signup-method' && (
                        <motion.div
                            key="signup-method"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={containerVariants}
                            transition={{ duration: 0.2 }}
                            className="bg-[#121214]"
                        >
                            <DialogHeader className="px-8 pt-8 pb-4">
                                <DialogTitle className="text-[22px] font-semibold tracking-tight text-white">
                                    Secure your account
                                </DialogTitle>
                                <p className="text-sm text-white/60 mt-1">
                                    Choose an authentication method
                                </p>
                            </DialogHeader>

                            <form onSubmit={handleSignupSubmit} className="px-8 pb-8 space-y-6">
                                <RadioGroup
                                    defaultValue="password"
                                    value={signupData.authMethod}
                                    onValueChange={(val) => setSignupData({ ...signupData, authMethod: val as "password" | "passkey" })}
                                    className="grid grid-cols-2 gap-3"
                                >
                                    <div>
                                        <RadioGroupItem value="password" id="method-password" className="peer sr-only" />
                                        <Label
                                            htmlFor="method-password"
                                            className="flex flex-col items-center justify-center text-center gap-3 rounded-xl border border-white/0 bg-[#1A1A1D] p-4 hover:bg-blue-700 peer-data-[state=checked]:border-white/0 peer-data-[state=checked]:bg-blue-700 cursor-pointer transition-all h-full"
                                        >
                                            <div className="bg-white/5 p-3 rounded-full">
                                                <Lock className="h-5 w-5 text-white" />
                                            </div>
                                            <div className="grid gap-0.5">
                                                <span className="font-semibold text-white">Password</span>
                                                <span className="text-[10px] text-white/50 leading-tight">Most common</span>
                                            </div>
                                        </Label>
                                    </div>

                                    <div>
                                        <RadioGroupItem value="passkey" id="method-passkey" className="peer sr-only" />
                                        <Label
                                            htmlFor="method-passkey"
                                            className="flex flex-col items-center justify-center text-center gap-3 rounded-xl border border-white/0 bg-[#1A1A1D] p-4 hover:bg-blue-700 peer-data-[state=checked]:border-white/0 peer-data-[state=checked]:bg-blue-700 cursor-pointer transition-all h-full"
                                        >
                                            <div className="bg-white/5 p-3 rounded-full">
                                                <Fingerprint className="h-5 w-5 text-white" />
                                            </div>
                                            <div className="grid gap-0.5">
                                                <span className="font-semibold text-white">Passkey</span>
                                                <span className="text-[10px] text-white/50 leading-tight">Passwordless & safe</span>
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {signupData.authMethod === 'password' && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="text-sm font-medium text-white/80">Set Password</label>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder=""
                                                value={signupData.password}
                                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                                className="h-11 rounded-xl mt-2 font-bold bg-[#1A1A1D] border-white/10 text-white focus-visible:ring-1 focus-visible:ring-white/40 border-transparent focus-visible:border-white/40 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 mt-1 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {signupData.authMethod === 'passkey' && (
                                    <div className="bg-[#1A1A1D] p-4 rounded-xl border border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 pt-1">
                                                <Fingerprint className="h-10 w-10 text-white opacity-80" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-semibold text-white">Simplify your login</h4>
                                                <p className="text-xs text-white/60 leading-relaxed">
                                                    Use your fingerprint, face, screen lock, or hardware security key to verify your identity.
                                                </p>
                                                <p className="text-[10px] text-white hover:text-white cursor-pointer pt-1 flex items-center gap-1">
                                                    Learn about passkeys <ChevronRight className="h-2.5 w-2.5" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-white/5 flex gap-2 items-start">
                                            <Info className="h-3 w-3 text-white mt-0.5 flex-shrink-0" />
                                            <p className="text-[10px] text-white/50">
                                                We recommend using Firefox, Chrome, Safari, or Edge. Your browser needs to be up to date.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox
                                        id="marketing"
                                        checked={signupData.marketingOptIn}
                                        onCheckedChange={(c) => setSignupData({ ...signupData, marketingOptIn: c as boolean })}
                                        className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded"
                                    />
                                    <label
                                        htmlFor="marketing"
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white/70"
                                    >
                                        Receive our newsletter & marketing communication.
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all active:scale-[0.98]"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : (signupData.authMethod === 'passkey' ? 'Sign up with passkey' : 'Sign up')}
                                </Button>

                                <div className="text-center text-[10px] text-white/40 px-4">
                                    By creating an account, you agree with our <span className="text-white/60 underline cursor-pointer">Terms of Service</span>
                                </div>

                                <div className="text-center pt-2">
                                    <span className="text-sm text-white/60">
                                        Already have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setView('login')}
                                            className="text-white hover:text-white hover:underline font-semibold"
                                        >
                                            Log in
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}

"use client";

import React from "react";
import {
    ArrowLeft,
    HelpCircle,
    Save,
    User,
    Mail,
    Phone,
    MapPin,
    Globe,
    Bell,
    Shield,
    Camera,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfileAndPreferencesPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState("profile");

    // Mock User Data
    const [userData, setUserData] = React.useState({
        username: "theripunbty",
        firstName: "Ripun",
        lastName: "Basumatary",
        email: "theripunbty@reglook.com",
        phone: "+91 98765 43210",
        company: "Reglook Inc.",
        address: "123 Tech Park, Innovation Street",
        city: "Bangalore",
        country: "India",
        language: "en-US",
        currency: "USD",
        timezone: "IST"
    });

    const ThemeColor = "#4338ca"; // Indigo-700

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="w-full flex flex-col items-center relative bg-[#0f0f10] min-h-screen">

            {/* 1. Header Strip - Theme Indigo-700 */}
            <div className={`w-full bg-[${ThemeColor}] py-6 shadow-md z-10 transition-colors duration-300`}>
                <div className="w-full px-6 max-w-[1200px] lg:px-10 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-4">
                            <Link href="/foundation">
                                <Button className="text-white bg-white/10 hover:bg-white/20 hover:text-white cursor-pointer rounded-full h-10 w-10">
                                    <ArrowLeft size={22} />
                                </Button>
                            </Link>
                            <div className="h-6 w-px bg-white/20" />
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                                    <User className="text-white" size={22} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight">Profile & Preferences</h1>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="bg-white/15 hover:bg-white/25 text-white border-0 font-semibold rounded-full px-5 h-10 flex items-center gap-2 transition-all"
                            >
                                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                <span className="hidden sm:inline">Save Changes</span>
                            </Button>
                            <Button className="text-white/80 bg-white/10 hover:text-white hover:bg-white/10 rounded-full h-10 w-10">
                                <HelpCircle size={22} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content Area */}
            <div className="w-full px-6 max-w-[1200px] lg:px-10 py-8 flex-1">

                {/* Tab Navigation */}
                <div className="flex items-center gap-8 border-b border-zinc-800 mb-10 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "profile" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        My Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("preferences")}
                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "preferences" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Preferences
                    </button>
                    <button
                        onClick={() => setActiveTab("notifications")}
                        className={`text-sm font-semibold pb-3 -mb-[1px] transition-colors whitespace-nowrap ${activeTab === "notifications" ? `text-white border-b-4 border-[${ThemeColor}]` : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Notifications
                    </button>
                </div>

                {/* Content Area Based on Tab */}
                <div className="w-full">

                    {/* Profile Tab */}
                    {activeTab === "profile" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {/* Section 1: Identity & Avatar */}
                            <div className="bg-transparent border border-zinc-800/50 rounded-xl p-8">
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                    <User size={18} className="text-indigo-400" />
                                    Identity & Avatar
                                </h3>
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    {/* Avatar */}
                                    <div className="flex flex-col items-center gap-4 min-w-[200px]">
                                        <div className="relative group cursor-pointer">
                                            <div className="w-28 h-28 rounded-full bg-indigo-900/20 border-2 border-dashed border-indigo-500/30 flex items-center justify-center overflow-hidden transition-colors hover:border-indigo-500/60">
                                                <User size={48} className="text-indigo-400" />
                                            </div>
                                            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera size={28} className="text-white" />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="secondary" className="bg-zinc-800 text-white hover:bg-zinc-700 h-8 text-xs font-medium">Upload</Button>
                                            <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 text-xs font-medium">Remove</Button>
                                        </div>
                                    </div>

                                    {/* Identity Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        <div className="space-y-2">
                                            <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Username</Label>
                                            <div className="relative">
                                                <User size={16} className="absolute left-3 top-3 text-zinc-500" />
                                                <Input
                                                    value={userData.username}
                                                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                                    className="bg-[#0f0f10] border-zinc-800 text-white focus:border-indigo-500 pl-10"
                                                />
                                            </div>
                                        </div>
                                        <div className="hidden md:block"></div> {/* Spacer */}

                                        <div className="space-y-2">
                                            <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">First Name</Label>
                                            <Input
                                                value={userData.firstName}
                                                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 text-white focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Last Name</Label>
                                            <Input
                                                value={userData.lastName}
                                                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 text-white focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Contact Information */}
                            <div className="bg-transparent border border-zinc-800/50 rounded-xl p-8">
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                    <Mail size={18} className="text-indigo-400" />
                                    Contact Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Email Address</Label>
                                        <div className="relative">
                                            <Mail size={16} className="absolute left-3 top-3 text-zinc-500" />
                                            <Input
                                                value={userData.email}
                                                disabled
                                                className="bg-[#0f0f10]/50 border-zinc-800 text-zinc-400 pl-10 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Phone Number</Label>
                                        <div className="relative">
                                            <Phone size={16} className="absolute left-3 top-3 text-zinc-500" />
                                            <Input
                                                value={userData.phone}
                                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                                className="bg-[#0f0f10] border-zinc-800 text-white pl-10 focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Company & Location */}
                            <div className="bg-transparent border border-zinc-800/50 rounded-xl p-8">
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                    <MapPin size={18} className="text-indigo-400" />
                                    Organisation & Location
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Organisation Name</Label>
                                        <Input
                                            value={userData.company}
                                            onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                                            className="bg-[#0f0f10] border-zinc-800 text-white focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Address</Label>
                                        <Input
                                            value={userData.address}
                                            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                            className="bg-[#0f0f10] border-zinc-800 text-white focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">City</Label>
                                        <Input
                                            value={userData.city}
                                            onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                                            className="bg-[#0f0f10] border-zinc-800 text-white focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Country</Label>
                                        <Input
                                            value={userData.country}
                                            onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                                            className="bg-[#0f0f10] border-zinc-800 text-white focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Preferences Tab */}
                    {activeTab === "preferences" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="bg-transparent border border-zinc-800/50 rounded-xl p-8">
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                    <Globe size={18} className="text-indigo-400" />
                                    Regional Settings
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Language</Label>
                                        <div className="relative">
                                            <Globe size={16} className="absolute left-3 top-3 text-zinc-500 z-10" />
                                            <Select defaultValue={userData.language}>
                                                <SelectTrigger className="bg-[#0f0f10] border-zinc-800 text-white pl-10 focus:ring-indigo-500">
                                                    <SelectValue placeholder="Select Language" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#1c1c1f] border-zinc-800 text-white">
                                                    <SelectItem value="en-US">English (US)</SelectItem>
                                                    <SelectItem value="en-UK">English (UK)</SelectItem>
                                                    <SelectItem value="es">Spanish</SelectItem>
                                                    <SelectItem value="fr">French</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Timezone</Label>
                                        <Select defaultValue={userData.timezone}>
                                            <SelectTrigger className="bg-[#0f0f10] border-zinc-800 text-white focus:ring-indigo-500">
                                                <SelectValue placeholder="Select Timezone" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1c1c1f] border-zinc-800 text-white">
                                                <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                                                <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                                                <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                                                <SelectItem value="UTC">Coordinated Universal Time (UTC)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">Currency Display</Label>
                                        <Select defaultValue={userData.currency}>
                                            <SelectTrigger className="bg-[#0f0f10] border-zinc-800 text-white focus:ring-indigo-500">
                                                <SelectValue placeholder="Select Currency" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1c1c1f] border-zinc-800 text-white">
                                                <SelectItem value="USD">USD ($)</SelectItem>
                                                <SelectItem value="INR">INR (₹)</SelectItem>
                                                <SelectItem value="EUR">EUR (€)</SelectItem>
                                                <SelectItem value="GBP">GBP (£)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-transparent border border-zinc-800/50 rounded-xl p-8">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Shield size={18} className="text-red-400" />
                                    Danger Zone
                                </h3>
                                <div className="p-4 border border-red-900/20 bg-red-900/5 rounded-lg flex items-center justify-between">
                                    <div>
                                        <h4 className="text-red-400 font-medium">Delete Account</h4>
                                        <p className="text-red-400/60 text-xs mt-1">
                                            This action is permanent and cannot be undone.
                                        </p>
                                    </div>
                                    <Button variant="destructive" className="bg-red-900/20 text-red-500 hover:bg-red-900/40 hover:text-red-400 border border-red-900/30">
                                        Request Deletion
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === "notifications" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <div className="bg-transparent border border-zinc-800/50 rounded-xl p-8">
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                    <Bell size={18} className="text-indigo-400" />
                                    Communication Preferences
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { title: "Email Newsletters", desc: "Receive weekly updates about new features and products." },
                                        { title: "Billing Alerts", desc: "Get notified about upcoming renewals and invoices." },
                                        { title: "Security Alerts", desc: "Receive alerts about suspicious login attempts.", defaultChecked: true },
                                        { title: "Marketing Offers", desc: "Receive special offers and promotions from our partners." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-[#0f0f10] rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                                                    <Bell size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium text-sm">{item.title}</h4>
                                                    <p className="text-zinc-500 text-xs">{item.desc}</p>
                                                </div>
                                            </div>
                                            <Switch defaultChecked={item.defaultChecked} className="data-[state=checked]:bg-indigo-600" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

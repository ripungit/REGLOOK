"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch" // Assuming standard UI component, but I'll implement a simple toggle if not available or just standard html checkbox

// Simple Toggle Component to avoid dependency issues if Switch isn't set up
function Toggle({ checked, onCheckedChange, disabled = false }: { checked: boolean, onCheckedChange: (c: boolean) => void, disabled?: boolean }) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onCheckedChange(!checked)}
            className={`
                relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
                ${checked ? 'bg-white' : 'bg-zinc-700'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow-lg ring-0 transition duration-200 ease-in-out
                    ${checked ? 'translate-x-5' : 'translate-x-0'}
                `}
            />
        </button>
    )
}

const cookieTypes = [
    {
        id: "essential",
        title: "Strictly Necessary Cookies",
        description: "These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site. They cannot be switched off.",
        required: true
    },
    {
        id: "performance",
        title: "Performance Cookies",
        description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.",
        required: false
    },
    {
        id: "functional",
        title: "Functional Cookies",
        description: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.",
        required: false
    },
    {
        id: "targeting",
        title: "Targeting Cookies",
        description: "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.",
        required: false
    }
]

export function CookiesContent() {
    const [preferences, setPreferences] = useState({
        essential: true,
        performance: true,
        functional: true,
        targeting: false
    })

    const handleToggle = (id: string, value: boolean) => {
        setPreferences(prev => ({ ...prev, [id]: value }))
    }

    const handleSave = () => {
        // Mock save action
        alert("Preferences saved")
    }

    return (
        <section className="py-24 bg-black relative z-20">
            <div className="container mx-auto px-6 max-w-[1100px]">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Sidebar / Table of Contents equivalent - here standard text */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-32">
                            <h3 className="text-white font-bold mb-4">About Cookies</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                                Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                            </p>
                            <h3 className="text-white font-bold mb-4">Your Privacy</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to.
                            </p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 max-w-[800px]">
                        <div className="prose prose-invert prose-lg max-w-none mb-12">
                            <p className="text-xl text-zinc-400 leading-relaxed">
                                Users can manage their cookie preferences at any time. Below you can find details about the categories of cookies used and managing your settings.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {cookieTypes.map((cookie) => (
                                <div
                                    key={cookie.id}
                                    className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-bold text-white">{cookie.title}</h3>
                                                {cookie.required && (
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-500/20 text-white border border-zinc-500/20">
                                                        Always Active
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                                                {cookie.description}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 pt-1">
                                            <Toggle
                                                checked={preferences[cookie.id as keyof typeof preferences]}
                                                onCheckedChange={(val) => handleToggle(cookie.id, val)}
                                                disabled={cookie.required}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-sm text-zinc-400 text-center md:text-left">
                                By clicking "Save Preferences", you agree to the storing of cookies on your device as per your selection.
                            </p>
                            <button
                                onClick={handleSave}
                                className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors whitespace-nowrap"
                            >
                                Save Preferences
                            </button>
                        </div>

                        <div className="mt-20 pt-10 border-t border-white/10 text-zinc-500 text-sm">
                            <p>Last updated: January 12, 2026</p>
                            <p className="mt-2">
                                For more detailed information about the specific cookies we use, please refer to our <a href="/company/privacy-policy" className="text-white hover:underline">Privacy Policy</a>.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

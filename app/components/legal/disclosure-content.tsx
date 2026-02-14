"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

const sections = [
    { id: "vulnerability", title: "1. Vulnerability Disclosure" },
    { id: "scope", title: "2. Scope of Program" },
    { id: "reporting", title: "3. Reporting Guidelines" },
    { id: "safe-harbor", title: "4. Safe Harbor" },
    { id: "law-enforcement", title: "5. Law Enforcement Disclosure" },
    { id: "transparency", title: "6. Transparency Report" },
    { id: "affiliate", title: "7. Affiliate Disclosure" },
    { id: "contact", title: "8. Contact Us" },
]

export function DisclosureContent() {
    const [activeSection, setActiveSection] = useState("vulnerability")

    useEffect(() => {
        const handleScroll = () => {
            // Optional scroll spy logic
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offset = 100
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = element.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
            setActiveSection(id)
        }
    }

    return (
        <section className="py-24 bg-black relative z-20">
            <div className="container mx-auto px-6 max-w-[1100px]">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Sidebar / Table of Contents */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-32 space-y-1">
                            <h3 className="text-white font-bold mb-6 pl-4">Table of Contents</h3>
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${activeSection === section.id
                                        ? "bg-white/10 text-white font-medium"
                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                                        }`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 max-w-[800px]">
                        <div className="prose prose-invert prose-lg max-w-none">
                            <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
                                Reglook believes in transparency. This policy outlines our approach to security vulnerability disclosure, law enforcement requests, and affiliate relationships.
                            </p>

                            <div id="vulnerability" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">1. Vulnerability Disclosure</h2>
                                <p className="text-zinc-400 mb-4">
                                    We take the security of our systems and our users' data very seriously. If you have discovered a security vulnerability in any Reglook service, we encourage you to disclose it to us in a responsible manner.
                                </p>
                                <p className="text-zinc-400">
                                    We offer a Bug Bounty program for meaningful vulnerabilities that pose a significant risk to our platform or users.
                                </p>
                            </div>

                            <div id="scope" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">2. Scope of Program</h2>
                                <p className="text-zinc-400 mb-4">
                                    <strong>In Scope:</strong>
                                    <br />
                                    - reglook.com and all subdomains (except those hosted by users).
                                    <br />
                                    - Reglook API endpoints.
                                    <br />
                                    - Official Reglook mobile applications.
                                </p>
                                <p className="text-zinc-400">
                                    <strong>Out of Scope:</strong>
                                    <br />
                                    - User-hosted content (e.g., a website built by a customer).
                                    <br />
                                    - Social engineering or phishing attempts against our employees.
                                    <br />
                                    - Denial of Service (DoS) attacks.
                                </p>
                            </div>

                            <div id="reporting" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">3. Reporting Guidelines</h2>
                                <p className="text-zinc-400 mb-4">
                                    When reporting a potential vulnerability, please include:
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 space-y-2 mb-4">
                                    <li>A detailed description of the vulnerability.</li>
                                    <li>Steps to reproduce the issue.</li>
                                    <li>Proof of concept (screenshots, video, or code).</li>
                                    <li>The impact of the vulnerability.</li>
                                </ul>
                                <p className="text-zinc-400">
                                    Send reports to <a href="mailto:security@reglook.com" className="text-blue-400 hover:underline">security@reglook.com</a>. We aim to acknowledge receipt within 48 hours.
                                </p>
                            </div>

                            <div id="safe-harbor" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">4. Safe Harbor</h2>
                                <p className="text-zinc-400">
                                    If you conduct your security research in accordance with this policy and applicable law, we will not pursue legal action against you. We consider this security research to be authorized activity.
                                </p>
                            </div>

                            <div id="law-enforcement" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">5. Law Enforcement Disclosure</h2>
                                <p className="text-zinc-400 mb-4">
                                    Reglook respects the privacy of our users but complies with valid legal processes. We will only disclose user information to law enforcement agencies in response to a valid court order, subpoena, search warrant, or other ensuring legal process.
                                </p>
                                <p className="text-zinc-400">
                                    We review all requests for legal sufficiency. If permitted by law, we will attempt to notify the user before disclosing their information, unless we believe that doing so would result in a risk of harm or is prohibited by a non-disclosure order.
                                </p>
                            </div>

                            <div id="transparency" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">6. Transparency Report</h2>
                                <p className="text-zinc-400 mb-4">
                                    We publish an annual Transparency Report detailing the number of government requests for user data we receive and our response to them.
                                </p>
                                <div className="bg-zinc-900 border border-white/5 p-6 rounded-xl">
                                    <h4 className="text-white font-bold mb-2">2025 Summary (Jan - Dec)</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="block text-zinc-500">Government Requests</span>
                                            <span className="text-white text-lg font-mono">14</span>
                                        </div>
                                        <div>
                                            <span className="block text-zinc-500">Accounts Affected</span>
                                            <span className="text-white text-lg font-mono">22</span>
                                        </div>
                                        <div>
                                            <span className="block text-zinc-500">Disclosed</span>
                                            <span className="text-white text-lg font-mono">3</span>
                                        </div>
                                        <div>
                                            <span className="block text-zinc-500">Rejected</span>
                                            <span className="text-white text-lg font-mono">11</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="affiliate" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">7. Affiliate Disclosure</h2>
                                <p className="text-zinc-400">
                                    Some of the links on our blog or website may be affiliate links. This means if you click on the link and purchase an item, we may receive an affiliate commission at no extra cost to you. We only recommend products or services we believe will add value to our readers.
                                </p>
                            </div>

                            <div id="contact" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-white mb-6">8. Contact Us</h2>
                                <p className="text-zinc-400">
                                    For security issues: security@reglook.com
                                    <br />
                                    For legal inquiries: legal@reglook.com
                                </p>
                            </div>

                            <div className="mt-20 pt-10 border-t border-white/10 text-zinc-500 text-sm">
                                <p>Last updated: January 12, 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

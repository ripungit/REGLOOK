"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

const sections = [
    { id: "overview", title: "1. Overview" },
    { id: "whois-data", title: "2. WHOIS Data Collection" },
    { id: "icann-policy", title: "3. ICANN Policy Requirements" },
    { id: "public-vs-private", title: "4. Public vs. Private Registration" },
    { id: "data-sharing", title: "5. Data Sharing with Registries" },
    { id: "data-accuracy", title: "6. Data Accuracy Obligations" },
    { id: "udrp", title: "7. Dispute Resolution (UDRP)" },
    { id: "gdpr", title: "8. GDPR & Domain Data" },
    { id: "contact", title: "9. Contact Information" },
]

export function DomainDataContent() {
    const [activeSection, setActiveSection] = useState("overview")

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
                                This policy details specifically how Reglook processes and manages the data required for registering domain names. It is an addendum to our standard Privacy Policy.
                            </p>

                            <div id="overview" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">1. Overview</h2>
                                <p className="text-zinc-400 mb-4">
                                    Domain name registration is a regulated service governed by the Internet Corporation for Assigned Names and Numbers (ICANN). Unlike standard web accounts, domain registrations require specific personal information to be collected and, in some cases, published to the global distributed database known as WHOIS.
                                </p>
                            </div>

                            <div id="whois-data" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">2. WHOIS Data Collection</h2>
                                <p className="text-zinc-400 mb-4">
                                    When you register a domain name, we are required to collect the following contact sets:
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 space-y-2 mb-4">
                                    <li><strong className="text-white">Registrant:</strong> The legal owner of the domain.</li>
                                    <li><strong className="text-white">Administrative Contact:</strong> The person authorized to make changes to the domain.</li>
                                    <li><strong className="text-white">Technical Contact:</strong> The person handling technical aspects (DNS, etc.).</li>
                                    <li><strong className="text-white">Billing Contact:</strong> The person responsible for payments.</li>
                                </ul>
                                <p className="text-zinc-400">
                                    For each contact, we must collect full name, organization (if applicable), postal address, phone number, and email address.
                                </p>
                            </div>

                            <div id="icann-policy" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">3. ICANN Policy Requirements</h2>
                                <p className="text-zinc-400 mb-4">
                                    Under the <a href="#" className="text-blue-400 hover:underline">ICANN Registrar Accreditation Agreement (RAA)</a>, we are contractually obligated to collect and maintain this data. Failure to provide accurate data can result in the suspension or deletion of your domain name.
                                </p>
                                <p className="text-zinc-400">
                                    We are also required to verify your email address. If you do not verify your email address within 15 days of registration, ICANN rules require us to suspend the domain.
                                </p>
                            </div>

                            <div id="public-vs-private" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">4. Public vs. Private Registration</h2>
                                <p className="text-zinc-400 mb-4">
                                    <strong>Public Registration:</strong> By default, for many TLDs, your contact information is published to the public WHOIS database. This means anyone can look up your name, address, and phone number.
                                </p>
                                <p className="text-zinc-400 mb-4">
                                    <strong>WHOIS Privacy:</strong> Reglook offers a WHOIS Privacy service (often free) which replaces your personal contact information with a proxy service's information in the public WHOIS database. You remain the legal owner, but your personal details are shielded from spammers and identity thieves.
                                </p>
                                <p className="text-zinc-400">
                                    <em>Note: Some TLD registries (e.g., .us, .ca, .uk) have specific rules that may prevent the use of privacy services or have different display requirements.</em>
                                </p>
                            </div>

                            <div id="data-sharing" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">5. Data Sharing with Registries</h2>
                                <p className="text-zinc-400 mb-4">
                                    Even if you use WHOIS Privacy, we are required to share your actual (underlying) registration data with the backend Registry Operator for the specific TLD you are registering (e.g., Verisign for .com, PIR for .org).
                                </p>
                                <p className="text-zinc-400">
                                    Additionally, we are required to escrow your registration data with a third-party data escrow provider approved by ICANN to ensure domain continuity in the event that Reglook ceases operations.
                                </p>
                            </div>

                            <div id="data-accuracy" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">6. Data Accuracy Obligations</h2>
                                <p className="text-zinc-400">
                                    You are required to keep your WHOIS information up to date. You can update this information at any time through the Reglook dashboard. We will send annual reminders to review and verify your contact information as mandated by ICANN.
                                </p>
                            </div>

                            <div id="udrp" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">7. Dispute Resolution (UDRP)</h2>
                                <p className="text-zinc-400">
                                    In the event of a UDRP (Uniform Domain-Name Dispute-Resolution Policy) proceeding aimed at your domain, we may be required to reveal your underlying contact information to the dispute provider or complainant, specifically if the privacy service is being used to shield infringing activity.
                                </p>
                            </div>

                            <div id="gdpr" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">8. GDPR & Domain Data</h2>
                                <p className="text-zinc-400 mb-4">
                                    Following the GDPR implementation, personal data for registrants in the EEA is generally redacted from the public WHOIS by default, even without a specific privacy service. However, "gated" access to this data may be provided to parties with a legitimate legal interest (e.g., law enforcement, intellectual property holders).
                                </p>
                            </div>

                            <div id="contact" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-white mb-6">9. Contact Information</h2>
                                <p className="text-zinc-400">
                                    If you have questions specifically regarding WHOIS data or domain privacy, please contact our domain compliance team at domains@reglook.com.
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

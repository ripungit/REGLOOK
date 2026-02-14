"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

const sections = [
    { id: "definitions", title: "1. Definitions" },
    { id: "acceptance", title: "2. Acceptance of Terms" },
    { id: "account", title: "3. Account Registration" },
    { id: "services", title: "4. Provision of Services" },
    { id: "domains", title: "5. Domain Registration" },
    { id: "hosting", title: "6. Hosting Services" },
    { id: "fees", title: "7. Fees and Payments" },
    { id: "content", title: "8. User Content" },
    { id: "aup", title: "9. Acceptable Use Policy" },
    { id: "termination", title: "10. Termination" },
    { id: "liability", title: "11. Limitation of Liability" },
    { id: "indemnification", title: "12. Indemnification" },
    { id: "changes", title: "13. Changes to Terms" },
]

export function TermsContent() {
    const [activeSection, setActiveSection] = useState("definitions")

    // Simple scroll spy (optional refinement)
    useEffect(() => {
        const handleScroll = () => {
            // Logic to update activeSection based on scroll position could go here
            // For now, we'll just let the user click
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offset = 100 // Navbar height + padding
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
                                Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Reglook website and services operated by Reglook Inc. ("us", "we", or "our").
                            </p>

                            <div id="definitions" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">1. Definitions</h2>
                                <p className="text-zinc-400 mb-4">
                                    <strong className="text-white">"Account"</strong> refers to the primary means for accessing and using the Services, subject to payment of a Fee designed by Reglook.
                                </p>
                                <p className="text-zinc-400 mb-4">
                                    <strong className="text-white">"Services"</strong> means the global domain registration, web hosting, cloud infrastructure, and API services provided by Reglook.
                                </p>
                                <p className="text-zinc-400">
                                    <strong className="text-white">"User Content"</strong> means all data, applications, text, images, and other material that you upload, process, or store using our Services.
                                </p>
                            </div>

                            <div id="acceptance" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">2. Acceptance of Terms</h2>
                                <p className="text-zinc-400">
                                    By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. This agreement constitutes a binding legal contract between you and Reglook Inc.
                                </p>
                            </div>

                            <div id="account" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">3. Account Registration</h2>
                                <p className="text-zinc-400 mb-4">
                                    To use certain features of the Service, you must register for an account. You agree to: (a) provide accurate, current, and complete information during the registration process; and (b) maintain and promptly update your information to keep it accurate, current, and complete.
                                </p>
                                <p className="text-zinc-400">
                                    You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                                </p>
                            </div>

                            <div id="services" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">4. Provision of Services</h2>
                                <p className="text-zinc-400 mb-4">
                                    We will use commercially reasonable efforts to make the Services available 24 hours a day, 7 days a week, excluding planned downtime or any unavailability caused by circumstances beyond our reasonable control, including, for example, an act of God, act of government, flood, fire, earthquake, civil unrest, act of terror, strike or other labor problem, or Internet service provider failure or delay.
                                </p>
                            </div>

                            <div id="domains" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">5. Domain Registration</h2>
                                <p className="text-zinc-400 mb-4">
                                    <strong>Registration.</strong> When you register a domain name, you are bound by the terms and conditions of the relevant Top Level Domain (TLD) registry. Domain registrations are not refundable once submitted to the registry.
                                </p>
                                <p className="text-zinc-400 mb-4">
                                    <strong>Renewals.</strong> It is your sole responsibility to ensure that your domain name is renewed. We may offer auto-renewal services, but we are not liable for any loss of domain names due to failed payments or expiration.
                                </p>
                                <p className="text-zinc-400">
                                    <strong>Disputes.</strong> You agree that any dispute arising out of or related to the registration of your domain name is subject to the Uniform Domain Name Dispute Resolution Policy (UDRP).
                                </p>
                            </div>

                            <div id="hosting" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">6. Hosting Services</h2>
                                <p className="text-zinc-400 mb-4">
                                    <strong>Resource Usage.</strong> You agree not to use the Hosting Services in a way that places an excessive burden on our servers or disrupts service to other customers. We reserve the right to throttle or suspend sites that exceed reasonable resource limits.
                                </p>
                                <p className="text-zinc-400">
                                    <strong>Backups.</strong> While we perform regular backups, we do not guarantee that any data will be recoverable. You are solely responsible for maintaining independent backups of your User Content.
                                </p>
                            </div>

                            <div id="fees" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">7. Fees and Payments</h2>
                                <p className="text-zinc-400 mb-4">
                                    You agree to pay all fees in accordance with the pricing and payment terms presented to you for the Services. Fees are non-refundable except as required by law or adequately stated in our Refund Policy.
                                </p>
                                <p className="text-zinc-400">
                                    We reserve the right to change our fees at any time. We will provide you with reasonable prior notice of any material changes to fees.
                                </p>
                            </div>

                            <div id="content" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">8. User Content</h2>
                                <p className="text-zinc-400 mb-4">
                                    You retain all rights to your User Content. By using the Services, you grant us a worldwide, royalty-free license to host, copy, and display your User Content solely as necessary to provide the Services.
                                </p>
                                <p className="text-zinc-400">
                                    You represent and warrant that you have all necessary rights to your User Content and that it does not violate any third-party rights or applicable laws.
                                </p>
                            </div>

                            <div id="aup" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">9. Acceptable Use Policy</h2>
                                <p className="text-zinc-400 mb-4">
                                    You agree not to use the Services for any unlawful purpose or in any way that violates these Terms. Prohibited activities include, but are not limited to:
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                                    <li>Sending unsolicited bulk email (spam).</li>
                                    <li>Hosting malicious content, malware, or phishing sites.</li>
                                    <li>Infringing upon the intellectual property rights of others.</li>
                                    <li>Attempting to gain unauthorized access to our systems or networks.</li>
                                </ul>
                            </div>

                            <div id="termination" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">10. Termination</h2>
                                <p className="text-zinc-400 mb-4">
                                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                                </p>
                                <p className="text-zinc-400">
                                    Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service and cancel any active subscriptions.
                                </p>
                            </div>

                            <div id="liability" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">11. Limitation of Liability</h2>
                                <p className="text-zinc-400 mb-4">
                                    In no event shall Reglook, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory.
                                </p>
                            </div>

                            <div id="indemnification" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">12. Indemnification</h2>
                                <p className="text-zinc-400 mb-4">
                                    You agree to defend, indemnify and hold harmless Reglook and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password, or b) a breach of these Terms.
                                </p>
                            </div>

                            <div id="changes" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-white mb-6">13. Changes to Terms</h2>
                                <p className="text-zinc-400">
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
                                </p>
                            </div>

                            <div className="mt-20 pt-10 border-t border-white/10 text-zinc-500 text-sm">
                                <p>Last updated: January 12, 2026</p>
                                <p className="mt-2">Contact Us: If you have any questions about these Terms, please contact us at legal@reglook.com.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

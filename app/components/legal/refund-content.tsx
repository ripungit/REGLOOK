"use client"

import React, { useState, useEffect } from "react"

const sections = [
    { id: "overview", title: "1. Overview" },
    { id: "domains", title: "2. Domain Registration" },
    { id: "hosting", title: "3. Hosting Services" },
    { id: "cancellations", title: "4. Cancellations" },
    { id: "disputes", title: "5. Disputes & Chargebacks" },
    { id: "process", title: "6. Requesting a Refund" },
    { id: "exceptions", title: "7. Exceptions" },
    { id: "contact", title: "8. Contact Us" },
]

export function RefundContent() {
    const [activeSection, setActiveSection] = useState("overview")

    useEffect(() => {
        const handleScroll = () => {
            // Optional: Add scroll spy logic here if needed
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
                                At Reglook, we strive to provide high-quality domain and hosting services. However, we understand that things don't always go as planned. This Refund Policy outlines the circumstances under which refunds are available and the process for requesting them.
                            </p>

                            <div id="overview" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">1. Overview</h2>
                                <p className="text-zinc-400 mb-4">
                                    Our refund policy varies depending on the type of service you have purchased. Generally, hosting services come with a money-back guarantee, while domain registrations are non-refundable due to the nature of the costs incurred with registries.
                                </p>
                                <p className="text-zinc-400">
                                    Please review the specific sections below to understand the policy for your specific product or service.
                                </p>
                            </div>

                            <div id="domains" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">2. Domain Registration</h2>
                                <p className="text-zinc-400 mb-4">
                                    <strong>Domain registrations are generally non-refundable.</strong> Once a domain name is registered, the fee is paid to the relevant domain registry and cannot be recovered.
                                </p>
                                <p className="text-zinc-400 mb-4">
                                    Exceptions where refunds <em>might</em> be considered:
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 space-y-2 mb-4">
                                    <li>If the domain registration failed technically and the domain was not registered.</li>
                                    <li>For certain TLDs that offer a "grace period" (usually 1-3 days), if cancelled within that specific window. This is subject to the specific registry's policy and an administrative fee may apply.</li>
                                </ul>
                                <p className="text-zinc-400">
                                    Domain renewals and transfers are also non-refundable once processed.
                                </p>
                            </div>

                            <div id="hosting" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">3. Hosting Services</h2>
                                <p className="text-zinc-400 mb-4">
                                    We offer a <strong>30-Day Money-Back Guarantee</strong> on our Shared Hosting, WordPress Hosting, and Cloud Hosting plans for new customers.
                                </p>
                                <p className="text-zinc-400 mb-4">
                                    If you are not satisfied with our services, you may cancel within the first 30 days of your initial signup to receive a full refund of the hosting fees.
                                </p>
                                <p className="text-zinc-400">
                                    <strong>Note:</strong>
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 space-y-2 mt-2">
                                    <li>This guarantee applies only to the first billing cycle of a new account.</li>
                                    <li>Dedicated Servers and VPS plans may have different terms or be non-refundable.</li>
                                    <li>Any setup fees paid are non-refundable.</li>
                                    <li>If you registered a free domain as part of a hosting promotion, the standard cost of the domain will be deducted from your refund amount to cover the registration cost. You will retain ownership of the domain.</li>
                                </ul>
                            </div>

                            <div id="cancellations" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">4. Cancellations</h2>
                                <p className="text-zinc-400 mb-4">
                                    You may cancel your services at any time via your Reglook account dashboard.
                                </p>
                                <p className="text-zinc-400">
                                    <strong>For Monthly Plans:</strong> Cancellation will take effect at the end of your current billing cycle. No pro-rated refunds are issued for mid-month cancellations outside the 30-day guarantee period.<br />
                                    <strong>For Annual/Multi-Year Plans:</strong> Refunds for cancellations after the 30-day money-back window are generally not provided, except at Reglook's sole discretion in exceptional circumstances.
                                </p>
                            </div>

                            <div id="disputes" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">5. Disputes & Chargebacks</h2>
                                <p className="text-zinc-400 mb-4">
                                    If you have a billing issue, please contact our support team first. We are here to help.
                                </p>
                                <p className="text-zinc-400">
                                    Initiating a chargeback or dispute with your payment provider before contacting us will result in the immediate suspension of your account and all associated services until the dispute is resolved. We reserve the right to dispute any illegitimate chargebacks.
                                </p>
                            </div>

                            <div id="process" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">6. Requesting a Refund</h2>
                                <p className="text-zinc-400 mb-4">
                                    To request a refund under our Money-Back Guarantee or for any other valid reason:
                                </p>
                                <ol className="list-decimal pl-6 text-zinc-400 space-y-2">
                                    <li>Log in to your Reglook account.</li>
                                    <li>Go to the Support section and open a new ticket.</li>
                                    <li>Select "Billing" as the department.</li>
                                    <li>Clearly state that you wish to cancel and request a refund, citing the reason.</li>
                                </ol>
                                <p className="text-zinc-400 mt-4">
                                    Refunds are typically processed within 5-10 business days and returned to the original payment method.
                                </p>
                            </div>

                            <div id="exceptions" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">7. Exceptions</h2>
                                <p className="text-zinc-400 mb-4">
                                    The following items are <strong>not eligible for refunds</strong>:
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 space-y-2">
                                    <li>Domain Name Registrations, Renewals, and Transfers (except where explicitly noted).</li>
                                    <li>SSL Certificates once issued.</li>
                                    <li>Software Licenses (e.g., cPanel, Microsoft 365) once activated.</li>
                                    <li>Professional Services / Custom Development fees.</li>
                                    <li>Redemption fees for restoring expired domains.</li>
                                </ul>
                            </div>

                            <div id="contact" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-white mb-6">8. Contact Us</h2>
                                <p className="text-zinc-400">
                                    If you have questions about our Refund Policy, please contact our billing department:
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 mt-4 space-y-1">
                                    <li>By email: billing@reglook.com or starting a Live Chat.</li>
                                    {/* <li>Via Support Ticket: <a href="/app/support" className="text-white hover:underline">Open Ticket</a></li> */}
                                </ul>
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

"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "information-collection", title: "2. Information We Collect" },
    { id: "information-use", title: "3. How We Use Your Information" },
    { id: "data-sharing", title: "4. Data Sharing and Disclosure" },
    { id: "cookies", title: "5. Cookies and Tracking Technologies" },
    { id: "data-security", title: "6. Data Security" },
    { id: "data-retention", title: "7. Data Retention" },
    { id: "user-rights", title: "8. Your Rights and Choices" },
    { id: "international", title: "9. International Data Transfers" },
    { id: "children", title: "10. Children's Privacy" },
    { id: "changes", title: "11. Changes to This Policy" },
    { id: "contact", title: "12. Contact Us" },
]

export function PrivacyContent() {
    const [activeSection, setActiveSection] = useState("introduction")

    // Simple scroll spy
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
                                Reglook Inc. ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you access our website and use our domain registration, hosting, and API services (collectively, the "Services").
                            </p>

                            <div id="introduction" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">1. Introduction</h2>
                                <p className="text-zinc-400 mb-4">
                                    We respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website reglook.com and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                                </p>
                                <p className="text-zinc-400">
                                    Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Website.
                                </p>
                            </div>

                            <div id="information-collection" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">2. Information We Collect</h2>
                                <p className="text-zinc-400 mb-4">
                                    We collect several types of information from and about users of our Website, including information:
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 space-y-4 mb-4">
                                    <li>
                                        <strong className="text-white">Personal Information:</strong> Includes name, postal address, e-mail address, telephone number, and payment information (credit card numbers are processed by our payment processors and not stored on our servers).
                                    </li>
                                    <li>
                                        <strong className="text-white">Account Information:</strong> Username, password, and other security credentials needed to access our Services.
                                    </li>
                                    <li>
                                        <strong className="text-white">Domain Registration Data:</strong> Information required by ICANN and top-level domain registries for WHOIS records, which may include registrant, administrative, technical, and billing contact details.
                                    </li>
                                    <li>
                                        <strong className="text-white">Usage Data:</strong> Information about your internet connection, the equipment you use to access our Website, and usage details such as IP addresses, browser type, and operating surface.
                                    </li>
                                </ul>
                            </div>

                            <div id="information-use" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">3. How We Use Your Information</h2>
                                <p className="text-zinc-400 mb-4">
                                    We use information that we collect about you or that you provide to us, including any personal information:
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 space-y-4">
                                    <li>To present our Website and its contents to you.</li>
                                    <li>To provide you with information, products, or services that you request from us.</li>
                                    <li>To generate and manage WHOIS records as required by ICANN regulations.</li>
                                    <li>To fulfill our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
                                    <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
                                    <li>To detect and prevent fraud, abuse, and security incidents.</li>
                                    <li>For any other purpose with your consent.</li>
                                </ul>
                            </div>

                            <div id="data-sharing" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">4. Data Sharing and Disclosure</h2>
                                <p className="text-zinc-400 mb-4">
                                    We do not sell your personal information. We may disclose aggregated information about our users, and information that does not identify any individual, without restriction. We may disclose personal information that we collect or you provide as described in this privacy policy:
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 space-y-4">
                                    <li>
                                        <strong className="text-white">To Domain Registries:</strong> As required by ICANN and various TLD registries to register domains on your behalf. This information may be made publicly available in the WHOIS database unless you purchase Privacy Protection.
                                    </li>
                                    <li>
                                        <strong className="text-white">To Service Providers:</strong> We use third-party companies and individuals to facilitate our Service, to provide the Service on our behalf, or to assist us in analyzing how our Service is used (e.g., payment processors, analytics providers).
                                    </li>
                                    <li>
                                        <strong className="text-white">For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
                                    </li>
                                </ul>
                            </div>

                            <div id="cookies" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">5. Cookies and Tracking Technologies</h2>
                                <p className="text-zinc-400 mb-4">
                                    We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
                                </p>
                                <p className="text-zinc-400">
                                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                                </p>
                            </div>

                            <div id="data-security" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">6. Data Security</h2>
                                <p className="text-zinc-400 mb-4">
                                    We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls. Payment transactions are encrypted using SSL technology.
                                </p>
                                <p className="text-zinc-400">
                                    The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our Website, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.
                                </p>
                            </div>

                            <div id="data-retention" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">7. Data Retention</h2>
                                <p className="text-zinc-400">
                                    We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                                </p>
                            </div>

                            <div id="user-rights" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">8. Your Rights and Choices</h2>
                                <p className="text-zinc-400 mb-4">
                                    Depending on your location, you may have the following rights regarding your personal data:
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 space-y-2 mb-4">
                                    <li>Right to Access: You can request copies of your personal data.</li>
                                    <li>Right to Rectification: You can request that we correct any information you believe is inaccurate.</li>
                                    <li>Right to Erasure: You can request that we erase your personal data, under certain conditions.</li>
                                    <li>Right to Restrict Processing: You can request that we restrict the processing of your personal data.</li>
                                    <li>Right to Object to Processing: You can object to our processing of your personal data.</li>
                                    <li>Right to Data Portability: You can request that we transfer the data that we have collected to another organization, or directly to you.</li>
                                </ul>
                            </div>

                            <div id="international" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">9. International Data Transfers</h2>
                                <p className="text-zinc-400">
                                    Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction. If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.
                                </p>
                            </div>

                            <div id="children" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">10. Children's Privacy</h2>
                                <p className="text-zinc-400">
                                    Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us.
                                </p>
                            </div>

                            <div id="changes" className="scroll-mt-32 mb-16">
                                <h2 className="text-2xl font-bold text-white mb-6">11. Changes to This Policy</h2>
                                <p className="text-zinc-400">
                                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.
                                </p>
                            </div>

                            <div id="contact" className="scroll-mt-32">
                                <h2 className="text-2xl font-bold text-white mb-6">12. Contact Us</h2>
                                <p className="text-zinc-400">
                                    If you have any questions about this Privacy Policy, please contact us:
                                </p>
                                <ul className="list-disc pl-6 text-zinc-400 mt-4 space-y-1">
                                    <li>By email: privacy@reglook.com</li>
                                    <li>By visiting this page on our website: https://reglook.com/contact</li>
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

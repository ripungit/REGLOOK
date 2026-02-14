"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
    {
        question: "Is there a minimum volume requirement?",
        answer: "No. You can start with zero domains. However, our tiered pricing gives better margins to partners with higher volume."
    },
    {
        question: "Can I migrate existing client domains?",
        answer: "Yes. We offer bulk migration tools and a dedicated support team to help you move domains from other registrars with zero downtime."
    },
    {
        question: "Do you offer WHMCS integration?",
        answer: "Yes, we have an official Reglook module for WHMCS, Blesta, and ClientExec, making it easy to drop into your existing billing system."
    },
    {
        question: "Is the $50 deposit refundable?",
        answer: "The $50 deposit is credited to your account balance immediately upon approval. It is used to pay for your first few domain registrations. If your application is not approved, the full amount is refundable within 7 days."
    }
]

export function PartnerFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="bg-black py-24 md:py-32 relative overflow-hidden z-20">
            <div className="mx-auto max-w-[800px] px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently asked<br />questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b border-white/10 last:border-0"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full py-6 flex items-center justify-between text-left group"
                            >
                                <span className={`text-lg md:text-xl font-semibold transition-colors ${openIndex === index ? "text-white" : "text-white/70 group-hover:text-white"
                                    }`}>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-white transition-transform duration-300 ${openIndex === index ? "rotate-180 text-white" : ""
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-6 text-white leading-relaxed text-base md:text-lg">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

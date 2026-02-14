"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
    {
        question: "How much can I earn?",
        answer: "There is no cap continuously. You earn 30% commission on every sale you refer. If you refer a customer who spends $100, you get $30."
    },
    {
        question: "How long last the cookies?",
        answer: "We offer a 90-day cookie window. This means if someone clicks your link and signs up within 90 days, you earn the commission."
    },
    {
        question: "When do I get paid?",
        answer: "Payouts are processed monthly for all cleared earnings (Net-30). You need a minimum balance of $50 to request a payout."
    },
    {
        question: "Do I need to be a customer?",
        answer: "No, you don't need to have an active Reglook subscription to be an affiliate, although we'd love it if you tried our platform!"
    },
    {
        question: "Where can I promote Reglook?",
        answer: "You can promote via social media, blogs, YouTube, newsletters, and more. Spamming or paid search on our brand keywords is not allowed."
    }
]

export function AffiliateFAQ() {
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
                                        <p className="pb-6 text-white/70 leading-relaxed text-base md:text-lg">
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

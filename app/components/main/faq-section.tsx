"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
    {
        question: "Who is Reglook for?",
        answer: "Reglook is for everyone who wants to build a digital presence, from individual creators and small businesses to large enterprises. We provide the foundational tools—domains, hosting, email, and security—to help you launch and grow online."
    },
    {
        question: "What is Foundation?",
        answer: "Foundation is our proprietary technology stack that automatically integrates your purchased products. It handles the complex DNS configurations and service linking in the background, so your domain, email, and hosting work together instantly."
    },
    {
        question: "Will you be offering more products?",
        answer: "Yes, we are constantly expanding our product line. Currently, we offer high-performance hosting, professional email services, SSL certificates, and premium domain management tools, with website builders and more coming soon."
    },
    {
        question: "How can I build a website with Reglook?",
        answer: "You can easily connect your Reglook domain to any popular website builder or CMS like WordPress, Wix, or Squarespace. Alternatively, you can use our own hosting services to build custom sites or deploy WordPress with a single click."
    },
    {
        question: "Why do I need a domain to build a website?",
        answer: "A domain is your digital address (like 'yourname.com'). Without it, people would have to use a complex string of numbers (IP address) to find your site. It gives your website a professional identity and makes it easy for visitors to remember and find you."
    },
    {
        question: "Which domain extensions do you offer?",
        answer: "We offer hundreds of domain extensions (TLDs), including popular ones like .com, .net, and .org, as well as niche and creative extensions like .io, .ai, .tech, .store, and many more."
    },
    {
        question: "How do I choose and connect my website products?",
        answer: "Our intuitive dashboard guides you through the process. Once you purchase a domain, our 'Connection Manager' suggests relevant products and helps you link them in just a few clicks, or you can use our auto-setup features."
    }
]

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="bg-black py-24 md:py-32 relative overflow-hidden">
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

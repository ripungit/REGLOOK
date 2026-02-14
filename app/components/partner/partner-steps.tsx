"use client"

import { motion } from "framer-motion"

const steps = [
    {
        id: "01",
        title: "Apply",
        description: "Submit your application and one-time deposit. We review within 24 hours."
    },
    {
        id: "02",
        title: "Integrate",
        description: "Get your API keys. Use our SDKs or raw API to connect your frontend."
    },
    {
        id: "03",
        title: "Launch",
        description: "Start selling domains and hosting under your own brand."
    }
]

export function PartnerSteps() {
    return (
        <section className="bg-black py-24 border-t border-white/5 relative z-20">
            <div className="mx-auto max-w-[1200px] px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            How it works
                        </h2>
                        <p className="text-white/60 text-lg mb-12 max-w-md">
                            From application to launch in less than a week. We've streamlined the process to get you selling faster.
                        </p>

                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex gap-6 relative"
                                >
                                    {/* Line connecting steps */}
                                    {index !== steps.length - 1 && (
                                        <div className="absolute left-[23px] top-[60px] bottom-[-20px] w-px bg-white/10" />
                                    )}

                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white font-mono font-bold bg-black">
                                            {step.id}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        {/* Visual representation - Code Snippet */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="rounded-2xl bg-[#000] border border-white/10 p-6 shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                <span className="ml-2 text-xs text-white/30 font-mono">api-integration.ts</span>
                            </div>
                            <div className="font-mono text-sm leading-relaxed">
                                <div className="text-purple-400">const <span className="text-blue-400">partner</span> = <span className="text-yellow-400">new</span> <span className="text-green-400">ReglookPartner</span>({'{'}</div>
                                <div className="pl-4 text-white/80">apiKey: <span className="text-orange-400">"rk_live_..."</span>,</div>
                                <div className="pl-4 text-white/80">whiteLabel: <span className="text-blue-400">true</span>,</div>
                                <div className="text-purple-400">{'}'});</div>
                                <br />
                                <div className="text-white/50">// Provision a new domain</div>
                                <div className="text-purple-400">await <span className="text-white/80">partner.domains.</span><span className="text-yellow-400">register</span>({'{'}</div>
                                <div className="pl-4 text-white/80">domain: <span className="text-orange-400">"client-site.com"</span>,</div>
                                <div className="pl-4 text-white/80">owner: <span className="text-orange-400">"customer_123"</span></div>
                                <div className="text-purple-400">{'}'});</div>
                            </div>
                        </motion.div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="absolute -bottom-6 -left-6 bg-white text-black p-4 rounded-xl shadow-xl max-w-[200px]"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider">Status: Active</span>
                            </div>
                            <p className="text-sm font-bold leading-tight">Partnership Approved</p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}

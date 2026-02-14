"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const team = [
    {
        name: "Alex Rivera",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
    },
    {
        name: "Sarah Chen",
        role: "CTO",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80"
    },
    {
        name: "Marcus Johnson",
        role: "Head of Product",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80"
    },
    {
        name: "Emily Davis",
        role: "VP of Engineering",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80"
    }
]

export function AboutTeam() {
    return (
        <section className="py-32 bg-black relative z-20 overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Meet the Team</h2>
                        <p className="text-white/50 max-w-md">
                            We are a distributed team of engineers, designers, and problem solvers from 12 different countries.
                        </p>
                    </div>
                    <div>
                        <button className="px-6 py-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors text-sm font-medium">
                            View all 50+ members
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="aspect-square overflow-hidden rounded-2xl bg-zinc-900 mb-6 relative">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white font-bold">{member.name}</p>
                                        <p className="text-white/70 text-sm">{member.role}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="block group-hover:hidden transition-opacity">
                                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                                <p className="text-zinc-500 text-sm">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Join Us CTA within Team section */}
                <div className="mt-24 p-12 rounded-[32px] bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-white/10 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Want to join us?</h3>
                        <p className="text-white/60 mb-8 max-w-xl mx-auto">
                            We are always looking for talented individuals to join our mission. Check out our open positions.
                        </p>
                        <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors">
                            See Careers
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}

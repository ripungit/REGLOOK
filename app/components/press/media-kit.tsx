"use client"

import { motion } from "framer-motion"
import { Download, FileImage, FileText, FolderArchive } from "lucide-react"

const assets = [
    {
        title: "Logos & Marks",
        description: "Official Reglook logo in vector and raster formats (SVG, PNG). Includes dark and light modes.",
        size: "12 MB",
        icon: FileImage
    },
    {
        title: "Product Screenshots",
        description: "High-resolution screenshots of the Reglook dashboard, editor, and mobile app.",
        size: "45 MB",
        icon: FolderArchive
    },
    {
        title: "Brand Guidelines",
        description: "PDF guide on how to use our brand assets, typography, and color palette details.",
        size: "2.4 MB",
        icon: FileText
    },
    {
        title: "Leadership Photos",
        description: "Headshots of our executive team for use in articles and interviews.",
        size: "85 MB",
        icon: FolderArchive
    }
]

export function MediaKit() {
    return (
        <section className="py-24 bg-[#050505] border-t border-white/5 relative z-20">
            <div className="container mx-auto px-6 max-w-[1200px]">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Media Kit</h2>
                        <p className="text-white/60 text-lg max-w-xl">
                            Download official Reglook assets. Please follow our brand guidelines when using these materials.
                        </p>
                    </div>
                    <button className="text-white hover:text-blue-400 transition-colors text-sm font-medium flex items-center gap-2">
                        Download All Assets <Download size={14} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {assets.map((asset, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl group hover:border-white/20 transition-colors cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                                <asset.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{asset.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed mb-6 min-h-[60px]">
                                {asset.description}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <span className="text-xs font-mono text-white/30">{asset.size}</span>
                                <div className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                                    <Download size={16} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

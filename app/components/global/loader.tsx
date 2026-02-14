"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoaderProps {
    className?: string
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    color?: string
}

const sizeMap = {
    xs: "w-5 h-5 gap-0.5",
    sm: "w-6 h-6 gap-0.5",
    md: "w-10 h-10 gap-1",
    lg: "w-14 h-14 gap-1.5",
    xl: "w-20 h-20 gap-2",
}

export function Loader({
    className,
    size = "md",
    color = "bg-white",
}: LoaderProps) {
    const reduceMotion = useReducedMotion()

    return (
        <motion.div
            role="status"
            aria-label="Loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
                "grid grid-cols-2 rotate-45",
                sizeMap[size],
                className
            )}
        >
            {[0, 0.15, 0.3, 0.45].map((delay, i) => (
                <motion.span
                    key={i}
                    className={cn(
                        "rounded-full",
                        color,
                        i % 2 !== 0 && "opacity-40"
                    )}
                    animate={
                        reduceMotion
                            ? {}
                            : {
                                scale: [0.75, 1, 0.75],
                                opacity: [0.6, 1, 0.6],
                            }
                    }
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay,
                    }}
                />
            ))}
        </motion.div>
    )
}

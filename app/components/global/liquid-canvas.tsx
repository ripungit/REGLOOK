"use client"

import { useEffect, useRef } from "react"

export default function LiquidCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        let app: any = null

        async function init() {
            try {
                // Determine if we are on a mobile device
                const isMobile = window.innerWidth < 768

                // Dynamic import from CDN, ignoring webpack resolution
                // @ts-ignore
                const { default: LiquidBackground } = await import(/* webpackIgnore: true */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js')

                if (canvasRef.current) {
                    app = LiquidBackground(canvasRef.current)

                    // Load the asset
                    app.loadImage('/liquid/l1.png')

                    // Configure parameters based on user snippet
                    app.liquidPlane.material.metalness = 0.75
                    app.liquidPlane.material.roughness = 0.25
                    app.liquidPlane.uniforms.displacementScale.value = isMobile ? 2 : 5 // Reduce scale on mobile for performance/visuals
                    app.setRain(false)
                }
            } catch (err) {
                console.error("Failed to load LiquidBackground:", err)
            }
        }

        init()

        return () => {
            // Cleanup if the library supports it, otherwise just let it be (canvas unmounts)
            // The library doesn't seem to have a destroy method in the snippet, but typical three.js cleanup would involve disposing renderer.
            // We'll rely on React unmounting the canvas element.
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-10 mix-blend-screen"
            style={{ width: '100%', height: '100%' }}
        />
    )
}

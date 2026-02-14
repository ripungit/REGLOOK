"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Cloud,
  Code,
  Check,
  CodeIcon,
  TerminalIcon,
} from "lucide-react";

import {
  SiNextdotjs,
  SiNuxtdotjs,
  SiSvelte,
  SiRemix,
  SiAstro,
  SiQwik,
  SiSolid,
  SiNestjs,
  SiExpress,
  SiFastify,
  SiVuedotjs,
  SiReact,
  SiAngular,
  SiLaravel,
  SiFastapi,
  SiDjango,
  SiGo,
  SiRust,
  SiGin,
} from "react-icons/si";

/**
 * npm i react-icons
 */

type TerminalLine = {
  text: string;
  type: "command" | "output" | "spinner" | "success" | "url";
};

type FrameworkItem = {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  supported: boolean;
};

export function AirnodeShowcase() {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { text: "$ airnode --help", type: "command" },
    { text: "Airnode CLI for deploying applications", type: "output" },
    {
      text: "Available commands: login, init, deploy, push, logs, whoami",
      type: "output",
    },
  ]);

  const [currentCommand, setCurrentCommand] = useState(0);

  const frameworkLogos: FrameworkItem[] = [
    { name: "Next.js", Icon: SiNextdotjs, supported: true },
    { name: "Nuxt", Icon: SiNuxtdotjs, supported: true },
    { name: "SvelteKit", Icon: SiSvelte, supported: true },
    { name: "Remix", Icon: SiRemix, supported: true },
    { name: "Astro", Icon: SiAstro, supported: true },
    { name: "Qwik", Icon: SiQwik, supported: true },
    { name: "SolidStart", Icon: SiSolid, supported: true },
    { name: "NestJS", Icon: SiNestjs, supported: true },
    { name: "Express", Icon: SiExpress, supported: true },
    { name: "Fastify", Icon: SiFastify, supported: true },
    { name: "Vue", Icon: SiVuedotjs, supported: true },
    { name: "React", Icon: SiReact, supported: true },
    { name: "Angular", Icon: SiAngular, supported: true },
    { name: "Laravel", Icon: SiLaravel, supported: true },
    { name: "FastAPI", Icon: SiFastapi, supported: true },
    { name: "Django", Icon: SiDjango, supported: true },
    { name: "Gin", Icon: SiGin, supported: true },
    { name: "Go", Icon: SiGo, supported: true },
    { name: "Rust", Icon: SiRust, supported: true },
  ];

  const commands = [
    { command: "airnode login", output: "Successfully logged in as user@example.com" },
    { command: "airnode init", output: "Project initialized with framework detection" },
    { command: "airnode deploy", output: "Deployment completed successfully!" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentCommand < commands.length) {
        const newLines: TerminalLine[] = [
          ...terminalLines,
          { text: `$ ${commands[currentCommand].command}`, type: "command" },
          { text: "⠋ Initializing...", type: "spinner" },
        ];
        setTerminalLines(newLines);

        const inner = setTimeout(() => {
          const updatedLines: TerminalLine[] = [
            ...newLines.slice(0, -1),
            { text: commands[currentCommand].output, type: "success" },
            { text: "https://myapp.airnode.reglook.com", type: "url" },
          ];
          setTerminalLines(updatedLines);
          setCurrentCommand((c) => c + 1);
        }, 2000);

        return () => clearTimeout(inner);
      }
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCommand, terminalLines]);

  return (
    <section className="bg-black py-32 text-white relative">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight"
          >
            Airnode Hosting
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-white md:max-w-md md:ml-auto md:text-left pb-2"
          >
            Everything you need to build web and mobile apps. Easy to start, easy to scale.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CLI Showcase Card */}
          <div className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-gradient-to-b from-orange-900 to-[#000] h-auto md:h-[600px] flex flex-col md:flex-row group">
            {/* Visual Side (Left) - Terminal */}
            <div className="w-full md:w-1/2 relative flex items-center justify-center p-6 md:p-12 mb-6 md:mb-0 h-auto md:h-auto overflow-visible">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 w-full max-w-lg">
                <div className="bg-transparent backdrop-blur-xl rounded-xl overflow-hidden border border-white/0 shadow-2xl">
                  <div className="flex items-center px-4 py-3 bg-[#fff]/5 border-b border-white/10">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="ml-3 text-sm text-white/60 font-mono">bash</div>
                    <div className="ml-auto flex items-center gap-2">
                      <TerminalIcon className="w-4 h-4 text-white" />
                      <span className="text-xs text-white font-semibold">Cockpit Terminal</span>
                    </div>
                  </div>

                  <div className="p-3 md:p-4 font-mono text-sm h-64 md:h-80 overflow-y-auto">
                    {terminalLines.map((line, index) => (
                      <div key={index} className="mb-2">
                        {line.type === "command" && (
                          <span>
                            <span className="text-cyan-400">$</span>
                            <span className="text-white ml-2">{line.text.substring(2)}</span>
                          </span>
                        )}

                        {line.type === "output" && (
                          <span className="text-white/80">{line.text}</span>
                        )}

                        {line.type === "spinner" && (
                          <span className="text-yellow-400 animate-pulse">
                            ⠋ {line.text.substring(2)}
                          </span>
                        )}

                        {line.type === "success" && (
                          <span className="text-green-400">✓ {line.text}</span>
                        )}

                        {line.type === "url" && (
                          <span className="text-cyan-400 underline">{line.text}</span>
                        )}
                      </div>
                    ))}

                    {currentCommand < commands.length && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex space-x-1">
                          <div
                            className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                          <div
                            className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
                            style={{ animationDelay: "600ms" }}
                          />
                        </div>
                        <span className="text-cyan-400 text-sm">Executing next command...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side (Right) */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-16">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1 rounded bg-white/20 text-white">
                  <Terminal className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold tracking-widest text-white uppercase">
                  Airnode HOSTING
                </span>
              </div>
              <h3 className="text-2xl md:text-5xl font-bold text-white mb-4">
                Watch it deploy
                <br />
                in real-time.
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm mb-6">
                See how Airnode automatically detects your framework and deploys your application with a single command.
              </p>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-white">&lt;3s</span>
                  <span className="text-xs text-white/40 uppercase tracking-wider">Detection</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-white">&lt;10s</span>
                  <span className="text-xs text-white/40 uppercase tracking-wider">Deploy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Frameworks Support Card */}
          <div className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-[#000] border border-white/5 h-auto md:h-[750px] p-6 md:p-12">
            <div className="mb-8">

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                All major frameworks,
                <br />
                automatically detected.
              </h3>
              <p className="text-white/60">
                Airnode intelligently detects and configures your project regardless of the framework or language.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mt-4">
              {frameworkLogos.map((framework, index) => (
                <motion.div
                  key={framework.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col items-center p-3 rounded-lg bg-white/0 hover:bg-white/5 transition-colors border border-white/5"
                >
                  <div className="mb-2">
                    <framework.Icon className="w-9 h-9 text-white" />
                  </div>
                  <span className="text-xs text-white text-center font-medium">{framework.name}</span>
                </motion.div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Terminal, Zap, Shield, Cloud, Code, Server, Rocket, Cpu } from "lucide-react";

export function AirnodeSection() {
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
            Infrastructure reimagined
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-white md:max-w-md md:ml-auto md:text-left pb-2"
          >
            Like AWS Amplify, but built for developers who demand precision control and automation.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Airnode Core Card */}
          <div className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-gradient-to-b from-red-900 to-[#000] h-auto md:h-[500px] flex flex-col md:flex-row group">
            
            {/* Visual Side (Left) */}
            <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 md:p-12 mb-8 md:mb-0 h-64 md:h-auto overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Terminal Visual */}
              <div className="relative z-10 w-48 h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <div className="absolute inset-0 border border-white rounded-full animate-pulse blur-sm" />
                <Terminal className="w-32 h-32 text-white" strokeWidth={1} />
              </div>
            </div>

            {/* Content Side (Right) */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1 rounded bg-white/20 text-white">
                  <Terminal className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold tracking-widest text-white uppercase">Airnode</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Advanced infrastructure,<br />developer-first.</h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm">
                Command-line precision meets visual simplicity. Manage complex infrastructure through powerful CLI tools with rich automation.
              </p>

              <div className="mt-8 flex gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-white">CLI-First</span>
                  <span className="text-xs text-white/40 uppercase tracking-wider">Approach</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-white">&lt;10s</span>
                  <span className="text-xs text-white/40 uppercase tracking-wider">Deploy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure as Code Card */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-purple-600 to-[#000] min-h-[500px] md:h-[600px] p-8 md:p-10 flex flex-col justify-between group">
            
            {/* Code Visualization */}
            <div className="absolute top-0 right-0 w-full h-[60%] flex items-center justify-center pointer-events-none">
              <div className="relative w-48 h-40 perspective-1000 rotate-[-8deg] translate-x-0 md:-rotate-12 md:translate-x-4 md:group-hover:rotate-[-8deg] md:group-hover:translate-x-0 transition-all duration-500 ease-out">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl z-20 overflow-hidden">
                  <div className="p-3">
                    <div className="space-y-2 font-mono text-xs">
                      <div className="text-purple-300">resource "aws_s3_bucket" "main"</div>
                      <div className="text-white/70">  bucket = "my-app-bucket"</div>
                      <div className="text-white/70">  acl    = "private"</div>
                      <div className="text-purple-300">end</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto relative z-10">
              <div className="flex items-center gap-2 mb-4 text-white/80">
                <div className="flex items-center justify-center h-8 w-8 rounded bg-white/20 text-white">
                  <Code className="w-4 h-4" />
                </div>
                <span className="font-semibold text-lg">IaC</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Infrastructure<br />as code.</h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xs">
                Define your entire stack in declarative configuration files. Version control your infrastructure like application code.
              </p>
            </div>
          </div>

          {/* Multi-Cloud Card */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-indigo-600 to-[#000] min-h-[500px] md:h-[600px] p-8 md:p-10 flex flex-col justify-between group">
            
            {/* Cloud Visualization */}
            <div className="absolute top-0 right-0 w-full h-[65%] flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                
                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_12s_linear_infinite]" />
                  
                  {/* Cloud Icons */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-white">
                    <Cloud className="w-8 h-8" />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-white">
                    <Cloud className="w-7 h-7" />
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white">
                    <Cloud className="w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1 rounded bg-white/20 text-white">
                  <Cloud className="w-4 h-4" />
                </span>
                <span className="text-xs text-white font-bold tracking-widest uppercase">Multi-Cloud</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Deploy everywhere,<br />manage once.</h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                Unified orchestration across AWS, GCP, Azure, and on-premise environments from a single interface.
              </p>
            </div>
          </div>

          {/* CLI Terminal Card (Wide) */}
          <div className="md:col-span-2 relative overflow-hidden rounded-[32px] bg-[#0B0C10] border border-white/5 h-auto md:h-[400px] flex flex-col md:flex-row p-8 md:p-12 group">
            
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-cyan-500/20 rounded flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-2xl font-medium text-white">CLI Tools</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Command-line power.
              </h3>
            </div>
            
            <div className="w-full md:w-1/2 pt-8 md:pt-0 border-t md:border-t-0 md:pl-12 md:border-l border-white/10">
              <div className="bg-black rounded-xl overflow-hidden border border-white/10">
                <div className="flex items-center px-4 py-3 bg-[#1A1D24] border-b border-white/5">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-3 text-sm text-white/60 font-mono">terminal</div>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="mb-3">
                    <span className="text-cyan-400">$</span>
                    <span className="text-white ml-2">airnode deploy --env prod</span>
                  </div>
                  <div className="text-green-400 mb-2">✓ Deploying to production...</div>
                  <div className="text-white/60 text-xs"># Infrastructure as code deployment</div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="px-6 py-3 rounded-full bg-white/10 text-sm font-semibold hover:bg-white/20 transition-colors text-white">
                  View CLI Docs
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
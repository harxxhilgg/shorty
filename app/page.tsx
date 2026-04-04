"use client";

import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import ResultCard from "@/components/ResultCard";
import { FiLink, FiZap, FiGithub, FiGlobe } from "react-icons/fi";

export default function Home() {
  const [result, setResult] = useState<{
    shortUrl: string;
    shortCode: string;
    remaining: number;
  } | null>(null);

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center selection:bg-blue-500/30 selection:text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

      {/* Header / Nav */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            <FiLink className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
            Shorty<span className="text-blue-500">.</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/harshil/shorty" className="text-zinc-500 hover:text-white transition-colors">
            <FiGithub className="w-5 h-5" />
          </a>
          <button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:border-zinc-700 text-sm font-semibold transition-all">
            <FiGlobe className="w-4 h-4 text-zinc-400" /> API Access
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto px-6 py-12 md:py-24 text-center space-y-12">
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000 fill-mode-both">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">
            <FiZap className="w-3.5 h-3.5" /> Fast • Secure • Free
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Shorten your links, <br className="hidden md:block" />
            <span className="text-white">amplify your reach.</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Beautifully simple URL shortening with built-in QR codes. 
            No sign-up required, just paste and go.
          </p>
        </div>

        <UrlForm onShorten={(data) => setResult(data)} />

        {result && (
          <div className="space-y-4 pt-12">
            <ResultCard 
              shortUrl={result.shortUrl} 
              shortCode={result.shortCode} 
            />
            <p className="text-zinc-500 text-sm font-medium animate-in fade-in duration-1000 delay-500 fill-mode-both">
              Daily uses remaining: <span className="text-blue-500 font-bold">{result.remaining}</span>
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-auto w-full max-w-7xl mx-auto px-6 py-12 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-zinc-600 text-sm font-medium">
          © {new Date().getFullYear()} Shorty URL Shortener. Built with Next.js 16.
        </p>
        <div className="flex items-center gap-8">
          <a href="#" className="text-zinc-600 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest transition-colors">Terms</a>
          <a href="#" className="text-zinc-600 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest transition-colors">Privacy</a>
          <a href="#" className="text-zinc-600 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest transition-colors">Contact</a>
        </div>
      </footer>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import UrlForm from "@/components/UrlForm";
import ResultCard from "@/components/ResultCard";
import { ModeToggle } from "@/components/ModeToggle";
import { Link2, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Home() {
  const [result, setResult] = useState<{
    shortUrl: string;
    shortCode: string;
    remaining: number;
  } | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use local assets from /public
  const monsterIcon = resolvedTheme === "dark"
    ? "/monster-energy-energy-drink-fizzy-drinks-carbonated-water-drink-can-drink-1bce7fb5d56077dba2ee3df418958421.png"
    : "/monster-regular.png";

  return (
    <main className="min-h-screen flex flex-col items-center selection:bg-primary/30 selection:text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 blur-[120px] rounded-full -z-10 bg-transparent opacity-0 mix-blend-overlay hidden" />
      <div className="absolute -bottom-48 -right-48 w-150 h-150 bg-secondary/5 blur-[100px] rounded-full -z-10 opacity-0 mix-blend-overlay hidden" />

      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-default">
          <div className="bg-primary p-2 rounded-2xl">
            <Link2 className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Shorty<span className="text-primary">.</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/harxxhilgg/shorty"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiGithub className="w-5 h-5" />
            </a>
          </Button>

          <ModeToggle />
        </div>
      </header>

      <section className="w-full max-w-4xl mx-auto px-6 py-12 md:py-24 text-center space-y-12">
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000 fill-mode-both">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" /> Fast • Secure • Free
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            Shorten your links, <br className="hidden md:block" />
            <span className="text-foreground">amplify your reach.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
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
            <p className="text-muted-foreground text-sm font-medium animate-in fade-in duration-1000 delay-500 fill-mode-both">
              Daily uses remaining: <span className="text-primary font-semibold">{result.remaining}</span>
            </p>
          </div>
        )}
      </section>

      <footer className="mt-auto w-full max-w-7xl mx-auto px-6 py-12 flex items-center justify-center gap-2">
        <p className="text-muted-foreground text-xs flex items-center gap-1.5">
          © {new Date().getFullYear()} Shorty. Built with lots of
          {mounted && (
            <span className="relative w-7 h-7 -mt-1 -ml-1 inline-block transition-transform">
              <Image
                src={monsterIcon}
                alt="Monster Energy"
                fill
                sizes="32px"
                className="object-contain size-0"
              />
            </span>
          )}
        </p>
      </footer>
    </main>
  );
}

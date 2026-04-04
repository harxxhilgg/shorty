"use client";

import { useState } from "react";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import { cn, isValidUrl } from "@/lib/utils";

interface UrlFormProps {
  onShorten: (data: { shortUrl: string; shortCode: string; remaining: number }) => void;
}

export default function UrlForm({ onShorten }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (including https://)");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred. Please try again.");
      } else {
        onShorten(data);
        setUrl("");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative group">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            required
            className={cn(
              "w-full px-6 py-4 text-lg bg-zinc-900 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-500",
              error ? "border-red-500 ring-2 ring-red-500/20" : ""
            )}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 group-hover:px-8"
          >
            {loading ? (
              <FiLoader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Shorten <FiArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
        {error && (
          <p className="text-red-400 text-sm px-4 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn, isValidUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            required
            className={cn(
              "h-14 px-6 text-lg rounded-3xl transition-all placeholder:text-muted-foreground",
              error ? "border-destructive ring-2 ring-destructive/20" : ""
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="px-6 rounded-3xl font-medium cursor-pointer h-14"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>

        {error && (
          <p className="text-destructive text-sm px-4 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Copy, Check, QrCode, ExternalLink, Loader2 } from "lucide-react";
import QrCard from "./QrCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ResultCardProps {
  shortUrl: string;
  shortCode: string;
}

export default function ResultCard({ shortUrl }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loadingQr, setLoadingQr] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const generateQr = async () => {
    if (qrCode) {
      setShowQr(true);
      return;
    }

    setLoadingQr(true);
    try {
      const response = await fetch("/api/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: shortUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCode);
        setShowQr(true);
      } else {
        alert(data.error || "Failed to generate QR code.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    } finally {
      setLoadingQr(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Card className="rounded-3xl shadow-2xl overflow-hidden border-border/50 backdrop-blur-xl">
        <CardContent className="px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <p className="text-left text-muted-foreground text-sm font-medium uppercase tracking-wider">Your Short URL</p>
              <div className="flex items-center gap-2 group">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground selection:bg-primary/30 truncate">
                  {shortUrl.replace("https://", "")}
                </h2>

                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-accent rounded-lg"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                variant="secondary"
                onClick={handleCopy}
                className="flex-1 md:flex-none h-12 px-6 rounded-xl font-medium gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <p>Copy</p>
                  </>
                )}
              </Button>

              <Button
                variant="default"
                onClick={generateQr}
                disabled={loadingQr}
                className="flex-1 md:flex-none h-12 px-6 rounded-xl font-medium gap-2 cursor-pointer"
              >
                {loadingQr ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <QrCode className="w-4 h-4" />
                    <p>QR Code</p>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showQr && qrCode && <QrCard qrCode={qrCode} shortUrl={shortUrl} />}
    </div>
  );
}

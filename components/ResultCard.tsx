"use client";

import { useState } from "react";
import { FiCopy, FiCheck, FiGrid, FiExternalLink, FiLoader } from "react-icons/fi";
import QrCard from "./QrCard";

interface ResultCardProps {
  shortUrl: string;
  shortCode: string;
}

export default function ResultCard({ shortUrl, shortCode }: ResultCardProps) {
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
      alert("Network error.");
    } finally {
      setLoadingQr(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl ring-1 ring-zinc-800/50 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">Your Short URL</p>
            <div className="flex items-center gap-2 group">
              <h2 className="text-2xl md:text-3xl font-bold text-white selection:bg-blue-500/30 truncate">
                {shortUrl.replace("https://", "")}
              </h2>
              <a 
                href={shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-zinc-800 rounded-lg"
              >
                <FiExternalLink className="w-4 h-4 text-zinc-400" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-all"
            >
              {copied ? (
                <>
                  <FiCheck className="w-4 h-4 text-green-400" /> Copied
                </>
              ) : (
                <>
                  <FiCopy className="w-4 h-4" /> Copy
                </>
              )}
            </button>
            <button
              onClick={generateQr}
              disabled={loadingQr}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all"
            >
              {loadingQr ? (
                <FiLoader className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <FiGrid className="w-4 h-4" /> QR Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {showQr && qrCode && <QrCard qrCode={qrCode} shortUrl={shortUrl} />}
    </div>
  );
}

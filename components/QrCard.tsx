"use client";

import { FiDownload, FiCheck } from "react-icons/fi";
import { useState } from "react";

interface QrCardProps {
  qrCode: string;
  shortUrl: string;
}

export default function QrCard({ qrCode, shortUrl }: QrCardProps) {
  const [downloaded, setDownloaded] = useState(false);

  const downloadQr = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qr-${shortUrl.split("/").pop()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl ring-1 ring-zinc-800/50 backdrop-blur-xl animate-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="relative group">
          <div className="absolute -inset-4 bg-blue-500/20 rounded-[2.5rem] blur-2xl group-hover:bg-blue-500/30 transition-all duration-500" />
          <img
            src={qrCode}
            alt="QR Code"
            className="relative w-48 h-48 rounded-2xl border-4 border-white bg-white p-2 shadow-inner"
          />
        </div>

        <div className="space-y-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white tracking-tight">QR Code Generated</h3>
            <p className="text-zinc-400 max-w-[280px] leading-relaxed">
              Scan this QR code to quickly visit your shortened link or download it for sharing.
            </p>
          </div>

          <button
            onClick={downloadQr}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-zinc-100 text-black rounded-2xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/5"
          >
            {downloaded ? (
              <>
                <FiCheck className="w-5 h-5" /> Saved to Gallery
              </>
            ) : (
              <>
                <FiDownload className="w-5 h-5" /> Download PNG
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

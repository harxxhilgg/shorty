"use client";

import { Download, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="rounded-3xl shadow-2xl border-border/50 backdrop-blur-xl animate-in zoom-in-95 duration-500 overflow-hidden">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
            <img
              src={qrCode}
              alt="QR Code"
              className="relative w-48 h-48 rounded-2xl border-4 border-background bg-white p-2 shadow-inner"
            />
          </div>

          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground tracking-tight">QR Code Generated</h3>
              <p className="text-muted-foreground max-w-[280px] leading-relaxed">
                Scan this QR code to quickly visit your shortened link or download it for sharing.
              </p>
            </div>

            <Button
              onClick={downloadQr}
              variant="default"
              className="w-full h-14 rounded-2xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/5"
            >
              {downloaded ? (
                <>
                  <Check className="w-5 h-5" /> Saved to Gallery
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" /> Download PNG
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { qrRatelimit } from "@/lib/ratelimit";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  
  const { success, remaining, limit, reset } = await qrRatelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { 
        error: "Rate limit exceeded. You can generate up to 20 QR codes per day.",
        remaining,
        limit,
        reset
      },
      { status: 429 }
    );
  }

  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required for QR code generation." }, { status: 400 });
  }

  try {
    const qrCode = await QRCode.toDataURL(url, {
      width: 500,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });
    
    return NextResponse.json({ qrCode, remaining });
  } catch (error) {
    console.error("QR Code Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate QR code." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { shortenRatelimit } from "@/lib/ratelimit";
import { nanoid } from "nanoid";
import { isValidUrl } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  
  const { success, remaining, limit, reset } = await shortenRatelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      { 
        error: "Rate limit exceeded. You can shorten up to 10 URLs per day.",
        remaining,
        limit,
        reset
      },
      { status: 429 }
    );
  }

  const { url } = await req.json();

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: "Invalid URL provided." }, { status: 400 });
  }

  // Check if existing original_url exists
  const { data: existingLink } = await supabase
    .from("links")
    .select("short_code")
    .eq("original_url", url)
    .single();

  if (existingLink) {
    return NextResponse.json({
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${existingLink.short_code}`,
      shortCode: existingLink.short_code,
      remaining
    });
  }

  // Generate unique short code
  let shortCode = nanoid(6);
  let isUnique = false;
  let attempts = 0;

  while (!isUnique && attempts < 5) {
    const { data } = await supabase
      .from("links")
      .select("id")
      .eq("short_code", shortCode)
      .single();
    
    if (!data) {
      isUnique = true;
    } else {
      shortCode = nanoid(6);
      attempts++;
    }
  }

  const { error } = await supabase.from("links").insert([
    { original_url: url, short_code: shortCode }
  ]);

  if (error) {
    return NextResponse.json({ error: "Failed to save link." }, { status: 500 });
  }

  return NextResponse.json({
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
    shortCode,
    remaining
  });
}

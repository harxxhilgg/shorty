import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{ shortCode: string }>;
};

export async function GET(req: NextRequest, props: Props) {
  const { shortCode } = await props.params;

  const { data, error } = await supabase
    .from("links")
    .select("original_url, clicks")
    .eq("short_code", shortCode)
    .single();

  if (error || !data) {
    return new NextResponse("Link not found", { status: 404 });
  }

  // Increment click count
  await supabase
    .from("links")
    .update({ clicks: (data.clicks || 0) + 1 })
    .eq("short_code", shortCode);

  return NextResponse.redirect(data.original_url, 301);
}

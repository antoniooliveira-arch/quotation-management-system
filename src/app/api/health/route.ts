import { supabase } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!supabase) return Response.json({ ok: false, reason: "no database configured" });
  try {
    const { error } = await supabase.from("clients").select("id").limit(1);
    if (error) throw error;
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

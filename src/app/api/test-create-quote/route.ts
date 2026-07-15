import { NextResponse } from "next/server";
import { supabase } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, unknown> = {};

  results.envUrl = process.env.SUPABASE_URL ? "set" : "missing";
  results.envKey = process.env.SUPABASE_KEY ? "set" : "missing";
  results.supabaseClient = supabase ? "initialized" : "null";

  if (!supabase) {
    return NextResponse.json({ error: "Supabase client is null", ...results });
  }

  const { data: company, error: ce } = await supabase.from("companies").select("*").limit(1).maybeSingle();
  results.company = company;
  results.companyError = ce?.message || null;

  const { data: clients, error: cle } = await supabase.from("clients").select("id, name").limit(5);
  results.clients = clients;
  results.clientsError = cle?.message || null;

  const { data: quotes, error: qe } = await supabase.from("quotes").select("*, clients(name)").limit(5);
  results.quotes = quotes;
  results.quotesError = qe?.message || null;

  if (company) {
    const { data: testInsert, error: ie } = await supabase
      .from("quotes")
      .insert({ client_id: 1, company_id: company.id, total_amount: "0.01" })
      .select()
      .single();
    results.testInsert = testInsert;
    results.insertError = ie?.message || null;

    if (testInsert) {
      await supabase.from("quotes").delete().eq("id", testInsert.id);
      results.testInsertCleanup = "deleted";
    }
  }

  return NextResponse.json(results);
}

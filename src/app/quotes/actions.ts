"use server";

import { supabase } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type Quote = {
  id: number;
  client_id: number;
  company_id: number;
  status: string;
  total_amount: string;
  created_at: string;
  clients?: { name: string; phone: string; address: string; neighborhood: string; city: string; cep: string };
  companies?: { name: string; cnpj: string; address: string; cep: string; city: string; email: string; phone: string };
  quote_items?: { id: number; description: string; quantity: string; unit_price: string; total_price: string }[];
};

export async function getQuotes(): Promise<(Quote & { clients: { name: string } })[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("quotes")
    .select("*, clients(name)")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }
  return (data as (Quote & { clients: { name: string } })[]) || [];
}

export async function createQuote(data: {
  clientId: number;
  items: { description: string; quantity: number; unitPrice: number }[];
}) {
  if (!supabase) throw new Error("Banco de dados não configurado.");

  const { data: company, error: companyError } = await supabase.from("companies").select("*").limit(1).maybeSingle();
  if (companyError) {
    console.error("Error fetching company:", companyError);
    throw new Error(`Erro ao buscar empresa: ${companyError.message}`);
  }
  if (!company) {
    throw new Error("Cadastre os dados da empresa primeiro.");
  }

  const totalAmount = data.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  const { data: newQuote, error: quoteError } = await supabase
    .from("quotes")
    .insert({ client_id: data.clientId, company_id: company.id, total_amount: totalAmount.toString() })
    .select()
    .single();

  if (quoteError) {
    console.error("Error creating quote:", quoteError);
    throw new Error(`Erro ao criar orçamento: ${quoteError.message}`);
  }

  if (newQuote) {
    const items = data.items.map((item) => ({
      quote_id: newQuote.id,
      description: item.description,
      quantity: item.quantity.toString(),
      unit_price: item.unitPrice.toString(),
      total_price: (item.quantity * item.unitPrice).toString(),
    }));
    const { error: itemsError } = await supabase.from("quote_items").insert(items);
    if (itemsError) {
      console.error("Error creating quote items:", itemsError);
      throw new Error(`Erro ao criar itens: ${itemsError.message}`);
    }
  }

  revalidatePath("/quotes");
  redirect(`/quotes/${newQuote?.id}`);
}

export async function getQuoteDetail(id: number): Promise<Quote | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from("quotes")
    .select("*, clients(*), companies(*), quote_items(*)")
    .eq("id", id)
    .single();
  return (data as Quote) || null;
}

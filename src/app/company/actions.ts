"use server";

import { supabase } from "@/db";
import { revalidatePath } from "next/cache";

export type Company = {
  id: number;
  name: string;
  cnpj: string;
  address: string;
  cep: string;
  city: string;
  email: string;
  phone: string;
  created_at: string;
};

export async function saveCompany(formData: FormData) {
  if (!supabase) throw new Error("Banco de dados não configurado.");

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const cnpj = formData.get("cnpj") as string;
  const address = formData.get("address") as string;
  const cep = formData.get("cep") as string;
  const city = formData.get("city") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (id) {
    await supabase.from("companies").update({ name, cnpj, address, cep, city, email, phone }).eq("id", parseInt(id));
  } else {
    await supabase.from("companies").insert({ name, cnpj, address, cep, city, email, phone });
  }

  revalidatePath("/company");
}

export async function getCompanies(): Promise<Company[]> {
  if (!supabase) return [];
  const { data } = await supabase.from("companies").select("*").order("created_at", { ascending: false });
  return (data as Company[]) || [];
}

export async function getCompany(): Promise<Company | null> {
  if (!supabase) return null;
  const { data } = await supabase.from("companies").select("*").limit(1).single();
  return (data as Company) || null;
}

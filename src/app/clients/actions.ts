"use server";

import { supabase } from "@/db";
import { revalidatePath } from "next/cache";

export type Client = {
  id: number;
  name: string;
  address: string;
  cep: string;
  city: string;
  neighborhood: string;
  phone: string;
  created_at: string;
};

export async function getClients(): Promise<Client[]> {
  if (!supabase) return [];
  const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
  return (data as Client[]) || [];
}

export async function saveClient(formData: FormData) {
  if (!supabase) throw new Error("Banco de dados não configurado.");

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const cep = formData.get("cep") as string;
  const city = formData.get("city") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const phone = formData.get("phone") as string;

  if (id) {
    await supabase.from("clients").update({ name, address, cep, city, neighborhood, phone }).eq("id", parseInt(id));
  } else {
    await supabase.from("clients").insert({ name, address, cep, city, neighborhood, phone });
  }

  revalidatePath("/clients");
}

export async function deleteClient(id: number) {
  if (!supabase) return;
  await supabase.from("clients").delete().eq("id", id);
  revalidatePath("/clients");
}

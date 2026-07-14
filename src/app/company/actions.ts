"use server";

import { db } from "@/db";
import { companies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function saveCompany(formData: FormData) {
  if (!db) throw new Error("Banco de dados não configurado.");

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const cnpj = formData.get("cnpj") as string;
  const address = formData.get("address") as string;
  const cep = formData.get("cep") as string;
  const city = formData.get("city") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (id) {
    await db.update(companies).set({
      name, cnpj, address, cep, city, email, phone
    }).where(eq(companies.id, parseInt(id)));
  } else {
    await db.insert(companies).values({
      name, cnpj, address, cep, city, email, phone
    });
  }

  revalidatePath("/company");
}

export async function getCompany() {
  if (!db) return null;
  const result = await db.select().from(companies).limit(1);
  return result[0] || null;
}

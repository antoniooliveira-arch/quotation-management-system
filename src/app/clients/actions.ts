"use server";

import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getClients() {
  return await db.select().from(clients).orderBy(desc(clients.createdAt));
}

export async function saveClient(formData: FormData) {
  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const cep = formData.get("cep") as string;
  const city = formData.get("city") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const phone = formData.get("phone") as string;

  if (id) {
    await db.update(clients).set({
      name, address, cep, city, neighborhood, phone
    }).where(eq(clients.id, parseInt(id)));
  } else {
    await db.insert(clients).values({
      name, address, cep, city, neighborhood, phone
    });
  }

  revalidatePath("/clients");
}

export async function deleteClient(id: number) {
  await db.delete(clients).where(eq(clients.id, id));
  revalidatePath("/clients");
}

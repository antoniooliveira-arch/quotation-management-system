"use server";

import { db } from "@/db";
import { quotes, quoteItems, companies, clients } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getQuotes() {
  if (!db) return [];
  return await db.query.quotes.findMany({
    with: {
      client: true,
    },
    orderBy: desc(quotes.createdAt),
  });
}

export async function createQuote(data: {
  clientId: number;
  items: { description: string; quantity: number; unitPrice: number }[];
}) {
  if (!db) throw new Error("Banco de dados não configurado.");

  const company = await db.query.companies.findFirst();
  if (!company) {
    throw new Error("Cadastre os dados da empresa primeiro.");
  }

  const totalAmount = data.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  const [newQuote] = await db.insert(quotes).values({
    clientId: data.clientId,
    companyId: company.id,
    totalAmount: totalAmount.toString(),
  }).returning();

  for (const item of data.items) {
    await db.insert(quoteItems).values({
      quoteId: newQuote.id,
      description: item.description,
      quantity: item.quantity.toString(),
      unitPrice: item.unitPrice.toString(),
      totalPrice: (item.quantity * item.unitPrice).toString(),
    });
  }

  revalidatePath("/quotes");
  redirect(`/quotes/${newQuote.id}`);
}

export async function getQuoteDetail(id: number) {
  if (!db) return null;
  return await db.query.quotes.findFirst({
    where: eq(quotes.id, id),
    with: {
      client: true,
      company: true,
      items: true,
    },
  });
}

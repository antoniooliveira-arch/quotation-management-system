import { getClients } from "@/app/clients/actions";
import NewQuoteForm from "./NewQuoteForm";

export const dynamic = "force-dynamic";

export default async function NewQuotePage() {
  const clients = await getClients();

  return (
    <div className="p-8">
      <div className="mb-8 text-center max-w-4xl">
        <h1 className="text-3xl font-bold">Novo Orçamento</h1>
        <p className="text-slate-500">Preencha os dados abaixo para gerar um novo orçamento.</p>
      </div>
      
      <NewQuoteForm clients={clients} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveClient } from "./actions";
import { Plus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Client = {
  id: number;
  name: string;
  phone: string;
  city: string;
  neighborhood: string;
  address: string;
  cep: string;
  created_at: string;
};

export function ClientsList({ initialClients }: { initialClients: Client[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);
    try {
      await saveClient(formData);
      setMessage({ type: "success", text: "Cliente cadastrado com sucesso!" });
      const form = document.getElementById("client-form") as HTMLFormElement;
      form?.reset();
      router.refresh();
    } catch (err) {
      setMessage({ type: "error", text: "Erro ao cadastrar cliente. Verifique o banco de dados." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5" /> Novo Cliente
      </h2>

      {message && (
        <div className={`mb-4 p-3 rounded-md flex items-center gap-2 text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      <form id="client-form" action={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Nome Completo</label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">CEP</label>
            <input
              type="text"
              name="cep"
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Telefone</label>
            <input
              type="text"
              name="phone"
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Endereço</label>
          <input
            type="text"
            name="address"
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Bairro</label>
            <input
              type="text"
              name="neighborhood"
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Cidade</label>
            <input
              type="text"
              name="city"
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Cadastrando...</> : "Cadastrar Cliente"}
        </button>
      </form>
    </div>
  );
}

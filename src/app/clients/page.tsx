"use client";

import { useState } from "react";
import { getClients, saveClient } from "./actions";
import { Plus, User, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { use } from "react";

type Client = {
  id: number;
  name: string;
  phone: string;
  city: string;
  neighborhood: string;
  address: string;
  cep: string;
  createdAt: Date;
};

export default function ClientsPage({ clientsPromise }: { clientsPromise: Promise<Client[]> }) {
  const clientsList = use(clientsPromise);
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
    } catch (err) {
      setMessage({ type: "error", text: "Erro ao cadastrar cliente. Verifique o banco de dados." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Clientes</h1>
          <p className="text-slate-500">Gerencie sua lista de clientes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
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
              <div className="grid grid-cols-2 gap-4">
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
              <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Contato</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Localização</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {clientsList.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-slate-900">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{client.phone}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {client.city} - {client.neighborhood}
                    </td>
                  </tr>
                ))}
                {clientsList.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                      Nenhum cliente cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

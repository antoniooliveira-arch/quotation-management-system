"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveCompany } from "./actions";
import { Loader2, CheckCircle2, AlertCircle, Plus } from "lucide-react";

type Company = {
  id: number;
  name: string;
  cnpj: string;
  address: string;
  cep: string;
  city: string;
  email: string;
  phone: string;
};

export function CompanyForm({ company, allCompanies }: { company: Company | null; allCompanies: Company[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [editingId, setEditingId] = useState<number | null>(company?.id ?? null);

  const currentCompany = allCompanies.find((c) => c.id === editingId) ?? company;

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);
    try {
      await saveCompany(formData);
      setMessage({ type: "success", text: "Dados da empresa salvos com sucesso!" });
      router.refresh();
    } catch (err) {
      setMessage({ type: "error", text: "Erro ao salvar dados da empresa." });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleAddNew() {
    setEditingId(null);
    setMessage(null);
    const form = document.getElementById("company-form") as HTMLFormElement;
    form?.reset();
  }

  function handleEdit(c: Company) {
    setEditingId(c.id);
    setMessage(null);
  }

  return (
    <div className="space-y-6">
      {allCompanies.length > 0 && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold">Empresas Cadastradas</h2>
            <button
              type="button"
              onClick={handleAddNew}
              className="flex items-center justify-center gap-2 text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" /> Nova Empresa
            </button>
          </div>
          <div className="space-y-2">
            {allCompanies.map((c) => (
              <div
                key={c.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border transition-colors ${
                  editingId === c.id ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 truncate">{c.name}</p>
                  <p className="text-xs text-slate-500">CNPJ: {c.cnpj}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleEdit(c)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2 sm:mt-0 shrink-0"
                >
                  Editar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <form id="company-form" action={handleSubmit} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
        {message && (
          <div className={`p-3 rounded-md flex items-center gap-2 text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message.text}
          </div>
        )}

        {editingId && <input type="hidden" name="id" value={editingId} />}

        <h2 className="text-lg font-semibold">{editingId ? "Editar Empresa" : "Nova Empresa"}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Nome da Empresa</label>
            <input
              type="text"
              name="name"
              key={editingId ?? "new"}
              defaultValue={currentCompany?.name || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">CNPJ</label>
            <input
              type="text"
              name="cnpj"
              key={`cnpj-${editingId ?? "new"}`}
              defaultValue={currentCompany?.cnpj || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">CEP</label>
            <input
              type="text"
              name="cep"
              key={`cep-${editingId ?? "new"}`}
              defaultValue={currentCompany?.cep || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Endereço</label>
            <input
              type="text"
              name="address"
              key={`address-${editingId ?? "new"}`}
              defaultValue={currentCompany?.address || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Cidade</label>
            <input
              type="text"
              name="city"
              key={`city-${editingId ?? "new"}`}
              defaultValue={currentCompany?.city || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Celular / Contato</label>
            <input
              type="text"
              name="phone"
              key={`phone-${editingId ?? "new"}`}
              defaultValue={currentCompany?.phone || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              key={`email-${editingId ?? "new"}`}
              defaultValue={currentCompany?.email || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</> : editingId ? "Salvar Alterações" : "Salvar Dados da Empresa"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleAddNew}
              className="w-full sm:w-auto bg-slate-100 text-slate-700 py-2 px-4 rounded-md hover:bg-slate-200 transition-colors font-semibold"
            >
              Adicionar Outra
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

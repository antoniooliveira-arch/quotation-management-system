"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { createQuote } from "@/app/quotes/actions";
import { formatCurrency } from "@/lib/utils";

interface Client {
  id: number;
  name: string;
}

export default function NewQuoteForm({ clients }: { clients: Client[] }) {
  const [clientId, setClientId] = useState<string>("");
  const [items, setItems] = useState([{ description: "", quantity: 1, unitPrice: 0 }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  const total = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) {
      alert("Selecione um cliente");
      return;
    }
    if (items.some(item => !item.description || item.quantity <= 0)) {
      alert("Preencha todos os itens corretamente");
      return;
    }

    setIsSubmitting(true);
    try {
      await createQuote({
        clientId: parseInt(clientId),
        items,
      });
    } catch (error: any) {
      if (error?.message?.includes("NEXT_REDIRECT")) {
        throw error;
      }
      console.error(error);
      alert(error?.message || "Erro ao criar orçamento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold mb-4">Dados do Cliente</h2>
        <div>
          <label className="block text-sm font-medium text-slate-700">Selecione o Cliente</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            required
          >
            <option value="">Selecione um cliente...</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Itens do Orçamento (Produtos/Serviços)</h2>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-4 h-4" /> Adicionar Item
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-end border-b border-slate-100 pb-4">
              <div className="col-span-6">
                <label className="block text-xs font-medium text-slate-500 uppercase">Descrição</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(index, "description", e.target.value)}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
                  placeholder="Ex: Instalação de Ar Condicionado"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-500 uppercase">Qtd</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <div className="col-span-3">
                <label className="block text-xs font-medium text-slate-500 uppercase">Preço Unit.</label>
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(index, "unitPrice", parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  disabled={items.length === 1}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <div className="text-right">
            <p className="text-sm text-slate-500 uppercase font-semibold">Total Geral</p>
            <p className="text-3xl font-bold text-slate-900">{formatCurrency(total)}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isSubmitting ? "Salvando..." : "Gerar Orçamento"}
        </button>
      </div>
    </form>
  );
}

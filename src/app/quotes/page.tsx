import { getQuotes } from "./actions";
import Link from "next/link";
import { Plus, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  const quotesList = await getQuotes();

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Orçamentos</h1>
          <p className="text-slate-500 text-sm md:text-base">Histórico de orçamentos gerados.</p>
        </div>
        <Link
          href="/quotes/new"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shrink-0"
        >
          <Plus className="w-5 h-5" /> Novo Orçamento
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-500 uppercase">ID</th>
                <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Cliente</th>
                <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Data</th>
                <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Total</th>
                <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {quotesList.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 md:px-6 py-4 font-mono text-sm text-slate-500">#{quote.id.toString().padStart(4, '0')}</td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="font-medium text-slate-900">{quote.clients?.name}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-slate-600 hidden sm:table-cell">
                    {format(new Date(quote.created_at), "dd 'de' MMM, yyyy", { locale: ptBR })}
                  </td>
                  <td className="px-4 md:px-6 py-4 font-semibold text-slate-900">
                    {formatCurrency(quote.total_amount)}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <Link
                      href={`/quotes/${quote.id}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Ver <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {quotesList.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Nenhum orçamento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

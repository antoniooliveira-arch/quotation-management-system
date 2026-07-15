import { getQuoteDetail } from "../actions";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { notFound } from "next/navigation";
import { QuoteHeader } from "./QuoteHeader";

export const dynamic = "force-dynamic";

export default async function QuoteDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const quote = await getQuoteDetail(parseInt(params.id));

  if (!quote) {
    notFound();
  }

  const company = quote.companies!;
  const client = quote.clients!;
  const items = quote.quote_items || [];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <QuoteHeader quote={quote} />

      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-xl shadow-sm border border-slate-200 print:shadow-none print:border-none print:p-0">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-slate-100 pb-6 sm:pb-8 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">{company.name}</h1>
            <p className="text-sm text-slate-500">CNPJ: {company.cnpj}</p>
            <p className="text-sm text-slate-500">{company.address}, {company.cep}</p>
            <p className="text-sm text-slate-500">{company.city}</p>
            <p className="text-sm text-slate-500">{company.email} | {company.phone}</p>
          </div>
          <div className="sm:text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-300 uppercase tracking-tighter">Orçamento</h2>
            <p className="text-slate-500">Nº {quote.id.toString().padStart(4, '0')}</p>
            <p className="text-slate-500">{format(new Date(quote.created_at), "dd/MM/yyyy")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Cliente</h3>
            <p className="font-bold text-slate-900">{client.name}</p>
            <p className="text-sm text-slate-600">{client.phone}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Endereço de Entrega/Serviço</h3>
            <p className="text-sm text-slate-600">{client.address}</p>
            <p className="text-sm text-slate-600">{client.neighborhood}, {client.city}</p>
            <p className="text-sm text-slate-600">CEP: {client.cep}</p>
          </div>
        </div>

        <div className="overflow-x-auto mb-8 sm:mb-12">
          <table className="w-full mb-0 min-w-[400px]">
            <thead>
              <tr className="border-b-2 border-slate-100 text-left">
                <th className="py-3 text-xs font-bold text-slate-400 uppercase">Descrição</th>
                <th className="py-3 text-xs font-bold text-slate-400 uppercase text-center w-16">Qtd</th>
                <th className="py-3 text-xs font-bold text-slate-400 uppercase text-right w-28">Unitário</th>
                <th className="py-3 text-xs font-bold text-slate-400 uppercase text-right w-28">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 text-slate-800">{item.description}</td>
                  <td className="py-4 text-center text-slate-600">{item.quantity}</td>
                  <td className="py-4 text-right text-slate-600">{formatCurrency(item.unit_price)}</td>
                  <td className="py-4 text-right font-semibold text-slate-900">{formatCurrency(item.total_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-8 sm:mb-12">
          <div className="w-full sm:w-64">
            <div className="flex justify-between py-2 border-t-2 border-slate-900">
              <span className="font-bold text-slate-900 uppercase text-sm sm:text-base">Total do Orçamento</span>
              <span className="font-bold text-slate-900 text-lg sm:text-xl">{formatCurrency(quote.total_amount)}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-slate-100 text-center">
          <p className="font-bold" style={{ fontSize: '10pt' }}>
            AAO, contato 66-984182082
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          main { margin: 0 !important; padding: 0 !important; }
          .min-h-screen { min-height: auto !important; }
        }
      `}} />
    </div>
  );
}

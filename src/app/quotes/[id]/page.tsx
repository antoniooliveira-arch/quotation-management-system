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

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <QuoteHeader quote={quote} />

      <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-200 print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">{quote.company.name}</h1>
            <p className="text-sm text-slate-500">CNPJ: {quote.company.cnpj}</p>
            <p className="text-sm text-slate-500">{quote.company.address}, {quote.company.cep}</p>
            <p className="text-sm text-slate-500">{quote.company.city}</p>
            <p className="text-sm text-slate-500">{quote.company.email} | {quote.company.phone}</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-black text-slate-300 uppercase tracking-tighter">Orçamento</h2>
            <p className="text-slate-500">Nº {quote.id.toString().padStart(4, '0')}</p>
            <p className="text-slate-500">{format(new Date(quote.createdAt), "dd/MM/yyyy")}</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Cliente</h3>
            <p className="font-bold text-slate-900">{quote.client.name}</p>
            <p className="text-sm text-slate-600">{quote.client.phone}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Endereço de Entrega/Serviço</h3>
            <p className="text-sm text-slate-600">{quote.client.address}</p>
            <p className="text-sm text-slate-600">{quote.client.neighborhood}, {quote.client.city}</p>
            <p className="text-sm text-slate-600">CEP: {quote.client.cep}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-2 border-slate-100 text-left">
              <th className="py-3 text-xs font-bold text-slate-400 uppercase">Descrição do Produto/Serviço</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase text-center">Qtd</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase text-right">Unitário</th>
              <th className="py-3 text-xs font-bold text-slate-400 uppercase text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quote.items.map((item) => (
              <tr key={item.id}>
                <td className="py-4 text-slate-800">{item.description}</td>
                <td className="py-4 text-center text-slate-600">{item.quantity}</td>
                <td className="py-4 text-right text-slate-600">{formatCurrency(item.unitPrice)}</td>
                <td className="py-4 text-right font-semibold text-slate-900">{formatCurrency(item.totalPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end mb-12">
          <div className="w-64">
            <div className="flex justify-between py-2 border-t-2 border-slate-900">
              <span className="font-bold text-slate-900 uppercase">Total do Orçamento</span>
              <span className="font-bold text-slate-900 text-xl">{formatCurrency(quote.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-slate-100 text-center">
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

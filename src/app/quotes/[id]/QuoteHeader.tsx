"use client";

import { Printer, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { generateQuotePDF } from "@/lib/generate-pdf";

type QuoteHeaderProps = {
  quote: {
    id: number;
    createdAt: Date;
    totalAmount: string | number;
    company: {
      name: string;
      cnpj: string;
      address: string;
      cep: string;
      city: string;
      email: string;
      phone: string;
    };
    client: {
      name: string;
      phone: string;
      address: string;
      neighborhood: string;
      city: string;
      cep: string;
    };
    items: {
      description: string;
      quantity: string | number;
      unitPrice: string | number;
      totalPrice: string | number;
    }[];
  };
};

export function QuoteHeader({ quote }: QuoteHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8 no-print">
      <Link href="/quotes" className="flex items-center gap-2 text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      <div className="flex gap-2">
        <button
          onClick={() => generateQuotePDF(quote)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <Download className="w-5 h-5" /> Baixar PDF
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
        >
          <Printer className="w-5 h-5" /> Imprimir
        </button>
      </div>
    </div>
  );
}

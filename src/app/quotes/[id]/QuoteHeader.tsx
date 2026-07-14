"use client";

import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function QuoteHeader() {
  return (
    <div className="flex justify-between items-center mb-8 no-print">
      <Link href="/quotes" className="flex items-center gap-2 text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
      >
        <Printer className="w-5 h-5" /> Imprimir
      </button>
    </div>
  );
}

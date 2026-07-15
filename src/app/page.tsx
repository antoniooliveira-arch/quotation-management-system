import { supabase } from "@/db";
import Link from "next/link";
import { FileText, Users, Building2, Plus, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let quotesCount = 0;
  let clientsCount = 0;
  let totalValue = 0;
  let company = null;

  if (supabase) {
    const { count: qc } = await supabase.from("quotes").select("*", { count: "exact", head: true });
    const { count: cc } = await supabase.from("clients").select("*", { count: "exact", head: true });
    const { data: totals } = await supabase.from("quotes").select("total_amount");
    const { data: comp } = await supabase.from("companies").select("*").limit(1).single();
    quotesCount = qc || 0;
    clientsCount = cc || 0;
    totalValue = totals?.reduce((acc: number, t: { total_amount: string }) => acc + parseFloat(t.total_amount || "0"), 0) || 0;
    company = comp;
  }

  const stats = [
    { name: "Total de Orçamentos", value: quotesCount, icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Clientes Cadastrados", value: clientsCount, icon: Users, color: "text-green-600", bg: "bg-green-100" },
    { name: "Valor Total Gerado", value: formatCurrency(totalValue), icon: Building2, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Bem-vindo ao AAO Orçamentos</h1>
        <p className="text-slate-500 text-sm md:text-base">Tenha o controle total dos seus orçamentos em um só lugar.</p>
      </div>

      {!company && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">Configure os dados da sua empresa</p>
              <p className="text-sm text-amber-700">Você precisa cadastrar sua empresa para gerar orçamentos.</p>
            </div>
          </div>
          <Link href="/company" className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors text-center shrink-0">
            Configurar Agora
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`${stat.bg} ${stat.color} p-2 sm:p-3 rounded-xl shrink-0`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-500 truncate">{stat.name}</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/quotes/new"
              className="group flex flex-col p-4 bg-slate-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-slate-100"
            >
              <Plus className="w-8 h-8 mb-2 text-blue-600 group-hover:text-white" />
              <span className="font-bold">Novo Orçamento</span>
              <span className="text-sm text-slate-500 group-hover:text-blue-100">Crie um orçamento agora</span>
            </Link>
            <Link
              href="/clients"
              className="group flex flex-col p-4 bg-slate-50 rounded-xl hover:bg-green-600 hover:text-white transition-all border border-slate-100"
            >
              <Plus className="w-8 h-8 mb-2 text-green-600 group-hover:text-white" />
              <span className="font-bold">Novo Cliente</span>
              <span className="text-sm text-slate-500 group-hover:text-green-100">Cadastre um novo contato</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">Visualizar Relatórios</h2>
          <p className="text-slate-500 text-sm md:text-base mb-4 sm:mb-6">Acesse a listagem completa de todos os seus orçamentos gerados.</p>
          <Link
            href="/quotes"
            className="flex items-center gap-2 text-blue-600 font-bold hover:underline"
          >
            Ver todos os orçamentos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

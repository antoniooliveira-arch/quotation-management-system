import { db } from "@/db";
import { quotes, clients, companies } from "@/db/schema";
import { count, sum } from "drizzle-orm";
import Link from "next/link";
import { FileText, Users, Building2, Plus, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let quotesCount = { value: 0 };
  let clientsCount = { value: 0 };
  let totalValue = { value: 0 };
  let company = null;

  if (db) {
    const [qc] = await db.select({ value: count() }).from(quotes);
    const [cc] = await db.select({ value: count() }).from(clients);
    const [tv] = await db.select({ value: sum(quotes.totalAmount) }).from(quotes);
    company = await db.query.companies.findFirst();
    quotesCount = qc;
    clientsCount = cc;
    totalValue = tv;
  }

  const stats = [
    { name: "Total de Orçamentos", value: quotesCount.value, icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Clientes Cadastrados", value: clientsCount.value, icon: Users, color: "text-green-600", bg: "bg-green-100" },
    { name: "Valor Total Gerado", value: formatCurrency(totalValue.value || 0), icon: Building2, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Bem-vindo ao AAO Orçamentos</h1>
        <p className="text-slate-500">Tenha o controle total dos seus orçamentos em um só lugar.</p>
      </div>

      {!company && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full text-amber-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">Configure os dados da sua empresa</p>
              <p className="text-sm text-amber-700">Você precisa cadastrar sua empresa para gerar orçamentos.</p>
            </div>
          </div>
          <Link href="/company" className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors">
            Configurar Agora
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6">Ações Rápidas</h2>
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

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <FileText className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Visualizar Relatórios</h2>
          <p className="text-slate-500 mb-6">Acesse a listagem completa de todos os seus orçamentos gerados.</p>
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

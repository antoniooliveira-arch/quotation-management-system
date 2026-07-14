"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Building2, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Painel", href: "/", icon: LayoutDashboard },
  { name: "Orçamentos", href: "/quotes", icon: FileText },
  { name: "Clientes", href: "/clients", icon: Users },
  { name: "Empresa", href: "/company", icon: Building2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-400">AAO Orçamentos</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-slate-800">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          AAO - Sistema de Orçamentos
        </p>
      </div>
    </div>
  );
}

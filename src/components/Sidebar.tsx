"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Users, Building2, FileText, Menu, X, PlusCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Painel", href: "/", icon: LayoutDashboard },
  { name: "Orçamentos", href: "/quotes", icon: FileText },
  { name: "Clientes", href: "/clients", icon: Users },
  { name: "Empresa", href: "/company", icon: Building2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg md:hidden shadow-lg"
        aria-label="Menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={cn(
          "flex flex-col w-64 bg-slate-900 text-white min-h-screen fixed md:sticky top-0 z-40 transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
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
          <Link
            href="/company"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-green-400 hover:bg-slate-800 hover:text-green-300"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Cadastrar Empresa</span>
          </Link>
        </nav>
        <div className="px-4 pb-4">
          <button
            onClick={() => window.close()}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-red-400 hover:bg-slate-800 hover:text-red-300 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
        <div className="p-6 border-t border-slate-800">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            AAO - Sistema de Orçamentos
          </p>
        </div>
      </div>
    </>
  );
}

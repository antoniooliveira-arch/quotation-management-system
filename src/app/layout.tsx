import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AAO Orçamentos",
  description: "Sistema de gerenciamento de orçamentos AAO.",
};

import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-100 text-slate-900 antialiased flex flex-col min-h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-y-auto min-w-0">
            {children}
          </main>
        </div>
        <footer className="text-center py-2 text-slate-400 bg-slate-100 border-t border-slate-200" style={{ fontSize: '10px' }}>
          Desenvolvido pela AAO Tecnologia. 66-984182082 WhatsApp
        </footer>
      </body>
    </html>
  );
}

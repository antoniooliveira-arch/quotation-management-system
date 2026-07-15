import { getClients } from "./actions";
import { ClientsList } from "./ClientsList";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clientsList = await getClients();

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Clientes</h1>
          <p className="text-slate-500 text-sm md:text-base">Gerencie sua lista de clientes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-1">
          <ClientsList initialClients={clientsList} />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Cliente</th>
                    <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-500 uppercase hidden sm:table-cell">Contato</th>
                    <th className="px-4 md:px-6 py-3 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Localização</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {clientsList.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full shrink-0">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          </div>
                          <div className="min-w-0">
                            <span className="font-medium text-slate-900 block truncate">{client.name}</span>
                            <span className="text-xs text-slate-500 sm:hidden">{client.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-slate-600 hidden sm:table-cell">{client.phone}</td>
                      <td className="px-4 md:px-6 py-4 text-slate-600 hidden md:table-cell">
                        {client.city} - {client.neighborhood}
                      </td>
                    </tr>
                  ))}
                  {clientsList.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                        Nenhum cliente cadastrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { getCompany, saveCompany } from "./actions";

export default async function CompanyPage() {
  const company = await getCompany();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dados da Empresa</h1>
        <p className="text-slate-500">Configure os dados que aparecerão nos seus orçamentos.</p>
      </div>

      <form action={saveCompany} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
        {company?.id && <input type="hidden" name="id" value={company.id} />}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700">Nome da Empresa</label>
            <input
              type="text"
              name="name"
              defaultValue={company?.name || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700">CNPJ</label>
            <input
              type="text"
              name="cnpj"
              defaultValue={company?.cnpj || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">CEP</label>
            <input
              type="text"
              name="cep"
              defaultValue={company?.cep || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700">Endereço</label>
            <input
              type="text"
              name="address"
              defaultValue={company?.address || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Cidade</label>
            <input
              type="text"
              name="city"
              defaultValue={company?.city || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Celular / Contato</label>
            <input
              type="text"
              name="phone"
              defaultValue={company?.phone || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={company?.email || ""}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            Salvar Dados da Empresa
          </button>
        </div>
      </form>
    </div>
  );
}

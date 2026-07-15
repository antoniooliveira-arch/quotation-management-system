import { getCompanies, getCompany } from "./actions";
import { CompanyForm } from "./CompanyForm";

export const dynamic = "force-dynamic";

export default async function CompanyPage() {
  const [company, allCompanies] = await Promise.all([getCompany(), getCompanies()]);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Dados da Empresa</h1>
        <p className="text-slate-500 text-sm md:text-base">Configure os dados que aparecerão nos seus orçamentos.</p>
      </div>

      <CompanyForm company={company} allCompanies={allCompanies} />
    </div>
  );
}

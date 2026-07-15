import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type QuotePDFData = {
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

function formatCurrency(value: number | string) {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

function formatNumber(value: number | string) {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function generateQuotePDF(quote: QuotePDFData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(37, 99, 235);
  doc.text(quote.company.name, 14, 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`CNPJ: ${quote.company.cnpj}`, 14, 28);
  doc.text(`${quote.company.address}, ${quote.company.cep}`, 14, 33);
  doc.text(quote.company.city, 14, 38);
  doc.text(`${quote.company.email} | ${quote.company.phone}`, 14, 43);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(148, 163, 184);
  doc.text("ORCAMENTO", pageWidth - 14, 22, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const quoteNum = quote.id.toString().padStart(4, "0");
  const quoteDate = new Date(quote.createdAt).toLocaleDateString("pt-BR");
  doc.text(`No ${quoteNum}`, pageWidth - 14, 28, { align: "right" });
  doc.text(quoteDate, pageWidth - 14, 33, { align: "right" });

  doc.setDrawColor(226, 232, 240);
  doc.line(14, 48, pageWidth - 14, 48);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("CLIENTE", 14, 55);
  doc.text("ENDERECO DE ENTREGA/SERVICO", pageWidth / 2 + 5, 55);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(quote.client.name, 14, 61);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(quote.client.phone, 14, 66);

  doc.setTextColor(71, 85, 105);
  doc.text(quote.client.address, pageWidth / 2 + 5, 61);
  doc.text(`${quote.client.neighborhood}, ${quote.client.city}`, pageWidth / 2 + 5, 66);
  doc.text(`CEP: ${quote.client.cep}`, pageWidth / 2 + 5, 71);

  const tableData = quote.items.map((item) => [
    item.description,
    String(item.quantity),
    formatCurrency(item.unitPrice),
    formatCurrency(item.totalPrice),
  ]);

  autoTable(doc, {
    startY: 78,
    head: [["Descricao do Produto/Servico", "Qtd", "Unitario", "Total"]],
    body: tableData,
    theme: "plain",
    headStyles: {
      fillColor: [248, 250, 252],
      textColor: [148, 163, 184],
      fontSize: 8,
      fontStyle: "bold",
      halign: "left",
    },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { halign: "center", cellWidth: 20 },
      2: { halign: "right", cellWidth: 35 },
      3: { halign: "right", cellWidth: 35 },
    },
    styles: {
      fontSize: 9,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 14 - 60, finalY + 8, pageWidth - 14, finalY + 8);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("TOTAL", pageWidth - 14 - 60, finalY + 15);
  doc.setFontSize(14);
  doc.text(formatNumber(quote.totalAmount), pageWidth - 14, finalY + 15, { align: "right" });

  doc.save(`orcamento-${quoteNum}.pdf`);
}

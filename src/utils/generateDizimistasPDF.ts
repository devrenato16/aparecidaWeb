// src/utils/generateDizimistasPDF.ts
import jsPDF from "jspdf";

export const generateDizimistasPDF = (formData: any, filename: string) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 30;

const formatDate = (date: any): string => {
  let parsedDate: Date;

  if (date instanceof Date) {
    parsedDate = date;
  } else if (typeof date === "string") {
    parsedDate = new Date(date);
  } else if (typeof date === "number") {
    parsedDate = new Date(date * 1000); // timestamp em segundos
  } else if (date && typeof date === "object" && "seconds" in date) {
    parsedDate = new Date(date.seconds * 1000); // Firebase Timestamp-like
  } else {
    return "Data inválida";
  }

  if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
    return "Data inválida";
  }

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
};

  // Função auxiliar para adicionar campo
  const addField = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, margin + 51, y);
    y += 7;
  };

  // Cabeçalho
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 75, 145); // Cor azul escuro
  doc.text("Paróquia Nossa Senhora Aparecida", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Ficha de Dizimista", pageWidth / 2, 27, { align: "center" });

  doc.setDrawColor(200, 200, 200);
  doc.line(margin, 31, pageWidth - margin, 31);

  y = 40;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Dados do Dizimista", margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // Campos do formulário
  addField("Nome completo", formData.fullName || "Não informado");
  addField("Data de Nascimento", formatDate(formData.birthdate));
  addField("Sexo", formatGender(formData.availableSex));
  addField("Estado Civil", formatMaritalStatus(formData.availableState));
  addField("Telefone", formData.phone || "Não informado");
  addField("Endereço", formData.address || "Não informado");
  addField("Comunidade", formData.community || "Não informado");

  // Termo de compromisso
  y += 15;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Termo de Compromisso", margin, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const termoText = `Eu, ${formData.fullName || "______"}, a observar e motivar a participação do meu filho(a) nos ENCONTROS DE FORMAÇÕES DA CATEQUESE, NECESSÁRIOS PARA O MESMO(A) RECEBER O SACRAMENTO DA PRIMEIRA EUCARISTIA, e estou consciente que faltando a esses COMPROMISSOS, NÃO poderá receber o SACRAMENTO.`;

  const splitText = doc.splitTextToSize(termoText, 170);
  splitText.forEach((line) => {
    doc.text(line, margin, y);
    y += 7;
  });

 
  // Data da inscrição
y += 15;
const dataInscricao = formatDate(formData.createdAt);
doc.setFont("helvetica", "bold");
doc.text("Data da Inscrição:", pageWidth - margin - 50, y);
doc.setFont("helvetica", "normal");
doc.text(dataInscricao, pageWidth - margin, y, { align: "right" });

  // Rodapé
  y = 280;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Documento gerado automaticamente pela Paróquia Nossa Senhora Aparecida.",
    pageWidth / 2,
    y,
    { align: "center" }
  );

  // Salva o PDF
  doc.save(filename);
};

// Funções auxiliares
const formatGender = (gender: string): string => {
  switch (gender) {
    case "masculino":
      return "Masculino";
    case "feminino":
      return "Feminino";
    case "naoinformar":
      return "Prefere não informar";
    default:
      return "Não informado";
  }
};

const formatMaritalStatus = (status: string): string => {
  switch (status) {
    case "solteiro":
      return "Solteiro(a)";
    case "casado":
      return "Casado(a)";
    case "divorciado":
      return "Divorciado(a)";
    case "uniaoestavel":
      return "União Estável";
    default:
      return "Não informado";
  }
};
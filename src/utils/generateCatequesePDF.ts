// utils/generateCatequesePDF.ts
import jsPDF from 'jspdf';

export const generateCatequesePDF = (formData: any, filename: string) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 30;

  // Helpers
  const formatDate = (date: string | Date) => {
    if (!date) return "Data inválida";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "Data inválida" : d.toLocaleDateString('pt-BR');
  };

  const timeMap: Record<string, string> = {
    sab_9h30: "Matriz de Aparecida, 7h30 - 9h00",
    sab_11h30: "Matriz de Aparecida, 9h30 - 11h00",
    "sab_ 15h00": "Matriz de Aparecida, 13h00 - 15h00",
    sab_9h30_2: "Capela São Sebastião, 8h00 - 10h00",
    sab_11h30_2: "Capela São Pedro e São Paulo, 16h00 - 18h00"
  };

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
  doc.setTextColor(0, 75, 145);
  doc.text("Paróquia Nossa Senhora Aparecida", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Ficha de Inscrição - Catequese", pageWidth / 2, 27, { align: "center" });

  doc.setDrawColor(200, 200, 200);
  doc.line(margin, 31, pageWidth - margin, 31);

  y = 40;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Dados da Criança", margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // Campos do formulário
  addField("Nome completo", formData.name || "Não informado");
  addField("Data de nascimento", formatDate(formData.birthdate));
  addField("Telefone do responsável", formData.phone || "Não informado");
  addField("Nome do Pai", formData.fatherName || "Não informado");
  addField("Nome da Mãe", formData.motherName || "Não informado");
  addField("Endereço", formData.address || "Não informado");
  addField("Comunidade", formData.community || "Não informado");
  addField("Série Escolar", formData.schooling || "Não informado");
  addField("Fez Primeira Eucaristia?", formData.firstEucharist === "sim" ? "Sim" : "Não");

  // Necessidades especiais
  const specialNeedsValue = formData.specialNeeds === "sim" ? "Sim" : "Não";
  const splitSpecialNeeds = doc.splitTextToSize(specialNeedsValue, 170);
  doc.setFont("helvetica", "bold");
  doc.text("Possui necessidade especial:", margin, y);
  doc.setFont("helvetica", "normal");
  splitSpecialNeeds.forEach((line, index) => {
    doc.text(line, margin + 51, y + index * 7);
  });
  y += 7 * splitSpecialNeeds.length;

  // Horário disponível
  const timeValue =
    timeMap[formData.availableTime] ||
    formData.availableTime ||
    "Não informado";
  addField("Horário Disponível", timeValue);

  // Termo de compromisso
  y += 15;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Termo de Compromisso", margin, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const termoText = `Eu, ${formData.termName || "______"}, a observar e motivar a participação do meu filho(a) nos ENCONTROS DE FORMAÇÕES DA CATEQUESE, NECESSÁRIOS PARA O MESMO(A) RECEBER O SACRAMENTO DA PRIMEIRA EUCARISTIA, e estou consciente que faltando a esses COMPROMISSOS, NÃO poderá receber o SACRAMENTO.`;

  const splitText = doc.splitTextToSize(termoText, 170);
  splitText.forEach((line) => {
    doc.text(line, margin, y);
    y += 7;
  });

  // Data da inscrição
  y += 10;
  const today = new Date();
  addField("Data da Inscrição", today.toLocaleDateString('pt-BR'));

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

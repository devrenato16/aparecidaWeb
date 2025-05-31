import jsPDF from 'jspdf';

export const generateBatismPDF = (formData: any, filename: string) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 30;

  // Helper melhorado para evitar erro de fuso horário
  const formatDate = (date: string | Date): string => {
    if (!date) return "Data inválida";

    let parsedDate: Date;

    if (typeof date === 'string') {
      const [year, month, day] = date.split('-').map(Number);
      if (year && month && day) {
        parsedDate = new Date(year, month - 1, day); // Mês começa em 0
      } else {
        parsedDate = new Date(date);
      }
    } else {
      parsedDate = date;
    }

    if (isNaN(parsedDate.getTime())) return "Data inválida";

    return parsedDate.toLocaleDateString('pt-BR'); // Formato brasileiro
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
  addField("Data de Nascimento", formatDate(formData.birthdate));
  addField("Telefone do responsável", formData.phone || "Não informado");
  addField("Nome do Pai", formData.fatherName || "Não informado");
  addField("Nome da Mãe", formData.motherName || "Não informado");
  addField("Nome do Padrinho", formData.godfatherName || "Não informado");
  addField("Nome da Madrinha", formData.godmotherName || "Não informado");
  addField("Data de Batismo", formatDate(formData.baptismDate));
  addField("Data da Reunião", formatDate(formData.meetingDate));
  addField("Observações", formData.observations || "Não informado");

  // Data da inscrição
  y += 15;
  const today = new Date().toLocaleDateString('pt-BR');
  doc.setFont("helvetica", "bold");
  doc.text("Data da Inscrição:", pageWidth - margin - 60, y);
  doc.setFont("helvetica", "normal");
  doc.text(today, pageWidth - margin - 10, y, { align: "right" });

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
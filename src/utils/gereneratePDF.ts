import jsPDF from 'jspdf';
import { formatBirthDate } from './dateUtils';

export const generatePDF = (registration: any, filename: string) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  // Configurações do documento
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20; // Margem lateral
  let y = 30; // Posição inicial vertical

  // Função auxiliar para formatar data
  const formatDate = (date: Date | { seconds: number } | string) => {
    if (!date) return 'Data inválida';
    if (typeof date === 'string') {
      const d = new Date(date);
      return isNaN(d.getTime()) ? 'Data inválida' : d.toLocaleDateString('pt-BR');
    }
    if (date instanceof Date) return date.toLocaleDateString('pt-BR');
    return new Date(date.seconds * 1000).toLocaleDateString('pt-BR');
  };

  // Mapeamentos
  const schoolingMap: Record<string, string> = {
    fundamental_incompleto: 'Ensino Fundamental Incompleto',
    fundamental_completo: 'Ensino Fundamental Completo',
    medio_incompleto: 'Ensino Médio Incompleto',
    medio_completo: 'Ensino Médio Completo',
    superior_incompleto: 'Ensino Superior Incompleto',
    superior_completo: 'Ensino Superior Completo',
    pos_graduacao: 'Pós-graduação',
    mestrado: 'Mestrado',
    doutorado: 'Doutorado',
  };

  const maritalStatusMap: Record<string, string> = {
    casado: 'Casado(a)',
    moraJunto: 'Mora junto',
    solteiro: 'Solteiro(a)',
  };

  const timeMap: Record<string, string> = {
    sab_9h30: "Sábado, 9h30 - 11h00",
    sab_11h30: "Sábado, 11h30 - 13h00",
    sab_15h00: "Sábado, 15h00 - 16h30",
  };

  // Cabeçalho
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 75, 145); // Azul escuro
  doc.text("Paróquia Nossa Senhora Aparecida", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Ficha de Inscrição - Crisma Jovem", pageWidth / 2, 27, { align: "center" });

  // Linha divisória
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, 31, pageWidth - margin, 31);

  // Dados Pessoais
  y = 40;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Dados Pessoais", margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const addField = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, margin, y); // Formato simples com um único :
    doc.setFont("helvetica", "normal");
    doc.text(value, margin + 50, y); // Ajuste a posição horizontal
    y += 7;
  };

  addField("Nome completo", registration.name || "Não informado");
  addField("Telefone", registration.phone || "Não informado");
  addField("Data de Nascimento", formatBirthDate(registration.birthdate) || "Não informado");
  addField("Naturalidade", registration.birthplace || "Não informado");
  addField("Endereço", registration.address || "Não informado");
  addField("Nome do Pai", registration.fatherName || "Não informado");
  addField("Nome da Mãe", registration.motherName || "Não informado");
  addField("Comunidade", registration.community || "Não informado");
  addField(
    "Escolaridade",
    schoolingMap[registration.schooling] || "Não informado"
  );
  addField(
    "Participa de algum grupo?",
    registration.groupParticipation || "Não informado"
  );
  addField(
    "É Batizado?",
    registration.isBaptized === "sim" ? "Sim" : "Não"
  );
  addField(
    "Fez a Primeira Eucaristia?",
    registration.firstEucharist === "sim" ? "Sim" : "Não"
  );

  // Campo "Possui necessidade especial?"
  const specialNeedsValue = registration.specialNeeds || "Não informado";
  const splitSpecialNeeds = doc.splitTextToSize(specialNeedsValue, 170); // Quebra automática
  doc.setFont("helvetica", "bold");
  doc.text("Possui necessidade especial?:", margin, y);
  doc.setFont("helvetica", "normal");
  splitSpecialNeeds.forEach((line, index) => {
    doc.text(line, margin + 52, y + index * 7); // Adiciona linha por linha
  });
  y += 7 * splitSpecialNeeds.length; // Ajusta y com base no número de linhas

  addField(
    "Estado Civil",
    maritalStatusMap[registration.maritalStatus] || "Não informado"
  );
  addField(
    "Horário disponível",
    timeMap[registration.availableTime] || "Não informado"
  );
  addField("Quem é Jesus para você?", registration.jesusAnswer || "Não informado");

  // Espaço maior entre seções
  y += 15;

  // Termo de Compromisso
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Termo de Compromisso", margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const termoText = `Eu, ${
    registration.name || "______"
  }, comprometo-me a participar dos ENCONTROS DE FORMAÇÕES NECESSÁRIOS PARA RECEBER O SACRAMENTO DA CRISMA E PARTICIPAR DA MISSA DOMINICAL e estou consciente que faltando a esses COMPROMISSOS, NÃO poderei ser crismado(a)!`;

  const splitText = doc.splitTextToSize(termoText, 170); // Quebra automática
  splitText.forEach((line) => {
    doc.text(line, margin, y);
    y += 7;
  });

  // Espaço maior entre seções
  y += 15;

  // Data da Inscrição
  addField("Data da Inscrição", formatDate(registration.createdAt));

  // Rodapé
  y = 280;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Documento gerado automaticamente pela Paróquia Nossa Senhora Aparecida.", pageWidth / 2, y, { align: "center" });

  // Salva o PDF
  doc.save(filename);
};
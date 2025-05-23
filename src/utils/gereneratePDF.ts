import jsPDF from 'jspdf';

export const generatePDF = (registration: any, filename: string) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  // Função auxiliar para formatar data
  const formatDate = (date: Date | { seconds: number }) => {
    if (!date) return 'Data inválida';
    if (date instanceof Date) return date.toLocaleDateString('pt-BR');
    return new Date(date.seconds * 1000).toLocaleDateString('pt-BR');
  };

  // Mapeia schooling para exibição mais legível
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

  // Mapeia maritalStatus
  const maritalStatusMap: Record<string, string> = {
    casado: 'Casado(a)',
    moraJunto: 'Mora junto',
    solteiro: 'Solteiro(a)',
  };

  let y = 20;

  // Cabeçalho
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Dados da Inscrição", 105, y, { align: "center" });
  y += 10;

  // Dados gerais
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  const addField = (label: string, value: string) => {
    doc.text(`${label} ${value}`, 20, y);
    y += 7;
  };

  addField("Nome completo:", registration.name || "Não informado");
  addField("Telefone:", registration.phone || "Não informado");
  addField("Data de Nascimento:", registration.birthdate || "Não informado");
  addField("Naturalidade:", registration.birthplace || "Não informado");
  addField("Endereço:", registration.address || "Não informado");
  addField("Nome do Pai:", registration.fatherName || "Não informado");
  addField("Nome da Mãe:", registration.motherName || "Não informado");
  addField("Comunidade:", registration.community || "Não informado");
  addField(
    "Escolaridade:",
    schoolingMap[registration.schooling] || "Não informado"
  );
  addField(
    "Participa de algum grupo?:",
    registration.groupParticipation || "Não informado"
  );
  addField(
    "É Batizado?:",
    registration.isBaptized === "sim" ? "Sim" : "Não"
  );
  addField(
    "Fez a Primeira Eucaristia?:",
    registration.firstEucharist === "sim" ? "Sim" : "Não"
  );
  addField(
    "Possui necessidade especial?:",
    registration.specialNeeds || "Não informado"
  );
  addField(
    "Estado Civil:",
    maritalStatusMap[registration.maritalStatus] || "Não informado"
  );
  addField("Horário disponível:", "Sexta-feira, 19h30 - 21h");
  addField("Quem é Jesus para você?:", registration.jesusAnswer || "Não informado");

  y += 10;

  // Termo de Compromisso
  doc.setFont("helvetica", "bold");
  addField("Termo de Compromisso:", "");
  doc.setFont("helvetica", "normal");

  const termoText = `Eu, ${
    registration.name || "______"
  }, comprometo-me a participar dos ENCONTROS DE FORMAÇÕES NECESSÁRIOS PARA RECEBER O SACRAMENTO DA CRISMA E PARTICIPAR DA MISSA DOMINICAL e estou consciente que faltando a esses COMPROMISSOS, NÃO poderei ser crismado(a)!`;

  const splitText = doc.splitTextToSize(termoText, 170); // Quebra automática
  splitText.forEach((line) => {
    doc.text(line, 20, y);
    y += 7;
  });

  y += 10;

  // Data da inscrição
  addField("Data da Inscrição:", formatDate(registration.createdAt));

  // Salva o PDF
  doc.save(filename);
};
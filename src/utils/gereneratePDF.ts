import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Gera um PDF com os dados do registro
 * @param registration - Dados do registro
 * @param filename - Nome do arquivo PDF
 */
export const generatePDF = (registration: any, filename: string) => {
  // Cria um elemento temporário para renderizar os dados
  const content = document.createElement('div');
  content.style.padding = '20px';
  content.style.maxWidth = '800px';
  content.style.margin = 'auto';
  content.style.backgroundColor = 'white';
  content.style.fontFamily = 'sans-serif';

  content.innerHTML = `
    <h3 style="text-align:center; font-weight:bold; margin-bottom:20px;">Dados da Inscrição</h3>
    <p><strong>Nome:</strong> ${registration.name || ''}</p>
    <p><strong>Email:</strong> ${registration.email || ''}</p>
    <p><strong>Telefone:</strong> ${registration.phone || ''}</p>
    <p><strong>Data de Nascimento:</strong> ${registration.birthdate || ''}</p>
    <p><strong>Endereço:</strong> ${registration.address || ''}</p>
    <p><strong>Tipo:</strong> ${registration.formType || ''}</p>
    <p><strong>Data da Inscrição:</strong> ${
      registration.createdAt instanceof Date
        ? registration.createdAt.toLocaleDateString()
        : new Date(registration.createdAt.seconds * 1000).toLocaleDateString()
    }</p>

    ${registration.parentName ? `<p><strong>Pais:</strong> ${registration.parentName}</p>` : ''}
    ${registration.godparentName ? `<p><strong>Padrinhos:</strong> ${registration.godparentName}</p>` : ''}
    ${registration.partnerName ? `<p><strong>Noivo(a):</strong> ${registration.partnerName}</p>` : ''}
    ${registration.notes ? `<p><strong>Observações:</strong> ${registration.notes}</p>` : ''}
  `;

  // Adiciona o elemento temporário ao DOM
  document.body.appendChild(content);

  // Gera o PDF após um pequeno delay para garantir a renderização
  setTimeout(() => {
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);

      // Remove o elemento temporário do DOM
      document.body.removeChild(content);
    });
  }, 100); // Pequeno delay para renderizar o conteúdo
};
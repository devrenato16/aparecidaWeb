export const formatDate = (date: any): string => {
  if (!date) return 'Data inválida';

  // Se for Timestamp do Firestore
  if (typeof date === 'object' && 'seconds' in date && 'nanoseconds' in date) {
    return new Date(date.seconds * 1000).toLocaleDateString('pt-BR');
  }

  // Se for objeto Date
  if (date instanceof Date) {
    return date.toLocaleDateString('pt-BR');
  }

  // Se for string ISO
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  return 'Formato inválido';
  
};

// utils/date.ts (ou no topo do seu arquivo do modal)
export function formatBirthDate(dateString: string): string {
  if (!dateString) return 'Data inválida';

  const parts = dateString.split('-');
  if (parts.length !== 3) return 'Data inválida';

  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);

  const date = new Date(year, month, day);

  return date.toLocaleDateString('pt-BR');
}

// Filtro dizimistas por data
export function parseDate(value: any): Date | null {
  if (!value) return null;

  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else if (typeof value?.toDate === "function") {
    date = value.toDate();
  } else if (typeof value === "string" || typeof value === "number") {
    date = new Date(value);
  } else {
    return null;
  }

  if (isNaN(date.getTime())) return null;

  // Retorna nova Date só com ano, mês e dia (zero hora UTC)
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

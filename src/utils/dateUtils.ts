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
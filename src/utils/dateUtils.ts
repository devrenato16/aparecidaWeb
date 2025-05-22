// utils/dateUtils.ts
export const formatDate = (date: Date | any) => {
  if (date instanceof Date) {
    return date.toLocaleDateString("pt-BR");
  }
  return new Date(date.seconds * 1000).toLocaleDateString("pt-BR");
};
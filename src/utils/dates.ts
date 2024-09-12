export const formatDateToBrazilian = (
  timestamp: string | number | Date
): string => {
  let date: Date;

  if (typeof timestamp === "string") {
    date = new Date(timestamp);
  } else {
    date = new Date(timestamp);
  }

  const formattedDate = date.toLocaleDateString("pt-BR", { timeZone: "UTC" });

  return formattedDate;
};

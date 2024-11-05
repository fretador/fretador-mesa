import { format } from "date-fns";

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

export const dateNow = () => {
	// Obter a data atual
	const now = new Date();

	// Ajustar a data para o fuso horário de São Paulo
	const saoPauloDate = new Date(now.getTime());

	// Formatar a data no formato ISO 8601 com o offset de fuso horário
	const formattedDate = format(saoPauloDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

	return formattedDate;
};

export const formatDateTime = (dateString: string) => {
	const dateObject = new Date(dateString);

	// Verifica se a data é inválida
	if (isNaN(dateObject.getTime())) {
		return "N/A";
	}

	const formattedDate = dateObject.toLocaleDateString("pt-BR");
	const formattedTime = dateObject.toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return `${formattedDate} - ${formattedTime}`;
};

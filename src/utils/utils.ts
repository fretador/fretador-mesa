// Função para extrair o estado de uma string no formato "Cidade, Estado"
export const extractState = (location: string | undefined) => {
	if (!location) return "Não informada";
	const parts = location.split(",");
	if (parts.length < 2) return "Não informada";
	return parts[1].trim() || "Não informada";
};

// Função para separar "Cidade, Estado"
export const splitCityState = (origin: string | undefined) => {
	if (!origin) return { city: "", state: "" };
	const [city, state] = origin.split(",").map((item) => item.trim());
	return { city: city || "", state: state || "" };
};

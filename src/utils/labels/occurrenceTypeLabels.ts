import { OccurrenceType } from "@/utils/enums/occurrenceTypeEnum";

export const occurrenceTypeLabels: {
	[key in keyof typeof OccurrenceType]: string;
} = {
	ADMINISTRATIVE: "Administrativo",
	COMPLAINT: "Reclamação",
	COMPLIMENT: "Elogio",
	FREIGHT_CANCELLATION: "Cancelamento de Frete",
	GENERAL_CHANGES: "Alterações Gerais",
	OTHERS: "Outros",
	ROUTE_CHANGE: "Mudança de Rota",
	ROUTE_PROBLEM: "Problema de Rota",
	SCHEDULE_CHANGE: "Mudança de Horário",
	TECHNICAL: "Problemas Técnicos",
	VEHICLE_PROBLEM: "Problema de Veículo",
};

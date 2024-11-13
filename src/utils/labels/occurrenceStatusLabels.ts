import { OccurrenceStatus } from "@/utils/enums/occurrenceStatusEnum";

export const occurrenceStatusLabels: {
	[key in keyof typeof OccurrenceStatus]: string;
} = {
	CLOSED: "Fechada",
	IN_PROGRESS: "Em progresso",
	RESOLVED: "Resolvida",
	UNRESOLVED: "Não resolvida",
};

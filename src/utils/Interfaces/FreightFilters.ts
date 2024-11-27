import { FreightStatus } from "@/utils/enums/freightStatusEnum";

export interface FreightFilters {
	deliveryCity?: string;
	gatheringCity?: string;
	status?: FreightStatus[];
	searchTerm?: string;
}

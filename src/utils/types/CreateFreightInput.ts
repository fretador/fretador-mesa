import { FreightType } from "./Enums"

export interface CreateFreightInput {
	OSCode: string | null;
	numCte: string | null;
	gatheringState: string;
	deliveryState: string;
	clientName: string | null;
	freightType: FreightType;
	driver: string | null;
	value: number | null;
}

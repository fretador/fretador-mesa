import { OccurrenceStatus } from "../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../enums/occurrenceTypeEnum";

export interface OccurrenceFilterInput {
	occurrenceStatus?: OccurrenceStatus;
	type?: OccurrenceType;
	occurrenceType?: OccurrenceType;
	searchTerm?: string;
}

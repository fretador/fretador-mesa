import { OccurrenceStatus } from "../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../enums/occurrenceTypeEnum";

export interface OccurrenceFilterInput {
<<<<<<< HEAD
=======
	status?: OccurrenceStatus;
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
	occurrenceStatus?: OccurrenceStatus;
	type?: OccurrenceType;
	occurrenceType?: OccurrenceType;
	searchTerm?: string;
}

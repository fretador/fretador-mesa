import { OccurrenceStatus } from "../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../enums/occurrenceTypeEnum";
import { Message } from "./Message";
import { File } from "./File";

export interface UpdateOccurrenceInput {
	active?: boolean;
	messages?: Message[];
	status?: OccurrenceStatus;
	type?: OccurrenceType;
	updateAcknowledge?: boolean;
	files?: File[];
}

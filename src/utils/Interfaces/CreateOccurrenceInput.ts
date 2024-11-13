import { OccurrenceStatus } from "../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../enums/occurrenceTypeEnum";
import { Message } from "./Message";
import { File } from "./File";

export interface CreateOccurrenceInput {
	active?: boolean;
	messages?: Message[];
	status?: OccurrenceStatus;
	type?: OccurrenceType;
	userId: string;
	updateAcknowledge?: boolean;
	files?: File[];
}

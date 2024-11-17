import { OccurrenceStatus } from "../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../enums/occurrenceTypeEnum";
import { Message } from "./Message";
import { Attachment } from "./Attachment";

export interface UpdateOccurrenceInput {
	active?: boolean;
	messages?: Message[];
	occurrenceStatus?: OccurrenceStatus;
	type?: OccurrenceType;
	updateAcknowledge?: boolean;
	attachments?: Attachment[];
}

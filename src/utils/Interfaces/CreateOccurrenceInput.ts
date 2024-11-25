import { OccurrenceStatus } from "../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../enums/occurrenceTypeEnum";
import { Message } from "./Message";
import { Attachment } from "./Attachment";

export interface CreateOccurrenceInput {
	active?: boolean;
	messages?: Message[];
	occurrenceStatus?: OccurrenceStatus;
	type?: OccurrenceType;
	userId: string;
	updateAcknowledge?: boolean;
	attachments?: Attachment[];
}

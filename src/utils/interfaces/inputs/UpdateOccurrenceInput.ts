import { OccurrenceStatus } from "../../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../../enums/occurrenceTypeEnum";
import { Message } from "../Message";
import { Attachment } from "../Attachment";
import { BoardUser } from "../BoardUser";

export interface UpdateOccurrenceInput {
	active?: boolean;
	messages?: Message[];
	occurrenceStatus?: OccurrenceStatus;
	type?: OccurrenceType;
	updateAcknowledge?: boolean;
	attachments?: Attachment[];
	boardUser?: BoardUser;
}

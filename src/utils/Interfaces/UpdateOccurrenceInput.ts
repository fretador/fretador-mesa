import { OccurrenceStatus } from "../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../enums/occurrenceTypeEnum";
import { Message } from "./Message";
<<<<<<< HEAD
import { Attachment } from "./Attachment";
=======
import { File } from "./File";
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c

export interface UpdateOccurrenceInput {
	active?: boolean;
	messages?: Message[];
<<<<<<< HEAD
	occurrenceStatus?: OccurrenceStatus;
	type?: OccurrenceType;
	updateAcknowledge?: boolean;
	attachments?: Attachment[];
=======
	status?: OccurrenceStatus;
	type?: OccurrenceType;
	updateAcknowledge?: boolean;
	files?: File[];
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
}

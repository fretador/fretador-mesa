import { OccurrenceStatus } from "../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../enums/occurrenceTypeEnum";
import { Message } from "./Message";
<<<<<<< HEAD
import { Attachment } from "./Attachment";
=======
import { File } from "./File";
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c

export interface CreateOccurrenceInput {
	active?: boolean;
	messages?: Message[];
<<<<<<< HEAD
	occurrenceStatus?: OccurrenceStatus;
	type?: OccurrenceType;
	userId: string;
	updateAcknowledge?: boolean;
	attachments?: Attachment[];
=======
	status?: OccurrenceStatus;
	type?: OccurrenceType;
	userId: string;
	updateAcknowledge?: boolean;
	files?: File[];
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
}

import { OccurrenceStatus } from "../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../enums/occurrenceTypeEnum";
import { Message } from "./Message";
<<<<<<< HEAD
import { Attachment } from "./Attachment";
=======
import { File } from "./File";
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c

export interface Occurrence {
	_id?: string;
	id: string;
	active: boolean;
	creationDate: string; // ISO Date string
	updateDate: string; // ISO Date string
	messages: Message[];
<<<<<<< HEAD
	occurrenceStatus?: OccurrenceStatus;
=======
	status: OccurrenceStatus;
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
	type: OccurrenceType;
	occurrenceType: OccurrenceType;
	userId: string;
	updateAcknowledge: boolean;
<<<<<<< HEAD
	attachments: Attachment[];
=======
	files: File[];
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
	// Campos adicionais para o frontend
	driverName?: string;
	driverPhotoUrl?: string;
	freightCode?: string;
	freightDate?: string;
<<<<<<< HEAD
	numCte?: string;
	route?: string;
	observations?: string;
=======
	cte?: string;
	route?: string;
	attachments?: string[];
	observations?: string;
	occurrenceStatus?: string;
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
}

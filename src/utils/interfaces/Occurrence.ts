import { OccurrenceStatus } from "../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../enums/occurrenceTypeEnum";
import { Message } from "./Message";
import { Attachment } from "./Attachment";

export interface Occurrence {
	_id?: string;
	id: string;
	active: boolean;
	creationDate: string; // ISO Date string
	updateDate: string; // ISO Date string
	messages: Message[];
	occurrenceStatus?: OccurrenceStatus;
	type: OccurrenceType;
	occurrenceType: OccurrenceType;
	userId: string;
	updateAcknowledge: boolean;
	attachments: Attachment[];
	// Campos adicionais para o frontend
	driverName?: string;
	driverPhotoUrl?: string;
	freightCode?: string;
	freightDate?: string;
	numCte?: string;
	route?: string;
	observations?: string;
}

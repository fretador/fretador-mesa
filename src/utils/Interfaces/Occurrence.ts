import { OccurrenceStatus } from "../enums/occurrenceStatusEnum";
import { OccurrenceType } from "../enums/occurrenceTypeEnum";
import { Message } from "./Message";
import { File } from "./File";

export interface Occurrence {
	_id?: string;
	id: string;
	active: boolean;
	creationDate: string; // ISO Date string
	updateDate: string; // ISO Date string
	messages: Message[];
	status: OccurrenceStatus;
	type: OccurrenceType;
	occurrenceType: OccurrenceType;
	userId: string;
	updateAcknowledge: boolean;
	files: File[];
	// Campos adicionais para o frontend
	driverName?: string;
	driverPhotoUrl?: string;
	freightCode?: string;
	freightDate?: string;
	cte?: string;
	route?: string;
	attachments?: string[];
	observations?: string;
	occurrenceStatus?: string;
}

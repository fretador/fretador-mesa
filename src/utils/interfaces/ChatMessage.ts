import { SenderTypeEnum } from "../enums/SenderTypeEnum";

export interface ChatMessage {
	id: string;
	text: string;
	sender: SenderTypeEnum;
	createdAt: string;
	ticketId: string;
}

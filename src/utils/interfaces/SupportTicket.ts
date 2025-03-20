import { TicketStatusEnum } from "../enums/TicketStatusEnum";
import { ChatMessage } from "./ChatMessage";

export interface SupportTicket {
	id: string;
	subject: string;
	status: TicketStatusEnum;
	messages: ChatMessage[];
	createdAt: string;
	updatedAt: string;
	creatorId: string;
	creatorName: string;
	creatorCpf: string;
	creatorPhotoUr: string;
}

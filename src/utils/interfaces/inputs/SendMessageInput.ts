import { SenderTypeEnum } from "@/utils/enums/SenderTypeEnum";

export interface SendMessageInput {
	ticketId: string;
	text: string;
	sender: SenderTypeEnum;
}

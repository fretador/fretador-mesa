import { StatusDocumentEnum } from "../enums/statusDocumentEnum";

export interface DocumentInput {
	name: string;
	type: string;
	url: string;
	sender: string;
	message?: string;
	status?: StatusDocumentEnum;
}

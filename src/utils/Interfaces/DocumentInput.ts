import { FreightDocumentTypeEnum } from "../enums/freightDocumentTypeEnum";
import { StatusDocumentEnum } from "../enums/statusDocumentEnum";

export interface DocumentInput {
	name: string;
	type: FreightDocumentTypeEnum;
	url: string;
	sender: string;
	message?: string;
	status?: StatusDocumentEnum;
}

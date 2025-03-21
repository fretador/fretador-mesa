import { FreightDocumentTypeEnum } from "@/utils/enums/freightDocumentTypeEnum";
import { StatusDocumentEnum } from "../enums/statusDocumentEnum";

export interface Document {
	id: string;
	name: string;
	type: FreightDocumentTypeEnum;
	url: string;
	sender: string;
	message: string;
	dateOfSubmission: string;
	status: StatusDocumentEnum;
	lastUpdated: string;
}

import { StatusDocumentEnum } from "../enums/statusDocumentEnum";
import { UpdateDataTypeEnum } from "../enums/updateDataTypeEnum";

export interface Document {
	id: string;
	name: string;
	type: UpdateDataTypeEnum;
	url: string;
	sender: string;
	message: string;
	dateOfSubmission: string;
	status: StatusDocumentEnum;
	lastUpdated: string;
}

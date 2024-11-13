import { UpdateDataTypeEnum } from "../enums/updateDataTypeEnum";

export interface DocumentInput {
	name: string;
	type: string;
	url: string;
	sender: string;
	message?: string;
}

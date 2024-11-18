import { UpdateDataTypeEnum } from "../enums/updateDataTypeEnum";

export interface StatusHistoryItem {
	status: string;
	updateDate: string;
	updateDataType: UpdateDataTypeEnum;
	updateData: JSON;
}

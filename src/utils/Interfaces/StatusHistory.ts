import { UpdateDataTypeEnum } from "../enums/updateDataTypeEnum";
import { UpdateData} from "./UpdateData";

export interface StatusHistoryItem {
	status: string;
	updateDate: string;
	updateDataType: UpdateDataTypeEnum;
	updateData: UpdateData;
}

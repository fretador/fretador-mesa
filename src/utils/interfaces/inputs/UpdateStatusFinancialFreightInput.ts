import { FreightStatus } from "../../enums/freightStatusEnum";
import { UpdateDataTypeEnum } from "../../enums/updateDataTypeEnum";
import { UpdateData } from "../UpdateData";

export interface UpdateStatusFinancialFreightInput {
	status: FreightStatus;
	updateData?: UpdateData;
	updateDataType?: UpdateDataTypeEnum;
}

import { FreightStatus } from "../../enums/freightStatusEnum";
import { UpdateDataTypeEnum } from "../../enums/updateDataTypeEnum";
import { UpdateData } from "../UpdateData";

export interface UpdateStatusFreightInput {
	status: FreightStatus;
	updateData?: UpdateData;
	updateDataType?: UpdateDataTypeEnum;
}

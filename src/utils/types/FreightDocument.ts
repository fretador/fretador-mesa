import { UpdateDataTypeEnum } from "../enums/updateDataTypeEnum";

export interface FreightDocument {
  id: string;
  type: UpdateDataTypeEnum;
  name: string;
  url: string;
  dateOfSubmission: string;
}

import { StatusDocumentEnum } from "../enums/statusDocumentEnum";

export interface DocumentUpdateInput {
	id: string;
  status: StatusDocumentEnum;
  sender: string;
  message?: string;
  url?: string;
}

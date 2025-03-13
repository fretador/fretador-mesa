import { StatusDocumentEnum } from "../../enums/statusDocumentEnum";

export interface DocumentUpdateInput {
	id: string;
  url?: string;
  name?: string;
  sender: string;
  status: StatusDocumentEnum;
  message?: string;
}

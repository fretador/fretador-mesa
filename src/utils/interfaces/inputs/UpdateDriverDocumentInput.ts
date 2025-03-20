import { DriverDocumentFieldEnum } from "@/utils/enums/driverDocumentFieldEnum";
import { PhotoStatus } from "@/utils/enums/photoStatusEnums";

export interface UpdateDriverDocumentInput {
	field: DriverDocumentFieldEnum;
	imageUrl?: string;
	message?: string;
	status?: PhotoStatus;
	sender?: string;
}

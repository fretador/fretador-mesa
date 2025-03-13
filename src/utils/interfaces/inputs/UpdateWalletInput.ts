import { AccountType } from "../../enums/accountTypeEnums";
import { UpdatePhotoInput } from "./UpdatePhotoInput";

export interface UpdateWalletInput {
	cardPhoto?: UpdatePhotoInput;
	accountType?: AccountType;
	account?: string;
	agency?: string;
	bank?: string;
	pis?: string;
	accountDocument?: string;
	accountName?: string;
	bankDetails?: any;
	pix?: string;
	isPJ: boolean;
}

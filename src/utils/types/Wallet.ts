import { Photo } from "./Photo";
import { AccountType } from "@/utils/enums/accountTypeEnums";

export interface Wallet {
	cardPhoto: Photo;
	type: AccountType;
	account: string;
	agency: string;
	bank: string;
	pis: string;
	accountDocument: string;
	accountName: string;
}

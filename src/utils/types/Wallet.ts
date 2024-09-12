import { Photo } from "./Photo";
import { AccountType } from "./Enums";

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

import { Photo } from "./Photo";
import { AccountType } from "@/utils/enums/accountTypeEnums";

export interface Wallet {
	cardPhoto: Photo;
	accountType: AccountType;
	account: string;
	agency: string;
	bank: string;
	pis: string;
	accountDocument: string;
	accountName: string;
	bankDetails: any;
	pix: string;
	isPJ: boolean;
	favored: string;
	cnpj: string;
}
export interface OwnerData {
	name: string;
	cpf: string;
	cnh?: string;
	phoneNumber: string;
	email: string;
	bankName: string;
	bankAgency: string;
	bankAccount: string;
	pix: string;
	isDriverAsOwner?: boolean;
}
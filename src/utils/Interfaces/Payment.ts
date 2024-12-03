import { FreightStatus } from "../enums/freightStatusEnum";
import { paymentTypeLabels } from "../labels/paymentTypeLabels";

export interface Payment {
	id: string;
	driverName: string;
	type: keyof typeof paymentTypeLabels;
	paymentMethod: string;
	contact: string;
	numCte: string;
	status: keyof typeof FreightStatus;
	value: number;
	date: string;
	contractNumber: string;
	cpf: string;
	cnh: string;
	email: string;
	bankDetails: string;
	pix: string;
	originState: string;
	destinyState: string;
	driverPhotoUrl: string;
}
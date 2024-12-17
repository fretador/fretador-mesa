import { FreightStatus } from "../enums/freightStatusEnum";
import { paymentTypeLabels } from "../labels/paymentTypeLabels";

export interface Payment {
	// Dados do frete
	id: string;
	originState: string;
	destinyState: string;
	contractNumber: string;
	numCte: string;
	status: keyof typeof FreightStatus;
	//Dados do motorista do frete
	driverName: string;
	cpf: string;
	cnh: string;
	email: string;
	contact: string;
	driverPhotoUrl: string;
	// Dados bancarios do motorista do frete
	pix: string;
	bankDetails: string;
	paymentMethod: string;
	//Valores de pagamentos
	value: number;
	advanceValue?: number;
	balanceValue?: number;
	//Datas de pagamentos feitos
	paymentDate: string;
	advancePaymentDate?: string;
	balancePaymentDate?: string;
	// Datas de pagamentos solicitados
	paymentRequestedDate: string;
	advanceRequestedDate?: string;
	balanceRequestedDate?: string;
	//Tipo de pagamento solicitado
	type: keyof typeof paymentTypeLabels;
}
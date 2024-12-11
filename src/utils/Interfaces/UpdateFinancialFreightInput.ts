import { BoardUser } from "./BoardUser";

export interface UpdateFinancialFreightInput {
	boardUser?: BoardUser;
	paymentType?: string;
	value?: number;
	advanceValue?: number;
	balanceValue?: number;
	paymentDate?: string;
	advancePaymentDate?: string;
	balancePaymentDate?: string;
}

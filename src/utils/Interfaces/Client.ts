import { Freight } from "./Freight";
export interface Client {
	id: string;
	cnpj: string;
	corporateName: string;
	tradeName: string;
	city: string;
	state: string;
	email: string;
	whatsapp: string;
	stateRegistration: string;
	address: string;
	numberAddress: string;
	neighborhood: string;
	shipments?: Freight[];
}

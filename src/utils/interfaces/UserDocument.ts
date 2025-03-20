export type UserDocument = CPF | CNPJ;

export interface CPF {
	cpf: string;
}

export interface CNPJ {
	cnpj: string;
}

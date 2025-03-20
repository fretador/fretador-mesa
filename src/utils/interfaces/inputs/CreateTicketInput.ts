export interface CreateTicketInput {
	subject: string;
	message: string;
	creatorCpf?: string;
	creatorId?: string;
}

import { useMutation } from "@apollo/client";
import { CREATE_TICKET } from "@/graphql/operations";
import { SupportTicket } from "@/utils/interfaces/SupportTicket";
import { CreateTicketInput } from "@/utils/interfaces/inputs/CreateTicketInput";

interface CreateTicketData {
	createSupportTicket: SupportTicket;
}

interface CreateTicketVars {
	input: CreateTicketInput;
}

export const useCreateSupportTicket = () => {
	const [createTicket, { data, loading, error }] = useMutation<
		CreateTicketData,
		CreateTicketVars
	>(CREATE_TICKET, {
		refetchQueries: ["ListSupportTickets"],
		awaitRefetchQueries: true,
	});

	return {
		createTicket,
		newTicket: data?.createSupportTicket,
		creating: loading,
		error,
	};
};

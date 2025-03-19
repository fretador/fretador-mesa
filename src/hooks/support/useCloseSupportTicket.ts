import { useMutation } from "@apollo/client";
import { CLOSE_TICKET, LIST_TICKETS } from "@/graphql/operations";
import { SupportTicket } from "@/utils/interfaces/SupportTicket";

interface CloseTicketData {
	closeSupportTicket: SupportTicket;
}

interface CloseTicketVars {
	ticketId: string;
}

export const useCloseSupportTicket = () => {
	const [closeTicket, { data, loading, error }] = useMutation<
		CloseTicketData,
		CloseTicketVars
	>(CLOSE_TICKET, {
		refetchQueries: [{ query: LIST_TICKETS }],
	});

	return {
		closeTicket,
		closedTicket: data?.closeSupportTicket,
		closing: loading,
		error,
	};
};

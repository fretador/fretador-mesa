import { useQuery } from "@apollo/client";
import { GET_TICKET } from "@/graphql/operations";
import { SupportTicket } from "@/utils/interfaces/SupportTicket";
import { useTicketStatus } from "./useTicketStatus";

interface GetTicketData {
	getTicket: SupportTicket;
}

interface GetTicketVars {
	ticketId: string;
}

export const useSupportTicket = (ticketId: string) => {
	const { data, loading, error, refetch } = useQuery<
		GetTicketData,
		GetTicketVars
	>(GET_TICKET, {
		variables: { ticketId },
		skip: !ticketId,
		fetchPolicy: "cache-and-network",
	});
	const { updatedTicket } = useTicketStatus(ticketId);

	const currentTicket = updatedTicket || data?.getTicket;

	return {
		ticket: currentTicket,
		loading,
		error,
		refetch,
	};
};

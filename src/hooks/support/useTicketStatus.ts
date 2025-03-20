import { useSubscription } from "@apollo/client";
import { TICKET_STATUS_SUBSCRIPTION } from "@/graphql/operations";
import { SupportTicket } from "@/utils/interfaces/SupportTicket";

interface TicketStatusSubscriptionData {
	ticketStatusChanged: SupportTicket;
}

interface TicketStatusSubscriptionVars {
	ticketId: string;
}

export const useTicketStatus = (ticketId: string) => {
	const { data, loading, error } = useSubscription<
		TicketStatusSubscriptionData,
		TicketStatusSubscriptionVars
	>(TICKET_STATUS_SUBSCRIPTION, {
		variables: { ticketId },
		skip: !ticketId,
	});

	return {
		updatedTicket: data?.ticketStatusChanged,
		subscribing: loading,
		error,
	};
};

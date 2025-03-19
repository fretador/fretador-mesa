import { useQuery, useSubscription } from "@apollo/client";
import {
	LIST_TICKETS,
	TICKET_CREATED_SUBSCRIPTION,
  TICKET_STATUS_SUBSCRIPTION,
} from "@/graphql/operations";
import { SupportTicket } from "@/utils/interfaces/SupportTicket";
import { TicketStatusEnum } from "@/utils/enums/TicketStatusEnum";
import { useState } from "react";

interface ListSupportTicketsData {
	listSupportTickets: SupportTicket[];
}

interface ListSupportTicketsVars {
	status?: TicketStatusEnum;
	creatorId?: string;
	creatorCpf?: string;
	creatorName?: string;
	pagination?: {
		offset: number;
		limit: number;
	};
}

export const useSupportTickets = (vars: ListSupportTicketsVars = {}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);

	const { data, loading, error, refetch } = useQuery<
		ListSupportTicketsData,
		ListSupportTicketsVars
	>(LIST_TICKETS, {
		variables: {
			...vars,
			pagination: {
				offset: (currentPage - 1) * itemsPerPage,
				limit: itemsPerPage,
			},
		},
		fetchPolicy: "cache-and-network",
	});

	// Subscription para novos tickets
	useSubscription(TICKET_CREATED_SUBSCRIPTION, {
		onData: ({ client, data }) => {
			const newTicket = data.data?.ticketCreated;
			const matchesFilters =
				(!vars.status || newTicket?.status === vars.status) &&
				(!vars.creatorId || newTicket?.creatorId === vars.creatorId) &&
				(!vars.creatorCpf || newTicket?.creatorCpf === vars.creatorCpf);

			if (newTicket && matchesFilters && currentPage === 1) {
				client.cache.updateQuery(
					{
						query: LIST_TICKETS,
						variables: {
							...vars,
							pagination: {
								offset: 0,
								limit: itemsPerPage,
							},
						},
					},
					(existing) => ({
						listSupportTickets: [
							newTicket,
							...(existing?.listSupportTickets || []).slice(0, itemsPerPage - 1),
						],
					})
				);
			}
		},
	});

	// Subscription para atualizações de status
	useSubscription(TICKET_STATUS_SUBSCRIPTION, {
		onData: ({ client, data }) => {
			const updatedTicket = data.data?.ticketStatusChanged;
			const queryKey = {
				query: LIST_TICKETS,
				variables: {
					...vars,
					pagination: {
						offset: (currentPage - 1) * itemsPerPage,
						limit: itemsPerPage,
					},
				},
			};

			client.cache.updateQuery(queryKey, (existing) => {
				const tickets = existing?.listSupportTickets || [];
				const index = tickets.findIndex(
					(t: { id: any }) => t.id === updatedTicket.id
				);

				if (index > -1) {
					const newTickets = [...tickets];

					// Verificar correspondência com filtros
					if (vars.status && updatedTicket.status !== vars.status) {
						newTickets.splice(index, 1);
					} else {
						newTickets[index] = updatedTicket;
					}

					return { listSupportTickets: newTickets };
				}
				return existing;
			});
		},
	});

	return {
		tickets: data?.listSupportTickets || [],
		loading,
		error,
		refetch,
		currentPage,
		itemsPerPage,
		setCurrentPage,
		setItemsPerPage,
	};
};

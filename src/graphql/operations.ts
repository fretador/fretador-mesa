import { gql } from "@apollo/client";

export const LIST_TICKETS = gql`
	query ListSupportTickets(
		$status: TicketStatusEnum
		$creatorId: ID
		$creatorCpf: String
		$creatorName: String
		$pagination: PaginationInput
	) {
		listSupportTickets(
			status: $status
			creatorId: $creatorId
			creatorCpf: $creatorCpf
			creatorName: $creatorName
			pagination: $pagination
		) {
			id
			subject
			status
			createdAt
			updatedAt
			creatorId
			creatorName
			creatorCpf
			creatorPhotoUrl
			messages {
				id
				text
				sender
				createdAt
			}
		}
	}
`;

export const GET_TICKET = gql`
	query GetTicket($ticketId: ID!) {
		getTicket(ticketId: $ticketId) {
			id
			subject
			status
			createdAt
			updatedAt
			creatorId
			creatorName
			creatorCpf
			creatorPhotoUrl
			messages {
				id
				text
				sender
				createdAt
			}
		}
	}
`;

export const CREATE_TICKET = gql`
	mutation CreateSupportTicket($input: CreateTicketInput!) {
		createSupportTicket(input: $input) {
			id
			subject
			status
			createdAt
			updatedAt
			creatorId
			creatorName
			creatorCpf
			creatorPhotoUrl
			messages {
				id
				text
				sender
				createdAt
			}
		}
	}
`;

export const SEND_MESSAGE = gql`
	mutation SendChatMessage($input: SendMessageInput!) {
		sendChatMessage(input: $input) {
			id
			text
			sender
			createdAt
		}
	}
`;

export const CLOSE_TICKET = gql`
	mutation CloseSupportTicket($ticketId: ID!) {
		closeSupportTicket(ticketId: $ticketId) {
			id
			subject
			status
			createdAt
			updatedAt
			creatorId
			creatorName
			creatorCpf
			creatorPhotoUrl
			messages {
				id
				text
				sender
				createdAt
			}
		}
	}
`;

export const CHAT_SUBSCRIPTION = gql`
	subscription ChatMessageAdded($ticketId: ID!) {
		chatMessageAdded(ticketId: $ticketId) {
			id
			text
			sender
			createdAt
		}
	}
`;

export const TICKET_STATUS_SUBSCRIPTION = gql`
	subscription TicketStatusChanged($ticketId: ID!) {
		ticketStatusChanged(ticketId: $ticketId) {
			id
			subject
			status
			createdAt
			updatedAt
			creatorId
			creatorName
			creatorCpf
			creatorPhotoUrl
			messages {
				id
				text
				sender
				createdAt
			}
		}
	}
`;

export const TICKET_CREATED_SUBSCRIPTION = gql`
	subscription TicketCreated {
		ticketCreated {
			id
			subject
			status
			createdAt
			updatedAt
			creatorId
			creatorName
			creatorCpf
			creatorPhotoUrl
			messages {
				id
				text
				sender
				createdAt
			}
		}
	}
`;

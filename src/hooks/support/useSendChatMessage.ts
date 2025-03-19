import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "@/graphql/operations";
import { ChatMessage } from "@/utils/interfaces/ChatMessage";
import { SendMessageInput } from "@/utils/interfaces/inputs/SendMessageInput";
import { GET_TICKET } from "@/graphql/operations";

interface SendMessageData {
	sendChatMessage: ChatMessage;
}

interface SendMessageVars {
	input: SendMessageInput;
}

export const useSendChatMessage = (ticketId: string) => {
	const [sendMessage, { data, loading, error }] = useMutation<
		SendMessageData,
		SendMessageVars
	>(SEND_MESSAGE, {
		refetchQueries: [{ query: GET_TICKET, variables: { ticketId } }],
	});

	return {
		sendMessage,
		sentMessage: data?.sendChatMessage,
		sending: loading,
		error,
	};
};

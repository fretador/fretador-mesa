import { useSubscription } from "@apollo/client";
import { CHAT_SUBSCRIPTION } from "@/graphql/operations";
import { ChatMessage } from "@/utils/interfaces/ChatMessage";

interface ChatSubscriptionData {
	chatMessageAdded: ChatMessage;
}

interface ChatSubscriptionVars {
	ticketId: string;
}

export const useChatMessages = (ticketId: string) => {
	const { data, loading, error } = useSubscription<
		ChatSubscriptionData,
		ChatSubscriptionVars
	>(CHAT_SUBSCRIPTION, {
		variables: { ticketId },
		skip: !ticketId,
	});

	return {
		newMessage: data?.chatMessageAdded,
		subscribing: loading,
		error,
	};
};

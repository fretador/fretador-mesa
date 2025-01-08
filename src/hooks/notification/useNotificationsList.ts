import { useQuery } from "@apollo/client";
import { GET_BOARDUSER_NOTIFICATIONS } from "@/graphql/queries/notificationQueries";
import { BoardUserProfile } from "@/utils/enums/boardUserProfileEnums";

interface NotificationsFilterInput {
	notificationId?: string;
	entityType?: string;
	entityId?: string;
	groupKey?: BoardUserProfile;
	userId?: string;
	includeAcknowledged?: boolean;
}

interface Recipient {
	userId: string;
	acknowledged: boolean;
	acknowledgedAt?: string;
}

interface AckHistoryItem {
	userId?: string;
	groupKey?: BoardUserProfile;
	acknowledgedAt?: string;
}

interface Notification {
	_id: string;
	entityType: string;
	entityId: string;
	type: string;
	createdBy?: string;
	createdAt: string;
	recipients: Recipient[];
	ackHistory: AckHistoryItem[];
}

interface UseNotificationsListProps {
	filter: NotificationsFilterInput;
}

interface NotificationsData {
	notifications: Notification[];
}

export function useNotificationsList({ filter }: UseNotificationsListProps) {
	const { data, loading, error, refetch } = useQuery<NotificationsData>(
		GET_BOARDUSER_NOTIFICATIONS,
		{
			variables: { filter },
			fetchPolicy: "cache-and-network",
		}
	);

	return {
		notifications: data?.notifications || [],
		loading,
		error,
		refetch,
	};
}

import { useQuery } from "@apollo/client";
import { GET_TOTAL_NOTIFICATIONS } from "@/graphql/queries/notificationQueries";
import { BoardUserProfile } from "@/utils/enums/boardUserProfileEnums";

interface NotificationsFilterInput {
	notificationId?: string;
	entityType?: string;
	entityId?: string;
	groupKey?: BoardUserProfile;
	userId?: string;
	includeAcknowledged?: boolean;
}

interface Notification {
	_id: string;
}

interface UseTotalNotificationsProps {
	filter: NotificationsFilterInput;
}

interface TotalNotificationsData {
	notifications: Notification[];
}

export function useTotalNotifications({ filter }: UseTotalNotificationsProps) {
	const { data, loading, error, refetch } = useQuery<TotalNotificationsData>(
		GET_TOTAL_NOTIFICATIONS,
		{
			variables: { filter },
			fetchPolicy: "cache-and-network",
		}
	);

	const total = data?.notifications?.length || 0;

	return {
		total,
		loading,
		error,
		refetch,
	};
}

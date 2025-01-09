import { useQuery } from "@apollo/client";
import { GET_NOTIFICATION_COUNTERS } from "@/graphql/queries/notificationQueries";
import { BoardUserProfile } from "@/utils/enums/boardUserProfileEnums";

interface UseNotificationCountersProps {
	userId?: string;
	groupKey?: BoardUserProfile;
	skip?: boolean;
}

interface NotificationCounters {
	freights: number;
	drivers: number;
	occurrences: number;
	financial: number;
	clients: number;
}

export function useNotificationCounters({
	userId,
	groupKey,
	skip = false,
}: UseNotificationCountersProps) {
	const { data, loading, error, refetch } = useQuery(GET_NOTIFICATION_COUNTERS, {
		variables: { userId, groupKey },
		fetchPolicy: "cache-first",
		skip,
	});

	return {
		counters: data?.notificationCounters as NotificationCounters,
		loading,
		error,
		refetch,
	};
}

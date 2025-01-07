import { useQuery } from "@apollo/client";
import { GET_NOTIFICATION_COUNTERS } from "@/graphql/queries/notificationQueries";

interface UseNotificationCountersProps {
	userId?: string;
	groupKey?: string;
	skip?: boolean;
}

export function useNotificationCounters({
	userId,
	groupKey,
	skip = false,
}: UseNotificationCountersProps) {
	const { data, loading, error, refetch } = useQuery(GET_NOTIFICATION_COUNTERS, {
		variables: { userId, groupKey },
		fetchPolicy: "cache-and-network",
		skip,
	});

	return {
		counters: data?.notificationCounters,
		loading,
		error,
		refetch,
	};
}

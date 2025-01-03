import { GET_NOTIFICATION_COUNTERS } from "@/graphql/queries/notificationQueries";
import { useQuery } from "@apollo/client";

export function useNotificationCounters(userId?: string, groupKey?: string) {
	const { data, loading, error, refetch } = useQuery(GET_NOTIFICATION_COUNTERS, {
		variables: {
			userId,
			groupKey,
		},
		fetchPolicy: "cache-and-network",
	});

	return {
		counters: data?.notificationCounters,
		loading,
		error,
		refetch,
	};
}

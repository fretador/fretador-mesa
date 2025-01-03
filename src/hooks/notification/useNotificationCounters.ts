import { useQuery } from "@apollo/client";
import { GET_NOTIFICATION_COUNTERS } from "@/graphql/queries/notificationQueries";

interface UseNotificationCountersProps {
	userId?: string;
	groupKey?: string;
	skip?: boolean; // para “pular” a query
}

export function useNotificationCounters({
	userId,
	groupKey,
	skip = false,
}: UseNotificationCountersProps) {
	const { data, loading, error, refetch } = useQuery(GET_NOTIFICATION_COUNTERS, {
		variables: { userId, groupKey },
		fetchPolicy: "cache-and-network",
		skip, // se true, não faz a query
	});

	return {
		counters: data?.notificationCounters,
		loading,
		error,
		refetch,
	};
}

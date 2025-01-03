import { gql } from "@apollo/client";

export const GET_NOTIFICATION_COUNTERS = gql`
	query GetNotificationCounters($userId: String, $groupKey: String) {
		notificationCounters(userId: $userId, groupKey: $groupKey) {
			freights
			drivers
			occurrences
			financial
			clients
		}
	}
`;

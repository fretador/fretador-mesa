import { gql } from "@apollo/client";

export const GET_NOTIFICATION_COUNTERS = gql`
	query GetNotificationCounters($userId: ID, $groupKey: String) {
		notificationCounters(userId: $userId, groupKey: $groupKey) {
			freights
			drivers
			occurrences
			financial
			clients
		}
	}
`;

export const GET_BOARDUSER_NOTIFICATIONS = gql`
	query GetBoardUserNotifications(
		$userId: String
		$groupKey: String
		$includeAcknowledged: Boolean
		$entityType: String
	) {
		notifications(
			userId: $userId
			groupKey: $groupKey
			includeAcknowledged: $includeAcknowledged
			entityType: $entityType
		) {
			_id
			entityType
			entityId
			type
			createdBy
			recipients {
				userId
				acknowledged
				acknowledgedAt
			}
			createdAt
		}
	}
`;

export const GET_TOTAL_NOTIFICATIONS = gql`
	query GetTotalNotifications($userId: String) {
		notifications(userId: $userId) {
			_id
		}
	}
`;
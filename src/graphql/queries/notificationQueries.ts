import { gql } from "@apollo/client";

export const GET_NOTIFICATION_COUNTERS = gql`
	query GetNotificationCounters($userId: ID, $groupKey: BoardUserProfile) {
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
	query GetBoardUserNotifications($filter: NotificationsFilterInput) {
		notifications(filter: $filter) {
			_id
			entityType
			entityId
			type
			createdBy
			createdAt
			recipients {
				userId
				acknowledged
				acknowledgedAt
			}
			ackHistory {
				userId
				groupKey
				acknowledgedAt
			}
		}
	}
`;

export const GET_TOTAL_NOTIFICATIONS = gql`
	query GetTotalNotifications($filter: NotificationsFilterInput) {
		notifications(filter: $filter) {
			_id
		}
	}
`;

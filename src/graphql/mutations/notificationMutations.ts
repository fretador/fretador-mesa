import { gql } from "@apollo/client";

export const ACKNOWLEDGE_NOTIFICATION = gql`
	mutation AcknowledgeNotification($notificationId: ID!, $userId: String!) {
		acknowledgeNotification(notificationId: $notificationId, userId: $userId)
	}
`;

export const ACKNOWLEDGE_NOTIFICATION_GROUP = gql`
	mutation AcknowledgeNotificationGroup(
		$notificationId: ID!
		$groupKey: String!
	) {
		acknowledgeNotificationGroup(
			notificationId: $notificationId
			groupKey: $groupKey
		)
	}
`;

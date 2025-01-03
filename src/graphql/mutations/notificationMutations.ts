import { gql } from "@apollo/client";

export const ACKNOWLEDGE_NOTIFICATION = gql`
	mutation AcknowledgeNotification($notificationId: ID!) {
		acknowledgeNotification(notificationId: $notificationId)
	}
`;

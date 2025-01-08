import { useMutation } from "@apollo/client";
import { ACKNOWLEDGE_NOTIFICATION } from "@/graphql/mutations/notificationMutations";
import {
	GET_NOTIFICATION_COUNTERS,
	GET_TOTAL_NOTIFICATIONS,
	GET_BOARDUSER_NOTIFICATIONS,
} from "@/graphql/queries/notificationQueries";
import { BoardUserProfile } from "@/utils/enums/boardUserProfileEnums";

interface AcknowledgeNotificationVariables {
	notificationId: string;
	userId: string;
}

interface AcknowledgeNotificationResponse {
	acknowledgeNotification: boolean;
}

export function useAcknowledgeNotification(
	userId: string,
	groupKey?: BoardUserProfile
) {
	const [acknowledgeNotification, { loading, error }] = useMutation<
		AcknowledgeNotificationResponse,
		AcknowledgeNotificationVariables
	>(ACKNOWLEDGE_NOTIFICATION, {
		refetchQueries: [
			{
				query: GET_NOTIFICATION_COUNTERS,
				variables: { userId, groupKey },
			},
			{
				query: GET_TOTAL_NOTIFICATIONS,
				variables: { filter: { userId } },
			},
			{
				query: GET_BOARDUSER_NOTIFICATIONS,
				variables: { filter: { userId, groupKey, includeAcknowledged: false } },
			},
		],
		awaitRefetchQueries: true,
		onCompleted: () => {
			window.dispatchEvent(new CustomEvent("notificationCountersUpdated"));
		},
	});

	return {
		acknowledgeNotification: (variables: AcknowledgeNotificationVariables) =>
			acknowledgeNotification({ variables }),
		loading,
		error,
	};
}

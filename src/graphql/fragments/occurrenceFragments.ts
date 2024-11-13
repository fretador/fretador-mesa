import { gql } from "@apollo/client";

export const OCCURRENCE_COMMON_FIELDS = gql`
	fragment OccurrenceCommonFields on Occurrence {
		id
		active
		creationDate
		updateDate
		status
		type
		userId
		updateAcknowledge
		messages {
			message
			boardUser
			admin
			createdDate
		}
		files {
			admin
			name
			url
			type
			sender
			createdDate
			boardUser
		}
	}
`;

export const OCCURRENCE_FULL_FIELDS = gql`
	fragment OccurrenceFullFields on Occurrence {
		...OccurrenceCommonFields
		_id
		driverName
		driverPhotoUrl
		freightCode
		freightDate
		cte
		route
		attachments
		observations
		occurrenceStatus
	}
	${OCCURRENCE_COMMON_FIELDS}
`;

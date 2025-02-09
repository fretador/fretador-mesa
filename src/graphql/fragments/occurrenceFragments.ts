import { gql } from "@apollo/client";

export const OCCURRENCE_COMMON_FIELDS = gql`
	fragment OccurrenceCommonFields on Occurrence {
		id
		active
		creationDate
		updateDate
		occurrenceStatus
		type
		userId
		updateAcknowledge
		messages {
			message
			boardUser
			admin
			createdDate
		}
		attachments {
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
		numCte
		route
		observations
	}
	${OCCURRENCE_COMMON_FIELDS}
`;

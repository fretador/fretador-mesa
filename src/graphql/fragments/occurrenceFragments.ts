import { gql } from "@apollo/client";

export const OCCURRENCE_COMMON_FIELDS = gql`
	fragment OccurrenceCommonFields on Occurrence {
		id
		active
		creationDate
		updateDate
<<<<<<< HEAD
		occurrenceStatus
=======
		status
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
		type
		userId
		updateAcknowledge
		messages {
			message
			boardUser
			admin
			createdDate
		}
<<<<<<< HEAD
		attachments {
=======
		files {
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
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
<<<<<<< HEAD
		numCte
		route
		observations
=======
		cte
		route
		attachments
		observations
		occurrenceStatus
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
	}
	${OCCURRENCE_COMMON_FIELDS}
`;

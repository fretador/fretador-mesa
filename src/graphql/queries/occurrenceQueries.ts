import { gql } from "@apollo/client";
import {
	OCCURRENCE_COMMON_FIELDS,
	OCCURRENCE_FULL_FIELDS,
} from "../fragments/occurrenceFragments";

export const GET_OCCURRENCES = gql`
	query GetOccurrences($page: Int, $limit: Int, $filter: OccurrenceFilterInput) {
		occurrences(page: $page, limit: $limit, filter: $filter) {
			edges {
				node {
					...OccurrenceCommonFields
				}
			}
			pageInfo {
				hasNextPage
				hasPreviousPage
				currentPage
				totalPages
			}
		}
	}
	${OCCURRENCE_COMMON_FIELDS}
`;

export const GET_OCCURRENCE_BY_ID = gql`
	query GetOccurrenceById($id: ID!) {
		occurrence(id: $id) {
			...OccurrenceFullFields
		}
	}
	${OCCURRENCE_FULL_FIELDS}
`;

export const GET_OCCURRENCES_BY_USER_ID = gql`
	query GetOccurrencesByUserId(
		$userId: ID!
		$statusFilter: [OccurrenceStatus!]
		$typeFilter: [OccurrenceType!]
	) {
		occurrencesByUserId(
			userId: $userId
			statusFilter: $statusFilter
			typeFilter: $typeFilter
		) {
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
	}
`;

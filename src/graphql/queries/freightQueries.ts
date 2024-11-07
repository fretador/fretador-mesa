import { gql } from "@apollo/client";
import { FREIGHT_COMMON_FIELDS, FREIGHT_FULL_FIELDS } from "@/graphql/fragments/freightFragments";

export const GET_FREIGHTS = gql`
	query GetFreights($page: Int, $limit: Int, $filter: FreightFilterInput) {
		freights(page: $page, limit: $limit, filter: $filter) {
			edges {
				node {
					...FreightCommonFields
					targetedDrivers {
						name
					}
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
	${FREIGHT_COMMON_FIELDS}
`;

export const GET_FREIGHT_BY_ID = gql`
	query GetFreightById($id: ID!) {
		freight(id: $id) {
			...FreightFullFields
			targetedDrivers {
				name
				userPhoto {
					imageUrl
				}
			}
			documents {
				id
				type
				status
				url
				name
				sender
				message
				dateOfSubmission
				lastUpdated
			}
			statusHistory {
				status
				updateData
				updateDataType
				updateDate
			}
		}
	}
	${FREIGHT_FULL_FIELDS}
`;

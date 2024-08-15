import { gql } from "@apollo/client";

export const GET_FREIGHTS = gql`
	query GetFreights($page: Int, $limit: Int, $filter: FreightFilterInput) {
		freights(page: $page, limit: $limit, filter: $filter) {
			edges {
				node {
					id
					deliveryCity
					gatheringCity
					status
					value
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
`;

export const GET_FREIGHT_BY_ID = gql`
	query GetFreightById($id: ID!) {
		freight(id: $id) {
			id
			status
			deliveryAddress
			deliveryDate
			packageWeight
			value
		}
	}
`;

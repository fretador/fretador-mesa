import { gql } from "@apollo/client";

export const GET_FREIGHTS = gql`
  query GetFreights($page: Int, $limit: Int, $filter: FreightFilterInput) {
    freights(page: $page, limit: $limit, filter: $filter) {
      edges {
        node {
          id
          creationDate
          freightCode
          origin
          destination
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
			origin
			destination
			status
			targetedDrivers
			freightCode
			updateDate
			type
			statusHistory {
				status
				updateData
				updateDataType
				updateDate
			}
		}
	}
`;

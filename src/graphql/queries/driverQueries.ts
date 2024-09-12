import { gql } from "@apollo/client";

export const GET_DRIVERS_QUERY = gql`
	query GetDrivers($page: Int, $limit: Int, $filter: DriverFilterInput) {
		drivers(page: $page, limit: $limit, filter: $filter) {
			edges {
				node {
					id
					name
					status
					phoneNumber
					vehicle {
						type
					}
					userPhoto {
						imageUrl
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
`;

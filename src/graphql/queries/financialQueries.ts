import { gql } from "@apollo/client";

export const GET_FREIGHTS_FOR_FINANCIAL = gql`
	query GetFreightsForFinancial(
		$page: Int
		$limit: Int
		$filter: FreightsForFinancialFilterInput
	) {
		freightsForFinancial(page: $page, limit: $limit, filter: $filter) {
			edges {
				node {
					id
					status
					requestFinancialType
					formaPagamento
					contractNumber
					origin
					destination
					value
					paymentDate
					targetedDrivers {
						id
						name
						phoneNumber
						userPhoto {
							imageUrl
						}
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

export const GET_FREIGHT_FINANCIAL_BY_ID = gql`
	query GetFreightFinancialById($id: ID!) {
		freightForFinancialById(id: $id) {
			id
			requestFinancialType
			formaPagamento
			contractNumber
			origin
			destination
			value
			paymentDate
			numCte
			status
			targetedDrivers {
				id
				name
				phoneNumber
				cpf
				cnh
				email
				bankDetails
				pix
				userPhoto {
					imageUrl
				}
			}
		}
	}
`;
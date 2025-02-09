import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
	query GetClients($page: Int, $limit: Int, $filter: ClientFilterInput) {
		clients(page: $page, limit: $limit, filter: $filter) {
			edges {
				node {
					id
					cnpj
					corporateName
					tradeName
					city
					state
					email
					whatsapp
					stateRegistration
					address
					numberAddress
					neighborhood
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

export const GET_CLIENT = gql`
	query GetClient($id: ID!) {
		client(id: $id) {
			id
			cnpj
			corporateName
			tradeName
			city
			state
			email
			whatsapp
			stateRegistration
			address
			numberAddress
			neighborhood
		}
	}
`;

export const GET_CLIENT_SHIPMENTS = gql`
	query GetClientShipments($id: ID!) {
		clientShipments(id: $id) {
			id
			corporateName
			shipments {
				id
				updateDate
				origin
				status
				targetedDrivers {
					vehicle {
						type
					}
				}
			}
		}
	}
`;

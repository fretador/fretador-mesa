import { gql } from "@apollo/client";

export const UPDATE_CLIENT = gql`
	mutation UpdateClient($id: ID!, $input: UpdateClientInput!) {
		updateClient(id: $id, input: $input) {
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

export const DELETE_CLIENT = gql`
	mutation DeleteClient($id: ID!) {
		deleteClient(id: $id)
	}
`;

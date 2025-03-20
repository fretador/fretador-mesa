import { gql } from "@apollo/client";

export const UPDATE_DRIVER = gql`
	mutation UpdateDriver($id: ID!, $input: UpdateDriverInput!) {
		updateDriver(id: $id, input: $input) {
			id
			name
			cpf
			phoneNumber
			status
			email
			cnh
			vehicle {
				type
			}
			wallet {
				bank
			}
		}
	}
`;

export const UPDATE_DRIVER_DOCUMENTS = gql`
	mutation UpdateDriverDocuments(
		$id: ID!
		$updates: [UpdateDriverDocumentInput!]!
	) {
		updateDriverDocuments(id: $id, updates: $updates) {
			id
			vehicle {
				type
			}
			wallet {
				bank
			}
			userPhoto {
				status
				message
			}
			cnhPhoto {
				status
				message
			}
			vehicle {
				documentPhoto {
					status
					message
				}
			}
		}
	}
`;


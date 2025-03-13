import { gql } from "@apollo/client";

export const UPDATE_DRIVER = gql`
	mutation UpdateDriver($input: UpdateDriverInput!) {
		updateDriver(input: $input) {
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

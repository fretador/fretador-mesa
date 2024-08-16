import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
	query GetUser {
		user {
			id
			name
			email
		}
	}
`;

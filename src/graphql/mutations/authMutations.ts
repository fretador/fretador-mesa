import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			boardUser {
				id
				name
				email
				profile
				token
				profilePicture
			}
		}
	}
`;

export const REGISTER_MUTATION = gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, password: $password, name: $name) {
			token
		}
	}
`;

import { gql } from "@apollo/client";

export const CREATE_FREIGHT = gql`
	mutation CreateFreight($input: CreateFreightInput!) {
		createFreight(input: $input) {
			id
			status
			deliveryAddress
			deliveryDate
			packageWeight
			value
		}
	}
`;

export const UPDATE_FREIGHT = gql`
	mutation UpdateFreight($id: ID!, $input: UpdateFreightInput!) {
		updateFreight(id: $id, input: $input) {
			id
			status
			deliveryAddress
			deliveryDate
			packageWeight
			value
		}
	}
`;

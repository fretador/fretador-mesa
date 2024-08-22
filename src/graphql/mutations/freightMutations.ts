import { gql } from "@apollo/client";

export const CREATE_FREIGHT = gql`
	mutation CreateFreight($input: CreateFreightInput!) {
		createFreight(input: $input) {
			id
			freightCode
			status
		}
	}
`;

export const UPDATE_FREIGHT = gql`
	mutation UpdateFreight($id: ID!, $input: UpdateFreightInput!) {
		updateFreight(id: $id, input: $input) {
			id
			creationDate
			freightCode
			numCte
			deliveryCity
			gatheringCity
			gatheringState
			deliveryState
			clientName
			driver
			status
			value
		}
	}
`;

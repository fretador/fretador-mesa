import { gql } from "@apollo/client";

export const UPDATE_STATUS_FREIGHT = gql`
	mutation UpdateStatusFreight($id: ID!, $input: UpdateStatusFreightInput!) {
		updateStatusFreight(id: $id, input: $input) {
			status
			paymentDate
		}
	}
`;

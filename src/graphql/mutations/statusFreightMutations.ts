import { gql } from "@apollo/client";

export const UPDATE_FREIGHT_STATUS = gql`
	mutation UpdateFreightStatus($input: UpdateFreightStatusInput!) {
		updateFreightStatus(input: $input) {
			status
			paymentDate
		}
	}
`;

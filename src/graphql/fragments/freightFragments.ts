import { gql } from "@apollo/client";

export const FREIGHT_FIELDS = gql`
	fragment FreightFields on Freight {
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
`;

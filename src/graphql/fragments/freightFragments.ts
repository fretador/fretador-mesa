import { gql } from "@apollo/client";

export const FREIGHT_FIELDS = gql`
	fragment FreightFields on Freight {
		id
		active
		status
		freightCode
		creationDate
		updateDate
		pickupDeliveryData
		origin
		destination
		originCNPJ
		originRazaoSocial
		originEndereco
		destinationCNPJ
		destinationRazaoSocial
		destinationEndereco
		cargoLoadType
		needsTarp
		needsTracker
		product
		cargoType
		totalWeight
		volumes
		cubage
		moreDetails
		value
		shippingType
		pedagioIncluso
		formaPagamento
		observations
		eligibleVehicles
		eligibleBodyworks
		type
		targetedDrivers
		statusHistory
		documents
		numCte
		deliveryCity
		gatheringCity
		gatheringState
		deliveryState
		clientName
		driver
	}
`;
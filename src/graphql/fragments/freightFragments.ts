import { gql } from "@apollo/client";

export const FREIGHT_FIELDS = gql`
	fragment FreightFields on Freight {
		id
		active
		status
		freightCode
		freightType
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
		requestFinancialType
		contractNumber
		paymentDate
		advanceValue
		balanceValue
	}
`;

export const FREIGHT_COMMON_FIELDS = gql`
	fragment FreightCommonFields on Freight {
		id
		creationDate
		freightCode
		origin
		destination
		status
		value
	}
`;

export const FREIGHT_FULL_FIELDS = gql`
	fragment FreightFullFields on Freight {
		...FreightCommonFields
		pickupDeliveryData
		cargoLoadType
		needsTarp
		needsTracker
		product
		cargoType
		totalWeight
		volumes
		cubage
		moreDetails
		eligibleVehicles {
			type
			category
			eligible
		}
		eligibleBodyworks {
			type
			category
			eligible
		}
		type
		pedagioIncluso
		formaPagamento
		observations
	}
	${FREIGHT_COMMON_FIELDS}
`;
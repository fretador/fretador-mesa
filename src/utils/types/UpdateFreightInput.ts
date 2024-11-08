import { CargoLoadType } from "../enums/cargoLoadTypeEnum";
import { CargoType } from "../enums/cargoTypeEnum";
import { ShippingType } from "../enums/shippingTypeEnum";
import { Type } from "../enums/typeEnum";
import { EligibleVehicle } from "./EligibleVehicle";
import { EligibleBodywork } from "./EligibleBodywork";

export interface UpdateFreightInput {
	pickupDeliveryData?: string;
	origin?: string;
	destination?: string;
	originCNPJ?: string;
	originRazaoSocial?: string;
	originEndereco?: string;
	destinationCNPJ?: string;
	destinationRazaoSocial?: string;
	destinationEndereco?: string;
	cargoLoadType?: CargoLoadType;
	needsTarp?: boolean;
	needsTracker?: boolean;
	product?: string;
	cargoType?: CargoType;
	totalWeight?: number;
	volumes?: number;
	cubage?: number;
	moreDetails?: string;
	shippingType?: ShippingType;
	freightType?: Type;
	freightValue?: string;
	pedagioIncluso?: boolean;
	paymentType?: string;
	observations?: string;
	eligibleVehicles?: EligibleVehicle[];
	eligibleBodyworks?: EligibleBodywork[];
	type?: Type;
	targetedDrivers?: string[];
	value?: number;
}

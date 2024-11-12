<<<<<<< HEAD
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
=======
import { VehicleCategory, VehicleType } from "../enums/vehicleEnums";
import { BodyworkCategory, BodyworkType } from "../enums/bodyworkEnums";
import { CargoLoadType } from "../enums/cargoLoadTypeEnum";
import { CargoType } from "../enums/cargoTypeEnum";
import { Type } from "../enums/typeEnum";

export interface UpdateFreightInput {
  pickupDeliveryData: string;
  origin: string;
  destination: string;
  cargoLoadType: CargoLoadType;
  needsTarp: boolean;
  needsTracker: boolean;
  product: string;
  cargoType: CargoType;
  totalWeight: number;
  volumes?: number;
  cubage?: number;
  moreDetails?: string;
  eligibleVehicles: EligibleVehicle[];
  eligibleBodyworks: EligibleBodywork[];
  type: Type;
  pedagioIncluso: boolean;
  paymentType: string;
  observations: string;

}
export interface EligibleVehicle {
	category: VehicleCategory;
	type: VehicleType;
	eligible: boolean;
}

export interface EligibleBodywork {
  category: BodyworkCategory;
  type: BodyworkType;
  eligible: boolean;
>>>>>>> 688ba19 (feat: using the graphql mutation to include the edit freight functionality)
}

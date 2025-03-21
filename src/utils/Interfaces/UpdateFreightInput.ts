import { VehicleCategory, VehicleType } from "../enums/vehicleEnums";
import { BodyworkCategory, BodyworkType } from "../enums/bodyworkEnums";
import { CargoLoadType } from "../enums/cargoLoadTypeEnum";
import { CargoType } from "../enums/cargoTypeEnum";
import { Type } from "../enums/typeEnum";
import { BoardUser } from "./BoardUser";

export interface UpdateFreightInput {
	pickupDeliveryData?: string;
	origin?: string;
	destination?: string;
	cargoLoadType?: CargoLoadType;
	needsTarp?: boolean;
	needsTracker?: boolean;
	product?: string;
	cargoType?: CargoType;
	totalWeight?: number;
	volumes?: number;
	cubage?: number;
	moreDetails?: string;
	eligibleVehicles?: EligibleVehicle[];
	eligibleBodyworks?: EligibleBodywork[];
	type?: Type;
	pedagioIncluso?: boolean;
	paymentType?: string;
	paymentDate?: string;
	observations?: string;
	boardUser?: BoardUser;
	value?: number;
	advanceValue?: number;
	balanceValue?: number;
	noPaymentReason?: string;
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
}

import { VehicleCategory, VehicleType } from "../enums/vehicleEnums";

export interface EligibleVehicle {
	category: VehicleCategory;
	type: VehicleType;
	eligible: boolean;
}

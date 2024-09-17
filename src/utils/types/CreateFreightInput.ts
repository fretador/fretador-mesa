import { VehicleCategory, VehicleType } from "../enums/vehicleEnums";
import { BodyworkCategory, BodyworkType } from "../enums/bodyworkEnums";
import { CargoLoadType } from "../enums/cargoLoadTypeEnum";
import { CargoType } from "../enums/cargoTypeEnum";
import { ShippingType } from "../enums/shippingTypeEnum";
import { Type } from "../enums/typeEnum";

export interface CreateFreightInput {
  pickupDeliveryData: string;
  origin: string;
  destination: string;
  originCNPJ?: string;
  originRazaoSocial?: string;
  originEndereco?: string;
  destinationCNPJ?: string;
  destinationRazaoSocial?: string;
  destinationEndereco?: string;
  cargoLoadType: CargoLoadType;
  needsTarp: boolean;
  needsTracker: boolean;
  product: string;
  cargoType: CargoType;
  totalWeight: number;
  volumes?: number;
  cubage?: number;
  moreDetails?: string;
  shippingType: ShippingType;
  freightType: Type;
  freightValue: string;
  pedagioIncluso: boolean;
  observations?: string;
  eligibleVehicles: EligibleVehicle[];
  eligibleBodyworks: EligibleBodywork[];
  type: Type;
  targetedDrivers: string[];
}

interface EligibleVehicle {
  category: VehicleCategory;
  type: VehicleType;
  eligible: boolean;
}

interface EligibleBodywork {
  category: BodyworkCategory;
  type: BodyworkType;
  eligible: boolean;
}

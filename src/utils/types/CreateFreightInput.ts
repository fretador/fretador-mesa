<<<<<<< HEAD
import { FreightType } from "./Enums";
=======
import { VehicleCategory, VehicleType } from "../enums/vehicleEnums";
import { BodyworkCategory, BodyworkType } from "../enums/bodyworkEnums";
import { CargoLoadType } from "../enums/cargoLoadTypeEnum";
import { CargoType } from "../enums/cargoTypeEnum";
import { ShippingType } from "../enums/shippingTypeEnum";
import { Type } from "../enums/typeEnum";
>>>>>>> FA-789-Formulario-de-criacao-de-fretes

export interface CreateFreightInput {
  pickupDeliveryData: string;
  origin: string;
<<<<<<< HEAD
  destination: string;

  cargoLoadType: "completa" | "complemento";
  needsTarp: "sim" | "nao";
  needsTracker: "sim" | "nao";
  product: string;
  cargoType: string;
  totalWeight: string;
  volumes?: string;
  cubage?: string;
  moreDetails?: string;
=======
  destination?: string;
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
<<<<<<< HEAD
  value: number | null;
  shippingType: ShippingType;
  pedagioIncluso: boolean;
  formaPagamento: string;
=======
>>>>>>> FA-789-Formulario-de-criacao-de-fretes

  vehicleUtilitario?: boolean;
  vehicleVLC?: boolean;
  vehicleTresQuartos?: boolean;
  vehicleToco?: boolean;
  vehicleTruck?: boolean;
  vehicleBiTruck?: boolean;
  vehicleCarretaSimples?: boolean;
  vehicleCarretaLS?: boolean;
  vehicleVanderleia?: boolean;

  bodyworkBau?: boolean;
  bodyworkGradeBaixa?: boolean;
  bodyworkRefrigerado?: boolean;
  bodyworkFrigorifico?: boolean;
  bodyworkSider?: boolean;
  bodyworkGraneleiro?: boolean;
  bodyworkPrancha?: boolean;
  bodyworkPlataforma?: boolean;
  bodyworkPortaContainer?: boolean;
  bodyworkCacamba?: boolean;
  bodyworkCavaqueira?: boolean;
  bodyworkSilo?: boolean;
  bodyworkMunck?: boolean;
  bodyworkCegonha?: boolean;

  shippingType: "Coleta" | "Entrega" | "Ida eVolta";
<<<<<<< HEAD
  freightType: "CIF" | "FOB";
  freightValue: string;
  pedagioIncluso: "Sim" | "Não";

  observations?: string;

  value: number;
  clientName: string;
  freightCode: string;
  toll: boolean;
=======
  freightType: "OFFER" | "TARGETED";
  freightValue: string;
  pedagioIncluso: "Sim" | "Não";

>>>>>>> dce10fb (conflict)
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
>>>>>>> FA-789-Formulario-de-criacao-de-fretes
}

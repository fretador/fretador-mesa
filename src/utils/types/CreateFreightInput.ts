import { FreightType } from "./Enums";

export interface CreateFreightInput {
  pickupDeliveryData: string;
  origin: string;
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
  freightType: "OFFER" | "TARGETED";
  freightValue: string;
  pedagioIncluso: "Sim" | "Não";

  observations?: string;

  value: number;
  clientName: string;
  freightCode: string;
  toll: boolean;
}

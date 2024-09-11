import { FreightType } from "./Enums";

export interface CreateFreightInput {
  pickupDeliveryData: string;
  origin: string;
  destination: string;
  originCNPJ: string;
  originRazaoSocial: string;
  originEndereco: string;
  destinationCNPJ: string;
  destinationRazaoSocial: string;
  destinationEndereco: string;
  cargoLoadType: "completa" | "complemento" | null;
  needsTarp: "sim" | "nao" | null;
  needsTracker: "sim" | "nao" | null;
  product: string;
  cargoType: string;
  totalWeight: number | null;
  volumes: number | null;
  cubage: number | null;
  moreDetails: string;
}

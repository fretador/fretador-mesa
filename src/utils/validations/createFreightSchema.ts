import { z } from "zod";
import { CargoLoadType } from "../enums/cargoLoadTypeEnum";
import { CargoType } from "../enums/cargoTypeEnum";
import { ShippingType } from "../enums/shippingTypeEnum";
import { Type } from "../enums/typeEnum";
import { VehicleCategory, VehicleType } from "../enums/vehicleEnums";
import { BodyworkCategory, BodyworkType } from "../enums/bodyworkEnums";

const eligibleVehicleSchema = z.object({
  category: z.nativeEnum(VehicleCategory),
  type: z.nativeEnum(VehicleType),
  eligible: z.boolean(),
});

const eligibleBodyworkSchema = z.object({
  category: z.nativeEnum(BodyworkCategory),
  type: z.nativeEnum(BodyworkType),
  eligible: z.boolean(),
});

export const createFreightSchema = z.object({
  pickupDeliveryData: z
    .string()
    .min(1, { message: "Data de coleta é obrigatória" }),
  origin: z.string().min(1, { message: "Origem é obrigatória" }),
  destination: z.string().min(1, { message: "Destino é obrigatório" }),
  originCNPJ: z.string().optional(),
  originRazaoSocial: z.string().optional(),
  originEndereco: z.string().optional(),
  destinationCNPJ: z.string().optional(),
  destinationRazaoSocial: z.string().optional(),
  destinationEndereco: z.string().optional(),
  cargoLoadType: z.nativeEnum(CargoLoadType),
  needsTarp: z.preprocess((value) => value === "true", z.boolean()),
  needsTracker: z.preprocess((value) => value === "true", z.boolean()),

  product: z.string().min(1, { message: "Produto é obrigatório" }),
  cargoType: z.nativeEnum(CargoType),
  totalWeight: z
    .number({ invalid_type_error: "Peso total deve ser um número" })
    .positive({ message: "Peso total deve ser positivo" }),
  volumes: z.number().optional(),
  cubage: z.number().optional(),
  moreDetails: z.string().optional(),
  value: z.number().nullable().optional(),
  shippingType: z.nativeEnum(ShippingType),
  pedagioIncluso: z.preprocess((value) => value === "true", z.boolean()),
  formaPagamento: z
    .string()
    .min(1, { message: "Forma de pagamento é obrigatória" }),
  observations: z.string().optional(),
  eligibleVehicles: z.array(eligibleVehicleSchema),
  eligibleBodyworks: z.array(eligibleBodyworkSchema),
  type: z.nativeEnum(Type),
  targetedDrivers: z.array(z.string()),
});

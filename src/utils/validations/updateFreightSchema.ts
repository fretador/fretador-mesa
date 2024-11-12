import { z } from "zod";
import { CargoLoadType } from "../enums/cargoLoadTypeEnum";
import { CargoType } from "../enums/cargoTypeEnum";
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

export const updateFreightSchema = z.object({
  pickupDeliveryData: z
    .string()
    .min(1, { message: "Data de coleta é obrigatória" }),
  origin: z.string().min(1, { message: "Origem é obrigatória" }),
  destination: z.string().min(1, { message: "Destino é obrigatório" }),
  cargoLoadType: z.nativeEnum(CargoLoadType),
  needsTarp: z.preprocess((value) => value === "true", z.boolean()),
  needsTracker: z.preprocess((value) => value === "true", z.boolean()),
  product: z.string().min(1, { message: "Produto é obrigatório" }),
  cargoType: z.nativeEnum(CargoType, {
    errorMap: () => ({ message: "Selecione uma Espécie de carga" }),
  }),
  totalWeight: z
    .number({ invalid_type_error: "Peso total é obrigatório" })
    .positive({ message: "Peso total deve ser positivo" }),
  volumes: z.preprocess(
    (val) => (isNaN(Number(val)) ? undefined : Number(val)),
    z.number().optional()
  ),
  cubage: z.preprocess(
    (val) => (isNaN(Number(val)) ? undefined : Number(val)),
    z.number().optional()
  ),
  moreDetails: z.string().optional(),
  pedagioIncluso: z.preprocess((value) => value === "true", z.boolean()),
  paymentType: z.string().optional(),
  observations: z.string().optional(),
  eligibleVehicles: z.array(eligibleVehicleSchema),
  eligibleBodyworks: z.array(eligibleBodyworkSchema),
  type: z.nativeEnum(Type),
});

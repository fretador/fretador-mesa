import { z } from "zod";

export const FreightSchema = z.object({
  freightCode: z.string().min(1, "Código do Frete é obrigatório"),
  pickupDeliveryData: z.string().min(1, "Data de coleta é obrigatória"),
  cargoDetails: z.string().min(1, "Detalhes da carga são obrigatórios"),
  vehicleOptions: z.string().min(1, "Opções de veículo são obrigatórias"),
  bodyworkOptions: z.string().min(1, "Opções de carroceria são obrigatórias"),
  freightOptions: z.string().min(1, "Opções de frete são obrigatórias"),
  observations: z.string().optional(),
});

export type FreightFormValues = z.infer<typeof FreightSchema>;

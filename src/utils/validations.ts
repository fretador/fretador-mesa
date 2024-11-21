import { z } from "zod";

export const FreightSchema = z.object({
  pickupDeliveryDate: z.string().min(1, "Data de carregamento é obrigatória"),
  origin: z.string().min(1, "Origem é obrigatória"),
  destination: z.string().min(1, "Destino é obrigatório"),

  cargoLoadType: z.enum(["completa", "complemento"], {
    errorMap: () => ({ message: "Tipo de carga é obrigatório" }),
  }),
  needsTarp: z.enum(["sim", "nao"]).transform((val) => val === "sim"),
  needsTracker: z.enum(["sim", "nao"]).transform((val) => val === "sim"),

  product: z.string().min(1, "Produto é obrigatório"),
  cargoType: z.string().min(1, "Espécie de carga é obrigatória"),
  totalWeight: z.number().positive("Peso total da carga deve ser positivo"),
  volumes: z.number().optional(),
  cubage: z.number().optional(),
  moreDetails: z.string().optional(),

  vehicleTypes: z
    .array(z.string())
    .min(1, "Selecione pelo menos um tipo de veículo"),
  bodyworkTypes: z
    .array(z.string())
    .min(1, "Selecione pelo menos um tipo de carroceria"),

  shippingType: z.enum(["Coleta", "Entrega", "Ida", "Volta"], {
    errorMap: () => ({ message: "Tipo de embarque é obrigatório" }),
  }),

  value: z.number().positive("Valor do frete deve ser positivo"),
  tollIncluded: z.boolean(),

  observations: z.string().optional(),
});

export type FreightFormValues = z.infer<typeof FreightSchema>;

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CargoLoadType } from "@/utils/enums/cargoLoadTypeEnum";
import { Type } from "@/utils/enums/typeEnum";
import { updateFreightSchema } from "@/utils/validations/updateFreightSchema";
import FreightForm from "../FreightForm";
import { Freight } from "@/utils/interfaces/Freight";

interface EditFreightFormProps {
  initialData?: Freight;
  submit: any;
}

const EditFreightForm: React.FC<EditFreightFormProps> = ({
  initialData,
  submit
}) => {
  const methods = useForm<Freight>({
    resolver: zodResolver(updateFreightSchema),
    defaultValues: {
      pickupDeliveryData: "",
      origin: "",
      destination: "",
      cargoLoadType: CargoLoadType.FULL,
      needsTarp: false,
      needsTracker: false,
      product: "",
      cargoType: undefined,
      totalWeight: undefined,
      volumes: undefined,
      cubage: undefined,
      moreDetails: "",
      eligibleVehicles: [],
      eligibleBodyworks: [],
      type: Type.OFFER,
      pedagioIncluso: undefined,
      paymentType: "",
      observations: "",
      ...initialData,
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof Freight, value);
      });
    }
  }, [initialData, setValue]);

  return (
    <FormProvider {...methods}>
      <FreightForm showEditFreightButton={true} onSubmit={handleSubmit(submit)} />
    </FormProvider>
  );
};

export default EditFreightForm;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FreightSchema, FreightFormValues } from "@/utils/validations";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import PickupDeliverySection from "@/components/FormContainer/PickupDeliverySection";
import CargoDetailsSection from "@/components/FormContainer/CargoDetailsSection";
import VehicleSelectionSection from "@/components/FormContainer/VehicleSelectionSection";
import BodyworkSelectionSection from "./BodyworkSelectionSection";
import ShippingTypeSection from "./ShippingTypeSection";
import FreightValueSection from "./FreightValueSection";
import ObservationsSection from "./ObservationsSection";
import SubmitButtons from "./SubmitButtons";
import styles from "./FormContainer.module.css";

const FormContainer: React.FC = () => {
  const [inputValues, setInputValues] = useState<Partial<CreateFreightInput>>(
    {}
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FreightFormValues>({
    resolver: zodResolver(FreightSchema),
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value, checked } = event.target as HTMLInputElement;
    const inputValue =
      type === "checkbox" || type === "radio" ? checked : value;
    setInputValues((prev) => ({ ...prev, [name]: inputValue }));
    console.log(`Campo ${name} atualizado:`, inputValue);
  };

  const onSubmit = (data: FreightFormValues) => {
    console.log("Dados do frete: ", data);
    // Lógica de envio dos dados
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <PickupDeliverySection
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
        inputValues={inputValues}
      />

      <CargoDetailsSection
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
      />

      <VehicleSelectionSection
        register={register}
        handleInputChange={handleInputChange}
      />

      <BodyworkSelectionSection
        register={register}
        handleInputChange={handleInputChange}
      />

      <ShippingTypeSection
        register={register}
        handleInputChange={handleInputChange}
      />

      <FreightValueSection register={register} errors={errors} />

      <ObservationsSection register={register} errors={errors} />

      <SubmitButtons />
    </form>
  );
};

export default FormContainer;

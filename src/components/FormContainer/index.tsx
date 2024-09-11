import React, { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FreightSchema, FreightFormValues } from "@/utils/validations";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import PickupDeliverySection from "@/components/FormContainer/PickupDeliverySection";
import CargoDetailsSection from "@/components/FormContainer/CargoDetailsSection";
import VehicleSelectionSection from "@/components/FormContainer/VehicleSelectionSection";
import BodyworkSelectionSection from "@/components/FormContainer/BodyworkSelectionSection";
import ShippingTypeSection from "@/components/FormContainer/ShippingTypeSection";
import FreightValueSection from "@/components/FormContainer/FreightValuesSection";
import ObservationsSection from "@/components/FormContainer/ObservationsSection";
import SubmitButtons from "@/components/FormContainer/FreightSubmissionButton";
import styles from "./FormContainer.module.css";
import FreightSubmissionButton from "@/components/FormContainer/FreightSubmissionButton";

const FormContainer: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateFreightInput>();

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setValue(name as keyof CreateFreightInput, value);
  };

  const onSubmit = (data: CreateFreightInput) => {
    // Adicione este console.log para ver todos os dados do formulário
    console.log("Dados completos do formulário:", data);
    // ... lógica de submissão existente ...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PickupDeliverySection
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
        setValue={setValue}
      />
      <CargoDetailsSection
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
        setValue={setValue}
      />
      {/* ... outros componentes de seção ... */}
      <FreightSubmissionButton />
    </form>
  );
};

export default FormContainer;

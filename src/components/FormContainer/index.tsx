import React, { useEffect } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import PickupDeliverySection from "@/components/FormContainer/PickupDeliverySection";
import CargoDetailsSection from "@/components/FormContainer/CargoDetailsSection";
import FreightSubmissionButton from "@/components/FormContainer/FreightSubmissionButton";
import VehicleSelectionSection from "@/components/FormContainer/VehicleSelectionSection";
import styles from "./FormContainer.module.css";
import BodyworkSelectionSection from "./BodyworkSelectionSection";
import ShippingTypeSection from "./ShippingTypeSection";
import ObservationsSection from "./ObservationsSection";
import FreightValueSection from "./FreightValuesSection";

const FormContainer: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateFreightInput>({
    defaultValues: {
      pickupDeliveryData: "",
      origin: "",
      destination: "",
      originCNPJ: "",
      originRazaoSocial: "",
      originEndereco: "",
      destinationCNPJ: "",
      destinationRazaoSocial: "",
      destinationEndereco: "",
      cargoLoadType: null,
      needsTarp: null,
      needsTracker: null,
      product: "",
      cargoType: "",
      totalWeight: null,
      volumes: null,
      cubage: null,
      moreDetails: "",
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setValue(name as keyof CreateFreightInput, value);
  };

  const onSubmit = (data: CreateFreightInput) => {
    console.log("Dados completos do formulário:", data);
    // ... lógica de submissão existente ...
  };

  // Observar todos os campos relevantes
  const watchedFields = watch();

  useEffect(() => {
    console.log("Campos observados:", watchedFields);
  }, [watchedFields]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <PickupDeliverySection
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
        setValue={setValue as UseFormSetValue<CreateFreightInput>}
      />
      <CargoDetailsSection
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
        setValue={setValue as UseFormSetValue<CreateFreightInput>}
      />
      <VehicleSelectionSection
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
        setValue={setValue as UseFormSetValue<CreateFreightInput>}
      />

      <BodyworkSelectionSection
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
        setValue={setValue as UseFormSetValue<CreateFreightInput>}
      />

      <ShippingTypeSection
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
        setValue={setValue as UseFormSetValue<CreateFreightInput>}
      />

      <FreightValueSection
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
        setValue={setValue as UseFormSetValue<CreateFreightInput>}
      />

      <ObservationsSection
        register={register}
        errors={errors}
        handleInputChange={handleInputChange}
        setValue={setValue as UseFormSetValue<CreateFreightInput>}
      />

      <FreightSubmissionButton
        onSubmit={handleSubmit(onSubmit)}
        onDirectToDriver={() => {}}
      />
    </form>
  );
};

export default FormContainer;

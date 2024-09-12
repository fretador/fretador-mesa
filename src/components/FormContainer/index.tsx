import React, { useEffect, useState } from "react";
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
import ModalRoot from "@/components/ModalRoot";
import AssignFreightModal from "@/components/ModalRoot/AssignFreightModal";

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
      needsTarp: false,
      needsTracker: false,
      product: "",
      cargoType: "",
      totalWeight: null,
      volumes: null,
      cubage: null,
      moreDetails: "",
      toolValue: null,
      totalValue: null,
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
  };

  const watchedFields = watch();

  useEffect(() => {
    const filteredFields = Object.fromEntries(
      Object.entries(watchedFields).filter(
        ([key, value]) =>
          value !== undefined &&
          !["cargoValue", "cargoWeight", "toolValue", "totalValue"].includes(
            key
          )
      )
    );
    console.log("Campos observados:", filteredFields);
  }, [watchedFields]);

  const [isAssignFreightModalOpen, setIsAssignFreightModalOpen] =
    useState(false);

  const onDirectToDriver = () => {
    setIsAssignFreightModalOpen(true);
  };

  return (
    <>
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
          onDirectToDriver={onDirectToDriver}
        />
      </form>

      <AssignFreightModal
        isOpen={isAssignFreightModalOpen}
        onRequestClose={() => setIsAssignFreightModalOpen(false)}
      />
    </>
  );
};

export default FormContainer;

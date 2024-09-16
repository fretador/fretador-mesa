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
import { FreightService } from "@/services/freightService";
import { CargoLoadType } from "@/utils/enums/cargoLoadTypeEnum";
import { Type } from "@/utils/enums/typeEnum";

const FormContainer: React.FC = () => {
  const [targetedDriver, setTargetedDriver] = useState<string[]>([]);
  const [isAssignFreightModalOpen, setIsAssignFreightModalOpen] =
    useState(false);

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
      cargoLoadType: CargoLoadType.FULL,
      needsTarp: false,
      needsTracker: false,
      product: "",
      cargoType: undefined,
      totalWeight: undefined,
      volumes: undefined,
      cubage: undefined,
      value: undefined,
      moreDetails: "",
      eligibleVehicles: [],
      eligibleBodyworks: [],
      type: Type.OFFER,
      targetedDrivers: [],
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

  const onSubmit = async (data: CreateFreightInput) => {
    console.log("Dados do formulário:", data, targetedDriver);
    console.log("targetedDriver", data);
    try {
      const freightData = {
        ...data,
        type: targetedDriver.length > 0 ? "TARGETED" : "OFFER",
        targetedDrivers: targetedDriver.length > 0 ? targetedDriver : null,
      };
      console.log("Dados do frete a serem enviados:", freightData);
      const createdFreight = await FreightService.createFreight(freightData);
      console.log("Frete criado com sucesso:", createdFreight);
    } catch (error: any) {
      console.error("Erro ao criar o frete:", error);
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach((err: any) => {
          console.error("Erro GraphQL:", err);
        });
      }
      if (error.networkError) {
        console.error("Erro de rede:", error.networkError);
      }
    }
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

  const handleDirectToDriver = (driverIds?: string[]) => {
    if (driverIds && driverIds.length > 0) {
      setTargetedDriver(driverIds);
      console.log(`Motorista selecionado: ${driverIds}`);
    }
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
          onDirectToDriver={() => setIsAssignFreightModalOpen(true)}
        />
      </form>

      <AssignFreightModal
        isOpen={isAssignFreightModalOpen}
        onRequestClose={() => setIsAssignFreightModalOpen(false)}
        onConfirm={handleDirectToDriver}
      />
    </>
  );
};

export default FormContainer;

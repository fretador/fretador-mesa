import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
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
import AssignFreightModal from "@/components/ModalRoot/AssignFreightModal";
import { CargoLoadType } from "@/utils/enums/cargoLoadTypeEnum";
import { Type } from "@/utils/enums/typeEnum";
import { createFreightSchema } from "@/utils/validations/createFreightSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmationModal from "@/components/ModalRoot/ConfirmationModal";
import { useMutation } from "@apollo/client";
import { CREATE_FREIGHT } from "@/graphql/mutations";
import EditFreightButton from "../EditFreightButton";

interface FormContainerProps {
  initialData?: Partial<CreateFreightInput>
  showFreightSubmissionButton?: boolean
  showEditFreightButton?: boolean
}

const FormContainer: React.FC<FormContainerProps> = ({
  showFreightSubmissionButton = true,
  showEditFreightButton = false,
  initialData
}) => {
  // const [targetedDriver, setTargetedDriver] = useState<string[]>([]);
  const [isAssignFreightModalOpen, setIsAssignFreightModalOpen] =
    useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [createFreightMutation, { loading: creatingFreight, error: createError }] =
    useMutation(CREATE_FREIGHT);

  const methods = useForm<CreateFreightInput>({
    resolver: zodResolver(createFreightSchema),
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
      moreDetails: "",
      eligibleVehicles: [],
      eligibleBodyworks: [],
      type: Type.OFFER,
      targetedDrivers: [],
      value: 0,
      pedagioIncluso: undefined,
      observations: "",
      ...initialData,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = methods;

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof CreateFreightInput, value);
      });
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: CreateFreightInput) => {
    try {
      await createFreightMutation({
        variables: { input: data },
      });
      console.log("Frete submetido com sucesso:", data);
      setIsConfirmationModalOpen(true);
    } catch (error) {
      console.error("Erro ao submeter o frete:", error);
      // Aqui você pode adicionar uma lógica para mostrar um erro ao usuário
    }
  };

  const watchedFields = watch();

  useEffect(() => {
    const filteredFields = Object.fromEntries(
      Object.entries(watchedFields).filter(
        ([key, value]) =>
          value !== undefined &&
          !["cargoValue", "cargoWeight", "toolValue", "totalValue"].includes(key)
      )
    );
    console.log("Campos observados:", filteredFields);
  }, [watchedFields]);

  const handleDirectToDriver = (driverIds?: string[]) => {
    if (driverIds && driverIds.length > 0) {
      // Altera o tipo para TARGETED
      setValue("type", Type.TARGETED);

      // Adiciona os IDs dos motoristas ao array targetedDrivers
      setValue("targetedDrivers", driverIds);

      console.log(`Motoristas selecionados: ${driverIds}`);
      console.log(`Tipo de frete alterado para: ${Type.TARGETED}`);

      setIsAssignFreightModalOpen(false);

      // Submete o formulário automaticamente
      const currentValues = getValues();
      onSubmit(currentValues);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.content}>
          <PickupDeliverySection />

          <CargoDetailsSection />

          <VehicleSelectionSection />

          <BodyworkSelectionSection />

          <ShippingTypeSection />

          <FreightValueSection />

          <ObservationsSection />

          {showFreightSubmissionButton && (
            <FreightSubmissionButton
              onDirectToDriver={() => setIsAssignFreightModalOpen(true)}
            />
          )}

          {showEditFreightButton && (
            <EditFreightButton />
          )}

        </div>
      </form>

      <AssignFreightModal
        isOpen={isAssignFreightModalOpen}
        onRequestClose={() => setIsAssignFreightModalOpen(false)}
        onConfirm={handleDirectToDriver}
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onRequestClose={() => setIsConfirmationModalOpen(false)}
      />
    </FormProvider>
  );
};

export default FormContainer;

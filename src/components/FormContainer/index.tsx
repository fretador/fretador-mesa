import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
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
import { useCreateFreight } from "@/hooks/freight/useCreateFreight";
import EditFreightButton from "../EditFreightButton";
import FreightCreationConfirmationModal from "../ModalRoot/FreightCreationConfirmationModal";
import { Freight } from "@/utils/Interfaces/Freight";

interface FormContainerProps {
  initialData?: Partial<Freight>;
  showFreightSubmissionButton?: boolean;
  showEditFreightButton?: boolean;
}

const FormContainer: React.FC<FormContainerProps> = ({
  showFreightSubmissionButton = true,
  showEditFreightButton = false,
  initialData,
}) => {
  const [isAssignFreightModalOpen, setIsAssignFreightModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isFreightModalOpen, setIsFreightModalOpen] = useState(false);
  const [freightCode, setFreightCode] = useState<string | undefined>(undefined);
  const [freightError, setFreightError] = useState<string | undefined>(undefined);

  const { createFreight } = useCreateFreight();

  const methods = useForm<Freight>({
    resolver: zodResolver(createFreightSchema),
    defaultValues: {
      pickupDeliveryData: "",
      origin: "",
      destination: "",
      cargoLoadType: CargoLoadType.FULL,
      type: Type.OFFER,
      targetedDrivers: [],
      value: initialData?.value ?? 0,
      observations: "",
      ...initialData,
    },
  });

  const { handleSubmit, getValues, setValue } = methods;

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof Freight, value);
      });
    }
  }, [initialData, setValue]);

  const handleCreateOffer = async () => {
    const currentValues = getValues();

    try {
      const { data } = await createFreight({ variables: { input: currentValues } });
      setFreightCode(data?.freightCode);
      setFreightError(undefined);
      setIsFreightModalOpen(true);
    } catch (error) {
      console.error("Erro ao criar o frete:", error);
      setFreightError("An error occurred while creating the freight.");
      setIsFreightModalOpen(true);
    }
  };

  const handleDirectToDriver = () => {
    // Atualiza o tipo do frete para TARGETED
    setValue("type", Type.TARGETED);
    // Abre o modal de confirmação
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmFreight = () => {
    // Após a confirmação, abre o AssignFreightModal
    setIsAssignFreightModalOpen(true);
    setIsConfirmationModalOpen(false);
  };

  const handleAssignFreight = async (driverIds: string[]) => {
    setValue("targetedDrivers", driverIds);
    const currentValues = getValues();

    try {
      const { data } = await createFreightMutation({ variables: { input: currentValues } });
      setFreightCode(data.createFreight.freightCode);
      setFreightError(undefined);
      setIsFreightModalOpen(true);
    } catch (error) {
      console.error("Erro ao criar o frete:", error);
      setFreightError("An error occurred while creating the freight.");
      setIsFreightModalOpen(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleCreateOffer)} className={styles.form}>
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
              onDirectToDriver={handleDirectToDriver}
              onCreateOffer={handleCreateOffer}
            />
          )}
          {showEditFreightButton && <EditFreightButton />}
        </div>
      </form>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onRequestClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmFreight}
      />
      <AssignFreightModal
        isOpen={isAssignFreightModalOpen}
        onRequestClose={() => setIsAssignFreightModalOpen(false)}
        onConfirm={handleAssignFreight}
      />
      <FreightCreationConfirmationModal
        isOpen={isFreightModalOpen}
        onRequestClose={() => setIsFreightModalOpen(false)}
        freightCode={freightCode}
        error={freightError}
      />


    </FormProvider>
  );
};

export default FormContainer;

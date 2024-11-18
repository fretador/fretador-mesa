import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { CreateFreightInput } from "@/utils/Interfaces/CreateFreightInput";
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
  initialData?: Partial<CreateFreightInput>;
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

  const [createFreightMutation] = useMutation(CREATE_FREIGHT);

  const methods = useForm<CreateFreightInput>({
    resolver: zodResolver(createFreightSchema),
    defaultValues: {
      pickupDeliveryData: "",
      origin: "",
      destination: "",
      cargoLoadType: CargoLoadType.FULL,
      type: Type.OFFER, // Tipo inicial é OFFER
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
        setValue(key as keyof CreateFreightInput, value);
      });
    }
  }, [initialData, setValue]);

  const handleCreateOffer = async () => {
    const currentValues = getValues();

    try {
      const { data } = await createFreightMutation({ variables: { input: currentValues } });
      console.log("Frete criado com sucesso:", data.createFreight);
      alert("Frete criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o frete:", error);
      alert("Erro ao criar o frete. Por favor, tente novamente.");
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
    // Salva os motoristas selecionados
    setValue("targetedDrivers", driverIds);
    const currentValues = getValues();

    try {
      const { data } = await createFreightMutation({ variables: { input: currentValues } });
      console.log("Frete criado com sucesso:", data.createFreight);
      alert("Frete criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o frete:", error);
      alert("Erro ao criar o frete. Por favor, tente novamente.");
    }
    console.log("Motoristas selecionados:", driverIds);
    setIsAssignFreightModalOpen(false);
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
    </FormProvider>
  );
};

export default FormContainer;

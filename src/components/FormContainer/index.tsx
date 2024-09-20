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
import { FreightService } from "@/services/freightService";
import { CargoLoadType } from "@/utils/enums/cargoLoadTypeEnum";
import { Type } from "@/utils/enums/typeEnum";
import { createFreightSchema } from "@/utils/validations/createFreightSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmationModal from "@/components/ModalRoot/ConfirmationModal";

const FormContainer: React.FC = () => {
  const [targetedDriver, setTargetedDriver] = useState<string[]>([]);
  const [isAssignFreightModalOpen, setIsAssignFreightModalOpen] =
    useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

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
      // Remova a propriedade 'value' daqui
      moreDetails: "",
      eligibleVehicles: [],
      eligibleBodyworks: [],
      type: Type.OFFER,
      targetedDrivers: [],
      value: undefined, // Adicione esta linha
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const onSubmit = (data: CreateFreightInput) => {
    setIsConfirmationModalOpen(true);
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
      console.log(`Motoristas selecionados: ${driverIds}`);
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

          <FreightSubmissionButton
            onDirectToDriver={() => setIsAssignFreightModalOpen(true)}
          />
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

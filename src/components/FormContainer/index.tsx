import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useAppSelector } from "@/store/store";
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
import { CargoLoadType } from "@/utils/enums/cargoLoadTypeEnum";
import { Type } from "@/utils/enums/typeEnum";
import { createFreightSchema } from "@/utils/validations/createFreightSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateFreight } from "@/hooks/freight/useCreateFreight";
import EditFreightButton from "../EditFreightButton";
import { useRouter } from "next/router";
import Modal from "../Modal";
import DirectToDriver from "../Modal/CriarFretes/DirectToDriver";
import AssignFreight from "../Modal/CriarFretes/AssignFreight";
import OriginAndDestiny from "../Modal/CriarFretes/OriginAndDestiny";

type FormErrors = {
  pickupDeliveryData?: string;
  origin?: string;
  destination?: string;
  product?: string;
  totalWeight?: string;
  eligibleVehicles?: string;
  eligibleBodyworks?: string;
  value?: string;
};

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
  const [isDirectToDriverModalOpen, setIsDirectToDriverModalOpen] = useState(false);
  const [isConfirmationFreightModalOpen, setIsConfirmationFreightModalOpen] = useState(false);
  const [freightCode, setFreightCode] = useState<number | undefined>(undefined);
  const [freightError, setFreightError] = useState<string | undefined>(undefined);
  const boardUser = useAppSelector((state) => state.auth.boardUser);

  const { data, createFreight } = useCreateFreight();

  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>({});

  const methods = useForm<CreateFreightInput>({
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
        setValue(key as keyof CreateFreightInput, value);
      });
    }
  }, [initialData, setValue]);

  const handleCreateOffer = async () => {
    const currentValues = getValues();
    const newErrors: FormErrors = {};

    if (!currentValues.pickupDeliveryData) newErrors.pickupDeliveryData = 'Campo de data do frete não pode ser vazio.';
    if (!currentValues.origin) newErrors.origin = 'Campo de origem do frete não pode ser vazio.';
    if (!currentValues.destination) newErrors.destination = 'Campo de destino do frete não pode ser vazio.';
    if (!currentValues.product) newErrors.product = 'Campo de produto não pode ser vazio.';
    if (currentValues.totalWeight === null) newErrors.totalWeight = 'Campo de peso não pode ser vazio.';
    if (currentValues.eligibleVehicles.every(vehicle => vehicle.eligible === false)) {
      newErrors.eligibleVehicles = 'Você deve selecionar pelo menos um veículo elegível.';
    }
    if (currentValues.eligibleBodyworks.every(bodyWork => bodyWork.eligible === false)) {
      newErrors.eligibleBodyworks = 'Você deve selecionar pelo menos uma carroceria elegível.';
    }
    if (!currentValues.value) newErrors.value = 'Campo de valor do frete não pode ser vazio.';

    if (Object.keys(newErrors).length > 0) {
      alert('Por favor, preencha todos os campos obrigatórios!')
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const result = await createFreight({
        variables: {
          input: {
            ...currentValues,
            boardUser: { name: boardUser?.name, profile: boardUser?.profile }
          }
        }
      });
      setFreightCode(result.data?.createFreight?.freightCode);
      setFreightError(undefined);
      setIsConfirmationFreightModalOpen(true);
    } catch (error) {
      console.error("Erro ao criar o frete:", error);

      // setFreightError("An error occurred while creating the freight.");
      // setIsConfirmationFreightModalOpen(true);
    }
  };

  const handleAssignFreight = async (driverIds: string[]) => {
    setValue("targetedDrivers", driverIds);
    const currentValues = getValues();

    const newErrors: FormErrors = {};

    if (!currentValues.pickupDeliveryData) newErrors.pickupDeliveryData = 'Campo de data do frete não pode ser vazio.';
    if (!currentValues.origin) newErrors.origin = 'Campo de origem do frete não pode ser vazio.';
    if (!currentValues.destination) newErrors.destination = 'Campo de destino do frete não pode ser vazio.';
    if (!currentValues.product) newErrors.product = 'Campo de produto não pode ser vazio.';
    if (currentValues.totalWeight === null) newErrors.totalWeight = 'Campo de peso não pode ser vazio.';
    if (currentValues.eligibleVehicles.every(vehicle => vehicle.eligible === false)) {
      newErrors.eligibleVehicles = 'Você deve selecionar pelo menos um veículo elegível.';
    }
    if (currentValues.eligibleBodyworks.every(bodyWork => bodyWork.eligible === false)) {
      newErrors.eligibleBodyworks = 'Você deve selecionar pelo menos uma carroceria elegível.';
    }
    if (!currentValues.value) newErrors.value = 'Campo de valor do frete não pode ser vazio.';

    if (Object.keys(newErrors).length > 0) {
      alert('Por favor, preencha todos os campos obrigatórios!')
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const result = await createFreight({ variables: { input: currentValues } });
      setFreightCode(result.data?.createFreight?.freightCode);
      setFreightError(undefined);
      setIsConfirmationFreightModalOpen(true);
    } catch (error) {
      console.error("Erro ao criar o frete:", error);
      {
        <Modal
          isOpen={true}
          onRequestClose={() => false}
          modalTitle="Cadastrar frete"
          modalDescription="Ocorreu um erro ao cadastrar o frete. Por favor, tente novamente"
          buttonOneTitle="Ok"
          buttonOneAction={() => false}
        />
      }
      // setFreightError("An error occurred while creating the freight.");
      // setIsConfirmationFreightModalOpen(true);
    }
  };

  const handleDirectToDriver = () => {
    // Atualiza o tipo do frete para TARGETED
    setValue("type", Type.TARGETED);
    // Abre o modal de confirmação
    setIsDirectToDriverModalOpen(true);
  };

  const handleConfirmFreight = () => {
    // Após a confirmação, abre o AssignFreightModal
    setIsAssignFreightModalOpen(true);
    setIsDirectToDriverModalOpen(false);
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

          <div className={styles.errorContainer}>
            {errors.pickupDeliveryData && <p className={styles.error}>{errors.pickupDeliveryData}</p>}
            {errors.origin && <p className={styles.error}>{errors.origin}</p>}
            {errors.destination && <p className={styles.error}>{errors.destination}</p>}
            {errors.product && <p className={styles.error}>{errors.product}</p>}
            {errors.totalWeight && <p className={styles.error}>{errors.totalWeight}</p>}
            {errors.eligibleVehicles && <p className={styles.error}>{errors.eligibleVehicles}</p>}
            {errors.eligibleBodyworks && <p className={styles.error}>{errors.eligibleBodyworks}</p>}
            {errors.value && <p className={styles.error}>{errors.value}</p>}
          </div>
        </div>
      </form>

      <DirectToDriver
        isOpen={isDirectToDriverModalOpen}
        onRequestClose={() => setIsDirectToDriverModalOpen(false)}
        onConfirm={handleConfirmFreight}
      />
      <AssignFreight
        isOpen={isAssignFreightModalOpen}
        onRequestClose={() => setIsAssignFreightModalOpen(false)}
        onConfirm={handleAssignFreight}
      />

      {isConfirmationFreightModalOpen && (
        <Modal
          isOpen={isConfirmationFreightModalOpen}
          onRequestClose={() => setIsConfirmationFreightModalOpen(!isConfirmationFreightModalOpen)}
          modalTitle="Cadastrar frete"
          modalDescription={`Frete ${freightCode} cadastrado com sucesso`}
          buttonOneTitle="Ok"
          buttonOneAction={() => {
            setIsConfirmationFreightModalOpen(!isConfirmationFreightModalOpen)
            router.push("/fretes");
          }}
        />
      )}
    </FormProvider>
  );
};

export default FormContainer;

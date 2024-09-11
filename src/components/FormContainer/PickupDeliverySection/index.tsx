import React, { useState, useEffect } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import OriginCollectionModal from "@/components/ModalRoot/OriginCollectionModal";
import styles from "./PickupDeliverySection.module.css";

interface PickupDeliveryData {
  pickupDeliveryDate: string;
  origin: {
    type: string;
    selectedCity: string;
    selectedState: string;
    senderInfoOption: string;
    additionalInfo: {
      cnpj: string;
      razaoSocial: string;
      endereco: string;
    } | null;
  } | null;
  destination: {
    type: string;
    selectedCity: string;
    selectedState: string;
    senderInfoOption: string;
    additionalInfo: {
      cnpj: string;
      razaoSocial: string;
      endereco: string;
    } | null;
  } | null;
}

interface PickupDeliverySectionProps {
  register: UseFormRegister<CreateFreightInput>;
  errors: FieldErrors<CreateFreightInput>;
  handleInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setValue: UseFormSetValue<CreateFreightInput>;
}

const PickupDeliverySection: React.FC<PickupDeliverySectionProps> = ({
  register,
  errors,
  handleInputChange,
  setValue,
}) => {
  const [isOriginModalOpen, setIsOriginModalOpen] = useState(false);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [pickupDeliveryData, setPickupDeliveryData] =
    useState<PickupDeliveryData>({
      pickupDeliveryDate: "",
      origin: null,
      destination: null,
    });

  const handleOpenOriginModal = () => setIsOriginModalOpen(true);
  const handleCloseOriginModal = () => setIsOriginModalOpen(false);

  const handleOpenDestinationModal = () => setIsDestinationModalOpen(true);
  const handleCloseDestinationModal = () => setIsDestinationModalOpen(false);

  const handleOriginConfirm = (data: PickupDeliveryData["origin"]) => {
    setPickupDeliveryData((prev) => ({ ...prev, origin: data }));
    handleCloseOriginModal();
  };

  const handleDestinationConfirm = (
    data: PickupDeliveryData["destination"]
  ) => {
    setPickupDeliveryData((prev) => ({ ...prev, destination: data }));
    handleCloseDestinationModal();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickupDeliveryData((prev) => ({
      ...prev,
      pickupDeliveryDate: e.target.value,
    }));
    handleInputChange(e);
  };

  useEffect(() => {
    setValue("pickupDeliveryData", pickupDeliveryData.pickupDeliveryDate);

    if (pickupDeliveryData.origin) {
      setValue(
        "origin",
        `${pickupDeliveryData.origin.selectedCity}, ${pickupDeliveryData.origin.selectedState}`
      );
      if (pickupDeliveryData.origin.additionalInfo) {
        setValue("originCNPJ", pickupDeliveryData.origin.additionalInfo.cnpj);
        setValue(
          "originRazaoSocial",
          pickupDeliveryData.origin.additionalInfo.razaoSocial
        );
        setValue(
          "originEndereco",
          pickupDeliveryData.origin.additionalInfo.endereco
        );
      } else {
        setValue("originCNPJ", "");
        setValue("originRazaoSocial", "");
        setValue("originEndereco", "");
      }
    }

    if (pickupDeliveryData.destination) {
      setValue(
        "destination",
        `${pickupDeliveryData.destination.selectedCity}, ${pickupDeliveryData.destination.selectedState}`
      );
      if (pickupDeliveryData.destination.additionalInfo) {
        setValue(
          "destinationCNPJ",
          pickupDeliveryData.destination.additionalInfo.cnpj
        );
        setValue(
          "destinationRazaoSocial",
          pickupDeliveryData.destination.additionalInfo.razaoSocial
        );
        setValue(
          "destinationEndereco",
          pickupDeliveryData.destination.additionalInfo.endereco
        );
      } else {
        setValue("destinationCNPJ", "");
        setValue("destinationRazaoSocial", "");
        setValue("destinationEndereco", "");
      }
    }

    console.log("Dados de pickupDeliveryData atualizados:", pickupDeliveryData);
  }, [pickupDeliveryData, setValue]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Dados da Coleta/Entrega</h2>
      <div className={styles.inputWrapper}>
        <label htmlFor="pickupDeliveryData" className={styles.label}>
          DATA DO CARREGAMENTO
        </label>
        <input
          id="pickupDeliveryData"
          type="date"
          {...register("pickupDeliveryData")}
          onChange={handleDateChange}
          className={styles.inputDate}
        />
        {errors.pickupDeliveryData && (
          <p className={styles.error}>{errors.pickupDeliveryData.message}</p>
        )}
      </div>
      <div className={styles.rowInputs}>
        {/* Origem */}
        <div className={styles.inputGroup}>
          <label htmlFor="origin" className={styles.label}>
            Origem
          </label>
          <input
            id="origin"
            type="text"
            value={
              pickupDeliveryData.origin
                ? `${pickupDeliveryData.origin.selectedCity} - ${pickupDeliveryData.origin.selectedState}`
                : ""
            }
            onClick={handleOpenOriginModal}
            readOnly
            className={`${styles.input} ${errors.origin ? styles.error : ""}`}
            placeholder="Indique a origem ou CNPJ do remetente"
          />
          {errors.origin && (
            <p className={styles.errorMessage}>{errors.origin.message}</p>
          )}
        </div>

        {/* Destino */}
        <div className={styles.inputGroup}>
          <label htmlFor="destination" className={styles.label}>
            Destino
          </label>
          <input
            id="destination"
            type="text"
            value={
              pickupDeliveryData.destination
                ? `${pickupDeliveryData.destination.selectedCity} - ${pickupDeliveryData.destination.selectedState}`
                : ""
            }
            onClick={handleOpenDestinationModal}
            readOnly
            className={`${styles.input} ${
              errors.destination ? styles.error : ""
            }`}
            placeholder="Insira o destino ou CNPJ do destinatário"
          />
          {errors.destination && (
            <p className={styles.errorMessage}>{errors.destination.message}</p>
          )}
        </div>
      </div>

      {/* Modal para Origem */}
      <OriginCollectionModal
        isOpen={isOriginModalOpen}
        onRequestClose={handleCloseOriginModal}
        onConfirm={handleOriginConfirm}
        type="Origem"
      />

      {/* Modal para Destino */}
      <OriginCollectionModal
        isOpen={isDestinationModalOpen}
        onRequestClose={handleCloseDestinationModal}
        onConfirm={handleDestinationConfirm}
        type="Destino"
      />

      {/* Campos ocultos para armazenar os dados adicionais */}
      <input type="hidden" {...register("originCNPJ")} />
      <input type="hidden" {...register("originRazaoSocial")} />
      <input type="hidden" {...register("originEndereco")} />
      <input type="hidden" {...register("destinationCNPJ")} />
      <input type="hidden" {...register("destinationRazaoSocial")} />
      <input type="hidden" {...register("destinationEndereco")} />
    </section>
  );
};

export default PickupDeliverySection;

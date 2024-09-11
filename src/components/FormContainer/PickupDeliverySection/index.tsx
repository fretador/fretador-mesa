import React, { useState, useEffect } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import OriginCollectionModal from "@/components/ModalRoot/OriginCollectionModal";
import styles from "./PickupDeliverySection.module.css";

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
  const [pickupDeliveryData, setPickupDeliveryData] = useState({
    pickupDeliveryDate: "",
    origin: null,
    destination: null,
  });

  const handleOpenOriginModal = () => setIsOriginModalOpen(true);
  const handleCloseOriginModal = () => setIsOriginModalOpen(false);

  const handleOpenDestinationModal = () => setIsDestinationModalOpen(true);
  const handleCloseDestinationModal = () => setIsDestinationModalOpen(false);

  const handleOriginConfirm = (data) => {
    setPickupDeliveryData((prev) => ({ ...prev, origin: data }));
    handleCloseOriginModal();
  };

  const handleDestinationConfirm = (data) => {
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
    setValue("origin", pickupDeliveryData.origin?.selectedCity || "");
    setValue("destination", pickupDeliveryData.destination?.selectedCity || "");
    console.log("Dados de pickupDeliveryData:", pickupDeliveryData);
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
            value={pickupDeliveryData.origin?.selectedCity || ""}
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
            value={pickupDeliveryData.destination?.selectedCity || ""}
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
    </section>
  );
};

export default PickupDeliverySection;

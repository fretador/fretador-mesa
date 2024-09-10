import React, { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import OriginCollectionModal from "@/components/ModalRoot/OriginCollectionModal"; // Supondo que o modal esteja nesta pasta
import styles from "./PickupDeliverySection.module.css"; // Importação dos estilos específicos
import ReactModal from "react-modal";

interface PickupDeliverySectionProps {
  register: UseFormRegister<CreateFreightInput>;
  errors: FieldErrors<CreateFreightInput>;
  handleInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const PickupDeliverySection: React.FC<PickupDeliverySectionProps> = ({
  register,
  errors,
  handleInputChange,
}) => {
  const [isOriginModalOpen, setIsOriginModalOpen] = useState(false);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [originData, setOriginData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);

  const handleOpenOriginModal = () => setIsOriginModalOpen(true);
  const handleCloseOriginModal = () => setIsOriginModalOpen(false);

  const handleOpenDestinationModal = () => setIsDestinationModalOpen(true);
  const handleCloseDestinationModal = () => setIsDestinationModalOpen(false);

  const handleOriginConfirm = (data) => {
    console.log("Dados de origem recebidos:", data);
    setOriginData(data);
    handleCloseOriginModal();
  };

  const handleDestinationConfirm = (data) => {
    console.log("Dados de destino recebidos:", data);
    setDestinationData(data);
    handleCloseDestinationModal();
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Dados da Coleta/Entrega</h2>
      <div className={styles.inputWrapper}>
        <label
          htmlFor="pickupDeliveryData"
          style={{
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: "24px",
            marginRight: "2rem",
          }}
        >
          DATA DO CARREGAMENTO
        </label>
        <input
          id="pickupDeliveryData"
          type="date"
          {...register("pickupDeliveryData")}
          onChange={handleInputChange}
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
            value={originData?.selectedCity} // Exibe o valor da cidade selecionada
            onClick={handleOpenOriginModal} // Abre o modal ao clicar no campo
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
            value={destinationData?.selectedCity} // Exibe o valor da cidade selecionada
            onClick={handleOpenDestinationModal} // Abre o modal ao clicar no campo
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

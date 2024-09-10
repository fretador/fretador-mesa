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
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  // Funções para abrir e fechar o modal
  const openOriginModal = () => setIsOriginModalOpen(true);
  const closeOriginModal = () => setIsOriginModalOpen(false);

  const openDestinationModal = () => setIsDestinationModalOpen(true);
  const closeDestinationModal = () => setIsDestinationModalOpen(false);

  // Funções para definir origem e destino
  const handleOriginConfirm = (city: string, state: string) => {
    setOrigin(`${city} - ${state}`);
    closeOriginModal();
  };

  const handleDestinationConfirm = (city: string, state: string) => {
    setDestination(`${city} - ${state}`);
    closeDestinationModal();
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
            value={origin} // Exibe o valor da cidade selecionada
            onClick={openOriginModal} // Abre o modal ao clicar no campo
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
            value={destination} // Exibe o valor da cidade selecionada
            onClick={openDestinationModal} // Abre o modal ao clicar no campo
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
        onRequestClose={closeOriginModal}
        onConfirm={handleOriginConfirm}
        type="Origem"
      />

      {/* Modal para Destino */}
      <OriginCollectionModal
        isOpen={isDestinationModalOpen}
        onRequestClose={closeDestinationModal}
        onConfirm={handleDestinationConfirm}
        type="Destino"
      />
    </section>
  );
};

export default PickupDeliverySection;

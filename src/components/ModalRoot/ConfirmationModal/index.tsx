import React, { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import { FreightService } from "@/services/freightService";
import styles from "./ConfirmationModal.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "@/components/Loading";

interface ConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const { getValues } = useFormContext<CreateFreightInput>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Filtrar os veículos e carrocerias elegíveis
  const eligibleVehicles = getValues("eligibleVehicles").filter(
    (vehicle: any) => vehicle.eligible
  );
  const eligibleBodyworks = getValues("eligibleBodyworks").filter(
    (bodywork: any) => bodywork.eligible
  );

  const handleConfirm = async () => {
    const freightData = getValues();
    setIsLoading(true);
    try {
      const createdFreight = await FreightService.createFreight(freightData);
      console.log("Frete criado com sucesso:", createdFreight);
      setIsSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao criar o frete:", error);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onRequestClose();
    router.push("/fretes");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.content}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Cadastrar carga</h2>
        <button className={styles.closeButton} onClick={onRequestClose}>
          <AiOutlineCloseCircle size={32} />
        </button>
      </div>

      <div className={styles.modalContent}>
        {isLoading ? (
          <Loading />
        ) : isSuccess ? (
          <>
            <p className={`${styles.successMessage} ${styles.boldText}`}>
              Carga cadastrada com sucesso!
            </p>
          </>
        ) : (
          <>
            <p className={`${styles.modalMessage} ${styles.boldText}`}>
              Confirmar dados da carga:
            </p>
            <p>
              <span className={styles.boldText}>Data da Coleta:</span>{" "}
              <span className={styles.regularText}>
                {getValues("pickupDeliveryData") || "00/00/0000"}
              </span>
            </p>
            <p>
              <span className={styles.boldText}>Origem:</span>{" "}
              <span className={styles.regularText}>{getValues("origin")}</span>
            </p>
            <p>
              <span className={styles.boldText}>Destino:</span>{" "}
              <span className={styles.regularText}>
                {getValues("destination")}
              </span>
            </p>
            <p>
              <span className={styles.boldText}>Tipo de Veículo:</span>{" "}
              <span className={styles.regularText}>
                {eligibleVehicles.length > 0
                  ? eligibleVehicles
                      .map((vehicle: any) => vehicle.type)
                      .join(", ")
                  : "Nenhum veículo selecionado"}
              </span>
            </p>
            <p>
              <span className={styles.boldText}>Tipo de Carroceria:</span>{" "}
              <span className={styles.regularText}>
                {eligibleBodyworks.length > 0
                  ? eligibleBodyworks
                      .map((bodywork: any) => bodywork.type)
                      .join(", ")
                  : "Nenhuma carroceria selecionada"}
              </span>
            </p>
          </>
        )}
      </div>

      <div className={styles.buttonGroup}>
        {isSuccess ? (
          <button className={styles.confirmButton} onClick={handleClose}>
            OK
          </button>
        ) : (
          <button className={styles.confirmButton} onClick={handleConfirm}>
            Confirmar
          </button>
        )}
      </div>
    </Modal>
  );
};

export default ConfirmationModal;

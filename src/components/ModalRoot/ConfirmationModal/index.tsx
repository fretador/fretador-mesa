import React, { useState } from "react";
import Modal from "react-modal";
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/Interfaces/CreateFreightInput";
import styles from "./ConfirmationModal.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "@/components/Loading";

interface ConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
}) => {
  const { getValues } = useFormContext<CreateFreightInput>();
  const [isLoading, setIsLoading] = useState(false);

  // Dicionários para exibição amigável
  const vehicleTypeDictionary: { [key: string]: string } = {
    UTILITARIO: "Utilitário",
    TOCO: "Toco",
    HR: "HR",
    TRES_QUARTOS: "Três Quartos",
    TRUCK: "Truck",
    BITRUCK: "Bitruck",
    CARRETA: "Carreta",
    CARRETA_LS: "Carreta LS",
    CARRETA_TRUCADA: "Carreta Trucada",
    CARRETA_VANDERLEIA: "Carreta Vanderléia",
    BITREM: "Bitrem",
    RODOTREM: "Rodotrem",
  };

  const bodyworkTypeDictionary: { [key: string]: string } = {
    GRADE_BAIXA: "Grade Baixa",
    GRADE_ALTA: "Grade Alta",
    CARROCERIA: "Carroceria",
    PLATAFORMA: "Plataforma",
    BAU: "Baú",
    BAU_FRIGORIFICO: "Baú Frigorífico",
    SIDER: "Sider",
    CACAMBA: "Caçamba",
    TANQUE: "Tanque",
    GRANELEIRO: "Graneleiro",
    MUNCK: "Munck",
  };

  const eligibleVehicles = (getValues("eligibleVehicles") || []).filter(
    (vehicle: any) => vehicle.eligible
  );
  const eligibleBodyworks = (getValues("eligibleBodyworks") || []).filter(
    (bodywork: any) => bodywork.eligible
  );

  const formatDate = (date: string | undefined): string => {
    if (!date) return "00/00/0000";
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("pt-BR");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.content}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Confirmar dados do frete</h2>
        <button className={styles.closeButton} onClick={onRequestClose}>
          <AiOutlineCloseCircle size={32} />
        </button>
      </div>

      <div className={styles.modalContent}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <p>
              <span className={styles.boldText}>Data da Coleta:</span>{" "}
              <span className={styles.regularText}>
                {formatDate(getValues("pickupDeliveryData"))}
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
                      .map(
                        (vehicle: any) =>
                          vehicleTypeDictionary[vehicle.type] || vehicle.type
                      )
                      .join(", ")
                  : "Nenhum veículo selecionado"}
              </span>
            </p>
            <p>
              <span className={styles.boldText}>Tipo de Carroceria:</span>{" "}
              <span className={styles.regularText}>
                {eligibleBodyworks.length > 0
                  ? eligibleBodyworks
                      .map(
                        (bodywork: any) =>
                          bodyworkTypeDictionary[bodywork.type] ||
                          bodywork.type
                      )
                      .join(", ")
                  : "Nenhuma carroceria selecionada"}
              </span>
            </p>
          </>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.confirmButton} onClick={onConfirm}>
          Confirmar
        </button>
        <button className={styles.cancelButton} onClick={onRequestClose}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;

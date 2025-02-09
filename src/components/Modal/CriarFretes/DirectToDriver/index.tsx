import React, { useState } from "react";
import Modal from "../..";
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/Interfaces/CreateFreightInput";
import styles from "./DirectToDriver.module.css";
import SmallLoading from "@/components/SmallLoading";

interface DirectToDriverProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

const DirectToDriver: React.FC<DirectToDriverProps> = ({
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
      modalTitle="Confirmar dados do frete"
      modalDescription=""
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={onConfirm}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={onRequestClose}

    >
      <div className={styles.modalContent}>
        {isLoading ? (
          <SmallLoading />
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
    </Modal>
  );
};

export default DirectToDriver;

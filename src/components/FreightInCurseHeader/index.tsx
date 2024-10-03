import React from "react";
import styles from "./FreightInCurseHeader.module.css";
import Image from "next/image";
import {
  LogoWhatsAppIcon,
  ShipmentCheckIcon,
  ShippingBoxIcon,
  VerticalDotsIcon,
} from "@/utils/icons";
import { FreightStatus } from "@/utils/enums/freightStatusEnum"; // Importa o enum

// Define os tipos de status possíveis
type StatusFreightProps = keyof typeof FreightStatus;

// Define as props recebidas
interface FreightInCurseProps {
  freightCode: string;
  statusFreight: StatusFreightProps;
  driverName: string;
  origin: string;
  destination: string;
  driverPhoto: string;
}

// Dicionário para converter os status
const statusMessages: { [key in StatusFreightProps]: string } = {
  WAITING: "Aguardando Motorista",
  TARGETED: "Motorista Selecionado",
  REQUESTED: "Frete solicitado",
  APPROVED: "Frete aprovado",
  PICKUP_ORDER_SENT: "Ordem de coleta enviada",
  OPERATION_REQUIRED: "Operação necessária",
  OPERATION_APPROVED: "Operação aprovada",
  ADMIN_REQUIRED: "Administração necessária",
  ADMIN_APPROVED: "Administração aprovada",
  FINANCIAL_REQUIRED: "Financeiro necessário",
  FINANCIAL_APPROVED: "Financeiro aprovado",
  LOADING_STARTED: "Carregamento iniciado",
  LOADING_FINISHED: "Carregamento finalizado",
  UNLOADING_STARTED: "Descarregamento iniciado",
  UNLOADING_FINISHED: "Descarregamento finalizado",
  INVOICE_SENT: "Nota fiscal enviada",
  INVOICE_COUPON_SENT: "Cupom da nota fiscal enviado",
  INVOICE_COUPON_REFUSED: "Cupom da nota fiscal recusado",
  DRIVER_ARRIVED: "Motorista chegou",
  DRIVER_SELECTED: "Motorista selecionado",
  FINISHED: "Finalizado",
  CANCELED: "Cancelado",
};

// Função para extrair cidade e estado
const extractCityAndState = (location: string) => {
  if (!location) {
    return { city: "", state: "" };
  }
  const parts = location.split(",").map((part) => part.trim());
  if (parts.length < 2) {
    return { city: location, state: "" }; // Retorna o location original como cidade se não conseguir encontrar uma vírgula
  }
  const [city, state] = parts;
  return { city, state };
};

const FreightInCurseHeader = ({
  freightCode,
  statusFreight,
  driverName,
  origin,
  destination,
  driverPhoto,
}: FreightInCurseProps) => {
  // Extração da cidade e estado para origin e destiny
  const { city: cityOrigin, state: stateOrigin } = extractCityAndState(origin);
  const { city: cityDestiny, state: stateDestiny } =
    extractCityAndState(destination);

  // Converte o status para uma mensagem amigável
  const statusMessage = statusMessages[statusFreight];

  return (
    <div className={styles.container}>
      <h2>VIAGEM #{freightCode}</h2>

      <div className={styles.freightInformations}>
        <div className={styles.driverInformationsContainer}>
          <Image
            src={driverPhoto}
            width={80}
            height={80}
            alt="imagem do perfil do motorista"
            className={styles.driverInformationsImage}
          />

          <div className={styles.driverInformations}>
            <p className={styles.driverName}>{driverName}</p>

            <div className={styles.origin}>
              <ShippingBoxIcon />
              <p>
                {cityOrigin} - {stateOrigin}
              </p>
            </div>

            <div className={styles.verticalDotsIcon}>
              <VerticalDotsIcon />
            </div>

            <div className={styles.destiny}>
              <ShipmentCheckIcon />
              <p>
                {cityDestiny} - {stateDestiny}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.statusFreight}>{statusMessage}</div>

        <div className={styles.whatsAppContainer}>
          <LogoWhatsAppIcon />
        </div>
      </div>
    </div>
  );
};

export default FreightInCurseHeader;

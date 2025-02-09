import React from "react";
import styles from "./FreightInCurseHeader.module.css";
import Image from "next/image";
import {
  LogoWhatsAppIcon,
  PencilIcon,
  ShipmentCheckIcon,
  ShippingBoxIcon,
  VerticalDotsIcon,
} from "@/utils/icons";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { freightStatusLabels } from '@/utils/labels/freightStatusLabels';
import { useRouter } from "next/router";

// Define as props recebidas
interface FreightInCurseProps {
  freightCode: string;
  statusFreight: keyof typeof FreightStatus;
  driverName: string;
  origin: string;
  destination: string;
  driverPhoto: string;
  freightId: string;
}

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
  freightId,
}: FreightInCurseProps) => {
  // Extração da cidade e estado para origin e destiny
  const { city: cityOrigin, state: stateOrigin } = extractCityAndState(origin);
  const { city: cityDestiny, state: stateDestiny } =
    extractCityAndState(destination);
  
  const statusMessage = freightStatusLabels[statusFreight as keyof typeof freightStatusLabels] || 'Status Desconhecido';

  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/editar-frete/${freightId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>VIAGEM #{freightCode}</h2>
        <div className={styles.iconContainer} onClick={handleEditClick}>
          <PencilIcon />
          <p>Editar</p>
        </div>
      </div>

      <div className={styles.freightInformations}>
        <div className={styles.driverInformationsContainer}>
          <Image
            src={driverPhoto || "/assets/images/avatar.png"}
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

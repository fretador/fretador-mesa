import React from "react";
import styles from "./VehicleDetails.module.css";
import { PencilSolidIcon } from "@/utils/icons";
import ActionButtons from "../ActionButtons";
import {
  BodyworkCategory,
  BodyworkType,
} from "@/utils/enums/bodyworkEnums";
import {
  VehicleCategory,
  VehicleType,
} from "@/utils/enums/vehicleEnums";

interface VehicleDetailsProps {
  vehicle: {
    type: string;
    plate: string;
    renavam: string;
    chassi: string;
    antt: string;
    tracker: string;
    ownerName: string;
    ownerDocument: string;
    bodyworkCategory: BodyworkCategory;
    bodyworkType: BodyworkType;
    vehicleCategory: VehicleCategory;
    vehicleType: VehicleType;
  };
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle }) => {
  return (
    <>
      {/* Veículo */}
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p>Dados do Veículo</p>
          <div className={styles.pencilIcon}>
            <PencilSolidIcon />
          </div>
        </div>

        <div className={styles.informations}>
          <div className={styles.lineOne}>
            <p>
              Veículo: <span>{vehicle.vehicleType}</span>
            </p>
            <p>
              RENAVAM: <span>{vehicle.renavam}</span>
            </p>
            <p>
              Placa: <span>{vehicle.plate}</span>
            </p>
            <p>
              Chassi: <span>{vehicle.chassi}</span>
            </p>
          </div>

          <div className={styles.lineTwo}>
            <p>
              ANTT: <span>{vehicle.antt}</span>
            </p>
            <p>
              Rastreador: <span>{vehicle.tracker}</span>
            </p>
            <p>
              Proprietário: <span>{vehicle.ownerName}</span>
            </p>
          </div>

          <div className={styles.lineThree}>
            <p>
              CPF/CNPJ: <span>{vehicle.ownerDocument}</span>
            </p>
            <p>
              Categoria: <span>{vehicle.vehicleCategory}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Carroceria */}
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p>Dados da Carroceria</p>
          <div className={styles.pencilIcon}>
            <PencilSolidIcon />
          </div>
        </div>

        <div className={styles.informations}>
          <div className={styles.lineOne}>
            <p>
              Categoria: <span>{vehicle.bodyworkCategory}</span>
            </p>
            <p>
              Tipo: <span>{vehicle.bodyworkType}</span>
            </p>
          </div>
        </div>
      </div>

      <ActionButtons />
    </>
  );
};

export default VehicleDetails;

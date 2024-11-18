import React from "react";
import styles from "./DriverAndOwnerDetails.module.css";
import { DownloadIcon, LogoWhatsAppIcon, PencilSolidIcon } from "@/utils/icons";
import Botao from "@/components/Botao";
import ActionButtons from "../ActionButtons";
import { Driver } from "@/utils/Interfaces/Driver";

interface DriverAndOwnerDetailsProps {
  driver: Driver;
}

const DriverAndOwnerDetails = ({ driver }: DriverAndOwnerDetailsProps) => {
  return (
    <>
      {/* Motorista */}
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p>Dados do Motorista</p>
          <div className={styles.pencilIcon}>
            <PencilSolidIcon />
          </div>
        </div>

        <div className={styles.informations}>
          <div className={styles.nameAndCpf}>
            <p className={styles.driverName}>
              Nome: <span>{driver.name}</span>
            </p>
            <p>
              CPF: <span>{driver.cpf}</span>
            </p>
          </div>

          <div className={styles.cnhAndContact}>
            <p>
              CNH: <span>{driver.cnh}</span>
            </p>
            <div className={styles.whatsappContainer}>
              <LogoWhatsAppIcon />
              <p>
                <span>{driver.phoneNumber}</span>
              </p>
            </div>
            <p>
              E-mail: <span>{driver.email}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Proprietário */}
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p>Dados do Proprietário</p>
          <div className={styles.pencilIcon}>
            <PencilSolidIcon />
          </div>
        </div>

        <div className={styles.informations}>
          <div className={styles.nameAndCpf}>
            <p className={styles.driverName}>
              Nome: <span>{driver.owner.name}</span>
            </p>
            <p>
              CPF: <span>{driver.owner.cpf}</span>
            </p>
          </div>

          <div className={styles.cnhAndContact}>
            <p>
              CNH: <span>{driver.owner.cnh}</span>
            </p>
            <div className={styles.whatsappContainer}>
              <LogoWhatsAppIcon />
              <p>
                <span>{driver.owner.phoneNumber}</span>
              </p>
            </div>
            <p>
              E-mail: <span>{driver.owner.email}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Pagamento */}
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p>Dados do Pagamento</p>
          <div className={styles.pencilIcon}>
            <PencilSolidIcon />
          </div>
        </div>

        <div className={styles.informations}>
          <div className={styles.nameAndCpf}>
            <p className={styles.driverName}>
              Favorecido: <span>{driver.owner.name}</span>
            </p>
            <p>
              CPF/CNPJ: <span>{driver.owner.cpf}</span>
            </p>
          </div>

          <div className={styles.bankDetailsAndPix}>
            <p>
              Dados Bancários:{" "}
              <span>
                Banco: {driver.owner.bankName} / Ag {driver.owner.bankAgency} /
                CC - {driver.owner.bankAccount}
              </span>
            </p>
            <p>
              PIX: <span>{driver.owner.pix}</span>
            </p>
          </div>
        </div>
      </div>

      <ActionButtons />
    </>
  );
};

export default DriverAndOwnerDetails;

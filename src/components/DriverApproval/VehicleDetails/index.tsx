import React from "react";
import styles from './VehicleDetails.module.css'
import { DownloadIcon, LogoWhatsAppIcon, PencilSolidIcon } from "@/utils/icons";
import Botao from "@/components/Botao";
import ActionButtons from "../ActionButtons";

const VehicleDetails = () => {
  return (
    <>
      {/* Veículo */}
      <div className={styles.container}>

        <div className={styles.titleContainer}>
          <p>Dados do Veículos</p>
          <div className={styles.pencilIcon}><PencilSolidIcon /></div>
        </div>

        <div className={styles.informations}>
          <div className={styles.lineOne}>
            <p>Caminhão: <span>Carreta Simples</span></p>
            <p>RENAVAM: <span>54426167766</span></p>
            <p>Placa: <span>AAA-1A23</span></p>
            <p>Chassi: <span>6ajhdhdhfEgbsb2s</span></p>
          </div>

          <div className={styles.lineTwo}>
            <p>ANTT: <span>88888888</span></p>
            <p>Rastreador: <span>Sascar</span></p>
            <p>Proprietário: <span>CCJJ Transp. Novo Rodovia LTDA</span></p>
          </div>

          <div className={styles.lineThree}>
            <p>CPF/CNPJ: <span>000.000.000-00</span></p>
          </div>
        </div>

      </div>

      {/* Carreta */}
      <div className={styles.container}>

        <div className={styles.titleContainer}>
          <p>Dados da Carreta</p>
          <div className={styles.pencilIcon}><PencilSolidIcon /></div>
        </div>

        <div className={styles.informations}>
          <div className={styles.lineOne}>
            <p>Caminhão: <span>Carreta Simples</span></p>
            <p>RENAVAM: <span>54426167766</span></p>
            <p>Placa: <span>AAA-1A23</span></p>
            <p>Chassi: <span>6ajhdhdhfEgbsb2s</span></p>
          </div>

          <div className={styles.lineTwo}>
            <p>ANTT: <span>88888888</span></p>
            <p>Rastreador: <span>Sascar</span></p>
            <p>Proprietário: <span>CCJJ Transp. Novo Rodovia LTDA</span></p>
          </div>

          <div className={styles.lineThree}>
            <p>CPF/CNPJ: <span>000.000.000-00</span></p>
          </div>
        </div>

      </div>

      <ActionButtons />
    </>
    

  )
}

export default VehicleDetails
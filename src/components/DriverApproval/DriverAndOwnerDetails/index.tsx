import React from "react";
import styles from './DriverAndOwnerDetails.module.css'
import { DownloadIcon, LogoWhatsAppIcon, PencilSolidIcon } from "@/utils/icons";
import Botao from "@/components/Botao";
import ActionButtons from "../ActionButtons";

const DriverAndOwnerDetails = () => {
  return (
    <>
      {/* Motorista */}
      <div className={styles.container}>

        <div className={styles.titleContainer}>
          <p>Dados do Motorista</p>
          <div className={styles.pencilIcon}><PencilSolidIcon /></div>
        </div>

        <div className={styles.informations}>
          <div className={styles.nameAndCpf}>
            <p className={styles.driverName}>Nome: <span>José Carlos da Silva dos Santos Magalhães Ribeiro</span></p>
            <p>CPF: <span>000.000.000-00</span></p>
          </div>

          <div className={styles.cnhAndContact}>
            <p>CNH: <span>82114037783</span></p>
            <div className={styles.whatsappContainer}>
              <LogoWhatsAppIcon />
              <p><span>(88)98888-8888</span></p>
            </div>
            <p>E-mail: <span>josecarlosdasilva@gmail.com</span></p>
          </div>
        </div>

      </div>

      {/* Proprietário */}
      <div className={styles.container}>

        <div className={styles.titleContainer}>
          <p>Dados do Proprietário</p>
          <div className={styles.pencilIcon}><PencilSolidIcon /></div>
        </div>

        <div className={styles.informations}>
          <div className={styles.nameAndCpf}>
            <p className={styles.driverName}>Nome: <span>José Carlos da Silva dos Santos Magalhães Ribeiro</span></p>
            <p>CPF: <span>000.000.000-00</span></p>
          </div>

          <div className={styles.cnhAndContact}>
            <p>CNH: <span>82114037783</span></p>
            <div className={styles.whatsappContainer}>
              <LogoWhatsAppIcon />
              <p><span>(88)98888-8888</span></p>
            </div>
            <p>E-mail: <span>josecarlosdasilva@gmail.com</span></p>
          </div>
        </div>

      </div>

      {/* Pagamento */}
      <div className={styles.container}>

        <div className={styles.titleContainer}>
          <p>Dados do Pagamento</p>
          <div className={styles.pencilIcon}><PencilSolidIcon /></div>
        </div>

        <div className={styles.informations}>
          <div className={styles.nameAndCpf}>
            <p className={styles.driverName}>Favorecido: <span>José Carlos da Silva dos Santos Magalhães Ribeiro</span></p>
            <p>CPF/CNPJ: <span>000.000.000-00</span></p>
          </div>

          <div className={styles.bankDetailsAndPix}>
            <p>Dados Bancários: <span>Banco: Bradesco (237) / Ag 0000 / CC - 000000-0</span></p>
            <p>PIX: <span>josecarlosdasilva@gmail.com</span></p>
          </div>
        </div>

      </div>

      <ActionButtons />
    </>
    

  )
}

export default DriverAndOwnerDetails
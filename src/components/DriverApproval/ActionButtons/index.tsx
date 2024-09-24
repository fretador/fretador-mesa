import React from "react";
import styles from './ActionButtons.module.css'
import Botao from "@/components/Botao";
import { DownloadIcon } from "@/utils/icons";

const ActionButtons = () => {

  const handleApprove = () => {
    console.log('Aprovou motorista')
  }

  const handleRequest = () => {
    console.log('Solicitou novos documentos')
  }

  const handleDownload = () => {
    console.log('Baixou os documentos')
  }

  const handleBlock = () => {
    console.log('Bloqueou o motorista')
  }

  return (
    <div className={styles.buttonsContainer}>
      <Botao text="Aprovar Cadastro" className={`${styles.button} ${styles.approve}`} onClick={handleApprove} />
      <Botao text="Solicitar Documento" className={`${styles.button} ${styles.request}`} onClick={handleRequest} />
      <Botao text={<div className={styles.downloadButton}><DownloadIcon /> <p>Download PDF</p></div>} className={`${styles.button} ${styles.download}`} onClick={handleDownload} />
      <Botao text="Bloquear Motorista" className={`${styles.button} ${styles.block}`} onClick={handleBlock} />
    </div>
  )
}

export default ActionButtons
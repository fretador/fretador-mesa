import React from "react";
import styles from './ActionButtons.module.css';
import Botao from "@/components/Botao";
import { DownloadIcon } from "@/utils/icons";

interface ActionButtonsProps {
  showApprove?: boolean;
  showRequest?: boolean;
  showDownload?: boolean;
  showBlock?: boolean;
  showUnblock?: boolean;
}

const ActionButtons = ({ showApprove, showRequest, showDownload, showBlock, showUnblock }: ActionButtonsProps) => {
  const handleApprove = () => {
    console.log('Aprovou motorista');
  };

  const handleRequest = () => {
    console.log('Solicitou novos documentos');
  };

  const handleDownload = () => {
    console.log('Baixou os documentos');
  };

  const handleBlock = () => {
    console.log('Bloqueou o motorista');
  };

  const handleUnblock = () => {
    console.log('Desbloqueou o motorista');
  };

  return (
    <div className={styles.buttonsContainer}>
      {showApprove && (
        <Botao text="Aprovar Cadastro" className={`${styles.button} ${styles.approve}`} onClick={handleApprove} />
      )}
      {showRequest && (
        <Botao text="Solicitar Documento" className={`${styles.button} ${styles.request}`} onClick={handleRequest} />
      )}
      {showDownload && (
        <Botao
          text={
            <div className={styles.downloadButton}>
              <DownloadIcon /> <p>Download PDF</p>
            </div>
          }
          className={`${styles.button} ${styles.download}`}
          onClick={handleDownload}
        />
      )}
      {showBlock && (
        <Botao text="Bloquear Motorista" className={`${styles.button} ${styles.block}`} onClick={handleBlock} />
      )}
      {showUnblock && (
        <Botao text="Desbloquear Motorista" className={`${styles.button} ${styles.unblock}`} onClick={handleUnblock} />
      )}
    </div>
  );
};

export default ActionButtons;

import React from "react";
import styles from "./FreightInCourseOptions.module.css";
import {
  DangerIcon,
  PaperClipIcon,
  PencilIcon,
  WhatsAppIcon,
} from "@/utils/icons";

const FreightInCourseOptions = () => {
  const handleSendOccurrence = () => {
    console.log("Enviou ocorrência");
  };

  const handleAttachDocuments = () => {
    console.log("Anexou documentos");
  };

  const handleSendAlert = () => {
    console.log("Enviou alerta");
  };

  const handleTalkToDriver = () => {
    console.log("Falou com o motorista");
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer} onClick={handleAttachDocuments}>
        <PaperClipIcon />
        <p>Anexar Documentos</p>
      </div>

      <div className={styles.iconContainer} onClick={handleSendOccurrence}>
        <PencilIcon />
        <p>Enviar Ocorrência</p>
      </div>

      <div className={styles.iconContainer} onClick={handleSendAlert}>
        <DangerIcon />
        <p>Enviar Alertas</p>
      </div>

      <div className={styles.iconContainer} onClick={handleTalkToDriver}>
        <WhatsAppIcon />
        <p>Falar Com Motorista</p>
      </div>
    </div>
  );
};

export default FreightInCourseOptions;

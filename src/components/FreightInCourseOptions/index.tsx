import React, { useRef, useState } from "react";
import styles from "./FreightInCourseOptions.module.css";
import { useDocumentController } from "@/controllers/documentController";
import {
  DangerIcon,
  PaperClipIcon,
  PencilIcon,
  WhatsAppIcon,
} from "@/utils/icons";

const FreightInCourseOptions: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadDocuments, processingStatus } = useDocumentController();

  const handleSendOccurrence = () => {
    console.log("Enviou ocorrência");
  };

  const handleAttachDocuments = () => {
    fileInputRef.current?.click();
  };

  const handleSendAlert = () => {
    console.log("Enviou alerta");
  };

  const handleTalkToDriver = () => {
    console.log("Falou com o motorista");
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(event) => uploadDocuments(event)}
        multiple
      />
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

      {processingStatus && <p>{processingStatus}</p>}
    </div>
  );
};

export default FreightInCourseOptions;

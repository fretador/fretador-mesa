import React, { useRef, useState } from "react";
import styles from "./FreightInCourseOptions.module.css";
import { useDocumentController } from "@/controllers/documentController";
import {
  DangerIcon,
  PaperClipIcon,
  PencilIcon,
  WhatsAppIcon,
} from "@/utils/icons";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import DocumentSentModal from "@/components/ModalRoot/DocumentSentModal";
import { UpdateDataTypeEnum } from "@/utils/enums/updateDataTypeEnum";
import { FreightService } from "@/services/freightService";

// Adicione esta prop ao componente
interface FreightInCourseOptionsProps {
  freightId: string;
}

const FreightInCourseOptions: React.FC<FreightInCourseOptionsProps> = ({
  freightId,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadDocuments, processingStatus } = useDocumentController();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleSendOccurrence = () => {
    console.log("Enviou ocorrência");
  };

  const handleAttachDocuments = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    await uploadDocuments(event);

    const newstatus = FreightStatus.PICKUP_ORDER_SENT;
    console.log("newstatus", newstatus);

    const updateData = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }));
    const updateDataType = UpdateDataTypeEnum.DOCUMENT;

    // Use o freightId aqui
    FreightService.updateFreightStatus(
      freightId,
      newstatus,
      updateData,
      updateDataType
    );

    // Mostra o modal de confirmação
    setShowModal(true);
  };

  const handleSendAlert = () => {
    console.log("Enviou alerta");
  };

  const handleTalkToDriver = () => {
    console.log("Falou com o motorista");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
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

      {selectedFiles.length > 0 && (
        <div>
          <p>Documentos selecionados:</p>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {processingStatus && <p>{processingStatus}</p>}

      <DocumentSentModal isOpen={showModal} onClose={closeModal} />
    </div>
  );
};

export default FreightInCourseOptions;

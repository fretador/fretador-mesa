// FreightInCourseOptions.tsx

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
import { UpdateDataTypeEnum } from "@/utils/enums/updateDataTypeEnum";
import { FreightService } from "@/services/freightService";
import DocumentSentModal from "@/components/ModalRoot/DocumentSentModal";
import DocumentTypeModal from "@/components/ModalRoot/DocumentTypeModal";

// Adicione esta prop ao componente
interface FreightInCourseOptionsProps {
  freightId: string;
  onDocumentsUploaded: () => void;
}

const FreightInCourseOptions: React.FC<FreightInCourseOptionsProps> = ({
  freightId,
  onDocumentsUploaded,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadDocuments, processingStatus } = useDocumentController();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOccurrence = () => {
    console.log("Enviou ocorrência");
  };

  const handleAttachDocuments = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = Array.from(event.target.files || []);

    if (files.length > 3) {
      alert(
        "Você pode selecionar no máximo 3 documentos por vez. Apenas os 3 primeiros serão processados."
      );
      files = files.slice(0, 3);
    }

    setSelectedFiles(files);
    setShowTypeModal(true);
  };

  const handleTypeModalSubmit = async (
    filesWithTypes: { file: File; type: string }[]
  ) => {
    try {
      setIsLoading(true);
      // Criar novos arquivos com nomes modificados
      const modifiedFiles = filesWithTypes.map(({ file, type }) => {
        const newName = `${type}_${file.name}`;
        return new File([file], newName, { type: file.type });
      });

      // Criar um novo FileList com os arquivos modificados
      const dataTransfer = new DataTransfer();
      modifiedFiles.forEach((file) => dataTransfer.items.add(file));
      const newFileList = dataTransfer.files;

      const newEvent = {
        target: {
          files: newFileList,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      const uploadedFiles = await uploadDocuments(newEvent);
      console.log("uploadedFiles", uploadedFiles);

      const newstatus = FreightStatus.PICKUP_ORDER_SENT;

      const updateData = modifiedFiles.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      }));
      const updateDataType = UpdateDataTypeEnum.DOCUMENT;

      await FreightService.updateFreightStatus(
        freightId,
        newstatus,
        updateData,
        updateDataType
      );
      setIsLoading(false);
      setShowTypeModal(false);
      setShowModal(true);
      onDocumentsUploaded();
    } catch (error) {
      console.error("Erro ao processar os documentos:", error);
      alert(
        "Ocorreu um erro ao processar os documentos. Por favor, tente novamente."
      );
      setIsLoading(false);
    }
  };

  const handleCloseTypeModal = () => {
    setShowTypeModal(false);
    setIsLoading(false);
  };

  const handleSendAlert = () => {
    console.log("Enviou alerta");
  };

  const handleTalkToDriver = () => {
    console.log("Falou com o motorista");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFiles([]);
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
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

      {/* {processingStatus && <p>{processingStatus}</p>} */}

      <DocumentSentModal isOpen={showModal} onClose={closeModal} />

      {showTypeModal && (
        <DocumentTypeModal
          isOpen={showTypeModal}
          files={selectedFiles}
          onClose={handleCloseTypeModal}
          onSubmit={handleTypeModalSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default FreightInCourseOptions;

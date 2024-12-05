import React, { useRef, useState } from "react";
import { useAppSelector } from "@/store/store";
import styles from "./FreightInCourseOptions.module.css";
import { useDocumentController } from "@/controllers/documentController";
import {
  CheckFillIcon,
  DangerIcon,
  PaperClipIcon,
  WhatsAppIcon,
} from "@/utils/icons";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { UpdateDataTypeEnum } from "@/utils/enums/updateDataTypeEnum";
import DocumentSentModal from "@/components/ModalRoot/DocumentSentModal";
import DocumentTypeModal from "@/components/ModalRoot/DocumentTypeModal";
import { useUpdateStatusFreight } from "@/hooks/freight/useUpdateStatusFreight";
import SmallLoading from "@/components/SmallLoading";

interface FreightInCourseOptionsProps {
  freightId: string;
  actionButtonText: string;
  actionButtonStatus: FreightStatus | null;
}

const FreightInCourseOptions: React.FC<FreightInCourseOptionsProps> = ({
  freightId,
  actionButtonText,
  actionButtonStatus,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadDocuments } = useDocumentController();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const boardUser = useAppSelector((state) => state.auth.boardUser);

  const { updateStatusFreight } = useUpdateStatusFreight();

  const handleAction = async (newStatus: FreightStatus) => {
    setIsActionLoading(true); 
    console.log("handleAction newStatus: " + newStatus);
    try {
      await updateStatusFreight({
        variables: {
          id: freightId as string,
          input: {
            status: newStatus,
            updateData: {
              boardUser: { name: boardUser?.name, profile: boardUser?.profile },
            },
            updateDataType: UpdateDataTypeEnum.STATUS,
          },
        },
      });
    } catch (error) {
      console.error("Erro ao atualizar o status do frete:", error);
      alert("Erro ao atualizar o status do frete.");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleAttachDocuments = () => {
    if (!isLoading && !isActionLoading) {
    // Previne abertura do seletor de arquivos durante o loading
      fileInputRef.current?.click();
    }
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

      await updateStatusFreight({
        variables: {
          id: freightId as string,
          input: {
            status: newstatus,
            updateData: {
              documents: [...updateData],
              boardUser: { name: boardUser?.name, profile: boardUser?.profile },
            },
            updateDataType: updateDataType,
          },
        },
      });

      setIsLoading(false);
      setShowTypeModal(false);
      setShowModal(true);
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
    setShowModal(true);
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
      <div
        className={styles.iconContainer}
        onClick={handleAttachDocuments}
        style={{
          cursor: isLoading || isActionLoading ? "not-allowed" : "pointer",
        }}
      >
        <PaperClipIcon />
        <p>Anexar Documentos</p>
      </div>

      {actionButtonStatus ? (
        <div
          className={styles.iconContainer}
          onClick={() => {
            if (!isActionLoading) {
              handleAction(actionButtonStatus);
            }
          }}
          style={{ cursor: isActionLoading ? "not-allowed" : "pointer" }}
        >
          {isActionLoading ? (
            <SmallLoading />
          ) : (
            <>
                <CheckFillIcon />
                <p>{actionButtonText}</p>
            </>
          )}
        </div>
      ) : (
        <div className={styles.iconContainer}>
          <CheckFillIcon />
          <p>{actionButtonText}</p>
        </div>
      )}

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

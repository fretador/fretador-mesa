import React, { useState } from "react";
import styles from "./DocumentTypeModal.module.css";
import { CloseIcon } from "../../../utils/icons";
import SmallLoading from "@/components/SmallLoading";

interface DocumentTypeModalProps {
  isOpen: boolean;
  files: File[];
  onClose: () => void;
  onSubmit: (filesWithTypes: { file: File; type: string }[]) => void;
  isLoading: boolean;
}

const documentTypes = [
  "Ordem de Coleta",
  "CTE",
  "MDFe",
  "Nota Fiscal",
  "Comp. de Pagamento",
  "Recibo",
  "Contrato de frete",
  "Guia de ICMS (GNRE)",
  "Outros",
];

const DocumentTypeModal: React.FC<DocumentTypeModalProps> = ({
  isOpen,
  files,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const [fileTypes, setFileTypes] = useState(
    files.map((file) => ({
      file,
      type: "",
      customType: "",
    }))
  );

  const handleTypeChange = (index: number, selectedType: string) => {
    setFileTypes((prev) => {
      const newFileTypes = [...prev];
      newFileTypes[index].type = selectedType;
      if (selectedType !== "Outros") {
        newFileTypes[index].customType = "";
      }
      return newFileTypes;
    });
  };

  const handleCustomTypeChange = (index: number, value: string) => {
    setFileTypes((prev) => {
      const newFileTypes = [...prev];
      newFileTypes[index].customType = value;
      return newFileTypes;
    });
  };

  const handleSubmit = () => {
    // Validação
    for (let i = 0; i < fileTypes.length; i++) {
      const { type, customType } = fileTypes[i];
      if (!type) {
        alert("Por favor, selecione o tipo para todos os documentos.");
        return;
      }
      if (type === "Outros" && !customType) {
        alert(
          'Por favor, especifique o tipo para os documentos marcados como "Outros".'
        );
        return;
      }
    }

    const filesWithTypes = fileTypes.map(({ file, type, customType }) => ({
      file,
      type: type === "Outros" ? customType : type,
    }));

    onSubmit(filesWithTypes);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Selecione o tipo de documento</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        {isLoading ? (
          <div className={styles.content}>
            <div className={styles.loadingContainer}>
              <SmallLoading />
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            {fileTypes.map((fileType, index) => (
              <div key={index} className={styles.fileItem}>
                <p>{fileType.file.name}</p>
                <select
                  value={fileType.type}
                  onChange={(e) => handleTypeChange(index, e.target.value)}
                >
                  <option value="">Selecione o tipo</option>
                  {documentTypes.map((docType, idx) => (
                    <option key={idx} value={docType}>
                      {docType}
                    </option>
                  ))}
                </select>
                {fileType.type === "Outros" && (
                  <input
                    type="text"
                    placeholder="Especifique o tipo"
                    value={fileType.customType}
                    onChange={(e) =>
                      handleCustomTypeChange(index, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
            <div className={styles.buttonsContainer}>
              <button className={styles.button} onClick={onClose}>
                Cancelar
              </button>
              <button className={styles.button} onClick={handleSubmit}>
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentTypeModal;

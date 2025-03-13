import React, { useState } from "react";
import styles from "./DocumentTypeModal.module.css";
import SmallLoading from "@/components/SmallLoading";
import Modal from "@/components/Modal";
import { FreightDocumentTypeEnum } from "@/utils/enums/freightDocumentTypeEnum";
import { freightDocumentTypeLabels } from "@/utils/labels/freightDocumentStatusLabels";

interface DocumentTypeModalProps {
  isOpen: boolean;
  files: File[];
  onClose: () => void;
  onSubmit: (filesWithTypes: {
    file: File;
    type: FreightDocumentTypeEnum;
    label: string;
  }[]) => void;
  isLoading: boolean;
}

const DOCUMENT_TYPE_OPTIONS = Object.entries(freightDocumentTypeLabels).map(
  ([enumKey, label]) => ({
    value: enumKey as FreightDocumentTypeEnum,
    label,
  })
);

const OTHERS_TYPE = FreightDocumentTypeEnum.OTHERS_DOCUMENTS;

const DocumentTypeModal: React.FC<DocumentTypeModalProps> = ({
  isOpen,
  files,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const [fileTypes, setFileTypes] = useState<{
    file: File;
    type: FreightDocumentTypeEnum | "";
    customType: string;
  }[]>(files.map((file) => ({
    file,
    type: "",
    customType: "",
  })));

  const handleTypeChange = (index: number, selectedType: FreightDocumentTypeEnum) => {
    setFileTypes((prev) => {
      const newFileTypes = [...prev];
      newFileTypes[index].type = selectedType;
      if (selectedType !== OTHERS_TYPE) {
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
    for (let i = 0; i < fileTypes.length; i++) {
      const { type, customType } = fileTypes[i];
      if (!type) {
        alert("Por favor, selecione o tipo para todos os documentos.");
        return;
      }
      if (type === OTHERS_TYPE && !customType) {
        alert(
          'Por favor, especifique o tipo para documentos marcados como "Outros".'
        );
        return;
      }
    }

    const filesWithTypes = fileTypes.map(({ file, type, customType }) => {
      const isOthers = type === OTHERS_TYPE;
      return {
        file,
        type: isOthers ? OTHERS_TYPE : type as FreightDocumentTypeEnum,
        label: isOthers ? customType : freightDocumentTypeLabels[type as FreightDocumentTypeEnum]
      };
    });

    onSubmit(filesWithTypes);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      modalTitle="Selecione o tipo de documento"
      modalDescription=""
      hasTwoButtons
      buttonOneTitle="Enviar"
      buttonOneAction={handleSubmit}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={onClose}
      childrenClassName={styles.content}
    >
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <SmallLoading />
        </div>
      ) : (
        fileTypes.map((fileType, index) => (
          <div key={index} className={styles.fileItem}>
            <p>{fileType.file.name}</p>
            <select
              value={fileType.type}
              onChange={(e) =>
                handleTypeChange(index, e.target.value as FreightDocumentTypeEnum)
              }
            >
              <option value="">Selecione o tipo</option>
              {DOCUMENT_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fileType.type === OTHERS_TYPE && (
              <input
                type="text"
                placeholder="Especifique o tipo"
                value={fileType.customType}
                onChange={(e) => handleCustomTypeChange(index, e.target.value)}
                className={styles.othersInput}
              />
            )}
          </div>
        ))
      )}
    </Modal>
  );
};

export default DocumentTypeModal;
import React from "react";
import Modal from "@/components/Modal";

interface DocumentSentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const DocumentSentModal: React.FC<DocumentSentModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Documentos enviados"
      modalDescription="Seus documentos foram enviados com sucesso"
      buttonOneTitle="Ok"
      buttonOneAction={onRequestClose}
    />
  );
};

export default DocumentSentModal;

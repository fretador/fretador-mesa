import React, { useState } from "react";
import ModalRoot from "../index";
import styles from "./ReportIssueModal.module.css";

interface ReportIssueModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSend: () => void;
  onBack: () => void;
}

const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onRequestClose,
  onSend,
  onBack,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFileName(file.name);
        console.log('File selected:', file);
      }
    };
    input.click();
  };

  const handleRemoveFile = () => {
    setFileName(null);
  };

  const handleSend = () => {
    onSend();
    onRequestClose();
  };

  return (
    <ModalRoot isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={styles.content}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Registrar Ticket - Mau funcionamento</h2>
          <button className={styles.closeButton} onClick={onRequestClose}>
            x
          </button>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.modalMessage}>Selecione o menu que corresponde à sua dúvida</p>
          <div className={styles.menuSection}>
            <div className={styles.menuColumn}>
              <p>Menu</p>
              <select className={styles.dropdown}>
                <option value="">Selecione</option>
                {/* Adicione mais opções conforme necessário */}
              </select>
            </div>
            <div className={styles.menuColumn}>
              <p>Sub Menu</p>
              <select className={styles.dropdown}>
                <option value="">Selecione</option>
                {/* Adicione mais opções conforme necessário */}
              </select>
            </div>
          </div>
          <div className={styles.inputSection}>
            <textarea
              className={styles.inputText}
              placeholder="Escreva o ocorrido..."
            />
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.attachButton} onClick={handleFileUpload}>
              Anexar
            </button>
            <div className={styles.rightButtons}>
              <button className={styles.backButton} onClick={onBack}>
                Voltar
              </button>
              <button className={styles.sendButton} onClick={handleSend}>
                Enviar
              </button>
            </div>
          </div>
          {fileName && (
            <div className={styles.fileName}>
              Arquivo anexado: {fileName}
              <button className={styles.removeButton} onClick={handleRemoveFile}>
                Remover
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalRoot>
  );
};

export default ReportIssueModal;

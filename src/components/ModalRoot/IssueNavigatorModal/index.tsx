import React from "react";
import ModalRoot from "../index";
import styles from "./IssueNavigatorModal.module.css";
import LupaIcon from "@/assets/icons/lupa.svg"; 

interface IssueNavigatorModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSearch: () => void;
  onWriteIssue: () => void;
  onBack: () => void;
}

const IssueNavigatorModal: React.FC<IssueNavigatorModalProps> = ({
  isOpen,
  onRequestClose,
  onSearch,
  onWriteIssue,
  onBack,
}) => {
    console.log(LupaIcon)
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
            <input
              type="text"
              className={styles.inputText}
              placeholder="Como podemos te ajudar?"
            />
            <button className={styles.searchButton} onClick={onSearch}>
             <LupaIcon />
              Pesquisar dúvida
            </button>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.backButton} onClick={onBack}>
              Voltar
            </button>
            <button className={styles.writeIssueButton} onClick={onWriteIssue}>
              Escrever dúvida
            </button>
          </div>
        </div>
      </div>
    </ModalRoot>
  );
};

export default IssueNavigatorModal;

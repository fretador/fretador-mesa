import React, { ReactNode } from "react";
import ReactModal from "react-modal";
import styles from "./Modal.module.css";
import { CloseModalBtnIcon } from "@/utils/icons";

interface ModalProps {
  isOpen: boolean,
  onRequestClose: () => void;
  modalTitle: string;
  modalDescription: string;
  hasTwoButtons?: boolean;
  buttonOneTitle: string;
  buttonOneAction: () => void;
  buttonTwoTitle?: string;
  buttonTwoAction?: () => void;
  children?: ReactNode;
  childrenClassName?: string;
  showButtonOne?: boolean;
}

const Modal = ({
  isOpen,
  onRequestClose,
  modalTitle,
  modalDescription,
  hasTwoButtons = false,
  buttonOneTitle,
  buttonOneAction,
  buttonTwoTitle,
  buttonTwoAction,
  children,
  childrenClassName,
  showButtonOne = true
}: ModalProps) => {

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <div className={styles.content}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{modalTitle}</h2>
          <div className={styles.closeModalBtn} onClick={onRequestClose}>
            <CloseModalBtnIcon />
          </div>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.modalMessage}>{modalDescription}</p>
          {children && (
            <div className={childrenClassName}>
              {children}
            </div>
          )}
        </div>

        <div className={styles.buttonGroup}>
          {showButtonOne && (
            <button
              className={styles.confirmButton}
              onClick={() => {
                buttonOneAction();
              }}
            >
              {buttonOneTitle}
            </button>
          )}

          {hasTwoButtons && buttonTwoTitle && buttonTwoAction && (
            <button
              className={styles.cancelButton}
              onClick={() => {
                buttonTwoAction();
              }}
            >
              {buttonTwoTitle}
            </button>
          )}
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;

import React from "react";
import ReactModal from "react-modal";
import styles from "./ModalRoot.module.css";

interface ModalRootProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const ModalRoot: React.FC<ModalRootProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {children}
    </ReactModal>
  );
};

export default ModalRoot;

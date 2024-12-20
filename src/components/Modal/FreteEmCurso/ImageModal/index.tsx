import React from 'react';
import styles from './ImageModal.module.css';
import { CloseModalBtnIcon, DownloadIcon } from '@/utils/icons';

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageSrc: string;
  onDownload: () => void;
}

const ImageModal = ({ isOpen, onRequestClose, imageSrc, onDownload }: ImageModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onRequestClose}>
          <CloseModalBtnIcon />
        </button>
        <img src={imageSrc} alt="Document" className={styles.modalImage} />
        <button className={styles.downloadButton} onClick={onDownload}>
          <DownloadIcon />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;

import React from 'react';
import styles from './ImageModal.module.css';
import ReactImageMagnify from 'react-image-magnify';
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
        <div className={styles.imageWrapper}>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: 'Document',
                isFluidWidth: true,
                src: imageSrc,
              },
              largeImage: {
                src: imageSrc,
                width: 1200,
                height: 800,
              },
              enlargedImageContainerStyle: {
                background: '#fff',
                zIndex: 1000,
              },
            }}
          />
        </div>
        <button className={styles.downloadButton} onClick={onDownload}>
          <DownloadIcon />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;

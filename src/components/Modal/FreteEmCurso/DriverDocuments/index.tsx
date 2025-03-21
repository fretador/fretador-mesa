import React, { useEffect, useRef, useState } from "react";
import styles from './DriverDocuments.module.css';
import Modal from "../..";
import Image from "next/image";
import ImageModal from "../ImageModal";
import RejectPhoto from "../../AprovacaoCadastroMotorista/RejectPhoto";
import RequestDocuments from "../../AprovacaoCadastroMotorista/RequestDocuments";

interface DriverDocumentsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleDownloadPdf: () => void
}

const mockData = [
  { id: 1, imageSrc: "../../assets/images/doc.jpg", fileName: "documento1.jpg" },
  { id: 2, imageSrc: "../../assets/images/doc.jpg", fileName: "documento2.jpg" },
  { id: 3, imageSrc: "../../assets/images/doc.jpg", fileName: "documento3.jpg" },
  { id: 4, imageSrc: "../../assets/images/doc.jpg", fileName: "documento3.jpg" },
  { id: 5, imageSrc: "../../assets/images/doc.jpg", fileName: "documento3.jpg" },
  { id: 6, imageSrc: "../../assets/images/doc.jpg", fileName: "documento3.jpg" },
];

const DriverDocuments = ({ isOpen, onRequestClose, handleDownloadPdf }: DriverDocumentsProps) => {
  const [openMenus, setOpenMenus] = useState<number | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [rejectedImages, setRejectedImages] = useState<number[]>([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState('');
  const [currentRejectedImageId, setCurrentRejectedImageId] = useState<number | null>(null);

  const [downloadImageModalOpen, setDownloadImageModalOpen] = useState(false);
  const [rejectImageModalOpen, setRejectImageModalOpen] = useState(false);
  const [rejectImageConfirmationModal, setRejectImageConfirmationModal] = useState(false);
  const [requestDocumentModal, setRequestDocumentModal] = useState(false);
  const [requestDocumentConfirmationModal, setRequestDocumentConfirmationModal] = useState(false);

  const handleDownloadImage = () => {
    setOpenMenus(null);
    setDownloadImageModalOpen(!downloadImageModalOpen);
  };

  const handleRejectImage = (id: number) => {
    setOpenMenus(null);
    setCurrentRejectedImageId(id);
    setRejectImageModalOpen(!rejectImageModalOpen);
  };

  const handleRequestDocument = () => {
    setOpenMenus(null);
    setRequestDocumentModal(!requestDocumentModal);
  };

  const handleMenuToggle = (id: number) => {
    setOpenMenus((prev) => (prev === id ? null : id));
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest(`.${styles.menuContainer}`)) {
      setOpenMenus(null);
    }
  };

  const handleSelectDocuments = () => {
    setIsSelectionMode(!isSelectionMode);
  };

  const handleOpenImage = (imageSrc: string) => {
    setImageToDisplay(imageSrc);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setImageToDisplay('');
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Documentos - Motorista"
      modalDescription=""
      buttonOneTitle="Selecionar documentos"
      buttonOneAction={handleSelectDocuments}
      childrenClassName={styles.children}
      showButtonOne={!isSelectionMode}
    >
      <div className={styles.cardsContainer}>
        {mockData.map((item) => (
          <div key={item.id} className={`${styles.cardContainer} ${
            rejectedImages.includes(item.id) ? styles.rejected : ""
          }`}>
            <div className={styles.imageContainer}>
              <Image src={item.imageSrc} alt="image" width={74} height={74} />
              <div className={styles.menuContainer}>
                {!isSelectionMode ? (
                  <button
                    className={styles.menuButton}
                    onClick={() => handleMenuToggle(item.id)}
                  >
                    <p className={styles.dot}>&#8226;</p>
                    <p className={styles.dot}>&#8226;</p>
                    <p className={styles.dot}>&#8226;</p>
                  </button>
                ) : (
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    onChange={() => handleCheckboxChange(item.id)}
                    checked={selectedItems.includes(item.id)}
                  />
                )}
                {openMenus === item.id && !isSelectionMode && (
                  <div className={styles.menu}>
                    <button className={styles.menuItem} onClick={() => handleOpenImage(item.imageSrc)}>
                      Abrir
                    </button>
                    <button className={styles.menuItem} onClick={handleDownloadImage}>Download</button>
                    {!rejectedImages.includes(item.id) && (
                      <button
                        className={styles.menuItem}
                        onClick={() => handleRejectImage(item.id)}
                      >
                        Rejeitar
                      </button>
                    )}
                    <button className={styles.menuItem} onClick={handleRequestDocument}>Solicitar novo</button>
                  </div>
                )}
              </div>
            </div>
            <p className={styles.imageDescription}>{item.fileName}</p>
          </div>
        ))}
      </div>

      {isSelectionMode && (
        <div className={styles.buttons}>
          <button
            className={styles.rejectButton}
            onClick={() => console.log('Rejeitou')}
          >
            Rejeitar
          </button>

          <button
            className={styles.downloadButton}
            onClick={handleDownloadPdf}
          >
            Download PDF
          </button>
        </div>
      )}

      <Modal
        isOpen={downloadImageModalOpen}
        onRequestClose={() => setDownloadImageModalOpen(!downloadImageModalOpen)}
        modalTitle="Download"
        modalDescription="Download realizado com sucesso!"
        buttonOneTitle="Ok"
        buttonOneAction={() => setDownloadImageModalOpen(!downloadImageModalOpen)}
      />

      <RejectPhoto
        isOpen={rejectImageModalOpen}
        onRequestClose={() => setRejectImageModalOpen(!rejectImageModalOpen)}
        handleConfirm={() => {
          if (currentRejectedImageId !== null) {
            setRejectedImages((prev) => [...prev, currentRejectedImageId]);
          }
          setRejectImageModalOpen(!rejectImageModalOpen);
          setRejectImageConfirmationModal(!rejectImageConfirmationModal);
        }}
        handleCancel={() => setRejectImageModalOpen(!rejectImageModalOpen)}
      />

      <Modal
        isOpen={rejectImageConfirmationModal}
        onRequestClose={() => setRejectImageConfirmationModal(!rejectImageConfirmationModal)}
        modalTitle="Rejeitar foto"
        modalDescription="Foto rejeitada com sucesso!"
        buttonOneTitle="Ok"
        buttonOneAction={() => setRejectImageConfirmationModal(!rejectImageConfirmationModal)}
      />

      <RequestDocuments
        isOpen={requestDocumentModal}
        onRequestClose={() => setRequestDocumentModal(!requestDocumentModal)}
        handleConfirm={() => {
          setRequestDocumentModal(!requestDocumentModal);
          setRequestDocumentConfirmationModal(!requestDocumentConfirmationModal);
        }}
        handleCancel={() => setRequestDocumentModal(!requestDocumentModal)}
      />

      <Modal
        isOpen={requestDocumentConfirmationModal}
        onRequestClose={() => setRequestDocumentConfirmationModal(!requestDocumentConfirmationModal)}
        modalTitle="Documento solicitado"
        modalDescription="Seu documento foi solicitado ao motorista."
        buttonOneTitle="Ok"
        buttonOneAction={() => setRequestDocumentConfirmationModal(!requestDocumentConfirmationModal)}
      />

      <ImageModal
        isOpen={imageModalOpen}
        onRequestClose={handleCloseImageModal}
        imageSrc={imageToDisplay}
        onDownload={() => console.log("Baixou a imagem")}
      />
    </Modal>
  );
};

export default DriverDocuments;

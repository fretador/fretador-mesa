import React, { useMemo, useEffect, useState } from "react";
import styles from "./Attachments.module.css";
import Image from "next/image";
import ImageModal from "@/components/Modal/FreteEmCurso/ImageModal";
import Modal from "@/components/Modal";
import RejectPhoto from "@/components/Modal/AprovacaoCadastroMotorista/RejectPhoto";
import RequestDocuments from "@/components/Modal/AprovacaoCadastroMotorista/RequestDocuments";
import { useDriverDocumentController } from "@/controllers/driverDocumentController";
import { PhotoStatus } from "@/utils/enums/photoStatusEnums";
import { useDriverDocuments } from "@/hooks/driver/useDriverDocuments";
import { DriverAttachments } from "@/utils/interfaces/DriverAttachments";
import { DriverDocumentFieldEnum } from "@/utils/enums/driverDocumentFieldEnum";

interface PhotoUrl {
  imageUrl: string;
  status?: PhotoStatus;
  message?: string;
}

interface VehiclePhotos {
  vehiclePhoto?: PhotoUrl;
  anttPhoto?: PhotoUrl;
  documentPhoto?: PhotoUrl;
}

interface Driver {
  id: string;
  cpf: string;
  attachments?: DriverAttachments;
  cnhPhoto?: PhotoUrl;
  rgPhoto?: PhotoUrl;
  userPhoto?: PhotoUrl;
  vehicle?: VehiclePhotos;
}

interface AttachmentsProps {
  driver: Driver;
  isSelectionMode: boolean;
}

const Attachments: React.FC<AttachmentsProps> = ({ driver, isSelectionMode }) => {
  const { documents, refetch } = useDriverDocuments(driver.id);
  const { updateDocument } = useDriverDocumentController();

  const [openMenus, setOpenMenus] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState('');
  const [currentRejectedImageId, setCurrentRejectedImageId] = useState<string | null>(null);
  const [downloadImageModalOpen, setDownloadImageModalOpen] = useState(false);
  const [rejectImageModalOpen, setRejectImageModalOpen] = useState(false);
  const [rejectImageConfirmationModal, setRejectImageConfirmationModal] = useState(false);
  const [requestDocumentModal, setRequestDocumentModal] = useState(false);
  const [requestDocumentConfirmationModal, setRequestDocumentConfirmationModal] = useState(false);

  const handleRejectConfirm = async (documentId: string, reason: string) => {
    const document = documents.find(doc => doc.id === documentId);
    if (!document) return;

    try {
      await updateDocument(
        driver.id,
        document.field as DriverDocumentFieldEnum, 
        PhotoStatus.DENIED,
        reason
      );
      await refetch();
      setRejectImageConfirmationModal(true);
    } catch (error) {
      console.error("Erro ao rejeitar documento:", error);
    }
  };

  const handleMenuToggle = (id: string) => {
    setOpenMenus((prev) => (prev === id ? null : id));
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest(`.${styles.menuContainer}`)) {
      setOpenMenus(null);
    }
  };

  const handleOpenImage = (src: string) => {
    setImageToDisplay(src);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setImageToDisplay('');
  };

  const handleDownloadImage = () => {
    setOpenMenus(null);
    setDownloadImageModalOpen(!downloadImageModalOpen);
  };

  const handleRejectImage = (id: string) => {
    setOpenMenus(null);
    setCurrentRejectedImageId(id);
    setRejectImageModalOpen(!rejectImageModalOpen);
  };

  const handleRequestDocument = () => {
    setOpenMenus(null);
    setRequestDocumentModal(!requestDocumentModal);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p>Fotos para Aprovação</p>
      </div>

      <div style={{ marginBottom: '100px' }}>
        <div className={styles.cardsContainer}>
          {documents.map((item) => (
            <div
              key={item.id}
              className={`${styles.cardContainer} ${item.status === PhotoStatus.DENIED ? styles.rejected : ""
                }`}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  width={74}
                  height={74}
                />
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
                      <button
                        className={styles.menuItem}
                        onClick={() => handleOpenImage(item.imageUrl)}
                      >
                        Abrir
                      </button>
                      <button
                        className={styles.menuItem}
                        onClick={handleDownloadImage}
                      >
                        Download
                      </button>
                      {item.status !== PhotoStatus.DENIED && (
                        <button
                          className={styles.menuItem}
                          onClick={() => handleRejectImage(item.id)}
                        >
                          Rejeitar
                        </button>
                      )}
                      <button
                        className={styles.menuItem}
                        onClick={handleRequestDocument}
                      >
                        Solicitar novo
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className={styles.imageDescription}>{item.alt}</p>
            </div>
          ))}
        </div>

        <ImageModal
          isOpen={imageModalOpen}
          onRequestClose={handleCloseImageModal}
          imageSrc={imageToDisplay}
          onDownload={() => console.log("Baixou a imagem")}
        />

        <Modal
          isOpen={downloadImageModalOpen}
          onRequestClose={() => setDownloadImageModalOpen(false)}
          modalTitle="Download"
          modalDescription="Download realizado com sucesso!"
          buttonOneTitle="Ok"
          buttonOneAction={() => setDownloadImageModalOpen(false)}
        />

        <RejectPhoto
          isOpen={rejectImageModalOpen}
          onRequestClose={() => setRejectImageModalOpen(false)}
          handleConfirm={(reason) => {
            if (currentRejectedImageId) {
              handleRejectConfirm(currentRejectedImageId, reason);
            }
            setRejectImageModalOpen(false);
          } } handleCancel={function (): void {
            throw new Error("Function not implemented.");
          } }        />

        <Modal
          isOpen={rejectImageConfirmationModal}
          onRequestClose={() => setRejectImageConfirmationModal(false)}
          modalTitle="Rejeitar foto"
          modalDescription="Foto rejeitada com sucesso!"
          buttonOneTitle="Ok"
          buttonOneAction={() => setRejectImageConfirmationModal(false)}
        />

        <RequestDocuments
          isOpen={requestDocumentModal}
          onRequestClose={() => setRequestDocumentModal(false)}
          handleConfirm={() => {
            setRequestDocumentModal(false);
            setRequestDocumentConfirmationModal(true);
          } } handleCancel={function (): void {
            throw new Error("Function not implemented.");
          } }        />

        <Modal
          isOpen={requestDocumentConfirmationModal}
          onRequestClose={() => setRequestDocumentConfirmationModal(false)}
          modalTitle="Documento solicitado"
          modalDescription="Seu documento foi solicitado ao motorista."
          buttonOneTitle="Ok"
          buttonOneAction={() => setRequestDocumentConfirmationModal(false)}
        />
      </div>
    </div>
  );
};

export default Attachments;
import React, { useEffect, useRef, useState } from "react";
import styles from './DriverDocuments.module.css';
import Modal from "../..";
import Image from "next/image";
import ImageModal from "../ImageModal";
import RejectPhoto from "../../AprovacaoCadastroMotorista/RejectPhoto";
import RequestDocuments from "../../AprovacaoCadastroMotorista/RequestDocuments";
import { useRouter } from "next/router";
import { useDocumentsByFreightId } from "@/hooks/document/useDocumentsByFreightId";
import { useDocumentController } from "@/controllers/documentController";
import { StatusDocumentEnum } from "@/utils/enums/statusDocumentEnum";
import { AuthService } from "@/services/authService";
import { useAppSelector } from "@/store/store";

interface DriverDocumentsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleDownloadPdf: () => void
}

const DriverDocuments = ({ isOpen, onRequestClose, handleDownloadPdf }: DriverDocumentsProps) => {
  const [openMenus, setOpenMenus] = useState<string | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [rejectedImages, setRejectedImages] = useState<string[]>([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState('');
  const [currentRejectedImageId, setCurrentRejectedImageId] = useState<string | null>(null);

  const [downloadImageModalOpen, setDownloadImageModalOpen] = useState(false);
  const [rejectImageModalOpen, setRejectImageModalOpen] = useState(false);
  const [rejectImageConfirmationModal, setRejectImageConfirmationModal] = useState(false);
  const [requestDocumentModal, setRequestDocumentModal] = useState(false);
  const [requestDocumentConfirmationModal, setRequestDocumentConfirmationModal] = useState(false);
  const [rejectMultipleModalOpen, setRejectMultipleModalOpen] = useState(false);
  const router = useRouter();
  const { updateDocument } = useDocumentController();
  const freightId = router.query.freightId as string;
  const boardUser = useAppSelector((state) => state.auth.boardUser);
  const { data: documentsData, refetch } = useDocumentsByFreightId(freightId);

  const handleRejectConfirm = async (documentId: string, reason: string) => {
    try {
      const senderData = {
        id: boardUser?.id,
        name: boardUser?.name,
        profile: boardUser?.profile
      };
      const senderString = JSON.stringify(senderData);
      if (boardUser?.id) {
        await updateDocument([documentId], {
          status: StatusDocumentEnum.DENIED,
          message: reason,
          sender: senderString
        });
      }
      await refetch();
      setRejectImageConfirmationModal(true);
    } catch (error) {
      console.error("Erro ao rejeitar documento:", error);
    }
  };

  const handleRejectMultipleConfirm = async (reason: string) => {
    try {
      const senderData = {
        id: boardUser?.id,
        name: boardUser?.name,
        profile: boardUser?.profile
      };
      const senderString = JSON.stringify(senderData);

      if (boardUser?.id && selectedItems.length > 0) {
        await updateDocument(selectedItems, {
          status: StatusDocumentEnum.DENIED,
          message: reason,
          sender: senderString
        });

        // Resetar estados após sucesso
        setSelectedItems([]);
        setIsSelectionMode(false);
        await refetch();
        setRejectImageConfirmationModal(true);
      }
    } catch (error) {
      console.error("Erro ao rejeitar documentos:", error);
    }
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
        {documentsData?.map((item) => (
          <div className={`${styles.cardContainer} ${item.status === StatusDocumentEnum.DENIED ? styles.rejected : ""
            }`}>
            <div className={styles.imageContainer}>
              <Image src={item.url} alt="image" width={74} height={74}/>
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
                    <button className={styles.menuItem} onClick={() => handleOpenImage(item.url)}>
                      Abrir
                    </button>
                    <button className={styles.menuItem} onClick={handleDownloadImage}>Download</button>
                    {item.status !== StatusDocumentEnum.DENIED && (
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
            <p className={styles.imageDescription}>{item.name}</p>
          </div>
        ))}
      </div>

      {isSelectionMode && (
        <div className={styles.buttons}>
          <button
            className={styles.rejectButton}
            onClick={() => {
              if (selectedItems.length > 0) {
                setRejectMultipleModalOpen(true);
              }
            }}
            disabled={selectedItems.length === 0}
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
        handleConfirm={(reason) => {
          if (currentRejectedImageId !== null) {
            setRejectedImages((prev) => [...prev, currentRejectedImageId]);
            handleRejectConfirm(currentRejectedImageId, reason);
          }
          setRejectImageModalOpen(!rejectImageModalOpen);
          setRejectImageConfirmationModal(!rejectImageConfirmationModal);
        }}
        handleCancel={() => setRejectImageModalOpen(!rejectImageModalOpen)}
      />

      <RejectPhoto
        isOpen={rejectMultipleModalOpen}
        onRequestClose={() => setRejectMultipleModalOpen(false)}
        handleConfirm={(reason) => {
          handleRejectMultipleConfirm(reason);
          setRejectMultipleModalOpen(false);
        }}
        handleCancel={() => setRejectMultipleModalOpen(false)}
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

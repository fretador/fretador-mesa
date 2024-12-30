import React, { useMemo, useEffect, useState } from "react";
import styles from "./Attachments.module.css";
import Image from "next/image";
import { DriverAttachments } from '@/utils/Interfaces/DriverAttachments';
import ImageModal from "@/components/Modal/FreteEmCurso/ImageModal";
import Modal from "@/components/Modal";
import RejectPhoto from "@/components/Modal/AprovacaoCadastroMotorista/RejectPhoto";
import RequestDocuments from "@/components/Modal/AprovacaoCadastroMotorista/RequestDocuments";

interface PhotoUrl {
  imageUrl: string;
}

interface VehiclePhotos {
  vehiclePhoto?: PhotoUrl;
  anttPhoto?: PhotoUrl;
  documentPhoto?: PhotoUrl;
}

interface Driver {
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

interface ImageData {
  id: string;
  src: string | undefined;
  alt: string;
}

const Attachments: React.FC<AttachmentsProps> = ({ driver, isSelectionMode }) => {
  const imageData = useMemo((): ImageData[] => {
    const attachments = driver.attachments || {};

    const images: ImageData[] = [
      {
        id: "1",
        src: attachments.userPhoto || driver.userPhoto?.imageUrl,
        alt: "Perfil",
      },
      {
        id: "2",
        src: attachments.cnh || driver.cnhPhoto?.imageUrl,
        alt: "CNH",
      },
      {
        id: "3",
        src: attachments.proofResidencePhoto,
        alt: "Comp. Residência",
      },
      {
        id: "4",
        src: attachments.documentPhoto || driver.vehicle?.documentPhoto?.imageUrl,
        alt: "Doc. Veículo",
      },
      {
        id: "5",
        src: attachments.anttPhoto || driver.vehicle?.anttPhoto?.imageUrl,
        alt: "ANTT",
      },
      {
        id: "6",
        src: attachments.vehiclePhoto || driver.vehicle?.vehiclePhoto?.imageUrl,
        alt: "Foto Veículo",
      },
      {
        id: "7",
        src: attachments.rg || driver.rgPhoto?.imageUrl,
        alt: "RG",
      },
      {
        id: "8",
        src: attachments.userPhoto || driver.userPhoto?.imageUrl,
        alt: "Perfil",
      },
      {
        id: "9",
        src: attachments.cnh || driver.cnhPhoto?.imageUrl,
        alt: "CNH",
      },
      {
        id: "10",
        src: attachments.proofResidencePhoto,
        alt: "Comp. Residência",
      },
      {
        id: "11",
        src: attachments.documentPhoto || driver.vehicle?.documentPhoto?.imageUrl,
        alt: "Doc. Veículo",
      },
      {
        id: "12",
        src: attachments.anttPhoto || driver.vehicle?.anttPhoto?.imageUrl,
        alt: "ANTT",
      },
      {
        id: "13",
        src: attachments.vehiclePhoto || driver.vehicle?.vehiclePhoto?.imageUrl,
        alt: "Foto Veículo",
      },
      {
        id: "14",
        src: attachments.rg || driver.rgPhoto?.imageUrl,
        alt: "RG",
      },
    ];

    return images.filter(
      (image): image is ImageData & { src: string } =>
        typeof image.src === "string" && image.src.trim() !== ""
    );
  }, [driver]);

  const [rejectedImages, setRejectedImages] = useState<number[]>([]);

  const placeholderImage = "/placeholder.png";

  useEffect(() => {
    console.log("driver", driver);
    console.log("imageData", imageData);
  }, [driver, imageData]);

  const [openMenus, setOpenMenus] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState('');
  const [currentRejectedImageId, setCurrentRejectedImageId] = useState<number | null>(null);
  const [downloadImageModalOpen, setDownloadImageModalOpen] = useState(false);
  const [rejectImageModalOpen, setRejectImageModalOpen] = useState(false);
  const [rejectImageConfirmationModal, setRejectImageConfirmationModal] = useState(false);
  const [requestDocumentModal, setRequestDocumentModal] = useState(false);
  const [requestDocumentConfirmationModal, setRequestDocumentConfirmationModal] = useState(false)

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
    setDownloadImageModalOpen(!downloadImageModalOpen)
  }

  const handleRejectImage = (id: number) => {
    setOpenMenus(null);
    setCurrentRejectedImageId(id);
    setRejectImageModalOpen(!rejectImageModalOpen);
  };

  const handleRequestDocument = () => {
    setOpenMenus(null);
    setRequestDocumentModal(!requestDocumentModal)
  }

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

      <div style={{marginBottom: '100px'}}>
      <div className={styles.cardsContainer}>
        {imageData.map((item: any) => (
          <div key={item.id} className={`${styles.cardContainer} ${
            rejectedImages.includes(item.id) ? styles.rejected : ""
          }`}>
            <div className={styles.imageContainer}>
              <Image src={item.src} alt="image" width={74} height={74} />
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
                    <button className={styles.menuItem} onClick={() => handleOpenImage(item.src)}>
                      Abrir
                    </button>
                    <button className={styles.menuItem} onClick={() => handleDownloadImage()}>
                      Download
                    </button>
                    {!rejectedImages.includes(item.id) && (
                      <button
                        className={styles.menuItem}
                        onClick={() => handleRejectImage(item.id)}
                      >
                        Rejeitar
                      </button>
                    )}
                    <button className={styles.menuItem} onClick={() => handleRequestDocument()}>
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
          setRequestDocumentModal(!requestDocumentModal)
          setRequestDocumentConfirmationModal(!requestDocumentConfirmationModal)
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

      </div>
    </div>
  );
};

export default Attachments;

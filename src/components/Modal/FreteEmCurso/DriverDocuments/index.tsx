import React, { useEffect, useRef, useState } from "react";
import styles from './DriverDocuments.module.css';
import Modal from "../..";
import Image from "next/image";

interface DriverDocumentsProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const mockData = [
  { id: 1, imageSrc: "../../assets/images/doc.jpg", fileName: "documento1.jpg" },
  { id: 2, imageSrc: "../../assets/images/doc.jpg", fileName: "documento2.jpg" },
  { id: 3, imageSrc: "../../assets/images/doc.jpg", fileName: "documento3.jpg" },
  { id: 4, imageSrc: "../../assets/images/doc.jpg", fileName: "documento3.jpg" },
  { id: 5, imageSrc: "../../assets/images/doc.jpg", fileName: "documento3.jpg" },
  { id: 6, imageSrc: "../../assets/images/doc.jpg", fileName: "documento3.jpg" },
];

const DriverDocuments = ({ isOpen, onRequestClose }: DriverDocumentsProps) => {
  const [openMenus, setOpenMenus] = useState<number | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

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
          <div key={item.id} className={styles.cardContainer}>
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
                    <button className={styles.menuItem}>Abrir</button>
                    <button className={styles.menuItem}>Download</button>
                    <button className={styles.menuItem}>Rejeitar</button>
                    <button className={styles.menuItem}>Solicitar novo</button>
                  </div>
                )}
              </div>
            </div>
            <p className={styles.imageDescription}>{item.fileName}</p>
          </div>
        ))}
      </div>

      {isSelectionMode &&
        <div className={styles.buttons}>
          <button
            className={styles.rejectButton}
            onClick={() => console.log('Rejeitou')}
          >
            Rejeitar
          </button>

          <button
            className={styles.downloadButton}
            onClick={() => console.log('Baixou PDF')}
          >
            Download PDF
          </button>
        </div>
      }
    </Modal>
  );
};

export default DriverDocuments;

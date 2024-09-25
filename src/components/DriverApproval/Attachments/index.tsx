import React from "react";
import styles from './Attachments.module.css'
import ActionButtons from "../ActionButtons";
import Image from "next/image";

interface ImageData {
  id: string;
  src: string;
  alt: string;
}

const imageData: ImageData[] = [
  { id: "1", src: 'driver-mock.png', alt: 'Perfil' },
  { id: "2", src: 'driver-mock.png', alt: 'CNH' },
  { id: "3", src: 'driver-mock.png', alt: 'Comp. Residência' },
  { id: "4", src: 'driver-mock.png', alt: 'Doc. Veículo' },
  { id: "5", src: 'driver-mock.png', alt: 'ANTT' },
  { id: "6", src: 'driver-mock.png', alt: 'Foto Veículo' },
  { id: "7", src: 'driver-mock.png', alt: 'Doc. Proprietário' },
  { id: "8", src: 'driver-mock.png', alt: 'Doc. Carreta' },
  { id: "9", src: 'driver-mock.png', alt: 'ANTT' },
  { id: "10", src: 'driver-mock.png', alt: 'Foto Carreta' },
  { id: "11", src: 'driver-mock.png', alt: 'Doc. Proprietário' },
  { id: "12", src: 'driver-mock.png', alt: 'Foto Pancard' },
  { id: "13", src: 'driver-mock.png', alt: 'Outros Doc.' },
  { id: "14", src: 'driver-mock.png', alt: 'Outros Doc.' },
];

const Attachments = () => {
  return (
    <>
      <div className={styles.container}>

        <div className={styles.titleContainer}>
          <p>Fotos para Aprovação</p>
        </div>

        <div className={styles.images}>
          {imageData.map(image => (
            <div key={image.id} className={styles.imageContainer}>
              <p>{image.alt}</p>
              <Image
                src={image.src}
                alt={image.alt}
                width={155}
                height={172}
              />
            </div>
          ))}
        </div>

        <ActionButtons />
      </div>
    </>
  )
}

export default Attachments
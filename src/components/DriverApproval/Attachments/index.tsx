import React, { useMemo, useEffect } from "react";
import styles from "./Attachments.module.css";
import ActionButtons from "../ActionButtons";
import Image from "next/image";

interface PhotoUrl {
  imageUrl: string;
}

interface VehiclePhotos {
  vehiclePhoto?: PhotoUrl;
  anttPhoto?: PhotoUrl;
  documentPhoto?: PhotoUrl;
}

interface DriverAttachments {
  anttPhoto?: string;
  cnh?: string;
  documentPhoto?: string;
  proofResidencePhoto?: string;
  rg?: string;
  userPhoto?: string;
  vehiclePhoto?: string;
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
}

interface ImageData {
  id: string;
  src: string | undefined;
  alt: string;
}

const Attachments: React.FC<AttachmentsProps> = ({ driver }) => {
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
    ];

    return images.filter(
      (image): image is ImageData & { src: string } => 
        typeof image.src === "string" && image.src.trim() !== ""
    );
  }, [driver]);

  const placeholderImage = "/placeholder.png";

  useEffect(() => {
    console.log("driver", driver);
    console.log("imageData", imageData);
  }, [driver, imageData]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p>Fotos para Aprovação</p>
      </div>

      <div className={styles.images}>
        {imageData.map((image) => (
          <div key={image.id} className={styles.imageContainer}>
            <p>{image.alt}</p>
            <Image
              src={image.src || placeholderImage}
              alt={image.alt}
              width={155}
              height={172}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = placeholderImage;
              }}
            />
          </div>
        ))}
      </div>

      {/* {imageData.length > 0 && <ActionButtons />} */}
    </div>
  );
};

export default Attachments;
import React from "react";
import styles from './Driver.module.css';
import Image from "next/image";

interface DriverProps {
  driverPhotoUrl?: string,
  driverName: string,
  showImage?: boolean
}

const Driver = ({ driverPhotoUrl, driverName, showImage = false }: DriverProps) => {
  if (showImage) {
    return (
      <div className={styles.driverContainer}>
        {driverPhotoUrl && (
          <Image
            src={driverPhotoUrl}
            alt={driverName}
            width={40}
            height={40}
            className={styles.driverImage}
          />
        )}

        <p className={styles.driverName}>{driverName}</p>
      </div>
    )
  } else {
    return (
      <p className={styles.driverName}>{driverName}</p>
    )
  }
}

export default Driver

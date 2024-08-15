import React from "react";
import styles from './Driver.module.css';
import Image from "next/image";

interface DriverProps {
  driverPhotoUrl?: string,
  driverName: string
}

const Driver = ({ driverPhotoUrl, driverName }: DriverProps) => {
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
}

export default Driver
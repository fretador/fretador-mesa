import React from "react";
import styles from './Driver.module.css';
import Image from "next/image";

interface DriverProps {
  driverPhotoUrl?: string,
  driverName: string,
  showImage?: boolean,
  textColor?: string; 
  textFontWeight?: string;
}

const Driver = ({ driverPhotoUrl, driverName, showImage = false, textColor, textFontWeight }: DriverProps) => {

  const customTextStyle = {
    color: textColor,
    fontWeight: textFontWeight,
  };

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

        <p className={styles.driverName} style={customTextStyle}>{driverName}</p>
      </div>
    )
  } else {
    return (
      <p className={styles.driverName} style={customTextStyle}>{driverName}</p>
    )
  }
}

export default Driver

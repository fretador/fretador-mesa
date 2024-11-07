import React from 'react';
import styles from './ShipmentStatus.module.css';

interface ShipmentStatusProps {
  shipmentStatus: string;
}

const ShipmentStatus = ({ shipmentStatus }: ShipmentStatusProps) => {
  return (
      <p className={styles.shipmentStatus}>{shipmentStatus}</p>
  );
};

export default ShipmentStatus;
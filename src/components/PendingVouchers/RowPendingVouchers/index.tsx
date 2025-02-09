import React from "react";
import styles from './RowPendingVouchers.module.css'

interface PendingVouchersInterface {
  numberOfPhotos: number,
  freightCode: number,
  numCte: string,
  driverName: string
}

const RowPendingVouchers = ({ numberOfPhotos, freightCode, numCte, driverName }: PendingVouchersInterface) => {
  return (
    <div className={styles.row}>
      <p className={styles.numberOfPhotos}>{numberOfPhotos} FOTOS</p>
      <p>#{freightCode}</p>
      <p>CTE {numCte}</p>
      <p className={styles.driverName}>{driverName}</p>
    </div>
  )
}

export default RowPendingVouchers
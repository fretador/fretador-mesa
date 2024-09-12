import React from "react";
import styles from './RowPendingVouchers.module.css'

interface PendingVouchersInterface {
  numberOfPhotos: number,
  freightCode: number,
  cte: string,
  driverName: string
}

const RowPendingVouchers = ({numberOfPhotos, freightCode, cte, driverName}: PendingVouchersInterface) => {
  return (
    <div className={styles.row}>
      <p className={styles.numberOfPhotos}>{numberOfPhotos} FOTOS</p>
      <p>#{freightCode}</p>
      <p>CTE {cte}</p>
      <p>{driverName}</p>
    </div>
  )
}

export default RowPendingVouchers
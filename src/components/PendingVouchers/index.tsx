import React from "react";
import styles from './PendingVouchers.module.css'
import RowPendingVouchers from "./RowPendingVouchers";
import { ArrowRightIcon } from "@/utils/icons";

const PendingVouchers = () => {

  const handleClick = () => {
    console.log("Clicou em ver todos")
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Comprovantes de entrega para aprovar</p>

      <RowPendingVouchers numberOfPhotos="5" freightCode="111111" cte="1234" driverName="Mário ABC da Siva" />
      <RowPendingVouchers numberOfPhotos="5" freightCode="111111" cte="1234" driverName="Mário ABC da Siva" />
      <RowPendingVouchers numberOfPhotos="5" freightCode="111111" cte="1234" driverName="Mário ABC da Siva" />
      <RowPendingVouchers numberOfPhotos="5" freightCode="111111" cte="1234" driverName="Mário ABC da Siva" />
      <RowPendingVouchers numberOfPhotos="5" freightCode="111111" cte="1234" driverName="Mário ABC da Siva" />

      <div className={styles.buttonContainer} onClick={handleClick}>
        <p>Ver todos</p>
        <ArrowRightIcon />
      </div>

      
    </div>
  )
}

export default PendingVouchers
import React from "react";
import styles from './FreightInCurseHeader.module.css'
import Image from 'next/image'
import { LogoWhatsAppIcon, ShipmentCheckIcon, ShippingBoxIcon, VerticalDotsIcon } from "@/utils/icons";

type StatusFreightProps = "aguardando ordem de coleta" | "em trânsito" | "aguardando descarga" | "comprovantes enviados" | "finalizado"

interface FreightInCurseProps {
  freightCode: String,
  statusFreight: StatusFreightProps,
  driverName: String,
  cityOrigin: String,
  stateOrigin: String,
  cityDestiny: String,
  stateDestiny: String

}

const FreightInCurseHeader = ({freightCode, statusFreight, driverName, cityOrigin, stateOrigin, cityDestiny, stateDestiny}: FreightInCurseProps) => {
  return (
    <div className={styles.container}>
      <h2>VIAGEM #{freightCode}</h2>

      <div className={styles.freightInformations}>

        <div className={styles.driverInformationsContainer}>
          <Image src="/driver-mock.png" width={80} height={80} alt="imagem do motorista" className={styles.driverInformationsImage}/>

          <div className={styles.driverInformations}>
            <p className={styles.driverName}>{driverName}</p>
            <div className={styles.origin}>
              <ShippingBoxIcon />
              <p>{cityOrigin}-{stateOrigin}</p>
            </div>

            <div className={styles.verticalDotsIcon}>
              <VerticalDotsIcon />
            </div>

            <div className={styles.destiny}>
              <ShipmentCheckIcon />
              <p>{cityDestiny}-{stateDestiny}</p>
            </div>
          </div>


        </div>

        <div className={styles.statusFreight}>{statusFreight}</div>

        <div className={styles.whatsAppContainer}>
          <LogoWhatsAppIcon />
        </div>

      </div>

    </div>
  )
}

export default FreightInCurseHeader
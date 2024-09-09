import React from "react";
import styles from './ApprovedDriversList.module.css'
import RowTitle from "../RowTitle";
import { Row } from "../Row";

const ApprovedDriversList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Aprovados</h2>
        <h4>Ordenar A-Z</h4>
      </div>

      <RowTitle Driver="Motorista" CityState="Cidade-ES" WhatsApp="Whatsapp" Vehicle="Veículo" DriverStatus="Status" titleStyles={{ color: "#1B556D", fontWeight: "700", fontSize: "20px" }} />
      <div className={styles.content}>

        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="aprovado" />
        </Row.Root>

        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="aguardando" />
        </Row.Root>

        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="aprovado" />
        </Row.Root>
        
        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="aguardando" />
        </Row.Root>

        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="bloqueado" />
        </Row.Root>

        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="aprovado" />
        </Row.Root>

        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="aprovado" />
        </Row.Root>
        
        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="aprovado" />
        </Row.Root>

        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="aprovado" />
        </Row.Root>

        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="aprovado" />
        </Row.Root>

        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="aprovado" />
        </Row.Root>
        
        <Row.Root customBackgroundColor="#B2CEDA">
          <Row.Driver driverPhotoUrl="/driver-mock.png" driverName="Francisco Freio de Mão" showImage={true} textColor="#1B556D" textFontWeight="700" />
          <Row.CityState city="Itarema" state="CE" />
          <Row.WhatsApp whatsApp="88988242039" />
          <Row.Vehicle vehicle="Truck" />
          <Row.DriverStatus driverStatus="aprovado" />
        </Row.Root>
      </div>



    </div>
  )
}

export default ApprovedDriversList
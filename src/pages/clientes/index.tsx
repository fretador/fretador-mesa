import React from "react";
import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Clientes.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import SearchComponent from "@/components/SearchButton";
import { Row } from "@/components/Row";
import RowTitle from "@/components/RowTitle";

const Clients: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

  return (
    <AuthenticatedLayout>
      <div className={styles.container}>
        <div>
          <Sidebar />
        </div>

        <div
          className={
            isRetracted ? styles.retractedContentWrapper : styles.contentWrapper
          }
        >
          <div className={styles.header}>
            <Header title={routeName} />
          </div>
          <div className={styles.content}>
            <Body>
              <div className={styles.searchComponents}>
                <SearchComponent />
              </div>

              <div className={styles.cards}>

                <RowTitle Cnpj="CNPJ" CorporateName="Razão Social" TradeName="Fantasia" CityState="Cidade-ES" CustomerEmail="E-mail" />

                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
                <Row.Root customBackgroundColor="#B2CEDA">
                  <Row.Cnpj cnpj="11111111000111" />
                  <Row.CorporateName corporateName="Industria A.P.M. 2547 e Cia" />
                  <Row.TradeName tradeName="Bolachas 321" />
                  <Row.CityState city="São Paulo" state="SP" />
                  <Row.CustomerEmail email="bolachas.sp@bolachas.com"  /> 
                </Row.Root>
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Clients;

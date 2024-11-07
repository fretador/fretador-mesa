import React, { useEffect, useState } from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./UltimosEmbaques.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import SearchComponent from "@/components/SearchButton";
import { Row } from "@/components/Row";
import RowTitle from "@/components/RowTitle";
import Botao from "@/components/Botao";
import { BackIcon } from "@/utils/icons";
import { mockClients } from "../clientes";

interface Shipment {
  id: string;
  date: string;
  vehicle: string;
  cityOrigin: string;
  stateOrigin: string;
  status: string;
}

interface Client {
  id: string,
  cnpj: string,
  corporateName: string,
  tradeName: string,
  city: string,
  state: string,
  email: string,
  whatsapp: string,
  stateRegistration: string,
  address: string,
  numberAddress: string,
  neighborhood: string,
  shipments: Shipment[]
}

const Clients: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState<Client | null>(null)
  const routeName = `Últimos Embarques #${id}`;

  const backButtonContent = (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <BackIcon /> <p style={{ fontWeight: '700' }}>Voltar</p>
    </div>
  );

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    if (id) {
      const foundClient = mockClients.find(
        (cli) => cli.id === id
      );
      setClient(foundClient || null);
    }
  }, [id]);

  const corporateName = `${client?.corporateName}`

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
              <div className={styles.btnsHeader}>
                <div className={styles.backButtonContainer}>
                  <Botao text={backButtonContent} className={styles.backButton} onClick={handleGoBack} />
                </div>
                <div className={styles.searchComponents}>
                  <SearchComponent onSearch={() => {}} />
                </div>
              </div>

              <div className={styles.cards}>

                <RowTitle FreightDate="Data" CorporateName="Razão Social" Vehicle="Veículo" CityState="Saída" FreightStatus="Status" titleStyles={{color: '#1B556D'}} />

                {client?.shipments
                .map((client) => (
                  <Row.Root
                    key={client.id}
                    customBackgroundColor="#B2CEDA"
                  >
                    <Row.FreightDate date={client.date} style={{color: '#1B556D', fontWeight: 700}} />
                    <Row.CorporateName corporateName={corporateName} />
                    <Row.Vehicle vehicle={client.vehicle} />
                    <Row.CityState city={client.cityOrigin} state={client.stateOrigin} />
                    <Row.ShipmentStatus shipmentStatus={client.status} />
                  </Row.Root>
                ))}

              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Clients;

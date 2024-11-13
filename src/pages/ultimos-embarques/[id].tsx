import React, { useEffect, useState } from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./UltimosEmbaques.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { Row } from "@/components/Row";
import RowTitle from "@/components/RowTitle";
import Botao from "@/components/Botao";
import { BackIcon } from "@/utils/icons";
import { Client } from "@/utils/Interfaces/Client";
import { useQuery } from '@apollo/client';
import { GET_CLIENT_SHIPMENTS } from '@/graphql/queries';
import Loading from "@/components/Loading";
import { formatDateToBrazilian } from "@/utils/dates";
import { freightStatusLabels } from "@/utils/labels/freightStatusLabels";
import { FreightStatus } from "@/utils/enums/freightStatusEnum"
import { splitCityState } from "@/utils/utils";

const ClientShipments: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState<Client | null>(null);
  const corporateName = client?.corporateName || '';
  const routeName = `Últimos Embarques #${corporateName}`;

  const { data, loading, error } = useQuery(GET_CLIENT_SHIPMENTS, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (data && data.clientShipments) {
      setClient(data.clientShipments);
      console.log("Data client: ", data.clientShipments);
    }
  }, [data]);

  const backButtonContent = (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <BackIcon /> <p style={{ fontWeight: '700' }}>Voltar</p>
    </div>
  );

  const handleGoBack = () => {
    router.back();
  };


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
              </div>

              <div className={styles.cards}>
                <RowTitle
                  FreightDate="Data"
                  CorporateName="Razão Social"
                  Vehicle="Veículo"
                  CityState="Saída"
                  FreightStatus="Status"
                  titleStyles={{ color: '#1B556D' }}
                />

                {loading && (
                  <div className={styles.loadingContainer}>
                    <Loading />
                  </div>
                )}

                {error && (
                  <p>Erro ao carregar cliente: {error.message}</p>
                )}

                {!loading && !error && !client && (
                  <p>Cliente não encontrado</p>
                )}

                {!loading && !error && client && (
                  <>
                    {client.shipments && client.shipments.length > 0 ? (
                      client.shipments.map((shipment) => {
                        const { city, state } = splitCityState(shipment.origin);
                        return (
                          <Row.Root
                            key={shipment.id}
                            customBackgroundColor="#B2CEDA"
                            onClick={() => router.push(`/frete-em-curso/${shipment.id}`)}
                          >
                            <Row.FreightDate
                              date={formatDateToBrazilian(shipment.updateDate || "")}
                              style={{ color: '#1B556D', fontWeight: 700 }}
                            />
                            <Row.CorporateName corporateName={corporateName || ""} />
                            <Row.Vehicle vehicle={shipment.targetedDrivers[0]?.vehicle?.type || ""} />
                            <Row.CityState city={city} state={state} />
                            <Row.ShipmentStatus shipmentStatus={freightStatusLabels[shipment.status as keyof typeof FreightStatus]} />
                          </Row.Root>
                        );
                      })
                    ) : (
                      <p>Este cliente não possui embarques.</p>
                    )}
                  </>
                )}
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ClientShipments;

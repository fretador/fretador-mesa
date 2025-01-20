import React, { useEffect, useState } from "react";
import styles from "./ClientFreightsHistory.module.css";
import { useRouter } from "next/router";
import { Row } from "@/components/Row";
import RowTitle from "@/components/RowTitle";
import { Client } from "@/utils/Interfaces/Client";
import { useQuery } from '@apollo/client';
import { GET_CLIENT_SHIPMENTS } from '@/graphql/queries';
import SmallLoading from "@/components/SmallLoading";
import { formatDateToBrazilian } from "@/utils/dates";
import { freightStatusLabels } from "@/utils/labels/freightStatusLabels";
import { FreightStatus } from "@/utils/enums/freightStatusEnum"
import { splitCityState } from "@/utils/utils";

const ClientFreightsHistory: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [client, setClient] = useState<Client | null>(null);
  const corporateName = client?.corporateName || '';

  const { data, loading, error } = useQuery(GET_CLIENT_SHIPMENTS, {
    variables: { id },
    skip: !id,
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (data && data.clientShipments) {
      setClient(data.clientShipments);
      console.log("Data client: ", data.clientShipments);
    }
  }, [data]);

  return (
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
          <SmallLoading />
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
                  style={{width: "100%"}}
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
            <div className={styles.noResultsContainer}>
              <p>Sem dados para mostrar</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClientFreightsHistory;

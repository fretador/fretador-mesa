import React, { useState } from "react";
import { format } from "date-fns";
import styles from "./DriverHistory.module.css";
import RowTitle from "../RowTitle";
import { Row } from "../Row";
import { Driver } from "@/utils/Interfaces/Driver";
import { GET_FREIGHTS_BY_USER_ID } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import RowRoot from "../Row/RowRoot";
import Loading from "../Loading";
import Pagination from "../Pagination";

interface DriverHistoryProps {
  driver: Driver;
}

const DriverHistory = ({ driver }: DriverHistoryProps) => {
  const { data, loading, error } = useQuery(GET_FREIGHTS_BY_USER_ID, {
    variables: {
      userId: driver.id,
      freightStatusFilter: [],
      requestStatusFilter: []
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (loading) return <div className={styles.loadingContainer}><Loading /></div>;
  if (error) return <p>Error</p>;

  const freights = data?.freightsByUserId || [];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFreights = freights.slice(startIndex, endIndex);
  const totalPages = Math.ceil(freights.length / itemsPerPage);

  return (
    <div className={styles.container}>
      {freights.length === 0 ? (
        <p className={styles.noFreightsMessage}>Nenhum frete encontrado.</p>
      ) : (
        <>
          <RowTitle
            FreightDate="Data"
            Cte="CTE"
            CollectionLocation="Local de Coleta"
            DeliveryLocation="Local de Entrega"
            FreightCode="Cód"
            NF="NF"
            Route="Rota"
            FreightStatus="Status"
            titleStyles={{ fontWeight: 400, minWidth: "100px" }}
          />

          {currentFreights.map((freight: any) => (
            <RowRoot key={freight.id} customBackgroundColor="#85AABA">
              <Row.FreightDate
                date={format(new Date(freight.creationDate), "dd/MM/yyyy")}
                style={{ minWidth: "100px" }}
              />
              <Row.Cte cte={freight.cte} style={{ minWidth: "100px" }} />
              <Row.CollectionLocation collectionLocation={freight.origin} style={{ minWidth: "100px" }} />
              <Row.DeliveryLocation deliveryLocation={freight.destination} style={{ minWidth: "100px" }} />
              <Row.FreightCode code={freight.freightCode} style={{ minWidth: "100px" }} />
              <Row.Nf nf="-" style={{ minWidth: "100px" }} />
              <Row.Route
                originState={freight.origin.split(", ")[1]}
                destinyState={freight.destination.split(", ")[1]}
                style={{ minWidth: "100px" }}
              />
              <Row.FreightStatus freightStatus={freight.freightStatus} />
            </RowRoot>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default DriverHistory;

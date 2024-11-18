import React from "react";
import { format } from 'date-fns';
import styles from './DriverHistory.module.css';
import RowTitle from "../RowTitle";
import { Row } from "../Row";
import { Driver } from "@/utils/types/Driver";
import { GET_FREIGHTS_BY_USER_ID } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import RowRoot from "../Row/RowRoot";
import Loading from "../Loading";

interface DriverHistoryProps {
  driver: Driver
}

const DriverHistory = ({ driver }: DriverHistoryProps) => {

  const { data, loading, error } = useQuery(GET_FREIGHTS_BY_USER_ID, {
    variables: {
      userId: driver.id,
      freightStatusFilter: [],
      requestStatusFilter: []
    }
  });

  console.log('data', data)

  if (loading) return <div className={styles.loadingContainer}><Loading /></div>;
  if (error) return <p>Error</p>;

  return (
    <div className={styles.container}>
      <RowTitle
        FreightDate="Data"
        Cte="CTE"
        CollectionLocation="Local de Coleta"
        DeliveryLocation="Local de Entrega"
        FreightCode="Cód"
        NF="NF"
        Route="Rota"
        FreightStatus="Status"
        titleStyles={{fontWeight: 400, minWidth: '100px'}}

      />

      {data.freightsByUserId.map((freight: any) => (
        <RowRoot key={freight.id} customBackgroundColor="#85AABA">
          <Row.FreightDate date={format(new Date(freight.creationDate), 'dd/MM/yyyy')} style={{minWidth: '100px'}} />
          <Row.Cte cte={freight.cte} style={{minWidth: '100px'}} />
          <Row.CollectionLocation collectionLocation={freight.origin} style={{minWidth: '100px'}} />
          <Row.DeliveryLocation deliveryLocation={freight.destination} style={{minWidth: '100px'}} />
          <Row.FreightCode code={freight.freightCode} style={{minWidth: '100px'}} />
          <Row.Nf nf='-' style={{minWidth: '100px'}} />
          <Row.Route originState={freight.origin.split(", ")[1]} destinyState={freight.destination.split(", ")[1]} style={{minWidth: '100px'}} />
          <Row.FreightStatus freightStatus={freight.freightStatus} />
        </RowRoot>
      ))}
    </div>
  );
};

export default DriverHistory;

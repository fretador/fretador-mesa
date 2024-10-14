import React from "react";
import styles from "./AnsweredOccurrencesList.module.css";
import { useRouter } from "next/router";
import Loading from "../Loading";
import RowTitle from "../RowTitle";
import { Row } from "../Row";

interface AnsweredOccurrencesListProps {
  loading: boolean;
  error: string | null;
}

const AnsweredOccurrencesList = ({ loading, error }: AnsweredOccurrencesListProps) => {
  const router = useRouter();

  const mockOccurrences = [
    {
      id: "01",
      freightCode: "12345678",
      freightDate: "01/01/2024",
      cte: "1234",
      occurrenceType: "Veículo Parado",
      occurrenceStatus: "respondido",
      driverName: "Zé do Frete",
      driverPhotoUrl: "/driver-mock.png",
      route: "RJ X SP",
      attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
      observations: "audio"
    },
    {
      id: "02",
      freightCode: "87654321",
      freightDate: "02/01/2024",
      cte: "1234",
      occurrenceType: "Carga Avariada",
      occurrenceStatus: "em aberto",
      driverName: "Maria da Estrada",
      driverPhotoUrl: "/driver-mock.png",
      route: "CE X SP",
      attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
      observations: "texto"
    },
    {
      id: "03",
      freightCode: "11223344",
      freightDate: "03/01/2024",
      cte: "1234",
      occurrenceType: "Atraso na Entrega",
      occurrenceStatus: "reaberto",
      driverName: "João Pé na Estrada",
      driverPhotoUrl: "/driver-mock.png",
      route: "SP X RO",
      attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
      observations: "audio"
    },
    {
      id: "04",
      freightCode: "11223366",
      freightDate: "03/01/2024",
      cte: "1234",
      occurrenceType: "Atraso na Entrega",
      occurrenceStatus: "finalizado",
      driverName: "João Pé na Estrada",
      driverPhotoUrl: "/driver-mock.png",
      route: "RS X SP",
      attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
      observations: "texto"
    },
  ];

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

  const handleOccurrenceClick = (id: string) => {
    router.push(`/ocorrencias/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Respondidos</h2>
        <h4>Filtrar por data</h4>
      </div>

      <RowTitle
        Driver="Motorista"
        OccurrenceDate="Data"
        FreightCode="Num. Frete"
        OccurrenceType="Tipo de Ocorrência"
        OccurrenceStatus="Status"
        titleStyles={{ color: "#1B556D", fontWeight: "700", fontSize: "20px" }}
      />

      <div className={styles.content}>
        {mockOccurrences.map((occurrence) => (
          <Row.Root
            key={occurrence.id}
            customBackgroundColor="#B2CEDA"
            onClick={() => handleOccurrenceClick(occurrence.id)}
          >
            <Row.Driver
              driverPhotoUrl={occurrence.driverPhotoUrl}
              driverName={occurrence.driverName}
              showImage={true}
              textColor="#1B556D"
              textFontWeight="700"
            />
            <Row.FreightDate date={occurrence.freightDate} />
            <Row.FreightCode code={occurrence.freightCode} />
            <Row.OccurrenceType occurrenceType={occurrence.occurrenceType} />
            <Row.OccurrenceStatus occurrenceStatus={"em aberto"} />
          </Row.Root>
        ))}
      </div>
    </div>
  );
};

export default AnsweredOccurrencesList;

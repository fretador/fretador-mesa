// src/components/AnsweredOccurrencesList.tsx
import React from "react";
import styles from "./AnsweredOccurrencesList.module.css";
import { useRouter } from "next/router";
import Loading from "../Loading";
import RowTitle from "../RowTitle";
import { Row } from "../Row";
import { Occurrence } from "@/utils/Interfaces/Occurrence";
import { OccurrenceStatus } from "@/utils/enums/occurrenceStatusEnum"
import { occurrenceStatusLabels } from "@/utils/labels/occurrenceStatusLabels";
import { occurrenceTypeLabels } from "@/utils/labels/occurrenceTypeLabels";
import OccurrenceType from "../Row/OccurrenceType";

interface AnsweredOccurrencesListProps {
  loading: boolean;
  error: string | null;
  occurrences: Occurrence[];
}

const AnsweredOccurrencesList: React.FC<AnsweredOccurrencesListProps> = ({ loading, error, occurrences }) => {
  const router = useRouter();

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  if (error) return <p>Erro ao carregar ocorrências: {error}</p>;

  const handleOccurrenceClick = (id: string) => {
    router.push(`/ocorrencias/${id}`);
  };

  // Filtrar ocorrências respondidas ou outros status que não "pendente"
  const answeredOccurrences = occurrences.filter(
<<<<<<< HEAD
    (occurrence) => occurrence.occurrenceStatus !== OccurrenceStatus.UNRESOLVED && occurrence.occurrenceStatus !== OccurrenceStatus.IN_PROGRESS
=======
    (occurrence) => occurrence.status !== OccurrenceStatus.UNRESOLVED && occurrence.status !== OccurrenceStatus.IN_PROGRESS
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
  );

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
        {answeredOccurrences.map((occurrence) => (
          <Row.Root
            key={occurrence.id}
            customBackgroundColor="#B2CEDA"
            onClick={() => handleOccurrenceClick(occurrence.id)}
          >
            <Row.Driver
              driverPhotoUrl={"/driver-mock.png"}
<<<<<<< HEAD
              driverName={occurrence.driverName || ""}
=======
              driverName={"DriverName"}
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
              showImage={true}
              textColor="#1B556D"
              textFontWeight="700"
            />
            <Row.OccurrenceDate occurrenceDate={new Date(occurrence.creationDate).toLocaleDateString()} />
            <Row.FreightCode code={occurrence.freightCode || ""} />
            <Row.OccurrenceType occurrenceType={occurrenceTypeLabels[occurrence.type as keyof typeof OccurrenceType]} />
<<<<<<< HEAD
            <Row.OccurrenceStatus occurrenceStatus={occurrenceStatusLabels[occurrence.occurrenceStatus as keyof typeof OccurrenceStatus]} />
=======
            <Row.OccurrenceStatus occurrenceStatus={occurrenceStatusLabels[occurrence.status as keyof typeof OccurrenceStatus]} />
>>>>>>> a0ba014d515ab832f8c766500460121d07b5118c
          </Row.Root>
        ))}
      </div>
    </div>
  );
};

export default AnsweredOccurrencesList;

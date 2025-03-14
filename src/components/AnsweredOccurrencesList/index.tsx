// src/components/AnsweredOccurrencesList.tsx
import React, { useState } from "react";
import styles from "./AnsweredOccurrencesList.module.css";
import { useRouter } from "next/router";
import RowTitle from "../RowTitle";
import { Row } from "../Row";
import { Occurrence } from "../../utils/interfaces/Occurrence";
import { OccurrenceStatus } from "@/utils/enums/occurrenceStatusEnum";
import { occurrenceStatusLabels } from "@/utils/labels/occurrenceStatusLabels";
import { occurrenceTypeLabels } from "@/utils/labels/occurrenceTypeLabels";
import SmallLoading from "../SmallLoading";

interface AnsweredOccurrencesListProps {
  loading: boolean;
  error: string | null;
  occurrences: Occurrence[];
}

const AnsweredOccurrencesList: React.FC<AnsweredOccurrencesListProps> = ({ loading, error, occurrences }) => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <SmallLoading />
      </div>
    );
  if (error) return <p>Erro ao carregar ocorrências: {error}</p>;

  const handleOccurrenceClick = (id: string) => {
    router.push(`/ocorrencias/${id}`);
  };

  const handleSortClick = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Filtrar ocorrências respondidas ou outros status que não "pendente"
  const answeredOccurrences = occurrences.filter(
    (occurrence) =>
      occurrence.occurrenceStatus !== OccurrenceStatus.UNRESOLVED &&
      occurrence.occurrenceStatus !== OccurrenceStatus.IN_PROGRESS
  );

  // Ordenar as ocorrências pelo nome do motorista
  const sortedOccurrences = [...answeredOccurrences].sort((a, b) => {
    const nameA = a.driverName?.toLowerCase() || '';
    const nameB = b.driverName?.toLowerCase() || '';

    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Respondidos</h2>
        <div className={styles.actionsButtons}>
          <h4 onClick={handleSortClick} style={{ cursor: 'pointer' }}>
            Ordenar {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </h4>
          <h4>Filtrar por data</h4>
        </div>
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
        {sortedOccurrences.map((occurrence) => (
          <Row.Root
            key={occurrence.id}
            customBackgroundColor="#B2CEDA"
            onClick={() => handleOccurrenceClick(occurrence.id)}
          >
            <Row.Driver
              driverPhotoUrl={"/driver-mock.png"}
              driverName={occurrence.driverName || ""}
              showImage={true}
              textColor="#1B556D"
              textFontWeight="700"
            />
            <Row.OccurrenceDate
              occurrenceDate={new Date(occurrence.creationDate).toLocaleDateString()}
            />
            <Row.FreightCode code={occurrence.freightCode || ""} />
            <Row.OccurrenceType
              occurrenceType={
                occurrenceTypeLabels[occurrence.type as keyof typeof occurrenceTypeLabels] || ""
              }
            />
            <Row.OccurrenceStatus
              occurrenceStatus={
                occurrenceStatusLabels[
                occurrence.occurrenceStatus as keyof typeof occurrenceStatusLabels
                ] || ""
              }
            />
          </Row.Root>
        ))}
      </div>
    </div>
  );
};

export default AnsweredOccurrencesList;

// src/components/PendingOccurrencesCards.tsx
import React, { useRef, useState } from "react";
import styles from './PendingOccurrencesCards.module.css';
import Loading from "../Loading";
import { useRouter } from "next/router";
import PendingOccurrencesCard from "../PendingOccurrencesCard";
import { Occurrence } from "@/utils/interfaces/Occurrence";
import { OccurrenceStatus } from "@/utils/enums/occurrenceStatusEnum"
import { occurrenceTypeLabels } from "@/utils/labels/occurrenceTypeLabels";
import SmallLoading from "../SmallLoading";

interface PendingOccurrencesCardsProps {
  loading: boolean;
  error: string | null;
  occurrences: Occurrence[];
}

const PendingOccurrencesCards: React.FC<PendingOccurrencesCardsProps> = ({ loading, error, occurrences }) => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const list = listRef.current;
    if (list) {
      setIsDragging(true);
      setStartX(e.pageX - list.offsetLeft);
      setScrollLeft(list.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const list = listRef.current;
    if (list) {
      const x = e.pageX - list.offsetLeft;
      const walk = (x - startX) * 2;
      list.scrollLeft = scrollLeft - walk;
    }
  };

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <SmallLoading />
      </div>
    );
  if (error) return <p>Erro ao carregar ocorrências: {error}</p>;

  const handleCardClick = (id: string) => {
    router.push(`/ocorrencias/${id}`);
  };

  // Filtrar ocorrências pendentes
  const pendingOccurrences = occurrences.filter(
    (occurrence) => occurrence.occurrenceStatus === OccurrenceStatus.UNRESOLVED || occurrence.occurrenceStatus === OccurrenceStatus.IN_PROGRESS
  );

  return (
    <div
      ref={listRef}
      className={styles.horizontalList}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {pendingOccurrences.map((occurrence) => (
        <PendingOccurrencesCard
          key={occurrence.id}
          driverName={occurrence.driverName || ""}
          freightCode={occurrence.freightCode || ""}
          occurrenceType={occurrenceTypeLabels[occurrence.type as keyof typeof occurrenceTypeLabels]}
          date={new Date(occurrence.creationDate).toLocaleDateString()}
          handleNewOccurrence={() => handleCardClick(occurrence.id)}
        />
      ))}

    </div>
  );
}

export default PendingOccurrencesCards;

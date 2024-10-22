import React, { useRef, useState } from "react";
import styles from './PendingOccurrencesCards.module.css'
import Loading from "../Loading";
import { useRouter } from "next/router";
import PendingOccurrencesCard from "../PendingOccurrencesCard";
import { mockOccurrences } from "../AnsweredOccurrencesList";

interface PendingOccurrencesCardsProps {
  loading: boolean;
  error: string | null;
}

const PendingOccurrencesCards = ({ loading, error }: PendingOccurrencesCardsProps) => {

  const router = useRouter()
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
        <Loading />
      </div>
    );
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

  const handleCardClick = (id: string) => {
    router.push(`/ocorrencias/${id}`);
  };

  return (
    <div
      ref={listRef}
      className={styles.horizontalList}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {mockOccurrences
      .filter((occurrence) => occurrence.occurrenceStatus === "pendente")
      .map((occurrence) => (
        <PendingOccurrencesCard
          key={occurrence.id}
          driverName={occurrence.driverName}
          freightNumber={occurrence.freightNumber}
          occurrenceType={occurrence.occurrenceType}
          date={occurrence.freightDate}
          handleNewOccurrence={() => handleCardClick(occurrence.id)}
        />
      ))}

    </div>
  )
}

export default PendingOccurrencesCards
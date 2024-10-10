import React, { useRef, useState } from "react";
import styles from './PendingOccurrencesCards.module.css'
import Loading from "../Loading";
import { useRouter } from "next/router";
import PendingOccurrencesCard from "../PendingOccurrencesCard";

interface PendingOccurrencesCardsProps {
  // occurrences: Occurrences[];
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

  const handleNewOccurrence = (occurrenceId: string) => {
    router.push(`/ocorrencias/${occurrenceId}`);
  };

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

  return (
    <div
      ref={listRef}
      className={styles.horizontalList}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <PendingOccurrencesCard driverName="Zé do Frete" freightNumber="111111" occurrenceType="Veículo Parado" date="00/00/0000" handleNewOccurrence={() => handleNewOccurrence} />
      <PendingOccurrencesCard driverName="Zé do Frete" freightNumber="111111" occurrenceType="Veículo Parado" date="00/00/0000" handleNewOccurrence={() => handleNewOccurrence} />
      <PendingOccurrencesCard driverName="Zé do Frete" freightNumber="111111" occurrenceType="Veículo Parado" date="00/00/0000" handleNewOccurrence={() => handleNewOccurrence} />
      <PendingOccurrencesCard driverName="Zé do Frete" freightNumber="111111" occurrenceType="Veículo Parado" date="00/00/0000" handleNewOccurrence={() => handleNewOccurrence} />
      <PendingOccurrencesCard driverName="Zé do Frete" freightNumber="111111" occurrenceType="Veículo Parado" date="00/00/0000" handleNewOccurrence={() => handleNewOccurrence} />
      <PendingOccurrencesCard driverName="Zé do Frete" freightNumber="111111" occurrenceType="Veículo Parado" date="00/00/0000" handleNewOccurrence={() => handleNewOccurrence} />
      <PendingOccurrencesCard driverName="Zé do Frete" freightNumber="111111" occurrenceType="Veículo Parado" date="00/00/0000" handleNewOccurrence={() => handleNewOccurrence} />
      <PendingOccurrencesCard driverName="Zé do Frete" freightNumber="111111" occurrenceType="Veículo Parado" date="00/00/0000" handleNewOccurrence={() => handleNewOccurrence} />
      <PendingOccurrencesCard driverName="Zé do Frete" freightNumber="111111" occurrenceType="Veículo Parado" date="00/00/0000" handleNewOccurrence={() => handleNewOccurrence} />
      <PendingOccurrencesCard driverName="Zé do Frete" freightNumber="111111" occurrenceType="Veículo Parado" date="00/00/0000" handleNewOccurrence={() => handleNewOccurrence} />



      {/* {occurrences.map((occurrence: Occurrence, index: number) => (
        <PendingOccurrencesCard
          key={index}
          driverName={driver.name}
          freightNumber = {freight.number}
          occurrenceType={occurrence.type}
          date={occurrence.date}
          handleNewOccurrence={() => handleNewOccurrence(occurrence.id)}
        />
      ))} */}
    </div>
  )
}

export default PendingOccurrencesCards
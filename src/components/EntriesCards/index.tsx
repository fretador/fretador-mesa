import React, { useRef, useState } from "react";
import { Driver } from "@/utils/types/Driver";
import styles from "./EntriesCards.module.css";
import Loading from "../Loading";
import EntriesCard from "../EntriesCard/EntriesCard";

interface AwaitingApprovalListProps {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
  handleNewDriver: () => void;
}

const EntriesCards: React.FC<AwaitingApprovalListProps> = ({
  drivers,
  loading,
  error,
  handleNewDriver,
}) => {
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

  return (
    <div
      ref={listRef}
      className={styles.horizontalList}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <EntriesCard driverName="José da Silva" type="Adiantamento" paymentMethod="Pamcard" contact="88988888888" handleNewPayment={() => {}} />
      <EntriesCard driverName="José da Silva" type="Adiantamento" paymentMethod="Pamcard" contact="88988888888" handleNewPayment={() => {}} />
      <EntriesCard driverName="José da Silva" type="Adiantamento" paymentMethod="Pamcard" contact="88988888888" handleNewPayment={() => {}} />
      <EntriesCard driverName="José da Silva" type="Adiantamento" paymentMethod="Pamcard" contact="88988888888" handleNewPayment={() => {}} />
      <EntriesCard driverName="José da Silva" type="Adiantamento" paymentMethod="Pamcard" contact="88988888888" handleNewPayment={() => {}} />
      <EntriesCard driverName="José da Silva" type="Adiantamento" paymentMethod="Pamcard" contact="88988888888" handleNewPayment={() => {}} />
      <EntriesCard driverName="José da Silva" type="Adiantamento" paymentMethod="Pamcard" contact="88988888888" handleNewPayment={() => {}} />
      <EntriesCard driverName="José da Silva" type="Adiantamento" paymentMethod="Pamcard" contact="88988888888" handleNewPayment={() => {}} />
    </div>
  );
};

export default EntriesCards;

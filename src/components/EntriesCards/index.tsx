import React, { useRef, useState } from "react";
import styles from "./EntriesCards.module.css";
import Loading from "../Loading";
import EntriesCard from "../EntriesCard";
import { Freight } from '../../utils/types/Freight';
import { useRouter } from "next/router";

interface EntriesCardsProps {
  data: Freight[];
  loading: boolean;
}

const EntriesCards: React.FC<EntriesCardsProps> = ({ data, loading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }


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

  const handleCardClick = (id: string | undefined) => {
    if (!id) return;
    router.push(`/financeiro/${id}`);
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
      {data.map((freight) => {
        const driver = freight.targetedDrivers?.[0];

        return (
          <EntriesCard
            key={freight.id}
            driverName={driver?.name ?? "Não informado"}
            type={freight.requestFinancialType ?? "Não informado"}
            paymentMethod={freight.formaPagamento ?? "Não informado"}
            contact={driver?.phoneNumber ?? "Não informado"}
            handleNewPayment={() => freight.id && handleCardClick(freight.id)}
          />
        );
      })}
    </div>
  );
};

export default EntriesCards;

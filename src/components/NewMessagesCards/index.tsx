import React, { useRef, useState } from "react";
import styles from './NewMessagesCards.module.css'
import { useRouter } from "next/router";
import NewMessagesCard from "../NewMessagesCard";
import SmallLoading from "../SmallLoading";
import { SupportTicket } from "@/utils/interfaces/SupportTicket";
import { formatDateToBrazilian } from "@/utils/dates";

interface NewMessagesCardsProps {
  loading: boolean;
  error: string | null;
  tickets: SupportTicket[];
}

const NewMessagesCards = ({ loading, error, tickets }: NewMessagesCardsProps) => {
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
  
  const handleCardClick = (id: string) => {
    router.push(`/atendimento/${id}`);
  };

  if (loading) return <div className={styles.loadingContainer}><SmallLoading /></div>;
  if (error) return <p className={styles.error}>Erro ao carregar ticket: {error}</p>;

  return (
    <div
      ref={listRef}
      className={styles.horizontalList}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {tickets.map((ticket: SupportTicket) => (
        <NewMessagesCard
          key={ticket.id}
          driverName={ticket.creatorName}
          serviceNumber={ticket.id.slice(-8)}
          subject={ticket.subject}
          date={formatDateToBrazilian(ticket.createdAt)}
          handleNewMessage={() => handleCardClick(ticket.id)}
        />
      ))}
    </div>
  )
}

export default NewMessagesCards
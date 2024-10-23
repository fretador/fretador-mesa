import React, { useRef, useState } from "react";
import styles from './NewMessagesCards.module.css'
import Loading from "../Loading";
import { useRouter } from "next/router";
import NewMessagesCard from "../NewMessagesCard";
import { mockRepliedMessages } from "../RepliedMessagesList";

interface NewMessagesCardsProps {
  loading: boolean;
  error: string | null;
}

const NewMessagesCards = ({ loading, error }: NewMessagesCardsProps) => {

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

  const handleNewMessage = (atendimentoId: string) => {
    router.push(`/atendimento/${atendimentoId}`);
  };

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

  const handleCardClick = (id: string) => {
    router.push(`/atendimento/${id}`);
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
      {mockRepliedMessages
      .filter((message) => message.serviceStatus === "pendente")
      .map((message) => (
        <NewMessagesCard
          key={message.id}
          driverName={message.driverName}
          serviceNumber={message.serviceNumber}
          subject={message.subject}
          date={message.serviceDate}
          handleNewMessage={() => handleCardClick(message.id)}
        />
      ))}
    </div>
  )
}

export default NewMessagesCards
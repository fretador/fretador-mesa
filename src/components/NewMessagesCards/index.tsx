import React, { useRef, useState } from "react";
import styles from './NewMessagesCards.module.css'
import Loading from "../Loading";
import { useRouter } from "next/router";
import NewMessagesCard from "../NewMessagesCard";

interface NewMessagesCardsProps {
  // messages: Messages[];
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

  return (
    <div
      ref={listRef}
      className={styles.horizontalList}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <NewMessagesCard driverName="Zé do Frete" serviceNumber="111111" subject="Dúvidas" date="00/00/0000" handleNewMessage={() => handleNewMessage} />
      <NewMessagesCard driverName="Zé do Frete" serviceNumber="111111" subject="Dúvidas" date="00/00/0000" handleNewMessage={() => handleNewMessage} />
      <NewMessagesCard driverName="Zé do Frete" serviceNumber="111111" subject="Dúvidas" date="00/00/0000" handleNewMessage={() => handleNewMessage} />
      <NewMessagesCard driverName="Zé do Frete" serviceNumber="111111" subject="Dúvidas" date="00/00/0000" handleNewMessage={() => handleNewMessage} />
      <NewMessagesCard driverName="Zé do Frete" serviceNumber="111111" subject="Dúvidas" date="00/00/0000" handleNewMessage={() => handleNewMessage} />
      <NewMessagesCard driverName="Zé do Frete" serviceNumber="111111" subject="Dúvidas" date="00/00/0000" handleNewMessage={() => handleNewMessage} />
      <NewMessagesCard driverName="Zé do Frete" serviceNumber="111111" subject="Dúvidas" date="00/00/0000" handleNewMessage={() => handleNewMessage} />
      <NewMessagesCard driverName="Zé do Frete" serviceNumber="111111" subject="Dúvidas" date="00/00/0000" handleNewMessage={() => handleNewMessage} />
      <NewMessagesCard driverName="Zé do Frete" serviceNumber="111111" subject="Dúvidas" date="00/00/0000" handleNewMessage={() => handleNewMessage} />
      <NewMessagesCard driverName="Zé do Frete" serviceNumber="111111" subject="Dúvidas" date="00/00/0000" handleNewMessage={() => handleNewMessage} />

      {/* {messages.map((message: Message, index: number) => (
        <PendingOccurrencesCard
          key={index}
          driverName={driver.name}
          serviceNumber = {freight.number}
          subject={messages.subject}
          date={messages.date}
          handleNewMessage={() => handleNewMessage(message.id)}
        />
      ))} */}
    </div>
  )
}

export default NewMessagesCards
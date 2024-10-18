import React, { useRef, useState } from "react";
import { Driver } from "@/utils/types/Driver";
import styles from "./EntriesCards.module.css";
import Loading from "../Loading";
import EntriesCard from "../EntriesCard";
import { useRouter } from "next/router";

interface AwaitingApprovalListProps {
  loading: boolean;
  error: string | null;
}

const EntriesCards: React.FC<AwaitingApprovalListProps> = ({
  loading,
  error,
}) => {

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const mockPendingPayments = [
    {
      id: "01",
      driverName: "José da Silva",
      type: "Adiantamento",
      paymentMethod: "Pamcard",
      contact: "(88) 98888-8888",
      cte: "111111",
      status: "Aberto",
      value: "R$10.000,00",
      date: "11/10/2024",
      route: "SP X CE",
      contractNumber: "000022",
      cpf: "000.000.000-00",
      cnh: "82114035668",
      email: "josedasilva@josedasilva.com",
      bankDetails: "Banco Bradesco (237) / Ag 0000 / CC - 000000-0",
      pix: "josedasilva@josedasilva.com",
    },
    {
      id: "02",
      driverName: "Maria Oliveira",
      type: "Pagamento",
      paymentMethod: "Transferência",
      contact: "(88) 97777-7777",
      cte: "222222",
      status: "Fechado",
      value: "R$7.500,00",
      date: "12/10/2024",
      route: "RJ X BA",
      contractNumber: "000023",
      cpf: "111.111.111-11",
      cnh: "89234567890",
      email: "mariaoliveira@maria.com",
      bankDetails: "Banco do Brasil (001) / Ag 1234 / CC - 123456-7",
      pix: "mariaoliveira@maria.com"
    },
    {
      id: "03",
      driverName: "Carlos Pereira",
      type: "Adiantamento",
      paymentMethod: "Dinheiro",
      contact: "(88) 96666-6666",
      cte: "333333",
      status: "Aberto",
      value: "R$15.000,00",
      date: "13/10/2024",
      route: "MG X SP",
      contractNumber: "000024",
      cpf: "222.222.222-22",
      cnh: "83456789234",
      email: "carlospereira@carlos.com",
      bankDetails: "Caixa Econômica (104) / Ag 5678 / CC - 345678-9",
      pix: "carlospereira@carlos.com"
    },
    {
      id: "04",
      driverName: "Ana Souza",
      type: "Pagamento",
      paymentMethod: "Pamcard",
      contact: "(88) 95555-5555",
      cte: "444444",
      status: "Fechado",
      value: "R$12.000,00",
      date: "14/10/2024",
      route: "PR X SC",
      contractNumber: "000025",
      cpf: "333.333.333-33",
      cnh: "89765432100",
      email: "anasouza@ana.com",
      bankDetails: "Itaú (341) / Ag 8765 / CC - 876543-2",
      pix: "anasouza@ana.com"
    }
  ]

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

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

      {mockPendingPayments.map((payment) => (
        <EntriesCard
          key={payment.id}
          driverName={payment.driverName}
          type={payment.type}
          paymentMethod={payment.paymentMethod}
          contact={payment.contact}
          handleNewPayment={() => handleCardClick(payment.id)}
        />
      ))}
    </div>
  );
};

export default EntriesCards;

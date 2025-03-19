import React from "react";
import styles from "./RepliedMessagesList.module.css";
import { useRouter } from "next/router";
import RowTitle from "../RowTitle";
import { Row } from "../Row";
import SmallLoading from "../SmallLoading";
import { SupportTicket } from "@/utils/interfaces/SupportTicket";
import { formatDateToBrazilian } from "@/utils/dates";

interface RepliedMessagesListProps {
  loading: boolean;
  error: string | null;
  tickets: SupportTicket[];
}

const RepliedMessagesList = ({ loading, error, tickets }: RepliedMessagesListProps) => {
  const router = useRouter();

  const handleMessageClick = (id: string) => {
    router.push(`/atendimento/${id}`);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "CLOSED": return "Finalizado";
      case "IN_PROGRESS": return "Em andamento";
      default: return "Respondido";
    }
  };

  if (loading) return <div className={styles.loadingContainer}><SmallLoading /></div>;
  if (error) return <p className={styles.error}>Erro ao carregar ticket: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Respondidos</h2>
        <h4>Filtrar por data</h4>
      </div>

      <RowTitle
        Driver="Motorista"
        ServiceDate="Data"
        ServiceNumber="N. Atendimento"
        ServiceSubject="Assunto"
        ServiceStatus="Status"
        titleStyles={{ color: "#1B556D", fontWeight: "700", fontSize: "20px" }}
      />

      <div className={styles.content}>
        {tickets.map((ticket) => (
          <Row.Root
            key={ticket.id}
            customBackgroundColor="#B2CEDA"
            onClick={() => handleMessageClick(ticket.id)}
          >
            <Row.Driver
              driverPhotoUrl={ticket.creatorPhotoUr}
              driverName={ticket.creatorName}
              showImage={true}
              textColor="#1B556D"
              textFontWeight="700"
            />
            <Row.ServiceDate date={formatDateToBrazilian(ticket.createdAt)} />
            <Row.ServiceNumber number={ticket.id.slice(-8)} />
            <Row.ServiceSubject subject={ticket.subject} />
            <Row.ServiceStatus serviceStatus={getStatusLabel(ticket.status)} />
          </Row.Root>
        ))}
      </div>
    </div>
  );
};

export default RepliedMessagesList;

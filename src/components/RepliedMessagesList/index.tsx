import React from "react";
import styles from "./RepliedMessagesList.module.css";
import { useRouter } from "next/router";
import Loading from "../Loading";
import RowTitle from "../RowTitle";
import { Row } from "../Row";

interface RepliedMessagesListProps {
  loading: boolean;
  error: string | null;
}

const RepliedMessagesList = ({ loading, error }: RepliedMessagesListProps) => {
  const router = useRouter();

  const mockRepliedMessages = [
    {
      id: "01",
      serviceNumber: "12345678",
      serviceDate: "01/01/2024",
      cte: "1234",
      subject: "Dúvidas",
      serviceStatus: "respondido",
      driverName: "Zé do Frete",
      driverPhotoUrl: "/driver-mock.png",
      route: "RJ X SP",
      attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
      observations: "audio"
    },
    {
      id: "02",
      serviceNumber: "87654321",
      serviceDate: "02/01/2024",
      cte: "1234",
      subject: "Dúvidas",
      serviceStatus: "respondido",
      driverName: "Maria da Estrada",
      driverPhotoUrl: "/driver-mock.png",
      route: "CE X SP",
      attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
      observations: "texto"
    },
    {
      id: "03",
      serviceNumber: "11223344",
      serviceDate: "03/01/2024",
      cte: "1234",
      subject: "Dúvidas",
      serviceStatus: "reaberto",
      driverName: "João Pé na Estrada",
      driverPhotoUrl: "/driver-mock.png",
      route: "SP X RO",
      attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
      observations: "audio"
    },
    {
      id: "04",
      serviceNumber: "11223366",
      serviceDate: "03/01/2024",
      cte: "1234",
      subject: "Dúvidas",
      serviceStatus: "finalizado",
      driverName: "João Pé na Estrada",
      driverPhotoUrl: "/driver-mock.png",
      route: "RS X SP",
      attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
      observations: "texto"
    },
    {
      id: "05",
      serviceNumber: "11223366",
      serviceDate: "03/01/2024",
      cte: "1234",
      subject: "Dúvidas",
      serviceStatus: "finalizado",
      driverName: "João Pé na Estrada",
      driverPhotoUrl: "/driver-mock.png",
      route: "RS X SP",
      attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
      observations: "texto"
    },
    {
      id: "06",
      serviceNumber: "11223366",
      serviceDate: "03/01/2024",
      cte: "1234",
      subject: "Dúvidas",
      serviceStatus: "finalizado",
      driverName: "João Pé na Estrada",
      driverPhotoUrl: "/driver-mock.png",
      route: "RS X SP",
      attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
      observations: "texto"
    },
    {
      id: "07",
      serviceNumber: "11223366",
      serviceDate: "03/01/2024",
      cte: "1234",
      subject: "Dúvidas",
      serviceStatus: "finalizado",
      driverName: "João Pé na Estrada",
      driverPhotoUrl: "/driver-mock.png",
      route: "RS X SP",
      attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
      observations: "texto"
    },
  ];

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

  const handleMessageClick = (id: string) => {
    router.push(`/atendimento/${id}`);
  };

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
        {mockRepliedMessages.map((message) => (
          <Row.Root
            key={message.id}
            customBackgroundColor="#B2CEDA"
            onClick={() => handleMessageClick(message.id)}
          >
            <Row.Driver
              driverPhotoUrl={message.driverPhotoUrl}
              driverName={message.driverName}
              showImage={true}
              textColor="#1B556D"
              textFontWeight="700"
            />
            <Row.ServiceDate date={message.serviceDate} />
            <Row.ServiceNumber number={message.serviceNumber} />
            <Row.ServiceSubject subject={message.subject} />
            <Row.ServiceStatus serviceStatus={message.serviceStatus} />
          </Row.Root>
        ))}
      </div>
    </div>
  );
};

export default RepliedMessagesList;

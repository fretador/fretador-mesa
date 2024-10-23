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

export const mockRepliedMessages = [
  {
    id: "01",
    serviceNumber: "12345678",
    serviceDate: "01/01/2024",
    cte: "1234",
    subject: "Dúvidas",
    serviceStatus: "pendente",
    driverName: "Zé do Frete",
    driverPhotoUrl: "/driver-mock.png",
    route: "RJ X SP",
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    driverMessage: "Preciso de mais detalhes sobre a rota."
  },
  {
    id: "02",
    serviceNumber: "23456789",
    serviceDate: "02/01/2024",
    cte: "2345",
    subject: "Atraso",
    serviceStatus: "pendente",
    driverName: "João da Entrega",
    driverPhotoUrl: "/driver-mock.png",
    route: "MG X RJ",
    attachments: ["/driver-mock.png"],
    driverMessage: "Estou com problemas na rota, por favor verificar."
  },
  {
    id: "03",
    serviceNumber: "34567890",
    serviceDate: "03/01/2024",
    cte: "3456",
    subject: "Informações",
    serviceStatus: "pendente",
    driverName: "Carlos do Frete",
    driverPhotoUrl: "/driver-mock.png",
    route: "SP X PR",
    attachments: [],
    driverMessage: "Informação recebida, aguardando confirmação."
  },
  {
    id: "04",
    serviceNumber: "45678901",
    serviceDate: "04/01/2024",
    cte: "4567",
    subject: "Alteração de rota",
    serviceStatus: "pendente",
    driverName: "Pedro Caminhoneiro",
    driverPhotoUrl: "/driver-mock.png",
    route: "RS X SC",
    attachments: ["/driver-mock.png", "/driver-mock.png"],
    driverMessage: "Alteração de rota solicitada."
  },
  {
    id: "05",
    serviceNumber: "56789012",
    serviceDate: "05/01/2024",
    cte: "5678",
    subject: "Problema com carga",
    serviceStatus: "pendente",
    driverName: "José da Carga",
    driverPhotoUrl: "/driver-mock.png",
    route: "GO X DF",
    attachments: ["/driver-mock.png"],
    driverMessage: "Carga com problemas, preciso de suporte."
  },
  {
    id: "06",
    serviceNumber: "67890123",
    serviceDate: "06/01/2024",
    cte: "6789",
    subject: "Avaria na carga",
    serviceStatus: "pendente",
    driverName: "Marcos do Frete",
    driverPhotoUrl: "/driver-mock.png",
    route: "BA X PE",
    attachments: [],
    driverMessage: "Houve uma avaria na carga durante o transporte."
  },
  {
    id: "07",
    serviceNumber: "78901234",
    serviceDate: "07/01/2024",
    cte: "7890",
    subject: "Solicitação de documentos",
    serviceStatus: "pendente",
    driverName: "Antônio Transportador",
    driverPhotoUrl: "/driver-mock.png",
    route: "CE X RN",
    attachments: ["/driver-mock.png"],
    driverMessage: "Enviei os documentos solicitados."
  },
  {
    id: "08",
    serviceNumber: "89012345",
    serviceDate: "08/01/2024",
    cte: "8901",
    subject: "Carga entregue",
    serviceStatus: "respondido",
    driverName: "Lucas da Estrada",
    driverPhotoUrl: "/driver-mock.png",
    route: "AM X PA",
    attachments: [],
    driverMessage: "Carga entregue com sucesso, sem problemas."
  },
  {
    id: "09",
    serviceNumber: "90123456",
    serviceDate: "09/01/2024",
    cte: "9012",
    subject: "Problema no frete",
    serviceStatus: "reaberto",
    driverName: "Carlos Transportes",
    driverPhotoUrl: "/driver-mock.png",
    route: "MT X MS",
    attachments: ["/driver-mock.png", "/driver-mock.png"],
    driverMessage: "Problema reaberto, aguardando resolução."
  },
  {
    id: "10",
    serviceNumber: "01234567",
    serviceDate: "10/01/2024",
    cte: "0123",
    subject: "Consulta de rota",
    serviceStatus: "finalizado",
    driverName: "Paulo Fretador",
    driverPhotoUrl: "/driver-mock.png",
    route: "AC X RO",
    attachments: [],
    driverMessage: "Rota consultada e confirmada."
  },
  {
    id: "11",
    serviceNumber: "12345679",
    serviceDate: "11/01/2024",
    cte: "1235",
    subject: "Demora na entrega",
    serviceStatus: "respondido",
    driverName: "Bruno Transportador",
    driverPhotoUrl: "/driver-mock.png",
    route: "MG X ES",
    attachments: [],
    driverMessage: "Entrega atrasada, já resolvido."
  },
  {
    id: "12",
    serviceNumber: "23456780",
    serviceDate: "12/01/2024",
    cte: "2346",
    subject: "Informações adicionais",
    serviceStatus: "reaberto",
    driverName: "Renato do Frete",
    driverPhotoUrl: "/driver-mock.png",
    route: "PB X AL",
    attachments: ["/driver-mock.png"],
    driverMessage: "Solicitando informações adicionais sobre a carga."
  },
  {
    id: "13",
    serviceNumber: "34567891",
    serviceDate: "13/01/2024",
    cte: "3457",
    subject: "Dúvidas sobre o pagamento",
    serviceStatus: "respondido",
    driverName: "Daniel da Estrada",
    driverPhotoUrl: "/driver-mock.png",
    route: "SE X BA",
    attachments: ["/driver-mock.png", "/driver-mock.png"],
    driverMessage: "Pagamento confirmado, tudo ok."
  },
  {
    id: "14",
    serviceNumber: "45678902",
    serviceDate: "14/01/2024",
    cte: "4568",
    subject: "Informação sobre parada",
    serviceStatus: "finalizado",
    driverName: "Felipe Caminhoneiro",
    driverPhotoUrl: "/driver-mock.png",
    route: "PR X SC",
    attachments: [],
    driverMessage: "Parada registrada e informada."
  },
  {
    id: "15",
    serviceNumber: "56789013",
    serviceDate: "15/01/2024",
    cte: "5679",
    subject: "Dúvidas sobre a documentação",
    serviceStatus: "respondido",
    driverName: "Ricardo do Frete",
    driverPhotoUrl: "/driver-mock.png",
    route: "RS X SP",
    attachments: [],
    driverMessage: "Documentação enviada e revisada."
  }
];


const RepliedMessagesList = ({ loading, error }: RepliedMessagesListProps) => {
  const router = useRouter();

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
        {mockRepliedMessages
        .filter((message) => message.serviceStatus !== "pendente")
        .map((message) => (
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

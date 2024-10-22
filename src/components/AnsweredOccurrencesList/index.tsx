import React from "react";
import styles from "./AnsweredOccurrencesList.module.css";
import { useRouter } from "next/router";
import Loading from "../Loading";
import RowTitle from "../RowTitle";
import { Row } from "../Row";

interface AnsweredOccurrencesListProps {
  loading: boolean;
  error: string | null;
}

export const mockOccurrences = [
  {
    id: '1',
    driverName: "Carlos Silva",
    freightNumber: "FR123456",
    occurrenceType: "Atraso na entrega",
    freightDate: "01/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "RJ x SP",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "texto",
    occurrenceStatus: "pendente",
  },
  {
    id: '2',
    driverName: "Maria Oliveira",
    freightNumber: "FR123457",
    occurrenceType: "Veículo quebrado",
    freightDate: "02/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "SP x BH",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "audio",
    occurrenceStatus: "pendente",
  },
  {
    id: '3',
    driverName: "João Pedro",
    freightNumber: "FR123458",
    occurrenceType: "Carga danificada",
    freightDate: "03/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "BH x RJ",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "texto",
    occurrenceStatus: "pendente",
  },
  {
    id: '4',
    driverName: "Ana Costa",
    freightNumber: "FR123459",
    occurrenceType: "Documentos incorretos",
    freightDate: "04/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "SP x RJ",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "audio",
    occurrenceStatus: "pendente",
  },
  {
    id: '5',
    driverName: "Rafael Souza",
    freightNumber: "FR123460",
    occurrenceType: "Demora na carga",
    freightDate: "05/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "RJ x MG",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "texto",
    occurrenceStatus: "pendente",
  },
  {
    id: '6',
    driverName: "Lucas Fernandes",
    freightNumber: "FR123461",
    occurrenceType: "Problema de comunicação",
    freightDate: "06/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "MG x SP",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "audio",
    occurrenceStatus: "pendente",
  },
  {
    id: '7',
    driverName: "Julia Andrade",
    freightNumber: "FR123462",
    occurrenceType: "Erro de rota",
    freightDate: "07/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "SP x RJ",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "texto",
    occurrenceStatus: "pendente",
  },
  {
    id: '8',
    driverName: "Gabriel Lima",
    freightNumber: "FR123463",
    occurrenceType: "Carga incompleta",
    freightDate: "08/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "RJ x SP",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "texto",
    occurrenceStatus: "respondido",
  },
  {
    id: '9',
    driverName: "Fernanda Ribeiro",
    freightNumber: "FR123464",
    occurrenceType: "Atraso na entrega",
    freightDate: "09/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "SP x BH",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "audio",
    occurrenceStatus: "em aberto",
  },
  {
    id: '10',
    driverName: "Leonardo Martins",
    freightNumber: "FR123465",
    occurrenceType: "Veículo quebrado",
    freightDate: "10/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "RJ x MG",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "texto",
    occurrenceStatus: "reaberto",
  },
  {
    id: '11',
    driverName: "Carla Gomes",
    freightNumber: "FR123466",
    occurrenceType: "Carga danificada",
    freightDate: "11/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "SP x RJ",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "audio",
    occurrenceStatus: "finalizado",
  },
  {
    id: '12',
    driverName: "Pedro Alves",
    freightNumber: "FR123467",
    occurrenceType: "Demora na carga",
    freightDate: "12/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "RJ x SP",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "texto",
    occurrenceStatus: "respondido",
  },
  {
    id: '13',
    driverName: "Camila Ferreira",
    freightNumber: "FR123468",
    occurrenceType: "Erro de rota",
    freightDate: "13/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "SP x MG",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "audio",
    occurrenceStatus: "em aberto",
  },
  {
    id: '14',
    driverName: "Felipe Santos",
    freightNumber: "FR123469",
    occurrenceType: "Problema de comunicação",
    freightDate: "14/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "MG x RJ",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "texto",
    occurrenceStatus: "reaberto",
  },
  {
    id: '15',
    driverName: "Bruna Mendes",
    freightNumber: "FR123470",
    occurrenceType: "Carga incompleta",
    freightDate: "15/10/2024",
    driverPhotoUrl: "/driver-mock.png",
    route: "RJ x SP",
    cte: '11111111',
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "audio",
    occurrenceStatus: "finalizado",
  },
];

const AnsweredOccurrencesList = ({ loading, error }: AnsweredOccurrencesListProps) => {
  const router = useRouter();

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

  const handleOccurrenceClick = (id: string) => {
    router.push(`/ocorrencias/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Respondidos</h2>
        <h4>Filtrar por data</h4>
      </div>

      <RowTitle
        Driver="Motorista"
        OccurrenceDate="Data"
        FreightCode="Num. Frete"
        OccurrenceType="Tipo de Ocorrência"
        OccurrenceStatus="Status"
        titleStyles={{ color: "#1B556D", fontWeight: "700", fontSize: "20px" }}
      />

      <div className={styles.content}>
        {mockOccurrences
        .filter((occurrence) => occurrence.occurrenceStatus !== "pendente")
        .map((occurrence) => (
          <Row.Root
            key={occurrence.id}
            customBackgroundColor="#B2CEDA"
            onClick={() => handleOccurrenceClick(occurrence.id)}
          >
            <Row.Driver
              driverPhotoUrl={occurrence.driverPhotoUrl}
              driverName={occurrence.driverName}
              showImage={true}
              textColor="#1B556D"
              textFontWeight="700"
            />
            <Row.FreightDate date={occurrence.freightDate} />
            <Row.FreightCode code={occurrence.freightNumber} />
            <Row.OccurrenceType occurrenceType={occurrence.occurrenceType} />
            <Row.OccurrenceStatus occurrenceStatus={"em aberto"} />
          </Row.Root>
        ))}
      </div>
    </div>
  );
};

export default AnsweredOccurrencesList;

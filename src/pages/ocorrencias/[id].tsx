import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import styles from './Ocorrencias.module.css';

interface Occurrence {
  freightCode: string;
  freightDate: string;
  occurrenceType: string;
  occurrenceStatus: string;
  driverName: string;
  driverPhotoUrl: string;
}

const mockOccurrences = [
  {
    freightCode: "12345678",
    freightDate: "01/01/2024",
    occurrenceType: "Veículo Parado",
    occurrenceStatus: "respondido",
    driverName: "Zé do Frete",
    driverPhotoUrl: "/driver-mock.png",
  },
  {
    freightCode: "87654321",
    freightDate: "02/01/2024",
    occurrenceType: "Carga Avariada",
    occurrenceStatus: "em aberto",
    driverName: "Maria da Estrada",
    driverPhotoUrl: "/driver-mock.png",
  },
  {
    freightCode: "11223344",
    freightDate: "03/01/2024",
    occurrenceType: "Atraso na Entrega",
    occurrenceStatus: "reaberto",
    driverName: "João Pé na Estrada",
    driverPhotoUrl: "/driver-mock.png",
  },
  {
    freightCode: "11223366",
    freightDate: "03/01/2024",
    occurrenceType: "Atraso na Entrega",
    occurrenceStatus: "finalizado",
    driverName: "João Pé na Estrada",
    driverPhotoUrl: "/driver-mock.png",
  },
];

const OccurrenceDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [occurrence, setOccurrence] = useState<Occurrence | null>(null);

  useEffect(() => {
    if (id) {
      const foundOccurrence = mockOccurrences.find(
        (occ) => occ.freightCode === id
      );
      setOccurrence(foundOccurrence || null);
    }
  }, [id]);

  if (!occurrence) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Detalhes da Ocorrência</h1>
      <p><strong>Motorista:</strong> {occurrence.driverName}</p>
      <p><strong>Data:</strong> {occurrence.freightDate}</p>
      <p><strong>Num. Frete:</strong> {occurrence.freightCode}</p>
      <p><strong>Tipo de Ocorrência:</strong> {occurrence.occurrenceType}</p>
      <p><strong>Status:</strong> {occurrence.occurrenceStatus}</p>
    </div>
  );
};

export default OccurrenceDetails;

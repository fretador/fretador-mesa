import React, { useRef, useState } from "react";
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

  const mockPayments = [
    {
      id: "01",
      driverName: "José da Silva",
      driverPhotoUrl: "/driver-mock.png",
      type: "Adiantamento",
      paymentMethod: "Pamcard",
      contact: "(88) 98888-8888",
      cte: "111111",
      status: "Aberto",
      value: 2000,
      date: "11/10/2024",
      originState: "SP",
      destinyState: "CE",
      contractNumber: "000022",
      cpf: "000.000.000-00",
      cnh: "82114035668",
      email: "josedasilva@josedasilva.com",
      bankDetails: "Banco Bradesco (237) / Ag 0000 / CC - 000000-0",
      pix: "josedasilva@josedasilva.com"
    },
    {
      id: "02",
      driverName: "Maria Oliveira",
      driverPhotoUrl: "/driver-mock.png",
      type: "Pagamento",
      paymentMethod: "Transferência",
      contact: "(88) 97777-7777",
      cte: "222222",
      status: "Aberto",
      value: 10000,
      date: "12/10/2024",
      originState: "RJ",
      destinyState: "BA",
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
      driverPhotoUrl: "/driver-mock.png",
      type: "Adiantamento",
      paymentMethod: "Dinheiro",
      contact: "(88) 96666-6666",
      cte: "333333",
      status: "Aberto",
      value: 20000,
      date: "13/10/2024",
      originState: "MG",
      destinyState: "SP",
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
      driverPhotoUrl: "/driver-mock.png",
      type: "Pagamento",
      paymentMethod: "Pamcard",
      contact: "(88) 95555-5555",
      cte: "444444",
      status: "Aberto",
      value: 15000,
      date: "14/10/2024",
      originState: "PR",
      destinyState: "SC",
      contractNumber: "000025",
      cpf: "333.333.333-33",
      cnh: "89765432100",
      email: "anasouza@ana.com",
      bankDetails: "Itaú (341) / Ag 8765 / CC - 876543-2",
      pix: "anasouza@ana.com"
    },
    {
      id: "05",
      driverName: "Pedro Lima",
      driverPhotoUrl: "/driver-mock.png",
      type: "Adiantamento",
      paymentMethod: "Transferência",
      contact: "(88) 94444-4444",
      cte: "555555",
      status: "Pago",
      value: 18000,
      date: "15/10/2024",
      originState: "RS",
      destinyState: "SP",
      contractNumber: "000026",
      cpf: "444.444.444-44",
      cnh: "90012345678",
      email: "pedrolima@pedro.com",
      bankDetails: "Santander (033) / Ag 4321 / CC - 543210-1",
      pix: "pedrolima@pedro.com"
    },
    {
      id: "06",
      driverName: "Luiz Fernando",
      driverPhotoUrl: "/driver-mock.png",
      type: "Saldo",
      paymentMethod: "Pamcard",
      contact: "(88) 93333-3333",
      cte: "666666",
      status: "Pago",
      value: 3500,
      date: "16/10/2024",
      originState: "GO",
      destinyState: "MT",
      contractNumber: "000027",
      cpf: "555.555.555-55",
      cnh: "87654321900",
      email: "luizfernando@luiz.com",
      bankDetails: "Banco Bradesco (237) / Ag 5678 / CC - 654321-0",
      pix: "luizfernando@luiz.com"
    },
    {
      id: "07",
      driverName: "João Mendes",
      driverPhotoUrl: "/driver-mock.png",
      type: "Saldo Parcial",
      paymentMethod: "Transferência",
      contact: "(88) 92222-2222",
      cte: "777777",
      status: "Pago",
      value: 7000,
      date: "17/10/2024",
      originState: "CE",
      destinyState: "RN",
      contractNumber: "000028",
      cpf: "666.666.666-66",
      cnh: "80123456789",
      email: "joaomendes@joao.com",
      bankDetails: "Banco do Brasil (001) / Ag 7890 / CC - 987654-3",
      pix: "joaomendes@joao.com"
    },
    {
      id: "08",
      driverName: "Felipe Gonçalves",
      driverPhotoUrl: "/driver-mock.png",
      type: "Despesas",
      paymentMethod: "Dinheiro",
      contact: "(88) 91111-1111",
      cte: "888888",
      status: "Pago",
      value: 13500,
      date: "18/10/2024",
      originState: "MG",
      destinyState: "RJ",
      contractNumber: "000029",
      cpf: "777.777.777-77",
      cnh: "76543210987",
      email: "felipegoncalves@felipe.com",
      bankDetails: "Caixa Econômica (104) / Ag 1234 / CC - 765432-1",
      pix: "felipegoncalves@felipe.com"
    },
    {
      id: "09",
      driverName: "Rafael Souza",
      driverPhotoUrl: "/driver-mock.png",
      type: "Adiantamento",
      paymentMethod: "Pamcard",
      contact: "(88) 90000-0000",
      cte: "999999",
      status: "Pago",
      value: 6800,
      date: "19/10/2024",
      originState: "BA",
      destinyState: "PE",
      contractNumber: "000030",
      cpf: "888.888.888-88",
      cnh: "65432109876",
      email: "rafaelsouza@rafael.com",
      bankDetails: "Itaú (341) / Ag 9876 / CC - 345678-9",
      pix: "rafaelsouza@rafael.com"
    },
    {
      id: "10",
      driverName: "Fernanda Alves",
      driverPhotoUrl: "/driver-mock.png",
      type: "Saldo",
      paymentMethod: "Transferência",
      contact: "(88) 98888-9999",
      cte: "000000",
      status: "Pago",
      value: 14200,
      date: "20/10/2024",
      originState: "PE",
      destinyState: "AL",
      contractNumber: "000031",
      cpf: "999.999.999-99",
      cnh: "54321098765",
      email: "fernandaalves@fernanda.com",
      bankDetails: "Banco Bradesco (237) / Ag 0001 / CC - 654321-1",
      pix: "fernandaalves@fernanda.com"
    },
    {
      id: "11",
      driverName: "Roberto Nunes",
      driverPhotoUrl: "/driver-mock.png",
      type: "Saldo",
      paymentMethod: "Pamcard",
      contact: "(88) 94444-5555",
      cte: "111111",
      status: "Pago",
      value: 5700,
      date: "21/10/2024",
      originState: "RJ",
      destinyState: "SP",
      contractNumber: "000032",
      cpf: "111.111.111-11",
      cnh: "43210987654",
      email: "robertonunes@roberto.com",
      bankDetails: "Banco do Brasil (001) / Ag 3456 / CC - 876543-2",
      pix: "robertonunes@roberto.com"
    },
    {
      id: "12",
      driverName: "Eduardo Martins",
      driverPhotoUrl: "/driver-mock.png",
      type: "Saldo Parcial",
      paymentMethod: "Dinheiro",
      contact: "(88) 92222-6666",
      cte: "222222",
      status: "Pago",
      value: 9800,
      date: "22/10/2024",
      originState: "SP",
      destinyState: "MG",
      contractNumber: "000033",
      cpf: "222.222.222-22",
      cnh: "32109876543",
      email: "eduardomartins@eduardo.com",
      bankDetails: "Santander (033) / Ag 6789 / CC - 098765-4",
      pix: "eduardomartins@eduardo.com"
    }
  ];

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

      {mockPayments
      .filter((payment) => payment.status === "Aberto")
      .map((payment) => (
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

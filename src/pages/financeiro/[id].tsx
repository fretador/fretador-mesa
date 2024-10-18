import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import styles from './Financeiro.module.css';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Body from '@/components/Body';
import { useAppSelector } from '@/store/store';
import Botao from '@/components/Botao';
import Image from 'next/image';
import { BackIcon, LogoWhatsAppIcon, WhatsAppIcon } from '@/utils/icons';

interface Payment {
  id: string,
  driverName: string,
  type: string,
  paymentMethod: string,
  contact: string,
  cte: string,
  status: string,
  value: string,
  date: string,
  route: string,
  contractNumber: string,
  cpf: string,
  cnh: string,
  email: string,
  bankDetails: string,
  pix: string,
}

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

const PendingPayment = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const [pendingPayment, setPendingPayment] = useState<Payment | null>(null)
  const routeName = `Financeiro ${id}`;

  const backButtonContent = (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <BackIcon /> <p style={{ fontWeight: "700" }}>Voltar</p>
    </div>
  );

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    if (id) {
      const foundPayment = mockPendingPayments.find(
        (mpp) => mpp.id === id
      );
      setPendingPayment(foundPayment || null);
    }
  }, [id]);

  if (!pendingPayment) {
    return <p>Carregando...</p>;
  }

  return (
    <AuthenticatedLayout>
      <div className={styles.container}>
        <div>
          <Sidebar />
        </div>

        <div
          className={
            isRetracted ? styles.retractedContentWrapper : styles.contentWrapper
          }
        >
          <div className={styles.header}>
            <Header title={routeName} />
          </div>
          <div className={styles.content}>
            <Body>
              <div className={styles.backButtonContainer}>
                <Botao text={backButtonContent} className={styles.backButton} onClick={handleGoBack} />
              </div>

              <div className={styles.pendingPaymentContainer}>
                <div className={styles.informations}>
                  <div className={styles.row}>
                    <p>Tipo de pagamento: <span>{pendingPayment.paymentMethod}</span></p>
                    <p>CTE: <span>{pendingPayment.cte}</span></p>
                    <p>Status: <span>{pendingPayment.status}</span></p>
                    <p>Valor a ser pago: <span>{pendingPayment.value}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Data: <span>{pendingPayment.date}</span></p>
                    <p>Rota: <span>{pendingPayment.route}</span></p>
                    <p>Contrato do Frete: <span>{pendingPayment.contractNumber}</span></p>
                  </div>

                  <p className={styles.subtitle}>Dados do Motorista</p>

                  <div className={styles.row}>
                    <p>Nome: <span>{pendingPayment.driverName}</span></p>
                    <p>CPF: <span>{pendingPayment.cpf}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>CNH: <span>{pendingPayment.cnh}</span></p>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <LogoWhatsAppIcon />
                      <p style={{color: '#000'}}>{pendingPayment.contact}</p>
                    </div>
                    <p>E-mail: <span>{pendingPayment.email}</span></p>
                  </div>

                  <p className={styles.subtitle}>Forma de Pagamento</p>

                  <div className={styles.row}>
                    <p>Dados Bancários: <span>{pendingPayment.bankDetails}</span></p>
                    <p>Pix: <span>{pendingPayment.pix}</span></p>
                  </div>
                </div>

                <div className={styles.actionButtonsContainer}>
                  <Botao
                    text="Informar Pagamento"
                    onClick={() => {
                      console.log('informou pagamento');
                    }}
                    className={styles.btnDark}
                  />
                </div>
              </div>


            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default PendingPayment;
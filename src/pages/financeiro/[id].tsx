import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './Financeiro.module.css';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Body from '@/components/Body';
import { useAppSelector } from '@/store/store';
import Botao from '@/components/Botao';
import { BackIcon, LogoWhatsAppIcon } from '@/utils/icons';
import { FinancialService } from '@/services/financialService';
import { paymentTypeLabels } from '@/utils/labels/paymentTypeLabels';
import { freightStatusLabels } from '@/utils/labels/freightStatusLabels';
import { FreightStatus } from '@/utils/enums/freightStatusEnum';

interface Payment {
  id: string;
  driverName: string;
  type: keyof typeof paymentTypeLabels;
  paymentMethod: string;
  contact: string;
  cte: string;
  status: keyof typeof FreightStatus;
  value: number;
  date: string;
  contractNumber: string;
  cpf: string;
  cnh: string;
  email: string;
  bankDetails: string;
  pix: string;
  originState: string;
  destinyState: string;
  driverPhotoUrl: string;
}

const PendingPayment = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const [pendingPayment, setPendingPayment] = useState<Payment | null>(null);
  const routeName = `FINANCEIRO`;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const backButtonContent = (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <BackIcon /> <p style={{ fontWeight: '700' }}>Voltar</p>
    </div>
  );

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchPayment = async () => {
      if (id) {
        try {
          const data = await FinancialService.getFreightForFinancialById(id as string);

          // Mapear os dados da API para a interface Payment
          const payment: Payment = {
            id: data.id,
            driverName: data.targetedDrivers[0]?.name || '',
            driverPhotoUrl: data.targetedDrivers[0]?.userPhoto?.imageUrl || '/driver-mock.png',
            type: data.requestFinancialType || '',
            paymentMethod: data.formaPagamento || '',
            contact: data.targetedDrivers[0]?.phoneNumber || '',
            cte: data.cte || '',
            status: data.status || '',
            value: data.value || 0,
            date: data.paymentDate || '',
            contractNumber: data.contractNumber || '',
            cpf: data.targetedDrivers[0]?.cpf || '',
            cnh: data.targetedDrivers[0]?.cnh || '',
            email: data.targetedDrivers[0]?.email || '',
            bankDetails: data.targetedDrivers[0]?.bankDetails || '',
            pix: data.targetedDrivers[0]?.pix || '',
            originState: data.origin || '',
            destinyState: data.destination || '',
          };

          setPendingPayment(payment);
        } catch (error) {
          console.error('Failed to fetch payment data', error);
        }
      }
    };

    fetchPayment();
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
                    <p>Tipo de pagamento: <span>{paymentTypeLabels[pendingPayment.type] || 'Não informado'}</span></p>
                    <p>CTE: <span>{pendingPayment.cte}</span></p>
                    <p>Status: <span>{freightStatusLabels[pendingPayment.status] || 'Status Desconhecido'}</span></p>
                    <p>Valor a ser pago: <span>{formatCurrency(pendingPayment.value)}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Data: <span>{pendingPayment.date}</span></p>
                    <p>Rota: <span>{pendingPayment.originState} X {pendingPayment.destinyState}</span></p>
                    <p>Contrato do Frete: <span>{pendingPayment.contractNumber}</span></p>
                  </div>

                  <p className={styles.subtitle}>Dados do Motorista</p>

                  <div className={styles.row}>
                    <p>Nome: <span>{pendingPayment.driverName}</span></p>
                    <p>CPF: <span>{pendingPayment.cpf}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>CNH: <span>{pendingPayment.cnh}</span></p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <LogoWhatsAppIcon />
                      <p style={{ color: '#000' }}>{pendingPayment.contact}</p>
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
                  {
                    pendingPayment.status === 'FINANCIAL_APPROVED' ? (
                      <Botao
                        text="Notificar Motorista"
                        onClick={() => {
                          console.log('notificou o motorista');
                        }}
                        className={styles.btnDark}
                      />
                    ) : (
                      <Botao
                        text="Informar Pagamento"
                        onClick={() => {
                          console.log('informou pagamento');
                        }}
                        className={styles.btnDark}
                      />
                    )
                  }
                </div>
              </div>

            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default PendingPayment;

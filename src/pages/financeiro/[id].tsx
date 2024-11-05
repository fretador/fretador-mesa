import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styles from './Financeiro.module.css';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Body from '@/components/Body';
import { useAppSelector } from '@/store/store';
import Botao from '@/components/Botao';
import { BackIcon, LogoWhatsAppIcon } from '@/utils/icons';
import { GET_FREIGHT_FINANCIAL_BY_ID } from '@/graphql/queries/financialQueries';
import { UPDATE_FREIGHT_STATUS } from '@/graphql/mutations';
import { paymentTypeLabels } from '@/utils/labels/paymentTypeLabels';
import { freightStatusLabels } from '@/utils/labels/freightStatusLabels';
import { FreightStatus } from '@/utils/enums/freightStatusEnum';
import Loading from "@/components/Loading";
import { dateNow, formatDateTime } from '@/utils/dates';
import { UpdateDataTypeEnum } from '@/utils/enums/updateDataTypeEnum';

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

const PendingPayment: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const [pendingPayment, setPendingPayment] = useState<Payment | null>(null);

  // Query para obter os detalhes do pagamento
  const { data, loading: loadingPaymentData, error } = useQuery(GET_FREIGHT_FINANCIAL_BY_ID, {
    variables: { id },
    skip: !id,
    onCompleted: (data) => {
      const fetchedData = data?.freightForFinancialById;
      if (fetchedData) {
        const payment: Payment = {
          id: fetchedData.id,
          driverName: fetchedData.targetedDrivers[0]?.name || '',
          driverPhotoUrl: fetchedData.targetedDrivers[0]?.userPhoto?.imageUrl || '/driver-mock.png',
          type: fetchedData.requestFinancialType || '',
          paymentMethod: fetchedData.formaPagamento || '',
          contact: fetchedData.targetedDrivers[0]?.phoneNumber || '',
          cte: fetchedData.cte || '',
          status: fetchedData.status || '',
          value: fetchedData.value || 0,
          date: fetchedData.paymentDate || '',
          contractNumber: fetchedData.contractNumber || '',
          cpf: fetchedData.targetedDrivers[0]?.cpf || '',
          cnh: fetchedData.targetedDrivers[0]?.cnh || '',
          email: fetchedData.targetedDrivers[0]?.email || '',
          bankDetails: fetchedData.targetedDrivers[0]?.bankDetails || '',
          pix: fetchedData.targetedDrivers[0]?.pix || '',
          originState: fetchedData.origin || '',
          destinyState: fetchedData.destination || '',
        };
        setPendingPayment(payment);
      }
    },
  });

  // Mutation para atualizar o status do frete
  const [updateFreightStatus, { loading: updatingPayment }] = useMutation(UPDATE_FREIGHT_STATUS);

  const handleInformarPagamento = async () => {
    if (!pendingPayment) return;
    try {
      await updateFreightStatus({
        variables: {
          id: pendingPayment.id,
          status: FreightStatus.FINANCIAL_APPROVED,
          updateData: { paymentDate: dateNow() },
          updateDataType: UpdateDataTypeEnum.FINANCIAL,
        },
      });

      // Atualizar o status localmente após a confirmação da mutation
      setPendingPayment((prevPayment) =>
        prevPayment ? { ...prevPayment, status: FreightStatus.FINANCIAL_APPROVED, date: dateNow() } : null
      );
    } catch (error) {
      console.error('Falha ao atualizar o status do pagamento', error);
    }
  };

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

  if (loadingPaymentData) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p>Erro ao carregar dados do pagamento.</p>;
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
            <Header title="FINANCEIRO" />
          </div>
          <div className={styles.content}>
            <Body>
              <div className={styles.backButtonContainer}>
                <Botao text={backButtonContent} className={styles.backButton} onClick={handleGoBack} />
              </div>

              {updatingPayment ? (
                <div className={styles.loadingContainer}>
                  <Loading />
                </div>
              ) : (
                pendingPayment && (
                  <div className={styles.pendingPaymentContainer}>
                    <div className={styles.informations}>
                      <div className={styles.row}>
                        <p>Tipo de pagamento: <span>{paymentTypeLabels[pendingPayment.type] || 'Não informado'}</span></p>
                        <p>CTE: <span>{pendingPayment.cte}</span></p>
                        <p>Status: <span>{freightStatusLabels[pendingPayment.status] || 'Status Desconhecido'}</span></p>
                        <p>Valor a ser pago: <span>{formatCurrency(pendingPayment.value)}</span></p>
                      </div>

                      <div className={styles.row}>
                        <p>Data: <span>{formatDateTime(pendingPayment.date)}</span></p>
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
                      {pendingPayment.status === FreightStatus.FINANCIAL_APPROVED ? (
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
                          onClick={handleInformarPagamento}
                          className={styles.btnDark}
                        />
                      )}
                    </div>
                  </div>
                )
              )}
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default PendingPayment;

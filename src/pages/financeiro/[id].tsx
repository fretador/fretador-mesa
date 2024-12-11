import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./Financeiro.module.css";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Body from "@/components/Body";
import { useAppSelector } from "@/store/store";
import Botao from "@/components/Botao";
import { BackIcon, LogoWhatsAppIcon } from "@/utils/icons";
import { paymentTypeLabels } from "@/utils/labels/paymentTypeLabels";
import { freightStatusLabels } from "@/utils/labels/freightStatusLabels";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { dateNow, formatDateTime } from "@/utils/dates";
import { UpdateDataTypeEnum } from "@/utils/enums/updateDataTypeEnum";
import SmallLoading from "@/components/SmallLoading";
import { Payment } from "@/utils/Interfaces/Payment";
import { useFinancialFreightById } from "@/hooks/financial/useFinancialFreightById";
import { useUpdateStatusFinancialFreight } from "@/hooks/financial/useUpdateStatusFinancialFreight";

const PendingPayment: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const boardUser = useAppSelector((state) => state.auth.boardUser);
  const router = useRouter();
  const { id } = router.query;
  const [pendingPayment, setPendingPayment] = useState<Payment | null>(null);

  const { data: freightData, loading: loadingPaymentData, error } = useFinancialFreightById(id as string);
  const { updateStatusFinancialFreight, loading: updatingPayment } = useUpdateStatusFinancialFreight(id as string);

  useEffect(() => {
    if (freightData) {
      const fetchedData = freightData;
      const payment: Payment = {
        id: fetchedData.id,
        driverName: fetchedData.targetedDrivers?.[0]?.name || '',
        driverPhotoUrl: fetchedData.targetedDrivers?.[0]?.userPhoto?.imageUrl || '/driver-mock.png',
        type: fetchedData.requestFinancialType || '',
        paymentMethod: fetchedData.formaPagamento || '',
        contact: fetchedData.targetedDrivers?.[0]?.phoneNumber || '',
        numCte: fetchedData.numCte || '',
        status: fetchedData.status || '',
        value: fetchedData.value || 0,
        date: fetchedData.paymentDate || '',
        contractNumber: fetchedData.contractNumber || '',
        cpf: fetchedData.targetedDrivers?.[0]?.cpf || '',
        cnh: fetchedData.targetedDrivers?.[0]?.cnh || '',
        email: fetchedData.targetedDrivers?.[0]?.email || '',
        bankDetails: fetchedData.targetedDrivers?.[0]?.bankDetails || '',
        pix: fetchedData.targetedDrivers?.[0]?.pix || '',
        originState: fetchedData.origin || '',
        destinyState: fetchedData.destination || '',
      };
      setPendingPayment(payment);
    }
  }, [freightData]);

  const handleInformarPagamento = async () => {
    if (!pendingPayment) return;
    try {
      await updateStatusFinancialFreight({
        variables: {
          id: pendingPayment.id,
          input: {
            status: FreightStatus.FINANCIAL_APPROVED,
            updateData: { freight: { paymentDate: dateNow() }, boardUser: { name: boardUser?.name, profile: boardUser?.profile } },
            updateDataType: UpdateDataTypeEnum.FINANCIAL,
          }
        },
      });

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

  return (
    <AuthenticatedLayout>
      <div className={styles.container}>
        <div>
          <Sidebar />
        </div>
        <div className={isRetracted ? styles.retractedContentWrapper : styles.contentWrapper}>
          <div className={styles.header}>
            <Header title="FINANCEIRO" />
          </div>
          <div className={styles.content}>
            <Body>
              <div className={styles.backButtonContainer}>
                <Botao text={backButtonContent} className={styles.backButton} onClick={handleGoBack} />
              </div>

              <div className={styles.pendingPaymentContainer}>
                {loadingPaymentData || updatingPayment ? (
                  <div className={styles.loadingContainer}>
                    <SmallLoading />
                  </div>
                ) : error ? (
                  <p>Erro ao carregar frete: {error.message}</p>
                ) : !pendingPayment ? (
                  <p>Frete não encontrado</p>
                ) : (
                  <>
                    <div className={styles.informations}>
                      <div className={styles.row}>
                        <p>Tipo de pagamento: <span>{paymentTypeLabels[pendingPayment.type] || 'Não informado'}</span></p>
                        <p>CTE: <span>{pendingPayment.numCte}</span></p>
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
                  </>
                )}
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default PendingPayment;

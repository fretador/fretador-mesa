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
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { formatDateToBrazilian } from "@/utils/dates";
import { formatCurrency } from "@/utils/currency";
import { UpdateDataTypeEnum } from "@/utils/enums/updateDataTypeEnum";
import SmallLoading from "@/components/SmallLoading";
import { Payment } from "@/utils/Interfaces/Payment";
import { useFinancialFreightById } from "@/hooks/financial/useFinancialFreightById";
import { useUpdateStatusFinancialFreight } from "@/hooks/financial/useUpdateStatusFinancialFreight";
import PaymentNotificationModal from "@/components/Modal/Financeiro/PaymentNotificationModal";
import { RequestFinancialType } from "@/utils/enums/requestFinancialTypeEnum";

const PendingPayment: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const boardUser = useAppSelector((state) => state.auth.boardUser);
  const router = useRouter();
  const { id } = router.query;

  const [pendingPayment, setPendingPayment] = useState<Payment | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { data: fetchedData, loading: loadingPaymentData, error } = useFinancialFreightById(id as string);
  const { updateStatusFinancialFreight, loading: updatingPayment } = useUpdateStatusFinancialFreight(id as string);

  useEffect(() => {
    if (fetchedData && fetchedData.id) {
      const driver = fetchedData.targetedDrivers?.[0];

      const payment: Payment = {
        id: fetchedData.id ?? '',
        driverName: driver?.name || 'Não informado',
        driverPhotoUrl: driver?.userPhoto?.imageUrl || '/driver-mock.png',
        type: fetchedData.requestFinancialType || fetchedData.paymentType || 'Não informado',
        paymentMethod: fetchedData.formaPagamento || 'Não informado',
        contact: driver?.phoneNumber || 'Não informado',
        numCte: fetchedData.numCte || 'Não informado',
        status: (fetchedData.status as FreightStatus) ?? FreightStatus.WAITING,
        value: fetchedData.value ?? 0,
        advanceValue: fetchedData.advanceValue ?? 0,
        balanceValue: fetchedData.balanceValue ?? 0,
        paymentDate: fetchedData.paymentDate || '',
        advancePaymentDate: fetchedData.advancePaymentDate || '',
        balancePaymentDate: fetchedData.balancePaymentDate || '',
        paymentRequestedDate: fetchedData.paymentRequestedDate || '',
        advanceRequestedDate: fetchedData.advanceRequestedDate || '',
        balanceRequestedDate: fetchedData.balanceRequestedDate || '',
        contractNumber: fetchedData.contractNumber || 'Não informado',
        cpf: driver?.cpf || 'Não informado',
        cnh: driver?.cnh || 'Não informado',
        email: driver?.email || 'Não informado',
        bankDetails: '',
        pix: '',
        originState: fetchedData.origin || 'Não informado',
        destinyState: fetchedData.destination || 'Não informado',
      };
      setPendingPayment(payment);
    }
  }, [fetchedData]);

  const handleOpenPaymentModal = () => setIsPaymentModalOpen(true);
  const handleClosePaymentModal = () => setIsPaymentModalOpen(false);

  const handleModalConfirm = async (valorPago: string, dataPagamento: string) => {
    if (!pendingPayment) return;

    const numericValue = Number(valorPago.replace(/\D/g, '')) / 100;
    const [dia, mes, ano] = dataPagamento.split('/');
    const isoDate = `${ano}-${mes}-${dia}T00:00:00-03:00`;

    let updateFields: Record<string, any> = {};

    switch (pendingPayment.type) {
      case RequestFinancialType.ADVANCE:
        updateFields = {
          advanceValue: numericValue,
          advancePaymentDate: isoDate
        };
        break;
      case RequestFinancialType.PARTIAL_BALANCE:
        updateFields = {
          balanceValue: numericValue,
          balancePaymentDate: isoDate
        };
        break;
      case RequestFinancialType.BALANCE:
      default:
        updateFields = {
          value: numericValue,
          paymentDate: isoDate
        };
    }

    try {
      await updateStatusFinancialFreight({
        variables: {
          id: pendingPayment.id,
          input: {
            status: FreightStatus.FINANCIAL_APPROVED,
            updateData: {
              freight: updateFields,
              boardUser: { name: boardUser?.name, profile: boardUser?.profile }
            },
            updateDataType: UpdateDataTypeEnum.FINANCIAL,
          }
        },
      });

      setPendingPayment((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          status: FreightStatus.FINANCIAL_APPROVED,
          ...updateFields,
        };
      });

      handleClosePaymentModal();
    } catch (error) {
      console.error('Falha ao atualizar o status do pagamento', error);
    }
  };

  const handleGoBack = () => router.back();

  let valorExibido: number = 0;
  let dataExibida: string = '';
  let requestedDateExibida: string = '';

  if (pendingPayment) {
    switch (pendingPayment.type) {
      case RequestFinancialType.ADVANCE:
        valorExibido = pendingPayment.advanceValue ?? 0;
        dataExibida = pendingPayment.advancePaymentDate || pendingPayment.paymentDate;
        requestedDateExibida = pendingPayment.advanceRequestedDate || pendingPayment.paymentRequestedDate;
        break;
      case RequestFinancialType.PARTIAL_BALANCE:
        valorExibido = pendingPayment.balanceValue ?? 0;
        dataExibida = pendingPayment.balancePaymentDate || pendingPayment.paymentDate;
        requestedDateExibida = pendingPayment.balanceRequestedDate || pendingPayment.paymentRequestedDate;
        break;
      case RequestFinancialType.BALANCE:
        valorExibido = pendingPayment.value;
        dataExibida = pendingPayment.paymentDate;
        requestedDateExibida = pendingPayment.paymentRequestedDate;
        break;
      default:
        valorExibido = pendingPayment.value;
        dataExibida = pendingPayment.paymentDate;
        requestedDateExibida = pendingPayment.paymentRequestedDate;
    }
  }

  const initialValorPago = (pendingPayment && valorExibido) ? valorExibido : undefined;
  const initialDataPagamento = dataExibida ? dataExibida : undefined;

  // Determina se o pagamento está "ABERTO" ou "PAGO"
  const statusPagamento = pendingPayment?.status === FreightStatus.FINANCIAL_APPROVED ? 'PAGO' : 'ABERTO';

  const backButtonContent = (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <BackIcon /> <p style={{ fontWeight: '700' }}>Voltar</p>
    </div>
  );

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
                        {/* Aqui exibimos o status como ABERTO ou PAGO */}
                        <p>Status: <span>{statusPagamento}</span></p>
                        <p>Valor a ser pago: <span>{formatCurrency(valorExibido)}</span></p>
                      </div>

                      <div className={styles.row}>
                        <p>Rota: <span>{pendingPayment.originState} X {pendingPayment.destinyState}</span></p>
                        <p>Contrato do Frete: <span>{pendingPayment.contractNumber}</span></p>
                      </div>

                      <div className={styles.row}>
                        <p>Requisitado em: <span>{requestedDateExibida ? formatDateToBrazilian(requestedDateExibida) : "Não informado"}</span></p>
                        <p>Pago em: <span>{dataExibida ? formatDateToBrazilian(dataExibida) : "Não informado"}</span></p>
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
                          onClick={handleOpenPaymentModal}
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

      {pendingPayment && (
        <PaymentNotificationModal
          isOpen={isPaymentModalOpen}
          onRequestClose={handleClosePaymentModal}
          handleConfirm={handleModalConfirm}
          motorista={pendingPayment.driverName}
          contrato={pendingPayment.contractNumber}
          numCte={pendingPayment.numCte}
          banco="Banco Exemplo"
          initialValorPago={initialValorPago}
          initialDataPagamento={initialDataPagamento}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default PendingPayment;

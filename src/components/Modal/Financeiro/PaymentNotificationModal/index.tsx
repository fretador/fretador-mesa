import React, { useState, useEffect } from 'react';
import styles from './PaymentNotificationModal.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from 'date-fns/locale';
import Modal from "../../index";

registerLocale('pt-BR', ptBR);

interface PaymentNotificationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleConfirm: (valorPago: string, dataPagamento: string) => void;
  motorista: string;
  contrato: string;
  numCte: string;
  banco: string;
  initialValorPago?: number;
  initialDataPagamento?: string;
}

const PaymentNotificationModal: React.FC<PaymentNotificationModalProps> = ({
  isOpen,
  onRequestClose,
  handleConfirm,
  motorista,
  contrato,
  numCte,
  banco,
  initialValorPago,
  initialDataPagamento
}) => {
  const [valorPago, setValorPago] = useState('');
  const [dataPagamento, setDataPagamento] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialValorPago) {
      const formattedValue = formatCurrency(initialValorPago.toFixed(2).replace('.', ''));
      setValorPago(formattedValue);
    }

    if (initialDataPagamento) {
      const dateObj = new Date(initialDataPagamento);
      if (!isNaN(dateObj.getTime())) {
        setDataPagamento(dateObj);
      }
    }
  }, [initialValorPago, initialDataPagamento]);

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = `R$ ${numericValue.replace(/(\d{2})$/, ',$1')}`;
    return formattedValue;
  };

  const onConfirm = () => {
    if (!valorPago || !dataPagamento) {
      setError('Preencha todos os campos antes de confirmar.');
      return;
    }
    setError(null);
    handleConfirm(valorPago, dataPagamento.toISOString().split('T')[0]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Informar Pagamento"
      modalDescription=""
      buttonOneTitle="Confirmar"
      buttonOneAction={onConfirm}
      childrenClassName={styles.children}
    >
      <div className={styles.modalContent}>
        <p className={styles.modalTitle}>Confirmar pagamento para:</p>
        <p className={styles.label}>Motorista: <span className={styles.value}>{motorista}</span></p>
        <div className={styles.contractGroup}>
          <p className={styles.label}>
            Contrato: <span className={styles.value}>{contrato}</span>
          </p>
          <p className={styles.label}>
            CTE: <span className={styles.value}>{numCte}</span>
          </p>
        </div>
        <p className={styles.label}>
          Banco: <span className={styles.value}>{banco}</span>
        </p>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Valor Pago</label>
            <input
              type="text"
              value={valorPago}
              onChange={(e) => setValorPago(formatCurrency(e.target.value))}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Data do Pagamento</label>
            <ReactDatePicker
              selected={dataPagamento}
              onChange={(date: Date | null) => setDataPagamento(date)}
              dateFormat="dd/MM/yyyy"
              locale="pt-BR"
              className={styles.inputField}
              // maxDate={new Date()}
              placeholderText="Selecione uma data"
            />
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </Modal>
  );
};

export default PaymentNotificationModal;

import React, { useState, useEffect } from 'react';
import styles from './PaymentNotificationModal.module.css';
import Modal from "../../index";

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
  const [dataPagamento, setDataPagamento] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialValorPago) {
      // Converte o número inicial para o formato monetário do input
      const formattedValue = formatCurrency(initialValorPago.toFixed(2).replace('.', ''));
      setValorPago(formattedValue);
    }

    if (initialDataPagamento) {
      // Formata a data caso já exista
      // Supondo que a data esteja em formato ISO "YYYY-MM-DD"
      // Precisamos converter para dd/MM/yyyy
      const dateObj = new Date(initialDataPagamento);
      if (!isNaN(dateObj.getTime())) {
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        setDataPagamento(`${day}/${month}/${year}`);
      }
    }

  }, [initialValorPago, initialDataPagamento]);

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = `R$ ${numericValue.replace(/(\d{2})$/, ',$1')}`;
    return formattedValue;
  };

  const formatDate = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = '';
    if (numericValue.length > 0) {
      formattedValue += numericValue.slice(0, 2);
    }
    if (numericValue.length > 2) {
      formattedValue += '/' + numericValue.slice(2, 4);
    }
    if (numericValue.length > 4) {
      formattedValue += '/' + numericValue.slice(4, 8);
    }
    return formattedValue;
  };

  const onConfirm = () => {
    if (!valorPago || !dataPagamento) {
      setError('Preencha todos os campos antes de confirmar.');
      return;
    }
    setError(null);
    handleConfirm(valorPago, dataPagamento);
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
            <input
              type="text"
              value={dataPagamento}
              onChange={(e) => setDataPagamento(formatDate(e.target.value))}
              className={styles.inputField}
            />
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </Modal>
  );
};

export default PaymentNotificationModal;

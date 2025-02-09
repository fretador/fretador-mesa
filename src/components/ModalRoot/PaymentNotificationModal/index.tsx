import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PaymentNotificationModal.module.css';

interface PaymentNotificationModalProps {
  motorista: string;
  contrato: string;
  numCte: string;
  banco: string;
  onClose: () => void;
}

const PaymentNotificationModal: React.FC<PaymentNotificationModalProps> = ({ motorista, contrato, numCte, banco, onClose }) => {
  const [valorPago, setValorPago] = useState('');
  const [dataPagamento, setDataPagamento] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    if (!valorPago || !dataPagamento) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Simulação de envio de dados para o backend
    onClose();
  };

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

  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Informar Pagamento</h2>
        <button className={styles.closeButton} onClick={handleClose}>
          x
        </button>
      </div>
      <div className={styles.modalContent}>
        <p className={styles.confirmText}>Confirmar pagamento para:</p>
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
        <div className={styles.inputGroup}>
          <div className={styles.inputLabels}>
            <label className={styles.inputLabel}>Valor Pago</label>
            <label className={styles.inputLabel}>Data do Pagamento</label>
          </div>
          <div className={styles.inputFields}>
            <input
              type="text"
              value={valorPago}
              onChange={(e) => setValorPago(formatCurrency(e.target.value))}
              className={styles.inputField}
            />
            <input
              type="text"
              value={dataPagamento}
              onChange={(e) => setDataPagamento(formatDate(e.target.value))}
              className={styles.inputField}
            />
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.confirmButton} onClick={handleConfirm}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

PaymentNotificationModal.propTypes = {
  motorista: PropTypes.string.isRequired,
  contrato: PropTypes.string.isRequired,
  numCte: PropTypes.string.isRequired,
  banco: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PaymentNotificationModal;

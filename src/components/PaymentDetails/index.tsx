import React from "react";
import styles from './PaymentDetails.module.css';
import { LogoWhatsAppIcon } from "@/utils/icons";
import Botao from "../Botao";

interface PaymentDetailsProps {
  buttonTitle: string;
  onButtonClick: () => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ buttonTitle, onButtonClick }) => {

  return (
    <div className={styles.container}>
      <div className={styles.informations}>
        <div className={styles.row}>
          <p>Tipo de pagamento: <span>Adiantamento</span></p>
          <p>CTE: <span>11111</span></p>
          <p>Status: <span>Aberto</span></p>
          <p>Valor a ser pago: <span>R$3000,00</span></p>
        </div>

        <div className={styles.row}>
          <p>Data: <span>20/10/2024</span></p>
          <p>Rota: <span>SP/CE</span></p>
          <p>Contrato de Frete: <span>111111111</span></p>
        </div>

        {/* Dados do Motorista */}
        <div className={styles.titleContainer}>
          <p>Dados do Motorista</p>
        </div>
        <div className={styles.row} style={{ marginBottom: '16px' }}>
          <p>Nome: <span>Francisco José do Frete</span></p>
          <p>CPF: <span>011.011.011-11</span></p>
        </div>

        <div className={styles.row}>
          <p>CNH: <span>111111111</span></p>
          <div className={styles.whatsappContainer}>
            <LogoWhatsAppIcon />
            <p><span>0000000</span></p>
          </div>
          <p>Email: <span>josedofrete@gmail.com</span></p>
        </div>

        {/* Forma de Pagamento */}
        <div className={styles.subTitleContainer}>
          <p>Forma de Pagamento</p>
        </div>
        <div className={styles.row}>
          <p>Dados Bancários: <span>Banco: Bradesco (237) / Ag 0000 / CC- 0000000-0</span></p>
          <p>Pix: <span>josedofrete@gmail.com</span></p>
        </div>
      </div>

      {/* Botão com título e ação personalizados */}
      <div className={styles.buttonContainer}>
        <Botao text={buttonTitle} onClick={onButtonClick} className={styles.button} />
      </div>
    </div>
  );
}

export default PaymentDetails;

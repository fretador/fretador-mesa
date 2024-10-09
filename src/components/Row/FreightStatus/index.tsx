import React from "react";
import styles from "./FreightStatus.module.css";
import { FreightStatus as FreightStatusEnum } from "@/utils/enums/freightStatusEnum";

interface FreightStatusProps {
  freightStatus?: FreightStatusEnum;
}

const translateStatus = (status: FreightStatusEnum) => {
  switch (status) {
    case FreightStatusEnum.WAITING:
      return "AGUARDANDO";
    case FreightStatusEnum.TARGETED:
      return "DIRECIONADO";
    case FreightStatusEnum.REQUESTED:
      return "SOLICITADO";
    case FreightStatusEnum.APPROVED:
      return "APROVADO";
    case FreightStatusEnum.ACCEPTED:
      return "ACEITO";
    case FreightStatusEnum.PICKUP_ORDER_SENT:
      return "ORDEM DE COLETA ENVIADA";
    case FreightStatusEnum.OPERATION_REQUIRED:
      return "OPERAÇÃO NECESSÁRIA";
    case FreightStatusEnum.OPERATION_APPROVED:
      return "OPERAÇÃO APROVADA";
    case FreightStatusEnum.ADMIN_REQUIRED:
      return "ADMIN NECESSÁRIO";
    case FreightStatusEnum.ADMIN_APPROVED:
      return "ADMIN APROVADO";
    case FreightStatusEnum.FINANCIAL_REQUIRED:
      return "FINANCEIRO NECESSÁRIO";
    case FreightStatusEnum.FINANCIAL_APPROVED:
      return "FINANCEIRO APROVADO";
    case FreightStatusEnum.LOADING_STARTED:
      return "CARREGAMENTO INICIADO";
    case FreightStatusEnum.LOADING_FINISHED:
      return "CARREGAMENTO FINALIZADO";
    case FreightStatusEnum.UNLOADING_STARTED:
      return "DESCARREGAMENTO INICIADO";
    case FreightStatusEnum.UNLOADING_FINISHED:
      return "DESCARREGAMENTO FINALIZADO";
    case FreightStatusEnum.INVOICE_SENT:
      return "FATURA ENVIADA";
    case FreightStatusEnum.INVOICE_COUPON_SENT:
      return "COMPROVANTE DE DESCARGA ENVIADO";
    case FreightStatusEnum.INVOICE_COUPON_REFUSED:
      return "COMPROVANTE DE DESCARGA REJEITADO";
    case FreightStatusEnum.DRIVER_ARRIVED:
      return "MOTORISTA CHEGOU";
    case FreightStatusEnum.DRIVER_SELECTED:
      return "MOTORISTA SELECIONADO";
    case FreightStatusEnum.FINISHED:
      return "FINALIZADO";
    case FreightStatusEnum.CANCELED:
      return "CANCELADO";
    default:
      return status;
  }
};

const FreightStatus = ({ freightStatus = FreightStatusEnum.WAITING }: FreightStatusProps) => {
  const translatedStatus = translateStatus(freightStatus);

  return (
    <>
      <p className={styles.freightStatusText}>{translatedStatus}</p>
    </>
  );
};

export default FreightStatus;

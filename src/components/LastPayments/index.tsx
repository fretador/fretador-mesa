import React from "react";
import { Row } from "../Row";
import styles from "./LastPaymentsList.module.css";
import RowTitle from "../RowTitle";
import Loading from "../Loading";
import { paymentTypeLabels } from '@/utils/labels/paymentTypeLabels';
import { formatDateTime } from "@/utils/dates";
import { Freight } from '@/utils/types/Freight';
import { useRouter } from "next/router";

interface LastPaymentsListProps {
  data: Freight[];
  loading: boolean;
}

const LastPaymentsList: React.FC<LastPaymentsListProps> = ({ data, loading }) => {
  const router = useRouter();
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

  const handlePaymentCard = (id: string | undefined) => {
    if (!id) return;
    router.push(`/financeiro/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Últimos Pagamentos</h2>
        <div className={styles.actionsButtons}>
          <h4>Ordenar A-Z</h4>
          <h4>Exportar CSV</h4>
        </div>
      </div>

      <RowTitle
        Driver="Motorista"
        Contract="Contrato"
        Route="Rota"
        Value="Valor (R$)"
        PaymentDate="Data"
        PaymentType="Tipo"
        titleStyles={{ color: "#1B556D", fontWeight: "700", fontSize: "20px" }}
      />

      <div className={styles.content}>
        {data.map((freight) => (
          <Row.Root
            key={freight.id ?? "no-id"}
            customBackgroundColor="#B2CEDA"
            onClick={() => handlePaymentCard(freight.id)}
          >
            <Row.Driver
              driverPhotoUrl={freight.targetedDrivers?.[0]?.userPhoto?.imageUrl ?? "/driver-mock.png"}
              driverName={freight.targetedDrivers?.[0]?.name ?? "Não informado"}
              showImage={true}
              textColor="#1B556D"
              textFontWeight="700"
            />
            <Row.Contract contract={freight.contractNumber ?? "Não informado"} />
            <Row.Route
              originState={freight.origin ?? "Não informado"}
              destinyState={freight.destination ?? "Não informado"}
            />
            <Row.Value value={freight.value ?? 0} />
            <Row.PaymentDate date={formatDateTime(freight.paymentDate ?? "")} />
            <Row.PaymentType paymentType={paymentTypeLabels[freight.requestFinancialType ?? ''] ?? 'Não informado'} />
          </Row.Root>
        ))}
      </div>
    </div>
  );
};

export default LastPaymentsList;

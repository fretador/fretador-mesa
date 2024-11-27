import React, { useState } from "react";
import { Row } from "../Row";
import styles from "./LastPaymentsList.module.css";
import RowTitle from "../RowTitle";
import Loading from "../Loading";
import { paymentTypeLabels } from '@/utils/labels/paymentTypeLabels';
import { formatDateTime } from "@/utils/dates";
import { Freight } from '@/utils/Interfaces/Freight';
import { useRouter } from "next/router";
import SmallLoading from "../SmallLoading";

interface LastPaymentsListProps {
  data: Freight[];
  loading: boolean;
}

const LastPaymentsList: React.FC<LastPaymentsListProps> = ({ data, loading }) => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <SmallLoading />
      </div>
    );
  }

  const handlePaymentCard = (id: string | undefined) => {
    if (!id) return;
    router.push(`/financeiro/${id}`);
  };

  const handleSortClick = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedData = [...data].sort((a, b) => {
    const nameA = a.targetedDrivers?.[0]?.name?.toLowerCase() ?? '';
    const nameB = b.targetedDrivers?.[0]?.name?.toLowerCase() ?? '';

    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Últimos Pagamentos</h2>
        <div className={styles.actionsButtons}>
          <h4 onClick={handleSortClick} style={{ cursor: 'pointer' }}>
            Ordenar {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </h4>
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
        {sortedData.map((freight) => (
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

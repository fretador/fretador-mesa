import React, { useEffect, useState } from "react";
import { Row } from "../Row";
import styles from "./LastPaymentsList.module.css";
import RowTitle from "../RowTitle";
import Loading from "../Loading";
import { useRouter } from "next/router";
import { FinancialService } from "@/services/financialService";
import { Freight } from "@/utils/types/Freight";

const LastPaymentsList: React.FC = () => {
  const [data, setData] = useState<Freight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const filters = { status: ["FINANCIAL_APPROVED"] };
        const page = 1;
        const limit = 10;

        const result = await FinancialService.getFreightsForFinancial(filters, page, limit);

        setData(result.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Erro ao carregar fretes");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );

  if (error) return <p>Erro ao carregar fretes: {error}</p>;

  const handlePaymentCard = (id: string) => {
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
        {data.map((freight) => {
          const driver = freight.targetedDrivers && freight.targetedDrivers.length > 0 ? freight.targetedDrivers[0] : null;
          return (
            <Row.Root
              key={freight.id}
              customBackgroundColor="#B2CEDA"
              onClick={() => handlePaymentCard(freight.id)}
            >
              <Row.Driver
                driverPhotoUrl={driver?.userPhoto.imageUrl || "/driver-mock.png"}
                driverName={driver?.name || "N/A"}
                showImage={true}
                textColor="#1B556D"
                textFontWeight="700"
              />
              <Row.Contract contract={freight.contractNumber || "N/A"} />
              <Row.Route originState={freight.origin || "N/A"} destinyState={freight.destination || "N/A"} />
              <Row.Value value={freight.value || 0} />
              <Row.PaymentDate date={freight.paymentDate || "N/A"} />
              <Row.PaymentType paymentType={freight.requestFinancialType || "N/A"} />
            </Row.Root>
          );
        })}
      </div>
    </div>
  );
};

export default LastPaymentsList;

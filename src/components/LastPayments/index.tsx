import React from "react";
import { Row } from "../Row";
import { Driver } from "@/utils/types/Driver";
import styles from "./LastPaymentsList.module.css";
import RowTitle from "../RowTitle";
import Loading from "../Loading";
import { useRouter } from "next/router";

interface LastPaymentsListProps {
  loading: boolean;
  error: string | null;
}

const LastPaymentsList: React.FC<LastPaymentsListProps> = ({
  loading,
  error,
}) => {
  const router = useRouter();

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

  const handleDriverClick = (driverId: string) => {
    router.push(`/cadastro-do-motorista/${driverId}`);
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
        <Row.Root
          customBackgroundColor="#B2CEDA"
          onClick={() => {}}
        >
          <Row.Driver
            driverPhotoUrl={"/driver-mock.png"}
            driverName={"André P. Souza"}
            showImage={true}
            textColor="#1B556D"
            textFontWeight="700"
          />
          <Row.Contract contract="000000" />
          <Row.Route originState="SP" destinyState="RJ" />
          <Row.Value value={1200} />
          <Row.PaymentDate date={new Date()} />
          <Row.PaymentType paymentType="adiantamento" />
        </Row.Root>

        <Row.Root
          customBackgroundColor="#B2CEDA"
          onClick={() => {}}
        >
          <Row.Driver
            driverPhotoUrl={"/driver-mock.png"}
            driverName={"André P. Souza"}
            showImage={true}
            textColor="#1B556D"
            textFontWeight="700"
          />
          <Row.Contract contract="000000" />
          <Row.Route originState="SP" destinyState="RJ" />
          <Row.Value value={1200} />
          <Row.PaymentDate date={new Date()} />
          <Row.PaymentType paymentType="saldo" />
        </Row.Root>

        <Row.Root
          customBackgroundColor="#B2CEDA"
          onClick={() => {}}
        >
          <Row.Driver
            driverPhotoUrl={"/driver-mock.png"}
            driverName={"André P. Souza"}
            showImage={true}
            textColor="#1B556D"
            textFontWeight="700"
          />
          <Row.Contract contract="000000" />
          <Row.Route originState="SP" destinyState="RJ" />
          <Row.Value value={1200} />
          <Row.PaymentDate date={new Date()} />
          <Row.PaymentType paymentType="saldo parcial" />
        </Row.Root>

        <Row.Root
          customBackgroundColor="#B2CEDA"
          onClick={() => {}}
        >
          <Row.Driver
            driverPhotoUrl={"/driver-mock.png"}
            driverName={"André P. Souza"}
            showImage={true}
            textColor="#1B556D"
            textFontWeight="700"
          />
          <Row.Contract contract="000000" />
          <Row.Route originState="SP" destinyState="RJ" />
          <Row.Value value={1200} />
          <Row.PaymentDate date={new Date()} />
          <Row.PaymentType paymentType="despesas" />
        </Row.Root>

        <Row.Root
          customBackgroundColor="#B2CEDA"
          onClick={() => {}}
        >
          <Row.Driver
            driverPhotoUrl={"/driver-mock.png"}
            driverName={"André P. Souza"}
            showImage={true}
            textColor="#1B556D"
            textFontWeight="700"
          />
          <Row.Contract contract="000000" />
          <Row.Route originState="SP" destinyState="RJ" />
          <Row.Value value={1200} />
          <Row.PaymentDate date={new Date()} />
          <Row.PaymentType paymentType="ocorrência" />
        </Row.Root>
      </div>
    </div>
  );
};

export default LastPaymentsList;

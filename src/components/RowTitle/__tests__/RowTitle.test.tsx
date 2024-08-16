import React from "react";
import { render } from "@testing-library/react";
import RowTitle from "./index";

test("renders RowTitle component with correct titles", () => {
  const { getByText } = render(
    <RowTitle
      CityState="CIDADE"
      Cnpj="CNPJ"
      CorporateName="RAZAO SOCIAL"
      Cte="CTE"
      Customer="CLIENTE"
      CustomerEmail="EMAIL"
      Driver="MOTORISTA"
      DriverStatus="STATUS MOTORISTA"
      FreightCode="CÓDIGO"
      FreightDate="DATA"
      FreightStatus="STATUS FRETE"
      OccurrenceDate="DATA OCORRENCIA"
      OccurrenceStatus="STATUS OCORRENCIA"
      OccurrenceType="TIPO OCORRENCIA"
      PaymentDate="DATA PAGAMENTO"
      PaymentMethod="FORMA PAGAMENTO"
      Route="ROTA"
      TradeName="NOME FANTASIA"
      Value="VALOR"
      Vehicle="VEICULO"
      WhatsApp="WHATSAPP"
    />
  );

  expect(getByText("CIDADE")).toBeInTheDocument();
  expect(getByText("CNPJ")).toBeInTheDocument();
  expect(getByText("RAZAO SOCIAL")).toBeInTheDocument();
  expect(getByText("CTE")).toBeInTheDocument();
  expect(getByText("CLIENTE")).toBeInTheDocument();
  expect(getByText("EMAIL")).toBeInTheDocument();
  expect(getByText("MOTORISTA")).toBeInTheDocument();
  expect(getByText("STATUS MOTORISTA")).toBeInTheDocument();
  expect(getByText("CÓDIGO")).toBeInTheDocument();
  expect(getByText("DATA")).toBeInTheDocument();
  expect(getByText("STATUS FRETE")).toBeInTheDocument();
  expect(getByText("DATA OCORRENCIA")).toBeInTheDocument();
  expect(getByText("STATUS OCORRENCIA")).toBeInTheDocument();
  expect(getByText("TIPO OCORRENCIA")).toBeInTheDocument();
  expect(getByText("DATA PAGAMENTO")).toBeInTheDocument();
  expect(getByText("FORMA PAGAMENTO")).toBeInTheDocument();
  expect(getByText("ROTA")).toBeInTheDocument();
  expect(getByText("NOME FANTASIA")).toBeInTheDocument();
  expect(getByText("VALOR")).toBeInTheDocument();
  expect(getByText("VEICULO")).toBeInTheDocument();
  expect(getByText("WHATSAPP")).toBeInTheDocument();
});

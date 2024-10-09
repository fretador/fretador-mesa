import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFreightController } from "@/controllers/freightController";
import { RootState } from "@/store/store";
import { FreightFilters as FiltersFreights } from "@/utils/types/FreightFilters";
import FreightFilters from "./FreightFilters";

// Importe ou defina os componentes Row e RowTitle
import { Row } from "@/components/Row";
import RowTitle from "../RowTitle";

const FreightListNew: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState<FiltersFreights>({});
  const { loadFreights } = useFreightController();
  const freights = useSelector((state: RootState) => state.freight.freights);
  const pageInfo = useSelector((state: RootState) => state.freight.pageInfo);
  const loading = useSelector((state: RootState) => state.freight.loading);
  const error = useSelector((state: RootState) => state.freight.error);

  useEffect(() => {
    loadFreights(filters, page, limit);
  }, [filters, page, limit, loadFreights]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Freight List</h1>
      <FreightFilters setFilters={setFilters} />
      
      <RowTitle
        FreightDate="DATA"
        FreightCode="CÓDIGO"
        Cte="CTE"
        Route="ROTA"
        Customer="CLIENTE"
        Driver="MOTORISTA"
        FreightStatus="STATUS"
      />

       {freights.map((freight) => (
        <Row.Root key={freight.id} freightStatus={freight.status}>
          <Row.FreightDate date={new Date(freight.date)} />
          <Row.FreightCode code={freight.code} />
          <Row.Cte cte={freight.cte} />
          <Row.Route
            originState={freight.originState}
            destinyState={freight.destinyState}
          />
          <Row.Customer customerName={freight.customerName} />
          <Row.Driver driverName={freight.driverName} />
          <Row.FreightStatus freightStatus={freight.status} />
        </Row.Root>
      ))}

      <div>
        <button
          disabled={!pageInfo?.hasPreviousPage}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {pageInfo?.currentPage} of {pageInfo?.totalPages}
        </span>
        <button
          disabled={!pageInfo?.hasNextPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FreightListNew;

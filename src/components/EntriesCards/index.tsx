import React, { useRef, useState, useEffect } from "react";
import styles from "./EntriesCards.module.css";
import Loading from "../Loading";
import EntriesCard from "../EntriesCard";
import { useRouter } from "next/router";
import { FinancialService } from "@/services/financialService";
import { Freight } from "@/utils/types/Freight";

const EntriesCards: React.FC = () => {
  const [data, setData] = useState<Freight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const filters = { status: ["FINANCIAL_REQUIRED"] };
        const page = 1;
        const limit = 10;

        const result = await FinancialService.getFreightsForFinancial(filters, page, limit);

        setData(result.data);
        setLoading(false);
      } catch (error: any) {
        setError(error?.message ?? "Erro ao carregar fretes");
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

  const handleMouseDown = (e: React.MouseEvent) => {
    const list = listRef.current;
    if (list) {
      setIsDragging(true);
      setStartX(e.pageX - list.offsetLeft);
      setScrollLeft(list.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const list = listRef.current;
    if (list) {
      const x = e.pageX - list.offsetLeft;
      const walk = (x - startX) * 2;
      list.scrollLeft = scrollLeft - walk;
    }
  };

  const handleCardClick = (id: string | undefined) => {
    if (!id) return;
    router.push(`/financeiro/${id}`);
  };

  return (
    <div
      ref={listRef}
      className={styles.horizontalList}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {data.map((freight) => {
        const driver = freight.targetedDrivers?.[0];

        return (
          <EntriesCard
            key={freight.id}
            driverName={driver?.name ?? "Não informado"}
            type={freight.requestFinancialType ?? "Não informado"}
            paymentMethod={freight.formaPagamento ?? "Não informado"}
            contact={driver?.phoneNumber ?? "Não informado"}
            handleNewPayment={() => freight.id && handleCardClick(freight.id)}
          />
        );
      })}
    </div>
  );
};

export default EntriesCards;

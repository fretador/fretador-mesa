import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDriverController } from "@/controllers/driverController";
import styles from './AwaitingApprovalList.module.css';
import AwaitingApprovalCard from "../AwaitingApprovalCard";

const AwaitingApprovalList: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const { loadDrivers } = useDriverController();
  const { drivers, loading, error } = useSelector((state: any) => state.driver.driversByStatus['PENDING'] || {});

  useEffect(() => {
    loadDrivers(1, 10, { status: 'PENDING' });
  }, [loadDrivers]);

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

  const handleNewDriver = () => {
    console.log("Card clicado!");
  };

  if (loading) return <p>Carregando motoristas...</p>;
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

  return (
    <div
      ref={listRef}
      className={styles.horizontalList}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {drivers?.map((driver: any, index: number) => (
        <AwaitingApprovalCard
          key={index}
          driverName={driver.name}
          driverStatus={driver.status}
          vehicle={driver.vehicle?.type}
          contact={driver.phoneNumber}
          handleNewDriver={handleNewDriver}
        />
      ))}
    </div>
  );
};

export default AwaitingApprovalList;

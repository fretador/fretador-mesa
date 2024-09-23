import React, { useRef, useState } from "react";
import { Driver } from "@/utils/types/Driver";
import styles from "./AwaitingApprovalList.module.css";
import AwaitingApprovalCard from "../AwaitingApprovalCard";
import Loading from "../Loading";

interface AwaitingApprovalListProps {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
  handleNewDriver: () => void;
}

const AwaitingApprovalList: React.FC<AwaitingApprovalListProps> = ({
  drivers,
  loading,
  error,
  handleNewDriver,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

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

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
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
      {drivers.map((driver: Driver, index: number) => (
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

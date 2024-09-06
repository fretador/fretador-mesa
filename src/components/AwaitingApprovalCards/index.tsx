import React, { useRef, useState } from "react";
import styles from './AwaitingApprovalList.module.css';
import AwaitingApprovalCard from "../AwaitingApprovalCard";

const driversData = [
  { driverName: "Tonhão do Asfalto", driverStatus: "Aguardando", vehicle: "Caminhão", contact: "11999999999" },
  { driverName: "Zé Rodovia", driverStatus: "Aguardando", vehicle: "Ônibus", contact: "11888888888" },
  { driverName: "Gilberto Marcha Lenta", driverStatus: "Aguardando", vehicle: "Carro", contact: "11777777777" },
  { driverName: "Tião do Trecho", driverStatus: "Aguardando", vehicle: "Moto", contact: "11666666666" },
  { driverName: "Gilmar Trucão", driverStatus: "Aguardando", vehicle: "Van", contact: "11555555555" },
  { driverName: "Nando Pé de Placa", driverStatus: "Aguardando", vehicle: "Caminhão", contact: "11444444444" },
];

const AwaitingApprovalList: React.FC = () => {
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

  const handleNewDriver = () => {
    console.log("Card clicado!");
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
      {driversData.map((driver, index) => (
        <AwaitingApprovalCard
          key={index}
          driverName={driver.driverName}
          driverStatus={driver.driverStatus}
          vehicle={driver.vehicle}
          contact={driver.contact}
          handleNewDriver={handleNewDriver}
        />
      ))}
    </div>
  );
};

export default AwaitingApprovalList;

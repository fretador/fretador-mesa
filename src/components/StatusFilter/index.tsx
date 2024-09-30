import React, { useState } from "react";
import styles from "./StatusFilter.module.css";
import { ArrowDownIcon, MagnifierIcon } from "@/utils/icons";
import { FreightStatus as FreightStatusEnum } from "@/utils/enums/freightStatusEnum";
import { CANCELLED } from "dns";

interface StatusFilterProps {
  onApply: (searchTerm: string, selectedStatuses: string[]) => void;
  onCancel: () => void;
  type: "driver" | "freight";
}

const StatusFilter: React.FC<StatusFilterProps> = ({ onApply, onCancel, type }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status]
    );
  };

  const handleApply = () => {
    let statusesToFilter = selectedStatuses;

    if (type === "freight") {
      statusesToFilter = selectedStatuses.flatMap(
        (statusValue) => statusValueToActualStatuses[statusValue]
      );
    }

    onApply(searchTerm, statusesToFilter);
    setShowFilter(false);
  };

  const handleCancel = () => {
    setSearchTerm("");
    setSelectedStatuses([]);
    onCancel();
    setShowFilter(false);
  };

  const statusValueToActualStatuses: { [key: string]: FreightStatusEnum[] } = {
    IN_PROGRESS: [
      FreightStatusEnum.WAITING,
      FreightStatusEnum.TARGETED,
      FreightStatusEnum.REQUESTED,
      FreightStatusEnum.APPROVED,
      FreightStatusEnum.ACCEPTED,
      FreightStatusEnum.OPERATION_REQUIRED,
      FreightStatusEnum.OPERATION_APPROVED,
      FreightStatusEnum.ADMIN_REQUIRED,
      FreightStatusEnum.ADMIN_APPROVED,
      FreightStatusEnum.FINANCIAL_REQUIRED,
      FreightStatusEnum.FINANCIAL_APPROVED,
      FreightStatusEnum.LOADING_STARTED,
      FreightStatusEnum.LOADING_FINISHED,
      FreightStatusEnum.UNLOADING_STARTED,
      FreightStatusEnum.UNLOADING_FINISHED,
      FreightStatusEnum.DRIVER_ARRIVED,
      FreightStatusEnum.DRIVER_SELECTED,
      FreightStatusEnum.INVOICE_SENT,
      FreightStatusEnum.PICKUP_ORDER_SENT,
    ],
    DOCUMENTS_RECEIVED: [
      FreightStatusEnum.INVOICE_COUPON_SENT,
      FreightStatusEnum.INVOICE_COUPON_REFUSED,
    ],
    CANCELLED: [
      FreightStatusEnum.CANCELED,
    ],
    FINISHED: [
      FreightStatusEnum.FINISHED,
    ],
  };

  const statuses =
    type === "driver"
      ? [
        { value: "APPROVED", label: "Aprovado" },
        { value: "PENDING", label: "Pendente" },
        { value: "DENIED", label: "Negado" },
      ]
      : [
        { value: "IN_PROGRESS", label: "Em Curso" },
        { value: "DOCUMENTS_RECEIVED", label: "Documentos Recebidos" },
        { value: "CANCELLED", label: "Cancelado" },
        { value: "FINISHED", label: "Finalizado" },
      ];

  return (
    <div className={styles.container}>
      <div className={styles.openCloseFilter} onClick={toggleFilter}>
        <p className={styles.title}>Filtrar Status</p>
        <ArrowDownIcon
          className={`${styles.arrowDown} ${showFilter ? styles.rotated : ""}`}
        />
      </div>

      <div
        className={`${styles.filterOptions} ${showFilter ? styles.show : ""}`}
      >
        <div className={styles.searchContainer}>
          <MagnifierIcon className={styles.magnifierIcon} />
          <input
            type="text"
            placeholder="Buscar"
            className={styles.searchInputField}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.checkboxList}>
          {statuses.map((status) => (
            <div className={styles.checkboxContainer} key={status.value}>
              <input
                type="checkbox"
                id={status.value}
                name={status.value}
                checked={selectedStatuses.includes(status.value)}
                onChange={() => handleStatusChange(status.value)}
              />
              <label htmlFor={status.value}>{status.label}</label>
            </div>
          ))}
        </div>

        <div className={styles.btnsContainer}>
          <button className={styles.btnApply} onClick={handleApply}>
            Aplicar
          </button>
          <button className={styles.btnCancel} onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;

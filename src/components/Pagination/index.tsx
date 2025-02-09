import React, { useState } from "react";
import styles from "./Pagination.module.css";
import { NextBtnIcon, PreviousBtnIcon } from "@/utils/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [animationDirection, setAnimationDirection] = useState<string>("");

  const handleMoveButtonClick = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setAnimationDirection("move-right");
      setTimeout(() => {
        setAnimationDirection("");
        onPageChange(currentPage + 1);
      }, 200);
    }

    if (direction === "prev" && currentPage > 1) {
      setAnimationDirection("move-left");
      setTimeout(() => {
        setAnimationDirection("");
        onPageChange(currentPage - 1);
      }, 200);
    }
  };

  const handlePageNumberClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 10;
    const pages: (number | string)[] = [];
  
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Início
      if (currentPage <= 6) {
        for (let i = 1; i <= 9; i++) pages.push(i);
        pages.push("...", totalPages);
      } 
      // Fim
      else if (currentPage >= totalPages - 5) {
        pages.push(1, "...");
        for (let i = totalPages - 8; i <= totalPages; i++) pages.push(i);
      }
      // Meio
      else {
        pages.push(1, "...");
        for (let i = currentPage - 4; i <= currentPage + 4; i++) pages.push(i);
        pages.push("...", totalPages);
      }
    }
  
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => handleMoveButtonClick("prev")}
        className={styles.moveButton}
      >
        <PreviousBtnIcon />
      </button>

      <div className={styles.btnsContainer}>
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`${styles.btn} ${
              currentPage === page ? `${styles.activePage} ${styles[animationDirection]}` : ""
            }`}
            onClick={() => typeof page === "number" && handlePageNumberClick(page)}
            disabled={typeof page !== "number"}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handleMoveButtonClick("next")}
        className={styles.moveButton}
      >
        <NextBtnIcon />
      </button>
    </div>
  );
};

export default Pagination;

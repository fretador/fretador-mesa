import React, { useState } from "react";
import styles from "./Pagination.module.css";
import { NextBtnIcon, PreviousBtnIcon } from "@/utils/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
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
        {pages.map((page) => (
          <button
            key={page}
            className={`${styles.btn} ${
              currentPage === page ? `${styles.activePage} ${styles[animationDirection]}` : ""
            }`}
            onClick={() => handlePageNumberClick(page)}
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

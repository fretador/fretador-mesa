import React, { useState, useCallback } from "react";
import Botao from "@/components/Botao";
import styles from "./EditFreightButton.module.css";

const EditFreightButton = () => {

  return (
    <>
      <div className={styles.submitWrapper}>
        <Botao
          type="submit"
          text="Editar"
          className={styles.submitButton}
        />
      </div>
    </>
  );
};

export default EditFreightButton;
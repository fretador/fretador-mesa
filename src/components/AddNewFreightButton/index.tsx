import React, { useState } from "react";
import styles from './AddNewFreightButton.module.css'
import Link from 'next/link';

const AddNewFreightButton = () => {

  const [isAddFreightVisible, setIsAddFreightVisible] = useState(false);

  const toggleVisibility = () => {
    setIsAddFreightVisible(!isAddFreightVisible);
  };

  return (
    <div className={styles.container}>

      <div className={`${styles.addFreightButton} ${isAddFreightVisible ? styles.show : ''}`}>
        <Link href="/fretes">
          ADICIONAR NOVO FRETE
        </Link>
      </div>

      <div className={`${styles.plusButton} ${isAddFreightVisible ? styles.rotate : ''}`} onClick={toggleVisibility}>
        <p>{isAddFreightVisible ? 'I' : '+'}</p>
      </div>
    </div>
  )
}

export default AddNewFreightButton;

import React from "react";
import styles from './CorporateName.module.css';

interface CorporateNameProps {
  corporateName: string
}

const CorporateName = ({corporateName}: CorporateNameProps) => {
  return (
    <p className={styles.corporateNameValue}>{corporateName}</p>
  )
}

export default CorporateName
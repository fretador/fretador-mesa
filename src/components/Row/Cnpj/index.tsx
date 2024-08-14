import React from "react";
import styles from './Cnpj.module.css';

interface CnpjProps {
  cnpj: string
}

const Cnpj = ({ cnpj }: CnpjProps) => {

  const cnpjFormatted = `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`

  return (
    <p className={styles.cnpjValue}>{cnpjFormatted}</p>
  )
}

export default Cnpj
import styles from './Contract.module.css';
import React from 'react'

interface ContractProps {
  contract: string;
}

const Contract = ({ contract }: ContractProps) => {

  return (
    <p>{contract}</p>
  )
}

export default Contract
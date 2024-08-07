import styles from './cte.module.css'
import React from 'react'

interface CteProps {
  cte: string;
}

const Cte = ({ cte }: CteProps) => {

  return (
    <p>{cte}</p>
  )
}

export default Cte
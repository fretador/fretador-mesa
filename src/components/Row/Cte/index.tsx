import styles from './Cte.module.css';
import React from 'react'

interface CteProps {
  cte: string;
  style?: React.CSSProperties;
}

const Cte = ({ cte, style }: CteProps) => {

  return (
    <p style={style}>{cte}</p>
  )
}

export default Cte
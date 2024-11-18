import styles from './Cte.module.css';
import React from 'react'

interface CteProps {
  numCte: string;
}

const Cte = ({ numCte }: CteProps) => {

  return (
    <p>{numCte}</p>
  )
}

export default Cte
import styles from './Cte.module.css';
import React from 'react'

interface CteProps {
<<<<<<< HEAD
  numCte: string;
}

const Cte = ({ numCte }: CteProps) => {

  return (
    <p>{numCte}</p>
=======
  cte: string;
  style?: React.CSSProperties;
}

const Cte = ({ cte, style }: CteProps) => {

  return (
    <p style={style}>{cte}</p>
>>>>>>> c365116 (feat: using the 'GET_FREIGHT_BY_ID' query to bring freight by driver and render them in the history tab)
  )
}

export default Cte
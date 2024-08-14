import styles from './FreightDate.module.css'
import React from 'react'

interface FreightDateProps {
  date: Date;
}

const FreightDate = ({ date }: FreightDateProps) => {

  const formattedDate = date.toLocaleDateString();

  return (
    <p>{formattedDate}</p>
  )
}

export default FreightDate
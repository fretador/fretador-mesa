import React from 'react'
import styles from './Nf.module.css'

interface NfProps {
  nf: string;
  style?: React.CSSProperties;
}

const Nf = ({ nf, style }: NfProps) => {

  return (
    <p style={style}>{nf}</p>
  )
}

export default Nf
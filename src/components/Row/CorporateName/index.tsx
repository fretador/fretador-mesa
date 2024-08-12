import React from "react";
import styles from './corporateName.module.css'

interface CorporateNameProps {
  corporateName: string
}

const CorporateName = ({corporateName}: CorporateNameProps) => {
  return (
    <p>{corporateName}</p>
  )
}

export default CorporateName
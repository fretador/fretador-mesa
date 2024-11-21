import React from 'react'
import styles from './DeliveryLocation.module.css'

interface DeliveryLocationProps {
  deliveryLocation: string;
  style?: React.CSSProperties;
}

const DeliveryLocation = ({ deliveryLocation, style }: DeliveryLocationProps) => {

  return (
    <p style={style}>{deliveryLocation}</p>
  )
}

export default DeliveryLocation
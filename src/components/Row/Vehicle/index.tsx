import React from "react";
import styles from './Vehicle.module.css';

interface VehicleProps {
  vehicle: string
}

const Vehicle = ({ vehicle }: VehicleProps) => {
  return (
    <p>{vehicle}</p>
  )
}

export default Vehicle
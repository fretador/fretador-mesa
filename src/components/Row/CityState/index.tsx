import React from "react";
import styles from './CityState.module.css';

interface CityStateProps {
  city: string,
  state: string
}

const CityState = ({city, state}: CityStateProps) => {
  return(
    <p className={styles.cityAndStateValue}><span className={styles.cityName}>{city}</span>-<span className={styles.stateName}>{state}</span></p>
  )
}

export default CityState
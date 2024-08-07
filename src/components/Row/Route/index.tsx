import React from "react";
import styles from './route.module.css'

interface RouteProps {
  originState: string,
  destinyState: string
}

const Route = ({originState, destinyState}: RouteProps) => {
  return (
    <p className={styles.state}>{originState} X {destinyState}</p>
  )
}

export default Route
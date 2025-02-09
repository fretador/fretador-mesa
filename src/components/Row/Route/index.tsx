import React from "react";
import styles from './Route.module.css';

interface RouteProps {
  originState: string;
  destinyState: string;
  style?: React.CSSProperties;
}

const Route = ({originState, destinyState, style}: RouteProps) => {
  return (
    <p style={style} className={styles.state}>{originState} X {destinyState}</p>
  )
}

export default Route
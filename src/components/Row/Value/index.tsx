import React from "react";
import styles from './value.module.css'; 

interface ValueProps { value: number; } 

const formatCurrency = (value: number): string => { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(value); } 


const Value = ({ value }: ValueProps) => { 
return ( 
<div className={styles.container}> 
<p className={styles.value}>{formatCurrency(value)}</p> 
</div> ); };

 export default Value;
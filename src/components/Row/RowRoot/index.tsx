import styles from './rowRoot.module.css'
import React, { ReactNode } from 'react'

interface RowRootProps {
  children: ReactNode
}

const RowRoot = ({ children }: RowRootProps) => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default RowRoot
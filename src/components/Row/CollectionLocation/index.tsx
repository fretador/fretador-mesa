import React from 'react'
import styles from './CollectionLocation.module.css'

interface CollectionLocationProps {
  collectionLocation: string;
  style?: React.CSSProperties;
}

const CollectionLocation = ({ collectionLocation, style }: CollectionLocationProps) => {

  return (
    <p style={style}>{collectionLocation}</p>
  )
}

export default CollectionLocation
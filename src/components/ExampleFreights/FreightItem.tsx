import { Freight } from '@/utils/types/Freight';
import React from 'react';

interface FreightItemProps {
  freight: Freight;
}

const FreightItem: React.FC<FreightItemProps> = ({ freight }) => {
  return (
    <div>
      <h2>Freight to {freight.deliveryCity}</h2>
      <p>Status: {freight.status}</p>
      <p>Value: ${freight.value}</p>
    </div>
  );
};

export default FreightItem;

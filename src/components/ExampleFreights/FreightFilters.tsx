import React, { useState } from 'react';
import { FreightFilters as FiltersFreights} from '@/utils/types/FreightFilters';

interface FreightFiltersProps {
  setFilters: (filters: FiltersFreights) => void;
}

const FreightFilters: React.FC<FreightFiltersProps> = ({ setFilters }) => {
  const [deliveryCity, setDeliveryCity] = useState('');
  const [gatheringCity, setGatheringCity] = useState('');
  const [status, setStatus] = useState('');

  const applyFilters = () => {
    setFilters({
      deliveryCity: deliveryCity || undefined,
      gatheringCity: gatheringCity || undefined,
      status: status || undefined,
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Delivery City"
        value={deliveryCity}
        onChange={(e) => setDeliveryCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Gathering City"
        value={gatheringCity}
        onChange={(e) => setGatheringCity(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Status</option>
        <option value="WAITING">Waiting</option>
        <option value="APPROVED">Approved</option>
        <option value="FINISHED">Finished</option>
      </select>
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default FreightFilters;

import React, { useState } from 'react';
import { FreightFilters as FiltersFreights } from '@/utils/types/FreightFilters';

// Definindo um tipo para os status possíveis
type FreightStatus = 'WAITING' | 'APPROVED' | 'FINISHED' | '';

interface FreightFiltersProps {
  setFilters: (filters: FiltersFreights) => void;
}

const FreightFilters: React.FC<FreightFiltersProps> = ({ setFilters }) => {
  const [deliveryCity, setDeliveryCity] = useState<string>('');
  const [gatheringCity, setGatheringCity] = useState<string>('');
  const [status, setStatus] = useState<FreightStatus>('');

  const applyFilters = () => {
    const filters: FiltersFreights = {
      deliveryCity: deliveryCity || undefined,
      gatheringCity: gatheringCity || undefined,
      status: (status || undefined) as string | undefined,
    };
    setFilters(filters);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as FreightStatus);
  };

  const handleCityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setCityFn: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setCityFn(e.target.value);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Cidade de Entrega"
        value={deliveryCity}
        onChange={(e) => handleCityChange(e, setDeliveryCity)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Cidade de Coleta"
        value={gatheringCity}
        onChange={(e) => handleCityChange(e, setGatheringCity)}
        className="p-2 border rounded"
      />
      <select 
        value={status} 
        onChange={handleStatusChange}
        className="p-2 border rounded"
      >
        <option value="">Selecione o Status</option>
        <option value="WAITING">Aguardando</option>
        <option value="APPROVED">Aprovado</option>
        <option value="FINISHED">Finalizado</option>
      </select>
      <button 
        onClick={applyFilters}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default FreightFilters;
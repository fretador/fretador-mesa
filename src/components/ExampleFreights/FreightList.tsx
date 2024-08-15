import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFreightController } from '@/controllers/freightController';
import FreightItem from './FreightItem';
import FreightFilters from './FreightFilters';
import Body from '../Body';
import { RootState } from '../../store/store';
import { FreightFilters as FiltersFreights } from '@/utils/types/FreightFilters';

const FreightList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState<FiltersFreights>({});
  const { loadFreights } = useFreightController();
  const freights = useSelector((state: RootState) => state.freight.freights);
  const pageInfo = useSelector((state: RootState) => state.freight.pageInfo);
  const loading = useSelector((state: RootState) => state.freight.loading);
  const error = useSelector((state: RootState) => state.freight.error);

  useEffect(() => {
    loadFreights(filters, page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Body>
      <h1>Freight List</h1>
      <FreightFilters setFilters={setFilters} />
      <div>
        {freights.map((freight) => (
          <FreightItem key={freight.id} freight={freight} />
        ))}
      </div>
      <div>
        <button
          disabled={!pageInfo?.hasPreviousPage}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {pageInfo?.currentPage} of {pageInfo?.totalPages}
        </span>
        <button
          disabled={!pageInfo?.hasNextPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </Body>
  );
};

export default FreightList;

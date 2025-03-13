import { useQuery } from '@apollo/client';
import { GET_PENDING_APPROVAL_FREIGHTS } from '@/graphql/queries/graphQueries';
import RowPendingVouchers from './RowPendingVouchers';
import { ArrowRightIcon } from '@/utils/icons';
import styles from './PendingVouchers.module.css';
import { GetPendingApprovalFreightsData } from '@/utils/interfaces/GraphTypes';
import Loading from '../Loading';
import SmallLoading from '../SmallLoading';

const PendingVouchers = () => {
  const { data, loading, error } = useQuery<GetPendingApprovalFreightsData>(GET_PENDING_APPROVAL_FREIGHTS);

  if (loading) return <div className={styles.loadingContainer}><SmallLoading /></div>;
  if (error) return <p>Error: {error.message}</p>;

  const pendingFreights = data?.getPendingApprovalFreights || [];

  const handleClick = () => {
    console.log('Clicou em ver todos');
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Comprovantes de entrega para aprovar</p>
      {pendingFreights.length === 0 && <p>Não há comprovantes no momento.</p>}

      {pendingFreights.map((freight) => (
        <RowPendingVouchers
          key={freight.freightCode}
          numberOfPhotos={freight.totalCount}
          freightCode={freight.freightCode}
          numCte={freight.numCte}
          driverName={freight.driver}
        />
      ))}

      <div className={styles.buttonContainer} onClick={handleClick}>
        <p>Ver todos</p>
        <ArrowRightIcon />
      </div>
    </div>
  );
};

export default PendingVouchers;

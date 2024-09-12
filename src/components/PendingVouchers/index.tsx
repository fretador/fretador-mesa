import { useQuery } from '@apollo/client';
import { GET_PENDING_APPROVAL_FREIGHTS } from '@/graphql/queries/graphQueries';
import RowPendingVouchers from './RowPendingVouchers';
import { ArrowRightIcon } from '@/utils/icons';
import styles from './PendingVouchers.module.css';

const PendingVouchers = () => {
  const { data, loading, error } = useQuery(GET_PENDING_APPROVAL_FREIGHTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pendingFreights = data?.getPendingApprovalFreights || [];

  const handleClick = () => {
    console.log('Clicou em ver todos');
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Comprovantes de entrega para aprovar</p>

      {pendingFreights.map((freight: any) => (
        <RowPendingVouchers
          key={freight.freightCode}
          numberOfPhotos={freight.photosCount}
          freightCode={freight.freightCode}
          cte={freight.numCte}
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

import { useQuery } from '@apollo/client';
import { GET_FREIGHT_STATISTICS } from '@/graphql/queries/graphQueries';
import { PieChart } from '@mui/x-charts/PieChart';
import styles from './FreightSummary.module.css';
import { GetFreightStatisticsData } from '@/utils/types/GraphTypes'; 

const FreightSummary = () => {
  const { data, loading, error } = useQuery<GetFreightStatisticsData>(GET_FREIGHT_STATISTICS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const values = [
    data?.getFreightStatistics.freightsInProgress || 0,
    data?.getFreightStatistics.freightsOpen || 0,
    data?.getFreightStatistics.freightsFinished || 0,
  ];

  return (
    <div className={styles.container}>
      <h4>RESUMO DOS FRETES</h4>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: values[0], label: 'Em andamento', color: '#3797bd' },
              { id: 1, value: values[1], label: 'Em aberto', color: '#ED9C03' },
              { id: 2, value: values[2], label: 'Finalizado', color: '#2f88ff' },
            ],
          },
        ]}
        width={460}
      />
    </div>
  );
};

export default FreightSummary;

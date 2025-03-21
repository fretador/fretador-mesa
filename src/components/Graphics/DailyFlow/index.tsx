import { useQuery } from '@apollo/client';
import { GET_FREIGHT_DAILY_FLOW } from '@/graphql/queries/graphQueries';
import { PieChart } from '@mui/x-charts/PieChart';
import styles from './DailyFlow.module.css';
import { GetFreightDailyFlowData } from '@/utils/Interfaces/GraphTypes';
import Loading from '@/components/Loading';
import SmallLoading from '@/components/SmallLoading';

const DailyFlow = () => {
  const { data, loading, error } = useQuery<GetFreightDailyFlowData>(GET_FREIGHT_DAILY_FLOW);

  if (loading) return <div className={styles.loadingContainer}><SmallLoading /></div>;
  if (error) return <p>Error: {error.message}</p>;

  const newFreights = data?.getFreightDailyFlow.newFreights || 0;
  const cancelledFreightsPercentage = data?.getFreightDailyFlow.canceledFreightsPercentage || 0;
  const remainingValue = 100 - newFreights;
  const remainingPercentage = 100 - cancelledFreightsPercentage;

  const getPaddingAngle = (value: number) => value > 0 ? 3 : 0;

  return (
    <div className={styles.container}>
      <p>FLUXO DIÁRIO</p>
      <div className={styles.graphicsContainer}>
        <div className={styles.graphic}>
          <h4>Fretes Cancelados</h4>
          <PieChart
            colors={['#d9d9d9', '#1B556D']}
            series={[
              {
                data: [
                  { id: 0, value: remainingPercentage },
                  { id: 1, value: cancelledFreightsPercentage },
                ],
                innerRadius: 48,
                outerRadius: 70,
                paddingAngle: getPaddingAngle(cancelledFreightsPercentage),
                cornerRadius: 5,
                startAngle: 0,
                cx: 100,
              },
            ]}
            width={200}
            height={170}
          />
          <p>{cancelledFreightsPercentage}%</p>
        </div>

        <div className={styles.graphic}>
          <h4>Novos Fretes</h4>
          <PieChart
            colors={['#1B556D', '#d9d9d9']}
            series={[
              {
                data: [
                  { id: 0, value: newFreights },
                  { id: 1, value: remainingValue },
                ],
                innerRadius: 48,
                outerRadius: 70,
                paddingAngle: getPaddingAngle(newFreights),
                cornerRadius: 5,
                startAngle: 0,
                cx: 100,
              },
            ]}
            width={200}
            height={170}
          />
          <p>{newFreights}</p>
        </div>
      </div>
    </div>
  );
};

export default DailyFlow;

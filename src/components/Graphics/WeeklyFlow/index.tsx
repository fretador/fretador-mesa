import { useQuery } from '@apollo/client';
import { GET_FREIGHT_WEEKLY_FLOW } from '@/graphql/queries/graphQueries';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './WeeklyFlow.module.css';
import { GetFreightWeeklyFlowData } from '@/utils/types/graphTypes';

const WeeklyFlow = () => {
  const { data, loading, error } = useQuery<GetFreightWeeklyFlowData>(GET_FREIGHT_WEEKLY_FLOW);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const weeklyData = data?.getFreightWeeklyFlow.map((day) => ({
    name: day.dayOfWeek,
    completeName: day.dayOfWeek,
    fluxo: day.count,
  })) || [];

  return (
    <div className={styles.container}>
      <p>FLUXO DE CARREGAMENTO SEMANAL</p>
      <ResponsiveContainer width={480} height={230}>
        <BarChart
          width={500}
          height={300}
          data={weeklyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" stroke="#000" tick={{ fill: '#000' }} />
          <YAxis stroke="#000" tick={{ fill: '#000' }} />
          <Tooltip />
          <Bar dataKey="fluxo" fill="url(#colorFluxo)" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyFlow;

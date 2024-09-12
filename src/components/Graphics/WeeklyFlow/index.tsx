import { useQuery } from '@apollo/client';
import { GET_FREIGHT_WEEKLY_FLOW } from '@/graphql/queries/graphQueries';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './WeeklyFlow.module.css';

const WeeklyFlow = () => {
  const { data, loading, error } = useQuery(GET_FREIGHT_WEEKLY_FLOW);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const weeklyData = data?.getFreightWeeklyFlow.map((day: any) => ({
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
          <defs>
            <linearGradient id="colorFluxo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="25%" stopColor="#1B556D" stopOpacity={0.95} />
              <stop offset="95%" stopColor="#1B556D" stopOpacity={0.8} />
            </linearGradient>
          </defs>

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

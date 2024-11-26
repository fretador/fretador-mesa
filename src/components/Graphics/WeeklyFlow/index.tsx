import { useQuery } from '@apollo/client';
import { GET_FREIGHT_WEEKLY_FLOW } from '@/graphql/queries/graphQueries';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './WeeklyFlow.module.css';
import { GetFreightWeeklyFlowData } from '@/utils/Interfaces/GraphTypes';
import Loading from '@/components/Loading';
import { Skeleton } from '@mui/material';
import SmallLoading from '@/components/SmallLoading';

const WeeklyFlow = () => {
  const { data, loading, error } = useQuery<GetFreightWeeklyFlowData>(GET_FREIGHT_WEEKLY_FLOW);

  if (loading) return <div className={styles.loadingContainer}><SmallLoading /></div>;
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
          <defs>
            <linearGradient id="colorFluxo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="15%" stopColor="#18485B" />
              <stop offset="95%" stopColor="#3facd5cc" />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#000" tick={{ fill: '#000' }} />
          <YAxis
            stroke="#000"
            tick={{ fill: '#000' }}
            tickFormatter={(tick) => Number.isInteger(tick) ? tick : ''}
            allowDecimals={false}
          />
          <Tooltip />
          <Bar dataKey="fluxo" fill="url(#colorFluxo)" isAnimationActive={false} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyFlow;

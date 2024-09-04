import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import styles from './WeeklyFlow.module.css'

interface DataItem {
  name: string;
  completeName: string;
  fluxo: number;
}

const data: DataItem[] = [
  { name: 'SEG', completeName: 'Segunda-Feira', fluxo: 45},
  { name: 'TER', completeName: 'Terça-Feira', fluxo: 35},
  { name: 'QUA', completeName: 'Quarta-Feira', fluxo: 20},
  { name: 'QUI', completeName: 'Quinta-Feira', fluxo: 60},
  { name: 'SEX', completeName: 'Sexta-Feira', fluxo: 54},
  { name: 'SÁB', completeName: 'Sábado', fluxo: 80},
  { name: 'DOM', completeName: 'Domingo', fluxo: 97},
];

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dayInfo = payload[0].payload as DataItem;
    return (
      <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p style={{fontWeight: 'bold'}}>{`${dayInfo.completeName}`}</p>
        <p>{`${payload[0].value} carregamentos`}</p>
      </div>
    );
  }

  return null;
};

const WeeklyFlow: React.FC = () => {
  return (
    <div className={styles.container}>
      <p>FLUXO DE CARREGAMENTO SEMANAL</p>
      <ResponsiveContainer width={480} height={230}>
        <BarChart
          width={500}
          height={300}
          data={data}
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
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          <Bar dataKey="fluxo" fill="url(#colorFluxo)" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyFlow;
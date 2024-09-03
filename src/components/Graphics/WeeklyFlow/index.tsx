import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './WeeklyFlow.module.css'

const data = [
  { name: 'SEG', fluxo: 50},
  { name: 'TER', fluxo: 65},
  { name: 'QUA', fluxo: 25},
  { name: 'QUI', fluxo: 65},
  { name: 'SEX', fluxo: 66},
  { name: 'SÁB', fluxo: 90},
  { name: 'DOM', fluxo: 7}
];

const WeeklyFlow: React.FC = () => (
  <div className={styles.container}>
    <p>FLUXO DE CARREGAMENTO SEMANAL</p>

    <ResponsiveContainer width={450} height={230}>
      <AreaChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorFluxo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="25%" stopColor="#1B556D" stopOpacity={0.95} />
            <stop offset="95%" stopColor="#1B556D" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="name"
          tick={{ fill: '#000', fontSize: 14 }} 
          // tickFormatter={(tick) => tick.split(" ")[0]}
          axisLine={{ stroke: '#000' }}
        />
        <YAxis
          tick={{ fill: '#000', fontSize: 14 }} 
          axisLine={{ stroke: '#000' }} 
        />
        <Tooltip/>
        <Area
          type="monotone"
          dataKey="fluxo"
          stroke="#1B556D"
          fillOpacity={1}
          fill="url(#colorFluxo)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default WeeklyFlow;

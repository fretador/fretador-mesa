import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definindo as chaves de notificação possíveis
export type NotificationKey = 'fretes' | 'motoristas' | 'ocorrencias' | 'financeiro' | 'cotacao' | 'clientes';

// Interface principal do estado
interface NotificationState {
  counters: {
    fretes: number;
    motoristas: number;
    ocorrencias: number;
    financeiro: number;
    cotacao: number;
    clientes: number;
  };
  seen: {
    fretes: boolean;
    motoristas: boolean;
    ocorrencias: boolean;
    financeiro: boolean;
    cotacao: boolean;
    clientes: boolean;
  };
}

const initialState: NotificationState = {
  counters: {
    fretes: 0,
    motoristas: 0,
    ocorrencias: 0,
    financeiro: 0,
    cotacao: 0,
    clientes: 0,
  },
  seen: {
    fretes: true,
    motoristas: true,
    ocorrencias: true,
    financeiro: true,
    cotacao: true,
    clientes: true,
  },
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<NotificationKey>
    ) => {
      const key = action.payload;
      state.counters[key] += 1;
      state.seen[key] = false;
    },
    resetNotification: (
      state,
      action: PayloadAction<NotificationKey>
    ) => {
      const key = action.payload;
      state.counters[key] = 0;
      state.seen[key] = true;
    },
  },
});

export const { addNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
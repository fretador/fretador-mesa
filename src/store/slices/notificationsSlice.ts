import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definindo a estrutura de notificações
interface NotificationState {
  fretes: number;
  motoristas: number;
  ocorrencias: number;
  financeiro: number;
  seen: {
    fretes: boolean;
    motoristas: boolean;
    ocorrencias: boolean;
    financeiro: boolean;
  };
}

const initialState: NotificationState = {
  fretes: 0,
  motoristas: 0,
  ocorrencias: 0,
  financeiro: 0,
  seen: {
    fretes: true,
    motoristas: true,
    ocorrencias: true,
    financeiro: true,
  },
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // Incrementar o número de notificações
    addNotification: (
      state,
      action: PayloadAction<keyof NotificationState>
    ) => {
      state[action.payload] += 1;
      state.seen[action.payload] = false; // Marca como não vista
    },
    // Resetar notificações quando o usuário atuar sobre elas
    resetNotification: (
      state,
      action: PayloadAction<keyof NotificationState>
    ) => {
      state[action.payload] = 0;
      state.seen[action.payload] = true; // Marca como vista
    },
  },
});

export const { addNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

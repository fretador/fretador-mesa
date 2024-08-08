import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StatusFreightOption = "DISPONIVEL" | "APROVAR" | "EM CURSO" | "FINALIZADO";

interface IStatusFreight {
  statusFreight: Record<string, StatusFreightOption>;
}

interface ChangeStatusPayload {
  freightNumber: string;
  status: StatusFreightOption;
}

const initialState: IStatusFreight = {
  statusFreight: {},
};

const statusFreightSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<ChangeStatusPayload>) => {
      const { freightNumber, status } = action.payload;
      state.statusFreight[freightNumber] = status;
    },
  },
});

export const { changeStatus } = statusFreightSlice.actions;
export default statusFreightSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StatusFreightOption = "DISPONIVEL" | "APROVAR" | "EM CURSO" | "FINALIZADO";

interface IStatusFreight {
  statusFreight: StatusFreightOption;
}

const initialState: IStatusFreight = {
  statusFreight: "DISPONIVEL",
};

const statusFreightSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<StatusFreightOption>) => {
      state.statusFreight = action.payload;
    },
  },
});

export const { changeStatus } = statusFreightSlice.actions;
export default statusFreightSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isRetracted: boolean;
}

const initialState: SidebarState = {
  isRetracted: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isRetracted = !state.isRetracted;
    },
    setSidebarState: (state, action: PayloadAction<boolean>) => {
      state.isRetracted = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarState } = sidebarSlice.actions;

export default sidebarSlice.reducer;

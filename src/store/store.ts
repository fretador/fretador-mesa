import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import exampleReducer from "../store/slices/exampleSlice";
import sidebarReducer from "@/store/slices/sidebarSlice";
import statusFreightReducer from "@/store/slices/statusFreightSlice";

const store = configureStore({
  reducer: {
    example: exampleReducer,
    sidebar: sidebarReducer,
    freightStatus: statusFreightReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

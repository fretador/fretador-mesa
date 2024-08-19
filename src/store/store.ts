import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "@/store/slices/authSlice";
import exampleReducer from "../store/slices/exampleSlice";
import sidebarReducer from "@/store/slices/sidebarSlice";
import statusFreightReducer from "@/store/slices/statusFreightSlice";
import freightReducer from "@/store/slices/freightSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		example: exampleReducer,
		sidebar: sidebarReducer,
		freightStatus: statusFreightReducer,
		freight: freightReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

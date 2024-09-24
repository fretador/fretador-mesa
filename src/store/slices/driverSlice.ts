import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Driver } from "@/utils/types/Driver";
import { PageInfo } from "@/utils/types/PageInfo";

interface DriverState {
	drivers: Driver[];
	pageInfo: PageInfo | null;
	loading: boolean;
	error: string | null;
}

const initialState: DriverState = {
	drivers: [],
	pageInfo: null,
	loading: false,
	error: null,
};

const driverSlice = createSlice({
	name: "driver",
	initialState,
	reducers: {
		fetchDriversStart(state) {
			state.loading = true;
			state.error = null;
		},
		fetchDriversSuccess(
			state,
			action: PayloadAction<{ drivers: Driver[]; pageInfo: PageInfo }>
		) {
			state.loading = false;
			state.drivers = action.payload.drivers;
			state.pageInfo = action.payload.pageInfo;
		},
		fetchDriversFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		createDriverStart(state) {
			state.loading = true;
			state.error = null;
		},
		createDriverSuccess(state, action: PayloadAction<Driver>) {
			state.loading = false;
			state.drivers = [action.payload, ...state.drivers];
		},
		createDriverFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchDriversStart,
	fetchDriversSuccess,
	fetchDriversFailure,
	createDriverStart,
	createDriverSuccess,
	createDriverFailure,
} = driverSlice.actions;

export default driverSlice.reducer;

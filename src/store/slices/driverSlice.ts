import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Driver } from "@/utils/types/Driver";
import { PageInfo } from "@/utils/types/PageInfo";

interface DriverState {
	driversByStatus: {
		[status: string]: {
			drivers: Driver[];
			pageInfo: PageInfo | null;
			loading: boolean;
			error: string | null;
		};
	};
}

const initialState: DriverState = {
	driversByStatus: {
		APPROVED: {
			drivers: [],
			pageInfo: null,
			loading: false,
			error: null,
		},
		PENDING: {
			drivers: [],
			pageInfo: null,
			loading: false,
			error: null,
		},
	},
};

const driverSlice = createSlice({
	name: "driver",
	initialState,
	reducers: {
		fetchDriversStart(state, action: PayloadAction<{ status: string }>) {
			const { status } = action.payload;
			state.driversByStatus[status] = {
				drivers: [],
				pageInfo: null,
				loading: true,
				error: null,
			};
		},
		fetchDriversSuccess(
			state,
			action: PayloadAction<{
				drivers: Driver[];
				pageInfo: PageInfo;
				status: string;
			}>
		) {
			const { drivers, pageInfo, status } = action.payload;
			state.driversByStatus[status] = {
				drivers,
				pageInfo,
				loading: false,
				error: null,
			};
		},
		fetchDriversFailure(
			state,
			action: PayloadAction<{ error: string; status: string }>
		) {
			const { error, status } = action.payload;
			state.driversByStatus[status] = {
				drivers: [],
				pageInfo: null,
				loading: false,
				error,
			};
		},
	},
});

export const { fetchDriversStart, fetchDriversSuccess, fetchDriversFailure } =
	driverSlice.actions;

export default driverSlice.reducer;

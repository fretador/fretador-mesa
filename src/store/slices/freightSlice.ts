import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Freight } from "@/utils/types/Freight";
import { PageInfo } from "@/utils/types/PageInfo";

interface FreightState {
	freights: Freight[];
	pageInfo: PageInfo | null;
	loading: boolean;
	error: string | null;
}

const initialState: FreightState = {
	freights: [],
	pageInfo: null,
	loading: false,
	error: null,
};

const freightSlice = createSlice({
	name: "freight",
	initialState,
	reducers: {
		fetchFreightsStart(state) {
			state.loading = true;
			state.error = null;
		},
		fetchFreightsSuccess(
			state,
			action: PayloadAction<{ freights: Freight[]; pageInfo: PageInfo }>
		) {
			state.loading = false;
			state.freights = action.payload.freights;
			state.pageInfo = action.payload.pageInfo;
		},
		fetchFreightsFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		createFreightStart(state) {
			state.loading = true;
			state.error = null;
		},
		createFreightSuccess(state, action: PayloadAction<Freight>) {
			state.loading = false;
			state.freights = [action.payload, ...state.freights];
		},
		createFreightFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchFreightsStart,
	fetchFreightsSuccess,
	fetchFreightsFailure,
	createFreightStart,
	createFreightSuccess,
	createFreightFailure,
} = freightSlice.actions;

export default freightSlice.reducer;

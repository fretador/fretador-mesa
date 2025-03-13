import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardUser } from "@/utils/interfaces/BoardUser";
import { storageHelper } from "@/utils/helpers/storageHelper";

interface AuthState {
	isAuthenticated: boolean;
	boardUser: BoardUser | null;
}

const storedBoardUser = storageHelper.getBoardUser();

const initialState: AuthState = {
	isAuthenticated: !!storedBoardUser?.token,
	boardUser: storedBoardUser || null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess(state, action: PayloadAction<BoardUser>) {
			state.isAuthenticated = true;
			state.boardUser = action.payload;
		},
		logout(state) {
			state.isAuthenticated = false;
			state.boardUser = null;
		},
		initializeAuthState(state) {
			const storedBoardUser = storageHelper.getBoardUser();
			state.isAuthenticated = !!storedBoardUser?.token;
			state.boardUser = storedBoardUser || null;
		},
	},
});

export const { loginSuccess, logout, initializeAuthState } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	isAuthenticated: boolean;
	token: string | null;
	name: string | null;
	email: string | null;
	profile: string | null;
	profilePicture: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	token: null,
	name: null,
	email: null,
	profile: null,
	profilePicture: null,
};

interface LoginPayload {
	token: string;
	name: string;
	email: string;
	profile: null;
	profilePicture: null;
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess(state, action: PayloadAction<LoginPayload>) {
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.profile = action.payload.profile;
			state.profilePicture = action.payload.profilePicture;
		},
		logout(state) {
			state.isAuthenticated = false;
			state.token = null;
			state.name = null;
			state.email = null;
			state.profile = null;
			state.profilePicture = null;
		},
	},
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

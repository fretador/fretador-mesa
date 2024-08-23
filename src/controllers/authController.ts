import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "@/store/slices/authSlice";
import { AuthService } from "@/services/authService";
import { RootState } from "@/store/store";

export const useAuthController = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	const login = async (email: string, password: string) => {
		try {
			const { token, name, userEmail } = await AuthService.login(email, password);
			dispatch(loginSuccess({ token, name, email: userEmail }));
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	};

	const logoutUser = () => {
		AuthService.logout();
		dispatch(logout());
	};

	const checkAuthStatus = () => {
		const token = AuthService.getToken();
		const user = AuthService.getUser();

		if (token && user) {
			dispatch(loginSuccess({ token, name: user.name, email: user.email }));
			return true;
		} else {
			console.log("User is not authenticated");
			AuthService.logout();
			return false;
		}
	};

	return {
		login,
		logoutUser,
		isAuthenticated,
		checkAuthStatus,
	};
};

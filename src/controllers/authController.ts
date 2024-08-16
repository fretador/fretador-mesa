import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/store/slices/authSlice";
import { AuthService } from "@/services/authService";

export const useAuthController = () => {
	const dispatch = useDispatch();

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

	return {
		login,
		logoutUser,
	};
};

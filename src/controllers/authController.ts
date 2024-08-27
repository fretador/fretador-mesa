import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/store/slices/authSlice";
import { AuthService } from "@/services/authService";

export const useAuthController = () => {
	const dispatch = useDispatch();

	const login = async (email: string, password: string) => {
		try {
			const { token, name, userEmail, profile, profilePicture } =
				await AuthService.login(email, password);
			dispatch(
				loginSuccess({ token, name, email: userEmail, profile, profilePicture })
			);
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	};

	const checkAuthStatus = () => {
		const token = AuthService.getBoardUserToken();
		const boardUser = AuthService.getBoardUser();

		if (token && boardUser) {
			return true;
		} else {
			console.log("User is not authenticated");
			return false;
		}
	};

	const logoutUser = () => {
		AuthService.logout();
		dispatch(logout());
	};

	return {
		login,
		checkAuthStatus,
		logoutUser,
	};
};

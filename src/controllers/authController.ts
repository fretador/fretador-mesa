import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { loginSuccess, logout } from "@/store/slices/authSlice";
import { AuthService } from "@/services/authService";

export const useAuthController = () => {
	const dispatch = useDispatch();

	const login = useCallback(
		async (email: string, password: string) => {
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
		},
		[dispatch]
	);

	const checkAuthStatus = useCallback(() => {
		const token = AuthService.getBoardUserToken();
		const boardUser = AuthService.getBoardUser();

		if (token && boardUser) {
			return true;
		} else {
			return false;
		}
	}, []);

	const logoutUser = useCallback(() => {
		AuthService.logout();
		dispatch(logout());
	}, [dispatch]);

	return {
		login,
		checkAuthStatus,
		logoutUser,
	};
};

import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { loginSuccess, logout } from "@/store/slices/authSlice";
import { AuthService } from "@/services/authService";
import { storageHelper } from "@/utils/helpers/storageHelper";

export const useAuthController = () => {
  const dispatch = useDispatch();

  const login = useCallback(
    async (email: string, password: string, rememberMe: boolean) => {
      try {
        const { token, name, userEmail, profile, profilePicture } =
          await AuthService.login(email, password, rememberMe);

        const boardUser = { token, name, email: userEmail, profile, profilePicture };
        storageHelper.saveBoardUser(boardUser, rememberMe);

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
    const token = storageHelper.getBoardUserToken();
    const boardUser = storageHelper.getBoardUser();

    if (token && boardUser) {
      dispatch(loginSuccess({
        token,
        name: boardUser.name,
        email: boardUser.email,
        profile: boardUser.profile,
        profilePicture: boardUser.profilePicture
      }));
      return true;
    } else {
      return false;
    }
  }, [dispatch]);

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

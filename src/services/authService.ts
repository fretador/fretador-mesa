import apolloClient from "@/app/apolloClient";
import { LOGIN_MUTATION } from "@/graphql/mutations/authMutations";
import { storageHelper } from "@/utils/helpers/storageHelper";

export const AuthService = {
	login: async (email: string, password: string, rememberMe: boolean) => {
		const response = await apolloClient.mutate({
			mutation: LOGIN_MUTATION,
			variables: {
				email,
				password,
			},
		});

		const boardUser = response.data?.login?.boardUser;

		if (boardUser.token) {
			storageHelper.saveBoardUser(boardUser, rememberMe);
		}

		return boardUser;
	},

	logout: () => {
		storageHelper.removeBoardUser();
	},

	getBoardUserToken: () => {
		return storageHelper.getBoardUserToken();
	},

	getBoardUser: () => {
		return storageHelper.getBoardUser();
	},
};

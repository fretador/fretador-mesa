import apolloClient from "@/app/apolloClient";
import { LOGIN_MUTATION } from "@/graphql/mutations/authMutations";
import { storageHelper } from "@/utils/helpers/storageHelper";

export const AuthService = {
	login: async (email: string, password: string) => {
		const response = await apolloClient.mutate({
			mutation: LOGIN_MUTATION,
			variables: {
				email,
				password,
			},
		});

		const token = response.data?.login?.boardUser?.token;
		const name = response.data?.login?.boardUser?.name;
		const userEmail = response.data?.login?.boardUser?.email;
		const profile = response.data?.login?.boardUser?.profile;
		const profilePicture = response.data?.login?.boardUser?.profilePicture;

		if (token) {
			storageHelper.saveBoardUser({
				name,
				email: userEmail,
				profile,
				profilePicture,
				token,
			});
		}

		return {
			name,
			userEmail,
			profile,
			profilePicture,
			token,
		};
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

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

		const token = response.data?.login?.token;
		const name = response.data?.login?.boardUser?.name;
		const userEmail = response.data?.login?.boardUser?.email;

		if (token) {
			storageHelper.saveToken(token);
			storageHelper.saveUser({ name, email: userEmail });
		}

		return {
			token,
			name,
			userEmail,
		};
	},

	logout: () => {
		storageHelper.removeToken();
		storageHelper.removeUser();
	},

	getToken: () => {
		return storageHelper.getToken();
	},

	getUser: () => {
		return storageHelper.getUser();
	},
};

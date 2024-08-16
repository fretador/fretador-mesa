export const storageHelper = {
	saveToken: (token: string) => {
		localStorage.setItem("token", token);
	},

	getToken: () => {
		return localStorage.getItem("token");
	},

	removeToken: () => {
		localStorage.removeItem("token");
	},

	saveUser: (user: { name: string; email: string }) => {
		localStorage.setItem("user", JSON.stringify(user));
	},

	getUser: () => {
		const user = localStorage.getItem("user");
		return user ? JSON.parse(user) : null;
	},

	removeUser: () => {
		localStorage.removeItem("user");
	},
};

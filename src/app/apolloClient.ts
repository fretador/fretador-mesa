import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthService } from "@/services/authService";

const httpLink = new HttpLink({
	uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});
console.log("Url do backend: ", process.env.NEXT_PUBLIC_API_URL);

const authLink = setContext((_, { headers }) => {
	const token = AuthService.getBoardUserToken();
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default apolloClient;

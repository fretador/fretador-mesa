// src/config/apollo.ts
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { AuthService } from "@/services/authService";

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_API_URL,
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000/graphql",
		connectionParams: () => {
			const token = AuthService.getBoardUserToken();
			return {
				authorization: token ? `Bearer ${token}` : "",
			};
		},
	})
);

const authLink = setContext((_, { headers }) => {
	const token = AuthService.getBoardUserToken();
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	authLink.concat(httpLink)
);

const apolloClient = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

export default apolloClient;

import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
	link: new HttpLink({
		uri: "http://192.168.15.3:3030/dev/graphql",
	}),
	cache: new InMemoryCache(),
});

export default client;

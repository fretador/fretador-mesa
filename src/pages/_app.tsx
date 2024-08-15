import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/client';
import client from '../app/apolloClient';

import store from "../store/store";
import "../app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("Redux Store:", store.getState());
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;

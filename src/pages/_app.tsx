import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import client from "../app/apolloClient";
import { PaymentUpdateProvider } from "@/contexts/PaymentUpdateContext";

import store from "../store/store";
import "../app/globals.css";

import ReactModal from "react-modal";

ReactModal.setAppElement("#__next"); // ou "#root" dependendo da sua configuração

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PaymentUpdateProvider>
          <Component {...pageProps} />
        </PaymentUpdateProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;

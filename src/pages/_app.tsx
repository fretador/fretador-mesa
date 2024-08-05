import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import "../app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("Redux Store:", store.getState());
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

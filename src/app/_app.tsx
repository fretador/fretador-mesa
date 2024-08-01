import { AppProps } from "next/app";
import "../app/globals.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

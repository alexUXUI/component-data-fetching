import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import { Context, initialRender } from "../context/sse.context";

import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const data: AppInitialProps = await App.getInitialProps(appContext);

  const sse = await initialRender(appContext, data);

  const pageProps = {
    ...data.pageProps,
    ...sse,
  };

  return pageProps;
};

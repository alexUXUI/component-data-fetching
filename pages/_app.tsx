import App, { AppContext, AppInitialProps, AppProps } from "next/app";

import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const data: AppInitialProps = await App.getInitialProps(appContext);

  const pageProps = {
    ...data.pageProps,
  };

  return pageProps;
};

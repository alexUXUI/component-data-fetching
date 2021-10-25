import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import * as compressPayload from 'compress-json';
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
  const compressedSSEData = compressPayload.compress(sse.data)
  const b = JSON.stringify(sse.data).length * 2;
  const kb = (b / 1024).toFixed(2);


  const c = JSON.stringify(compressedSSEData).length * 2;
  const kb1 = (c / 1024).toFixed(2);
  console.log('compressed',kb1,'kb')
  console.log('raw',kb,'kb')

  const pageProps = {
    ...data,
    sse: compressedSSEData,
  };
  return pageProps;
};

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { ReactElement } from "react";
import Router from "next/router";

import "@styles/main.scss";
import "nprogress/nprogress.css";

import NProgress from "nprogress";

function Application({ Component, pageProps }: AppProps): ReactElement {
  const handleLoading = (state: boolean) => () => {
    if (state) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  };

  Router.events.on("routeChangeStart", handleLoading(true));
  Router.events.on("routeChangeComplete", handleLoading(false));
  Router.events.on("routeChangeError", handleLoading(false));

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default Application;

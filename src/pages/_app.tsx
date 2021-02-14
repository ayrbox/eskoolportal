import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import { ReactElement, useState } from 'react';
import Router from 'next/router';

import '@styles/main.scss';
import 'nprogress/nprogress.css';

import NProgress from 'nprogress';

function Application({ Component, pageProps }: AppProps): ReactElement {
  const handleLoading = (state: boolean) => () => {
    if (state) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  };

  Router.events.on('routeChangeStart', handleLoading(true));
  Router.events.on('routeChangeComplete', handleLoading(false));
  Router.events.on('routeChangeError', handleLoading(false));

  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default Application;

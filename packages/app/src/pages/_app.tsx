// import App from 'next/app';

import '@styles/main.scss';

function Application(props) {
  if (!props) {
    return () => null;
  }

  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}

export default Application;

import App from "next/app";

import "../scss/style.scss";

const EXCLUDE_SECURE_REDIRECT = ["/login"];

function Main(props) {
  if (!props) {
    return () => null;
  }

  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}

const isSecurityExcluded = request =>
  EXCLUDE_SECURE_REDIRECT.includes(request.path);

const getIntitalProps = async appContext => {};

Main.getInitialProps = async appContext => {
  const { ctx } = appContext;
  const { req, res } = ctx;

  // if (req) {
  //   appContext.ctx.req.baseUrl = 'http://localhost:3000' //getBaseUrl(req);

  //   // User exists
  //   if (
  //     req &&
  //     req.session &&
  //     req.session.passport &&
  //     req.session.passport.user
  //   ) {
  //     return await App.getInitialProps(appContext); // perhaps required
  //   }

  //   // Do not redirect if excluded
  //   if (isSecurityExcluded(req)) {
  //     return await App.getInitialProps(appContext);
  //   }

  //   // redirect
  //   res.writeHead(302, {
  //     Location: "/login?redirected=true"
  //   });
  //   res.end();
  // }
  return await App.getInitialProps(appContext);
};

export default Main;

import App from "next/app";

const EXCLUDE_SECURE_REDIRECT = ["/login"];

function Main({ Component, pageProps, user }) {
  return <Component {...pageProps} />;
}

const isSecurityExcluded = request =>
  EXCLUDE_SECURE_REDIRECT.includes(request.path);

Main.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);

  const {
    ctx: { req, res }
  } = appContext;

  // User exists
  if (req && req.session && req.session.passport && req.session.passport.user) {
    const user = req.session.passport.user;

    return { ...appProps, user };
  }

  // Do not redirect if excluded
  if (isSecurityExcluded(req)) {
    return { ...appProps };
  }

  // redirect
  res.writeHead(302, {
    Location: "/login?redirected=true"
  });
  res.end();
};

export default Main;

const session = require("express-session");
const SequelizeSessionConnector = require("connect-session-sequelize");

const SequelizeSessionStore = SequelizeSessionConnector(session.Store);

const sessionMiddleware = function(sequelizeConnection, sync = false) {
  const sessionStore = new SequelizeSessionStore({
    db: sequelizeConnection
  });

  if (sync) {
    sessionStore.sync();
  }

  return session({
    secret: "d}*kKiVJo$wkQAD7wUpzqe3HKqsK)bPjynjDsvT6Lar3Fk>LifCKPdogLPxgDHud", //TODO: read from env
    resave: false,
    saveUninitialized: true,
    name: "eskoolportal",
    cookie: {
      secure: false, //CRITICAL on localhost
      maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
    },
    store: sessionStore
  });
};

module.exports = sessionMiddleware;

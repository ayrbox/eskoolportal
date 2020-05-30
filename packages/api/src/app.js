const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { Connection, User } = require("./models");

const session = require("./middlewares/session");
const passportMiddleware = require("./middlewares/passport");

const routes = require("./routes");

const passport = passportMiddleware(User);

app.use(bodyParser.json());
app.use(session(Connection));

// app.use(passportInit());
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

module.exports = app;

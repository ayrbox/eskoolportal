const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = require('./models');

const session = require('./middlewares/session');
const passportMiddleware = require('./middlewares/passport');

const routes = require('./routes');

const passport = passportMiddleware(db.User);
app.use(bodyParser.json());
app.use(session(db.sequelize, true));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

module.exports = app;

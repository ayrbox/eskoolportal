const { Router } = require('express');

const studentRoutes = require('./students');
const classRoutes = require('./class');

const expressRouter = Router();

const routes = [...studentRoutes, ...classRoutes];

routes.forEach(({ method, path, handler }) => {
  expressRouter[method](path, handler);
});

module.exports = expressRouter;

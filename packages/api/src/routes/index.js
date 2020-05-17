const { Router } = require('express');

const studentRoutes = require('./students');

const expressRouter = Router();

const routes = [...studentRoutes];

routes.forEach(({ method, path, handler }) => {
  expressRouter[method](path, handler);
});

module.exports = expressRouter;

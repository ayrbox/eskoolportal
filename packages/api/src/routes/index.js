const { Router } = require("express");

const studentRoutes = require("./students");
const classRoutes = require("./class");
const authRoutes = require("./auth");

const expressRouter = Router();

const routes = [...studentRoutes, ...classRoutes, ...authRoutes];

routes.forEach(({ method, path, handler }) => {
  expressRouter[method](path, handler);
});

module.exports = expressRouter;

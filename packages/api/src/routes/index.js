const { Router } = require("express");

const studentRoutes = require("./students");
const classRoutes = require("./class");
const authRoutes = require("./auth");
const secureRoute = require("../middlewares/secureRoute");

const expressRouter = Router();

const routes = [...studentRoutes, ...classRoutes, ...authRoutes];

routes.forEach(({ method, path, handler, secure }) => {
  if (secure) {
    expressRouter[method](path, secureRoute, handler);
  } else {
    expressRouter[method](path, handler);
  }
});

module.exports = expressRouter;

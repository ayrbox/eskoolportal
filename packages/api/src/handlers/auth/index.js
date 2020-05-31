const { User } = require("../../models");

const makeLoginHandler = require("./login");

const login = makeLoginHandler({
  User
});

module.exports = {
  login
};

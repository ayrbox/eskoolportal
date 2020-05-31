const { User } = require("../../models");

const makeLoginHandler = require("./login");
const makeLogoutHandler = require("./logout");

const login = makeLoginHandler({
  User
});
const logout = makeLogoutHandler();

module.exports = {
  login,
  logout
};

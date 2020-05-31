const { login, logout } = require("../../handlers/auth");

module.exports = [
  {
    path: "/api/auth/login",
    method: "post",
    handler: login,
    secure: false
  },
  {
    path: "/api/auth/logout",
    method: "post",
    handler: logout,
    secure: true
  }
];
